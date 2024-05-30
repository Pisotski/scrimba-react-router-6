const CustomAPIError = require("./custom-api.cjs");
const UnauthenticatedError = require("./unauthenticated.cjs");
const NotFoundError = require("./not-found.cjs");
const BadRequestError = require("./bad-request.cjs");

module.exports = {
	CustomAPIError,
	UnauthenticatedError,
	NotFoundError,
	BadRequestError,
};
