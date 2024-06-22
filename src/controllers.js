import axios from "axios";
import Cookies from "js-cookie";
import api from "./utils/api";
// api url:
// http://localhost:${import.meta.env.VITE_PORT}/api/v1/auth

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
		return { userId: result.data.userId, userName: result.data.userName };
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
		return { userId: result.data.userId, userName: result.data.userName };
	} catch (err) {
		console.log(err);
	}
};

const setAuthCookie = ({ userId, userName }) => {
	Cookies.set("isAuthorized", true, { expires: 7, path: "/" });
	localStorage.setItem("userId", userId);
	localStorage.setItem("userName", userName);
	return;
};

const logout = async () => {
	const url = `${url_main}${url_auth}/logout`;
	try {
		const result = await axios.get(url, headers);
		Cookies.remove("isAuthorized");
		localStorage.removeItem("userId");
		localStorage.removeItem("userName");
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

const createVan = async (vanInfo) => {
	try {
		const response = await api.post(`/vans`, vanInfo, { headers });
		console.log("van added");
		return;
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

const deleteVan = async (vanId) => {
	try {
		const response = await api.delete(`/vans/${vanId}`);
		console.log("van deleted");
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getVanIdPhotos = async ({ vanId }) => {
	try {
		const response = await api.get(`/vans/${vanId}`, { headers });
		// TODO: photos when mock vans library created:

		return [response.data.van.imageUrl];
	} catch (err) {
		console.log(err);
	}
};

// ******************************* CRUD CONTROLLERS VANS CLIENT END **
// *******************************************************************

// *******************************************************************
// ****************************************** REVIEW AND INCOME TAB **
const getReviewsForUser = async (params) => {
	try {
		const {
			data: { reviews, totalReviews },
		} = await api.get(`/vans/reviews`, { params });
		return { reviews, totalReviews };
	} catch (err) {
		console.log(err);
	}
};

const getAverageScore = async (date) => {
	try {
		const response = await api.get(`/vans/reviews/averageScore`, {
			params: {
				date,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
const getStarBarsData = async () => {
	try {
		const response = await api.get(`/vans/reviews/starBarsData`, { headers });
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

// ************************************** END REVIEW AND INCOME TAB **
// *******************************************************************

export {
	getVanIdPhotos,
	getIncome,
	getAllVansForUser,
	getReviewsForUser,
	getAverageScore,
	getStarBarsData,
	getAllVans,
	getVanById,
	login,
	logout,
	register,
	setAuthCookie,
	createVan,
	updateVan,
	deleteVan,
};
