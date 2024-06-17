import { Outlet, redirect } from "react-router-dom";
import Cookies from "js-cookie";

const loader = () => {
	const isAuthorized = Cookies.get("isAuthorized");
	if (isAuthorized) {
		const userId = localStorage.getItem("userId");
		if (!userId) Cookies.remove("isAuthorized");
		return redirect(`/host/${userId}`);
	}
	return null;
};

const Auth = () => {
	return <Outlet />;
};

export { Auth, loader };
