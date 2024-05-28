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

const countTotalScore = (data) => {
	const totalStars = data.reduce((memo, el) => {
		return (memo += el.fields.score);
	}, 0);
	return Math.round((totalStars / data.length) * 10) / 10;
};

const countStarsPercentage = (data) => {
	const starsNumberPerScore = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
	data.forEach((el) => (starsNumberPerScore[el.fields.score] += 1));
	for (const stars in starsNumberPerScore) {
		starsNumberPerScore[stars] = Math.round(
			(starsNumberPerScore[stars] / data.length) * 100
		);
	}
	return starsNumberPerScore;
};

export {
	titleCase,
	isValid,
	code,
	decode,
	countTotalScore,
	countStarsPercentage,
};
