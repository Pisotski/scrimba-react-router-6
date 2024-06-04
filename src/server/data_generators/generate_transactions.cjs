const mongoose = require("mongoose");
const Income = require("../models/Income.cjs");

const generateTransactions = async (totalTransactions, userId) => {
	try {
		for (let i = 0; i < totalTransactions; i++) {
			const date = getRandomDate(new Date("2023-01-01"), new Date());
			const transactionAmount = getRandomNumber(10, 1000);

			await Income.create({ createdBy: userId, date, transactionAmount });
			console.log(`Transaction ${i + 1} saved to the database.`);
		}
		console.log("All transactions have been saved to the database.");
	} catch (error) {
		console.error("Error generating transactions:", error);
	}
};

const getRandomDate = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = { generateTransactions };
