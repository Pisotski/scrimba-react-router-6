require("dotenv").config();
require("express-async-errors");
require("colors");

const express = require("express");

const { customCors } = require("./server/middleware/cors.cjs");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./server/db/connect.cjs");
const { VITE_PORT = 3001 } = process.env;

/*============= ROUTERS ===============*/
/***************************************/
const authRouter = require("./server/routes/auth.cjs");
const vansRouter = require("./server/routes/vans.cjs");
const protectedVansRouter = require("./server/routes/protectedVans.cjs");
/***************************************/

/*=========== MIDDLEWARE ==============*/
/***************************************/
const { authMiddleware } = require("./server/middleware/auth.cjs");
/***************************************/

/*========= DATA GENERATORS ============*/
/***************************************/
const {
	generateTransactions,
} = require("./server/data_generators/generate_transactions.cjs");
/***************************************/

const app = express();

app.use(express.json());
app.use(cookieParser());

/*============ CORS RULES =============*/
/*cors custom rules for protected and unprotected routes*/
/*cors requires credentials for ./auth routes */
/***************************************/
app.use(customCors);
/***************************************/

app.use(express.static("dist/app"));

/*============= ROUTERS ===============*/
/***************************************/

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vans", vansRouter);
app.use("/api/v1/auth/vans", authMiddleware, protectedVansRouter);
app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "app/index.html"));
});
/***************************************/
/***************************************/

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		// generateTransactions(100, userId);

		app.listen(VITE_PORT, () =>
			console.log(`Server is listening on port ${VITE_PORT}...`.yellow)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
