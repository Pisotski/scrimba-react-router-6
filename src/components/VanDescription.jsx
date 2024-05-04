import {
	Link,
	Form,
	useLoaderData,
	useNavigation,
	useLocation,
} from "react-router-dom";
import { getVan } from "../helpers";
import "../assets/VanDescription.css";

const loader = async ({ params }) => {
	const data = await getVan(params.vansId);
	return data.fields;
};

const VanDescription = () => {
	const { name, price, description, imageUrl, type } = useLoaderData();
	return (
		<div className="wrapper van-details">
			<Link
				to={{
					pathname: "/vans",
					search: `?filter=${type}`,
					state: { fromVansDescription: true },
				}}
			>
				<button type="submit">{type}</button>
			</Link>
			<img src={imageUrl} />
			<h2>{name}</h2>
			<span>{price}</span>
			<p>{description}</p>
		</div>
	);
};

export { VanDescription, loader };
