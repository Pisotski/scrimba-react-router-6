import {
	Link,
	Form,
	useLoaderData,
	useLocation,
	Outlet,
} from "react-router-dom";
import { getVan, titleCase } from "../../helpers";
import { Navbar } from "./Navbar";
import "../../assets/VanDescription.css";

const loader = async ({ params }) => {
	const { vanId, userId } = params;
	const data = await getVan(vanId);
	return { data: data.fields, userId };
};

const VanDescription = () => {
	const data = useLoaderData().data;
	const { name, price, description, imageUrl, type } = data;
	const location = useLocation();
	const isPrivate = location.pathname.includes("host");
	location.state = { ...location.state, data };

	const links = [
		{
			path: "",
			label: "Details",
		},
		{
			path: "pricing",
			label: "Pricing",
		},
		{
			path: "photos",
			label: "Photos",
		},
	];

	// TODO: decide on functionality of type button for private route
	const options = !isPrivate
		? {
				pathname: "/vans",
				search: `?filter=${type}`,
		  }
		: null;

	return (
		<div className="wrapper van-details">
			{/* TODO: return to 'userid/host/vans' */}
			<Link to={-1} className="clear-filters">
				&larr; <span>Back to all vans</span>
			</Link>
			<img src={imageUrl} />
			<h2>{name}</h2>
			<Link to={options}>
				<button type="submit" className={`option-button grid-button ${type}`}>
					{titleCase(type)}
				</button>
			</Link>
			{isPrivate ? (
				<>
					<Navbar links={links} />
					<Outlet />
				</>
			) : (
				<>
					<span>
						<strong>${price}</strong>/day
					</span>
					<p>{description}</p>
					<Form method="post" className="wide-submit-button">
						<button type="submit">Rent this van</button>
					</Form>
				</>
			)}
		</div>
	);
};

export { VanDescription, loader };
