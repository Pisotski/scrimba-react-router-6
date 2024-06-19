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
	req.session.user = { id: user._id, username: user.name };
	console.log(`${user.name} logged in`.green);
	res
		.cookie("access_token", token, {
			secure: true,
			httpOnly: true,
			sameSite: "Strict",
		})
		.status(StatusCodes.CREATED)
		.json({ msg: "user logged in", userId: user._id, userName: user.name });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}
	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError(
			"Can't find profile with credentials provided."
		);
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Incorrect Login or Password");
	}

	const token = user.createJWT();
	const userName = user.name;
	const userId = user._id;
	req.session.user = { id: userId, username: userName };
	console.log(`${userName} logged in`.green);

	res
		.cookie("access_token", token, {
			secure: true,
			httpOnly: true,
			sameSite: "Strict",
		})
		.status(StatusCodes.CREATED)
		.json({ userId, userName, msg: "user logged in" });
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
