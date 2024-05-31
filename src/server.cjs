require("dotenv").config();
require("express-async-errors");
require("colors");

const express = require("express");

const { customCors } = require("./server/middleware/cors.cjs");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./server/db/connect.cjs");
const { VITE_PORT = 3001 } = process.env;

const authRouter = require("./server/routes/auth.cjs");
const vansRouter = require("./server/routes/vans.cjs");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(customCors);

app.use(express.static("dist/app"));
app.use("/api/v1/auth", authRouter);
// TODO: axios on a front end is set to send request withCredentials for "/api/v1/auth"
// TODO: all private routes should have just /api/v1/*
app.use("/api/v1/vans", vansRouter);

app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "app/index.html"));
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(VITE_PORT, () =>
			console.log(`Server is listening on port ${VITE_PORT}...`.yellow)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
