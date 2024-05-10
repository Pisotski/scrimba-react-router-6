import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const loader = () => {
	return localStorage.getItem("JWT");
};

const Host = () => {
	const JWT = useLoaderData();
	return JWT ? (
		<div>
			<Outlet />
		</div>
	) : (
		<Navigate to="/auth" />
	);
};

export { Host, loader };
