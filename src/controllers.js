import { code } from "./helpers";
import {
	monthsPassedThisYear,
	transformDataForGraph,
	generateData,
	generateReviews,
} from "./generators";

const url_vans = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_VANS}`;

const url_users = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_USERS}`;

const url_income = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_INCOME}`;

const url_reviews = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME_REVIEWS}`;

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

const postReview = async (review) => {
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify({ fields: review }),
	};

	try {
		const response = await fetch(url_reviews, options);
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		return result;
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

const populateIncomeTab = async (userId, reviewsCount) => {
	const generatedData = generateData(userId, reviewsCount);
	for (const element of generatedData) {
		await postIncome(element);
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
	console.log(`income tab updated`);
};

const populateReviewsTab = async (number, userId) => {
	const generatedData = generateReviews(number, userId);

	for (const element of generatedData) {
		await postReview(element);
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
	postIncome,
	updateRecord,
	login,
	register,
	populateIncomeTab,
	populateReviewsTab,
};