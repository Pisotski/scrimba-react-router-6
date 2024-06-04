const User = require("../models/User.cjs");
const { StatusCodes } = require("http-status-codes");
const {
	BadRequestError,
	UnauthenticatedError,
} = require("../errors/index.cjs");

const register = async (req, res) => {
	const { email } = req.body;

	let user = await User.findOne({ email });
	if (user) {
		throw new BadRequestError("Email already exists");
	}
	user = await User.create({ ...req.body });
	const token = user.createJWT();
	res
		.cookie("access_token", token, {
			httpOnly: true,
			// TODO: create NODE_ENV at deployment
			secure: process.env.NODE_ENV === "production",
		})
		.status(StatusCodes.CREATED)
		.json({ msg: "user logged in", userId: user._id });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("please provide email and password");
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid Credentials");
	}

	const token = user.createJWT();
	res
		.cookie("access_token", token, {
			httpOnly: true,
			// TODO: create NODE_ENV at deployment
			secure: process.env.NODE_ENV === "production",
		})
		.status(StatusCodes.OK)
		.json({ msg: "user logged in", userId: user._id });
};

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	});
	res
		.clearCookie("access_token")
		.status(StatusCodes.OK)
		.json({ msg: "User logged out and cookie cleared" });
};

module.exports = { login, register, logout };
