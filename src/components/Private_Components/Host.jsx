import { Navigate, Link, Outlet, useLoaderData } from "react-router-dom";
import { decode } from "../../helpers";
import { Navbar } from "../Reusable_Components/Navbar";

const loader = () => {
	return localStorage.getItem("JWT");
};

const Host = () => {
	const JWT = useLoaderData();
	const { id } = decode(JWT);
	const links = [
		{
			path: `${id}`,
			label: "Dashboard",
		},
		{
			path: `${id}/income`,
			label: "Income",
		},
		{
			path: `${id}/vans`,
			label: "Vans",
			props: {
				isPrivate: true,
			},
		},
		{
			path: `${id}/reviews`,
			label: "Reviews",
		},
	];
	return JWT ? (
		<div>
			<Navbar links={links} isPrivate={true} />
			<Outlet />
		</div>
	) : (
		<Navigate to="/auth" />
	);
};

export { Host, loader };
