const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index.cjs");
require("colors");

const authMiddleware = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		// TODO: technically i want to redirect to /login here
		throw new UnauthenticatedError("Invalid Credentials".red);
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		req.user = data;
		return next();
	} catch {
		throw new UnauthenticatedError("Token Expired".red);
	}
};

const sessionCheckMiddleware = (req, res, next) => {
	if (req.session) {
		if (
			req.session.cookie.expires &&
			new Date() > new Date(req.session.cookie.expires)
		) {
			return res.status(401).send("Session expired");
		}
	}
	next();
};

module.exports = { authMiddleware, sessionCheckMiddleware };
