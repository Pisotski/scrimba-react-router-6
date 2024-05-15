const months = [
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

const monthsPassedThisYear = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const monthsPassed = currentMonth + 1;

	return monthsPassed;
};

const transformDataForGraph = (userId, result, monthsPast, year) => {
	const userIncomeFull = result.records.filter(
		(record) => record.fields.userId === userId
	);
	const userIncomeThisYear = userIncomeFull.filter(
		(record) =>
			record.fields.year === year && record.fields.month <= monthsPast.length
	);
	const incomeChart = {};
	const transactionsChart = {};

	for (const month of monthsPast) {
		const monthName = months[month - 1];
		incomeChart[monthName] = 0;
		transactionsChart[monthName] = [];
	}

	userIncomeThisYear.forEach((record) => {
		const { day, month, year } = record.fields;
		const monthName = months[month - 1];
		const transactions = JSON.parse(record.fields.transactions);
		const date = `${month}/${day}/${year}`;
		transactionsChart[monthName] = transactionsChart[monthName].concat([
			[transactions, date],
		]);
		const sum = transactions.reduce((memo, el) => memo + el, 0);
		incomeChart[monthName] += sum;
	});
	const dataForGraph = [];
	monthsPast.forEach((month) => {
		const monthName = months[month - 1];
		const incomeThisMonth = {};
		incomeThisMonth.month = monthName;
		incomeThisMonth.earnings = incomeChart[monthName];
		return dataForGraph.push(incomeThisMonth);
	});
	return {
		incomeChart,
		dataForGraph,
		months: months.slice(0, monthsPast.length),
		transactionsChart,
	};
};
const generateTransactions = () => {
	const numberOfTransactions = Math.floor(Math.random() * 5) + 1;
	const transactions = [];
	for (let i = 0; i < numberOfTransactions; i++) {
		transactions.push(Math.floor(Math.random() * (500 - 100 + 1)) + 100);
	}
	return transactions;
};

const generateData = (userId = "recVEWCO9ngqLVRqO") => {
	const data = [];
	const years = [2023, 2024];
	const months = [...Array(12).keys()].map((x) => x + 1); // 1 to 12

	for (let i = 0; i < 50; i++) {
		const year = years[Math.floor(Math.random() * years.length)];
		const month = months[Math.floor(Math.random() * months.length)];
		const day =
			Math.floor(Math.random() * new Date(year, month, 0).getDate()) + 1;
		const transactions = JSON.stringify(generateTransactions());
		data.push({ userId, year, month, day, transactions });
	}

	return data;
};

const ids = [
	"rec5qXziUNzVxN4gW",
	"rec9TE31dsKYNvMm3",
	"recjBpurTvuTf2vHA",
	"recolB4yT9Ylvae8v",
	"recolTYdDB7Il2K8l",
	"recp44pLnWWMhqHca",
];

function generateRandomReview(userId) {
	const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
	const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Taylor", "Anderson"];
	const reviewTexts = [
		"I was pleasantly surprised by the quality of service provided by this company. The staff was friendly and professional, and they went above and beyond to ensure that my needs were met. I highly recommend them to anyone in need of their services.",
		"While the product itself was satisfactory, I found the customer service to be lacking. There were delays in communication and it took longer than expected to resolve issues. Overall, an average experience.",
		"I had a fantastic experience with this company. The product exceeded my expectations, and the customer service was top-notch. I will definitely be a returning customer and will recommend them to all my friends and family.",
		"Unfortunately, I was not impressed with the product I received. It did not meet the specifications outlined on the website, and there were issues with functionality. The customer service was responsive but unable to fully resolve my concerns.",
		"I can't say enough good things about this company. The product was exactly what I was looking for, and the customer service was exceptional. I will be a loyal customer for years to come.",
	];
	const vanIds = [
		"rec5qXziUNzVxN4gW",
		"rec9TE31dsKYNvMm3",
		"recjBpurTvuTf2vHA",
	];

	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	const guestName = `${firstName} ${lastName}`;
	const reviewText =
		reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
	const vanId = vanIds[Math.floor(Math.random() * vanIds.length)]; //Generate review for random vanId
	const score = Math.floor(Math.random() * 5) + 1; // Generate random score between 1 and 5

	const currentDate = new Date();
	const options = { year: "numeric", month: "long", day: "numeric" };
	const date = currentDate.toLocaleDateString("en-US", options);

	return {
		userId,
		vanId,
		guestName,
		date,
		reviewText,
		score,
	};
}

function generateReviews(numReviews, userId) {
	const reviews = [];
	const numToGenerate = Math.floor(Math.random() * (numReviews - 5 + 1)) + 5; // Generate between 5 to 10 reviews

	for (let i = 0; i < numToGenerate; i++) {
		reviews.push(generateRandomReview(userId));
	}

	return reviews;
}

export {
	monthsPassedThisYear,
	transformDataForGraph,
	generateReviews,
	generateData,
};
