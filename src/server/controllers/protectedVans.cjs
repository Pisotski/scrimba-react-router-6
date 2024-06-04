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
	const allVans = await Van.find({ createdBy: userId });
	res.status(StatusCodes.OK).json(allVans);
};
const getVanById = async (req, res) => {};

const updateVan = async () => {};

const createVan = async (req, res) => {
	const { body } = req;
	const van = await Van.create({
		createdBy: "665a1369a74ae7b602a187b3",
		...body,
	});
	res.status(StatusCodes.CREATED).json({ van });
};

const getIncomeLast30Days = async (req, res) => {
	const { userId } = req.user;
	try {
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 30);

		const incomes = await Income.find({
			userId: userId,
			date: {
				$gte: startDate,
				$lte: new Date(),
			},
		});
		res.status(StatusCodes.OK).json({ incomes });
	} catch (error) {
		console.error("Error filtering income:", error);
		return [];
	}
};

const getIncomeLast4Months = async (req, res) => {
	const { userId } = req.user;
	try {
		const startDate = new Date();
		startDate.setMonth(startDate.getMonth() - 4);

		const incomes = await Income.find({
			createdBy: userId,
			date: {
				$gte: startDate,
				$lte: new Date(),
			},
		});
		const income = sortIncomeByMonth(incomes);
		res.status(StatusCodes.OK).json({ income });
	} catch (error) {
		console.error("Error fetching income entries:", error);
		return [];
	}
};

module.exports = {
	getAllVansForUser,
	createVan,
	getIncomeLast4Months,
	getIncomeLast30Days,
	getVanById,
	updateVan,
};
