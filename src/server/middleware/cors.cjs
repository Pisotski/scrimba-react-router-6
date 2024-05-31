const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

const customCors = (req, res, next) => {
	if (req.originalUrl.startsWith("/api/v1/auth")) {
		cors(corsOptions)(req, res, next);
	} else {
		cors()(req, res, next);
	}
};

module.exports = { customCors };
