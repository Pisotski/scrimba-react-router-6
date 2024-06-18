const headers = {
	// Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
	"Content-Type": "application/json",
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
		// technically there should not be a case where 2 vans with the same id exists,
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

const populateReviewsTab = async (number, userId) => {
	const generatedData = generateReviews(number, userId);

	for (const element of generatedData) {
		await postReview(element);
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
};

export {
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
	populateReviewsTab,
};
