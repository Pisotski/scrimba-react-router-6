const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/unauthenticated.cjs");

const authMiddleware = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		// TODO: technically i want to redirect to /login here
		throw new UnauthenticatedError("Invalid Credentials");
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		req.user = data;
		return next();
	} catch {
		// TODO: redirect to /login here too
		throw new UnauthenticatedError("Token Expired");
	}
};

module.exports = { authMiddleware };
