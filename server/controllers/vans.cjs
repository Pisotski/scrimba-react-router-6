const Van = require("../models/Van.cjs");
const { StatusCodes } = require("http-status-codes");
const {
	BadRequestError,
	UnauthenticatedError,
} = require("../errors/index.cjs");

const getAllVans = async (req, res) => {
	try {
		const allVans = await Van.find({});
		res.status(StatusCodes.OK).json({ allVans });
	} catch (err) {
		throw new BadRequestError(err);
	}
};
const createVan = async (req, res) => {
	const { body } = req;
	const van = await Van.create({
		createdBy: "665a1369a74ae7b602a187b3",
		...body,
	});
	res.status(StatusCodes.CREATED).json({ van });
};

const getVanById = async (req, res) => {
	const { vanId } = req.params;
	const van = await Van.findById(vanId);
	res.status(StatusCodes.OK).json({ van });
};

module.exports = {
	getAllVans,
	createVan,
	getVanById,
};
