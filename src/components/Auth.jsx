import { decode } from "../helpers.js";
import { Outlet, redirect } from "react-router-dom";

const loader = () => {
	const JWT = localStorage.getItem("JWT");
	if (JWT) {
		const result = decode(JWT);
		const { id } = result;
		return redirect(`/host/${id}`);
	}

	return null;
};

const Auth = () => {
	return <Outlet />;
};

export { Auth, loader };
