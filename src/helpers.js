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

export { titleCase, isValid, code, decode };
