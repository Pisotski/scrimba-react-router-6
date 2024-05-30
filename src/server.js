// const router = require("./lib/router");
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

const path = require("path");
const express = require("express");

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

app.use(express.static("dist/app"));

app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "app/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
