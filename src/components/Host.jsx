import { Navigate, Link, Outlet, useLoaderData } from "react-router-dom";
import { decode } from "../helpers";

const loader = () => {
	return localStorage.getItem("JWT");
};

const Host = () => {
	const JWT = useLoaderData();
	const { id } = decode(JWT);
	return JWT ? (
		<div>
			<nav className="navbar">
				{/* TODO: isLogged in make link visible, otherwise disable it */}
				<Link to={`/host/${id}`}>Dashboard</Link>
				<Link to={`${id}/income`}>Income</Link>
				<Link to={`${id}/myVans`}>Vans</Link>
				<Link to={`${id}/reviews`}>Reviews</Link>
			</nav>
			<Outlet />
		</div>
	) : (
		<Navigate to="/auth" />
	);
};

export { Host, loader };
