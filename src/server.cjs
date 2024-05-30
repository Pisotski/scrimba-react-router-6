require("dotenv").config();
require("express-async-errors");
require("colors");

const cors = require("cors");
const path = require("path");
const express = require("express");
const connectDB = require("./server/db/connect.cjs");
const { VITE_PORT = 3001 } = process.env;

const authRouter = require("./server/routes/auth.cjs");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("dist/app"));
app.use("/api/v1/auth", authRouter);

app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "app/index.html"));
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(VITE_PORT, () =>
			console.log(`Server is listening on port ${VITE_PORT}...`.blue)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
