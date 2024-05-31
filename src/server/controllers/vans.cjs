const Van = require("../models/Van.cjs");
const { StatusCodes } = require("http-status-codes");
const {
	BadRequestError,
	UnauthenticatedError,
} = require("../errors/index.cjs");

const getAllVans = async () => {
	console.log("hi");
};
const createVan = async () => {
	const { user, body } = req;
	const van = await Van.create({
		createdBy: user.userId,
		...body,
	});

	res.status(StatusCodes.CREATED).json({ van });
};

const getVanById = async () => {};
const updateVan = async () => {};

module.exports = {
	getAllVans,
	createVan,
	getVanById,
	updateVan,
};
