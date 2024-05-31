const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		// technically i want to redirect to /login here
		throw new UnauthenticatedError("Invalid Credentials");
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = data.id;
		return next();
	} catch {
		// technically i want to redirect to /login here too
		throw new UnauthenticatedError("Token Expired");
	}
};

module.exports = { authMiddleware };
