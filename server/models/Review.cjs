const { Schema, Types, model } = require("mongoose");

const ReviewSchema = new Schema(
	{
		createdBy: {
			type: Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
		owner: {
			type: Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
		van: {
			type: Types.ObjectId,
			ref: "Van",
			required: [true, "Please provide van"],
		},
		guestName: {
			required: [true, "Please provide guest name"],
			type: String,
		},
		date: {
			type: Date,
			default: Date.now,
			required: [true, "Please provide date"],
		},
		reviewText: {
			required: [true, "Please let us know what you think about this van"],
			type: String,
		},
		score: {
			type: Number,
			required: [true, "Please provide score"],
			min: [1, "Score must be at least 1"],
			max: [5, "Score must be at most 5"],
		},
	},
	{ timestamps: true }
);

module.exports = model("Review", ReviewSchema);
