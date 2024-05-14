import { decode } from "../../helpers.js";
import { Outlet, redirect } from "react-router-dom";

const loader = ({ params }) => {
	const JWT = localStorage.getItem("JWT");
	if (JWT) {
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
