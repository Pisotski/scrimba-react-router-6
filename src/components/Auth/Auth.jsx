import { Outlet, redirect } from "react-router-dom";
import { useContext } from "react";

const loader = () => {
	const { auth } = useContext(AuthContext);
	if (!auth.isAuthenticated) {
		return redirect("/auth");
	}
	return null;
};

const Auth = () => {
	return <Outlet />;
};

export { Auth, loader };
