const url = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

//use airtable instead of mirage

const headers = {
	Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
	"Content-Type": "application/json",
};

const getAllVans = async () => {
	try {
		const response = await fetch(url, { headers });
		if (!response.ok) throw new Error(`Error: ${response.status}`);

		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

const getVan = async (id) => {
	let newUrl = `${url}/${id}`;
	try {
		const response = await fetch(newUrl, { headers });
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
		const response = await fetch(url, options);
		if (!response.ok) throw new Error(`Error: ${response.status}`);
		console.log("more vans added");
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
};

export { getAllVans, getVan, postVans };
