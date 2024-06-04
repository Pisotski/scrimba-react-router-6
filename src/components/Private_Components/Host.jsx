import { Outlet, useLoaderData } from "react-router-dom";
import { Navbar } from "../Reusable_Components/Navbar";

const loader = async ({ params }) => {
	const { userId } = params;
	return userId;
};

const Host = () => {
	const userId = useLoaderData();
	const links = [
		{
			path: `${userId}`,
			label: "Dashboard",
		},
		{
			path: `${userId}/income`,
			label: "Income",
		},
		{
			path: `${userId}/vans`,
			label: "Vans",
			props: {
				isPrivate: true,
			},
		},
		{
			path: `${userId}/reviews`,
			label: "Reviews",
		},
	];
	// TODO: create Authprovider? embed protected routes
	return (
		<>
			<div className="header private">
				<Navbar links={links} isPrivate={true} />
			</div>
			<Outlet />
		</>
	);
};

export { Host, loader };
