import {
	Link,
	Form,
	useLoaderData,
	useLocation,
	Outlet,
} from "react-router-dom";
import { getVanById } from "../../controllers";
import { titleCase } from "../../helpers";
import { Navbar } from "./Navbar";
import "../../assets/VanDescription.css";

const loader = async ({ params }) => {
	const { vanId, userId } = params;
	const { van } = await getVanById(vanId);
	return { van, userId };
};

const VanDescription = () => {
	const { van } = useLoaderData();
	const { name, price, description, imageUrl, type } = van;

	const location = useLocation();
	const path = location.pathname;
	const isPrivate = path.includes("host");
	location.state = { ...location.state, van };

	const backToVansLink = path.substring(
		0,
		path.indexOf("/vans") + "/vans".length
	);

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
		<div className="van-description">
			<Link to={backToVansLink} className="clear-filters">
				&larr; <span>Back to all vans</span>
			</Link>
			<figure className="van-description-image-container">
				<img src={imageUrl} />
			</figure>
			{isPrivate ? (
				<>
					<h2>{name}</h2>
					<button className={`description-type-button option-button ${type}`}>
						{titleCase(type)}
					</button>
					<Navbar links={links} />
					<Outlet />
				</>
			) : (
				<>
					<Link to={options}>
						<button type="submit" className={`option-button ${type}`}>
							{titleCase(type)}
						</button>
					</Link>
					<h2>{name}</h2>

					<span>
						<strong>${price}</strong>/day
					</span>
					<p>{description}</p>
					<Form method="post" className="wide-tall-button-container">
						<button type="submit" className="wide tall button ">
							Rent this van
						</button>
					</Form>
				</>
			)}
		</div>
	);
};

export { VanDescription, loader };
