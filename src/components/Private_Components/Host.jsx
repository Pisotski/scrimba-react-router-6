import { Outlet, useLoaderData } from "react-router-dom";
import { Navbar } from "../Reusable_Components/Navbar";

const loader = async ({ params }) => {
	const { userId } = params;
	return userId || null;
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
		{
			path: `/auth/logout`,
			label: "Logout",
		},
	];
	// TODO: create if user logged in display routes?
	return (
		<>
			<header className="header-private">
				<Navbar links={links} isPrivate={true} />
			</header>
			<Outlet />
		</>
	);
};

export { Host, loader };
