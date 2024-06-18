const Van = require("../models/Van.cjs");
const Income = require("../models/Income.cjs");
const { StatusCodes } = require("http-status-codes");
const {
	BadRequestError,
	UnauthenticatedError,
} = require("../errors/index.cjs");
const { sortIncomeByMonth } = require("../helpers/incomeByMonth.cjs");

const getAllVansForUser = async (req, res) => {
	const { userId } = req.user;
	const { limit } = req.query;
	const query = Van.find({ createdBy: userId });
	if (limit !== undefined) {
		query.limit(limit);
	}
	const allVans = await query;
	res.status(StatusCodes.OK).json(allVans);
};

const getVanById = async (req, res) => {
	const { vanId } = req.params;
	const { userId } = req.user;
	const queryObject = { createdBy: userId, _id: vanId };
	const van = await Van.findById(queryObject);
	if (!van) throw new NotFoundError("van not found");
	res.status(StatusCodes.OK).json({ van });
};

const updateVan = async (req, res) => {
	const { vanId } = req.params;
	const { userId } = req.user;

	if (!req.body) throw new BadRequestError("nothing to update");

	const queryObject = { createdBy: userId, _id: vanId };
	const van = await Van.findOneAndUpdate(queryObject, req.body, {
		new: true,
		runValidators: true,
	});
	if (!van) throw new NotFoundError("van not found");
	res.status(StatusCodes.OK).json({ updatedVan: van });
};

const createVan = async (req, res) => {
	const { body } = req;
	const van = await Van.create({
		createdBy: "665a1369a74ae7b602a187b3",
		...body,
	});
	res.status(StatusCodes.CREATED).json({ van });
};

const getIncomeLastXPeriod = async (userId, startDate) => {
	try {
		const income = await Income.find({
			createdBy: userId,
			date: {
				$gte: startDate,
				$lte: new Date(),
			},
		});
		return income;
	} catch (error) {
		console.error("Error fetching income entries:", error);
		return [];
	}
};

const getUserIncome = async (req, res) => {
	const { userId } = req.user;
	const monthsAgo = new Date();
	monthsAgo.setMonth(monthsAgo.getMonth() - 3);
	const daysAgo = new Date();
	daysAgo.setDate(daysAgo.getDate() - 30);
	try {
		const [incomeLast30Days, incomeLast4Months] = await Promise.all([
			getIncomeLastXPeriod(userId, daysAgo),
			getIncomeLastXPeriod(userId, monthsAgo),
		]);
		res.status(StatusCodes.OK).json({
			incomeLast30Days,
			incomeLast4Months: sortIncomeByMonth(incomeLast4Months),
		});
	} catch (error) {
		console.error("Error fetching income entries:", error);
		return [];
	}
};

module.exports = {
	getAllVansForUser,
	createVan,
	getUserIncome,
	getVanById,
	updateVan,
};
