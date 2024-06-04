const { Schema, Types, model } = require("mongoose");

const IncomeSchema = new Schema(
	{
		createdBy: {
			type: Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		transactionAmount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Income", IncomeSchema);
