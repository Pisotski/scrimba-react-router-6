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
	req.session.user = { id: user._id, username: user.name, userObject: user };
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

	if (!email || !password)
		throw new UnauthenticatedError("Please provide email and password");

	try {
		const user = await User.findOne({ email });
		if (!user) throw new UnauthenticatedError("Wrong User or Password");

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect)
			throw new UnauthenticatedError("Wrong User or Password");

		const token = user.createJWT();
		const userName = user.name;
		const userId = user._id;

		req.session.user = { id: userId, username: userName, userObject: user };

		console.log(`${userName} logged in`.green);

		const cookieOptions = {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "Strict",
		};

		res
			.cookie("access_token", token, cookieOptions)
			.status(StatusCodes.CREATED)
			.json({ userId, userName, msg: "User logged in" });
	} catch (error) {
		console.error("Login error: __________________", error);
		res.status(error.statusCode).json({ message: error.message });
	}
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
