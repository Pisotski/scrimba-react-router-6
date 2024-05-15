const url_vans = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_VANS}`;

const url_users = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_USERS}`;

const url_income = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_INCOME}`;

const headers = {
	Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
	"Content-Type": "application/json",
};

const getAllVans = async () => {
	try {
		const response = await fetch(url_vans, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);

		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const getAllUsers = async () => {
	try {
		const response = await fetch(`${url_users}`, {
			headers,
		});
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const getVan = async (id) => {
	const newUrl = `${url_vans}/${id}`;
	try {
		const response = await fetch(newUrl, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const getVansByUser = async (userId, pageSize) => {
	const newUrl = `${url_vans}?pageSize=${pageSize}`;
	try {
		const response = await fetch(newUrl, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const getVanIdPhotos = async (vanId, userId) => {
	const newUrl = `${url_vans}/${vanId}`;
	try {
		const response = await fetch(newUrl, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		return [result.fields.imageUrl];
	} catch (err) {
		console.log(err);
	}
};

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

const getIncomeThisYear = async (userId = "recVEWCO9ngqLVRqO") => {
	const monthsPast = [...Array(monthsPassedThisYear()).keys()].map(
		(x) => x + 1
	);
	const year = new Date().getFullYear();
	try {
		const response = await fetch(url_income, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		const data = transformDataForGraph(userId, result, monthsPast, year);
		return data;
	} catch (err) {
		console.log(err);
	}
};

const postVans = async (vanInfo) => {
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify(vanInfo),
	};

	try {
		const response = await fetch(url_vans, options);
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		console.log("more vans added");
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const updateRecord = async (id, obj) => {
	const options = {
		method: "PATCH",
		headers,
		body: JSON.stringify({ fields: obj }),
	};

	try {
		const response = await fetch(`${url_users}/${id}`, options);
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const login = async (credentials) => {
	const allUsers = await getAllUsers();
	const { login, password } = credentials;
	const [{ id, fields }] = allUsers.records.filter(
		(el) => el.fields.login === login && el.fields.password === password
	);
	return { ...fields, id };
};

const register = async (credentials) => {
	const { login } = credentials;
	const usersData = await getAllUsers();
	usersData.records.forEach((record) => {
		if (record.fields.login === login)
			throw new Error(`${login} already in use, please choose another email`);
	});

	const options = {
		method: "POST",
		headers,
		body: JSON.stringify({ fields: { ...credentials } }),
	};

	try {
		const response = await fetch(url_users, options);
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		console.log(`${credentials.login} added to database`);
		const {
			fields: { login },
			id,
		} = await response.json();
		const JWT = code({ id, login });
		updateRecord(id, {
			JWT: JWT,
		});
		return { JWT, id };
	} catch (err) {
		console.log(err);
	}
};

const titleCase = (str) => {
	str = str.toLowerCase().split(" ");
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
};

const isValid = (credentials) => {
	const { login, password } = credentials;
	return validateName(login) && validatePassword(password);
};

const validateName = (str) => {
	return str && true;
};

const validatePassword = (str) => {
	return str && true;
};

const code = (obj) => {
	return btoa(JSON.stringify(obj));
};

const decode = (JWT) => {
	return JSON.parse(atob(JWT));
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

const postIncome = async (income) => {
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify({ fields: income }),
	};

	try {
		const response = await fetch(url_income, options);
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const populateIncomeTab = async () => {
	const generatedData = generateData();
	for (const element of generatedData) {
		await postIncome(element);
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
};

export {
	getAllVans,
	getVan,
	getVansByUser,
	getVanIdPhotos,
	getIncomeThisYear,
	postVans,
	updateRecord,
	titleCase,
	login,
	isValid,
	register,
	decode,
	populateIncomeTab,
};
