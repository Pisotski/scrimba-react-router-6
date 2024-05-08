import { Link, Form, useLoaderData } from "react-router-dom";
import { getVan, titleCase } from "../helpers";
import "../assets/VanDescription.css";

const loader = async ({ params }) => {
	const data = await getVan(params.vansId);
	return data.fields;
};

const VanDescription = () => {
	const { name, price, description, imageUrl, type } = useLoaderData();
	return (
		<div className="wrapper van-details">
			<Link to="/vans" className="clear-filters">
				&larr; <span>Back to all vans</span>
			</Link>
			<img src={imageUrl} />
			<Link
				to={{
					pathname: "/vans",
					search: `?filter=${type}`,
					state: { fromVansDescription: true },
				}}
			>
				<button type="submit" className={`option-button grid-button ${type}`}>
					{titleCase(type)}
				</button>
			</Link>
			<h2>{name}</h2>
			<span>
				<strong>${price}</strong>/day
			</span>
			<p>{description}</p>
			<Form method="post" className="wide-submit-button">
				<button type="submit">Rent this van</button>
			</Form>
		</div>
	);
};

export { VanDescription, loader };
