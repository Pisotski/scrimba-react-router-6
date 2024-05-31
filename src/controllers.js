import { code } from "./helpers";
import api from "./utils/api";

import {
	monthsPassedThisYear,
	transformDataForGraph,
	generateData,
	generateReviews,
} from "./generators";
import axios from "axios";

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
	// Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
	"Content-Type": "application/json",
};

const url_main = `http://localhost:${import.meta.env.VITE_PORT}/api/v1`;
const url_auth = `/auth`;

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

const getIncomeThisYear = async (userId) => {
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

const getAllReviewsForUser = async (userId) => {
	const newUrl = `${url_reviews}`;
	try {
		// get all reviews filter them by vanId and userId
		// technically there should not be a case that 2 vans with the same id exists,
		const response = await fetch(newUrl, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		const result = await response.json();
		const reviewsByUser = result.records.filter(
			(r) => r.fields.userId === userId
		);
		return reviewsByUser;
	} catch (err) {
		console.log(err);
	}
};

const getPageReviews = async (userId, stars) => {};

const getFilteredReviewsByStars = async (userId, stars) => {
	const data = await getAllReviewsForUser(userId);
	const reviews = data.filter(
		(review) => review.fields.score === Number(stars)
	);
	return reviews;
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

const authorize = async () => {
	//include cookie in the request
	try {
		const response = await axios.get(
			`${url_main}${url_auth}/authorize`,
			headers
		);
		return response.data.userId;
	} catch (error) {
		console.error(error);
	}
};

const login = async (credentials) => {
	// const { login, password } = credentials;
	// const [{ id, fields }] = allUsers.records.filter(
	// 	(el) => el.fields.login === login && el.fields.password === password
	// );
	const url = `${url_main}${url_auth}/login`;

	try {
		const response = await api.post(url, credentials, headers);
		console.log(response);
		return response.data.userId;
	} catch (error) {
		console.error(error);
	}
};

const register = async (credentials) => {
	try {
		const response = await api.post(
			`${url_main}${url_auth}/register`,
			credentials,
			headers
		);
		console.log(`new user ${credentials.name} created`);
		return response.data.userId;
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
	getAllReviewsForUser,
	getPageReviews,
	getFilteredReviewsByStars,
	postVans,
	postIncome,
	updateRecord,
	authorize,
	login,
	register,
	populateIncomeTab,
	populateReviewsTab,
};
