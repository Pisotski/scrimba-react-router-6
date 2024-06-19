require("dotenv").config();
require("express-async-errors");
require("colors");
const session = require("express-session");

const express = require("express");

const { customCors } = require("./middleware/cors.cjs");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect.cjs");
const { VITE_PORT = 3001 } = process.env;

/*============= ROUTERS ===============*/
/***************************************/
const authRouter = require("./routes/auth.cjs");
const vansRouter = require("./routes/vans.cjs");
const protectedVansRouter = require("./routes/protectedVans.cjs");
/***************************************/

/*=========== MIDDLEWARE ==============*/
/***************************************/
const {
	authMiddleware,
	sessionCheckMiddleware,
} = require("./middleware/auth.cjs");
/***************************************/

/*========= DATA GENERATORS ============*/
/***************************************/
const {
	generateTransactions,
} = require("./data_generators/generate_transactions.cjs");
/***************************************/

const app = express();

/*========= SESSION SET-UP ============*/
/***************************************/
// TODO: talk about where to start session.
// It looks like session should be only started when the user logs in, not when the server started spinning
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
		},
	})
);

/***************************************/
app.use(express.json());
app.use(cookieParser());

/*============ CORS RULES =============*/
/*cors custom rules for protected and unprotected routes*/
/*cors requires credentials for ./auth routes */
/***************************************/
app.use(customCors);
/***************************************/

// app.use(express.static("dist/app"));

/*============= ROUTERS ===============*/
/***************************************/

// public
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vans", vansRouter);

// protected
app.use(
	"/api/v1/auth/vans",
	authMiddleware,
	sessionCheckMiddleware,
	protectedVansRouter
);
app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});
console.log(__dirname);
/***************************************/
/***************************************/

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		// generateTransactions(100, userId);

		app.listen(VITE_PORT, () =>
			console.log(
				`Server is listening on port ${VITE_PORT}... http://localhost:${VITE_PORT}/`
					.yellow
			)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
