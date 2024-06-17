const express = require("express");
const router = express.Router();
const {
	getAllVansForUser,
	getIncomeLast4Months,
	createVan,
	getVanById,
	updateVan,
} = require("../controllers/protectedVans.cjs");

router.get("/", getAllVansForUser);
router.post("/", createVan);
router.get("/income", getIncomeLast4Months);
router.get("/:vanId", getVanById);
router.patch("/:vanId", updateVan);

module.exports = router;
