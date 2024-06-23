import axios from "axios";
const instance = axios.create({
	baseURL: `http://localhost:${import.meta.env.VITE_PORT}/api/v1/auth`,
	withCredentials: true,
});

export default instance;
