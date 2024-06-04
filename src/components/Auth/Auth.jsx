import { decode } from "../../helpers.js";
import { Outlet, redirect } from "react-router-dom";
import { authorize } from "../../controllers.js";

const loader = ({ params }) => {
	// TODO: if cookie exists, send it to server
	// server has to return userID
	// const JWT = localStorage.getItem("JWT");
	const cookieExists = Cookies.get("your_cookie_name") !== undefined;

	if (cookieExists) {
		const result = decode(JWT);
		const { id } = result;
		return redirect(`/host/${id}`, {
			state: { from: location.href },
		});
	}

	return null;
};

const Auth = () => {
	return <Outlet />;
};

export { Auth, loader };
