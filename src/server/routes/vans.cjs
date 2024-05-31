const express = require("express");
const router = express.Router();
const {
	getAllVans,
	createVan,
	getVanById,
	updateVan,
} = require("../controllers/vans.cjs");

router.get("/vans", getAllVans);
router.post("/vans", createVan);
router.get("/:vanId", getVanById);
router.patch("/:vanId", updateVan);

module.exports = router;
