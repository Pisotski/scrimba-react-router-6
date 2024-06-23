const express = require("express");
const router = express.Router();
const {
	getAllVansForUser,
	getUserIncome,
	createVan,
	getVanById,
	updateVan,
	getAllReviews,
	getAverageScoreReviews,
	getStarBarsData,
	deleteVan,
} = require("../controllers/protectedVans.cjs");

router.get("/", getAllVansForUser);
router.post("/", createVan);
router.get("/income", getUserIncome);
router.get("/reviews", getAllReviews);
router.get("/reviews/averageScore", getAverageScoreReviews);
router.get("/reviews/starBarsData", getStarBarsData);
router.get("/:vanId", getVanById);
router.patch("/:vanId", updateVan);
router.delete("/:vanId", deleteVan);

module.exports = router;
