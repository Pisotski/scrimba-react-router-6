import axios from "axios";
import Cookies from "js-cookie";
import api from "./utils/api";

const headers = {
	// Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
	"Content-Type": "application/json",
};

const url_main = `http://localhost:${import.meta.env.VITE_PORT}/api/v1`;
const url_public = `${url_main}/vans`;
const url_auth = `/auth`;
const url_private = `${url_main}${url_auth}`;

// *******************************************************************
// **************************************** AUTH CONTROLLERS CLIENT **
const login = async (credentials) => {
	const url = `${url_main}${url_auth}/login`;
	try {
		const result = await api.post(url, credentials, headers);
		return result.data.userId;
	} catch (error) {
		console.error(error);
	}
};

const register = async (credentials) => {
	try {
		const result = await api.post(
			`${url_main}${url_auth}/register`,
			credentials,
			headers
		);
		console.log(`new user ${credentials.name} created`);
		return result.data.userId;
	} catch (err) {
		console.log(err);
	}
};

const setAuthCookie = (userId) => {
	console.log(userId);
	Cookies.set("isAuthorized", true, { expires: 7, path: "/" });
	localStorage.setItem("userId", userId);
	return;
};

const logout = async () => {
	const url = `${url_main}${url_auth}/logout`;
	try {
		const result = await axios.get(url, headers);
		Cookies.remove("isAuthorized");
		localStorage.removeItem("userId");
		return result;
	} catch (error) {
		console.error(error);
	}
};
// ************************************ AUTH CONTROLLERS CLIENT END **
// *******************************************************************

// *******************************************************************
// *********************************** CRUD CONTROLLERS VANS CLIENT **
const getAllVans = async () => {
	try {
		const response = await axios.get(url_public);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getAllVansForUser = async (limit) => {
	//TODO: incorrect endpoint
	// redo after populating different vans for different users
	try {
		const response = await api.get(`/vans`, {
			params: {
				limit,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getVanById = async (vanId) => {
	const newUrl = `${url_public}/${vanId}`;
	try {
		const response = await axios.get(newUrl, { headers });
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getIncome = async () => {
	try {
		const response = await api.get("/vans/income", { headers });
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const updateVan = async ({ vanId, updates }) => {
	try {
		const response = await api.patch(
			`/vans/${vanId}`,
			JSON.stringify(updates),
			{ headers }
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getVanIdPhotos = async ({ vanId }) => {
	try {
		const response = await api.get(`/vans/${vanId}`, { headers });
		// TODO: Sample data that should come back from db when mock vans library created:

		return [response.data.van.imageUrl];
	} catch (err) {
		console.log(err);
	}
};

const getAllReviewsForUser = async () => {};
const getFilteredReviewsByStars = async () => {};
const getPageReviews = async () => {};
const populateReviewsTab = async () => {};

// ******************************* CRUD CONTROLLERS VANS CLIENT END **
// *******************************************************************

export {
	populateReviewsTab,
	getVanIdPhotos,
	getPageReviews,
	getIncome,
	getAllVansForUser,
	getAllReviewsForUser,
	getFilteredReviewsByStars,
	getAllVans,
	getVanById,
	login,
	logout,
	register,
	setAuthCookie,
	updateVan,
};
