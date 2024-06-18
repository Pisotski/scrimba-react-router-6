const express = require("express");
const router = express.Router();
const {
	getAllVansForUser,
	getUserIncome,
	createVan,
	getVanById,
	updateVan,
} = require("../controllers/protectedVans.cjs");

router.get("/", getAllVansForUser);
router.post("/", createVan);
router.get("/income", getUserIncome);
router.get("/:vanId", getVanById);
router.patch("/:vanId", updateVan);

module.exports = router;
