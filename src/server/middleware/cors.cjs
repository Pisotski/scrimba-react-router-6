const cors = require("cors");

const authCorsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

const vansCorsOptions = {
	origin: "http://localhost:5173",
	credentials: false,
};

const customCors = (req, res, next) => {
	if (req.originalUrl.startsWith("/api/v1/auth")) {
		cors(authCorsOptions)(req, res, next);
	} else if (req.originalUrl.startsWith("/api/v1/vans")) {
		cors(vansCorsOptions)(req, res, next);
	} else {
		next();
	}
};

module.exports = { customCors };
