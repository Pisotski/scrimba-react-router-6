import { Link, useLoaderData } from "react-router-dom";
import {} from "../helpers";

const loader = ({ params }) => {
	const { userId, vanId } = params;
	return params;
};

const MyVansListingDetails = () => {
	const { userId, vanId } = useLoaderData();
	return (
		<div>
			<div>user: {userId}</div>
			<div>van: {vanId}</div>
		</div>
	);
};

export { MyVansListingDetails, loader };
