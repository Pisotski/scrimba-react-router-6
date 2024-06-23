const sortIncomeByMonth = (incomes) => {
	const monthlyIncome = getPastNMonthNames(4);
	for (const transaction of incomes) {
		const date = new Date(transaction.date);
		const month = date.toLocaleString("en", { month: "long" });
		monthlyIncome[month].push(transaction);
	}
	return monthlyIncome;
};

const getPastNMonthNames = (n) => {
	const currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	let startingMonth = currentMonth - 3;

	let startingYear = currentYear;
	if (startingMonth < 0) {
		startingYear--;
		startingMonth += 12;
	}

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const lastXMonths = [];
	for (let i = 0; i < n; i++) {
		lastXMonths.push(monthNames[startingMonth]);
		startingMonth = (startingMonth + 1) % 12;
		if (startingMonth === 0) {
			startingYear++;
		}
	}

	const months = {};
	for (const mon of lastXMonths) {
		months[mon] = [];
	}

	return months;
};

module.exports = { sortIncomeByMonth };
