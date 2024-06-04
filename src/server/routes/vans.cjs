const express = require("express");
const router = express.Router();
const { getAllVans, getVanById } = require("../controllers/vans.cjs");

router.get("/", getAllVans);
router.get("/:vanId", getVanById);

module.exports = router;
