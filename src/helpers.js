const MMDDYYFormat = (dateString) => {
	const date = new Date(dateString);
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);
	return `${month}/${day}/${year}`;
};

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

const monthDDYYYYFormat = (dateString) => {
	const date = new Date(dateString);
	const monthIndex = date.getMonth();
	const month = monthNames[monthIndex];
	const day = String(date.getDate()).padStart(2, "0");
	const year = String(date.getFullYear());
	return `${month} ${day}, ${year}`;
};

const titleCase = (str) => {
	str = str.toLowerCase().split(" ");
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
};

const countStarsPercentage = (data) => {
	const starsNumberPerScore = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
	data.forEach((el) => (starsNumberPerScore[el.score] += 1));
	for (const stars in starsNumberPerScore) {
		starsNumberPerScore[stars] = Math.round(
			(starsNumberPerScore[stars] / data.length) * 100
		);
	}
	return starsNumberPerScore;
};

const hasEmptyField = (obj) => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (!obj[key]) {
				return true;
			}
		}
	}
	return false;
};

export {
	titleCase,
	countStarsPercentage,
	MMDDYYFormat,
	monthDDYYYYFormat,
	hasEmptyField,
};
