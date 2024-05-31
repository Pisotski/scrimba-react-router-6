const { Schema, Types, model } = require("mongoose");

const VanSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide name of the vehicle"],
			minLength: 3,
			maxLength: 50,
		},
		price: {
			type: Number,
			required: [true, "Please provide vehicle price"],
			min: 1,
			max: 100000,
		},
		description: {
			type: String,
			required: [true, "Please provide vehicle description"],
			minLength: 3,
			maxLength: 2000,
		},
		imageUrl: {
			type: String,
			required: [true, "Please provide vehicle image url"],
		},
		type: {
			type: String,
			enum: ["simple", "luxury", "rugged"],
			default: "simple",
		},
		visibility: {
			type: String,
			enum: ["Public", "Private"],
			default: "Public",
		},
		createdBy: {
			type: Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
	},
	{ timestamps: true }
);

module.exports = model("Van", VanSchema);
