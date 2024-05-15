import { populateReviewsTab } from "../../controllers";

const loader = async ({ params }) => {
	const { userId } = params;
	await populateReviewsTab(20, userId);
	return null;
};

const Reviews = () => {
	return <div>Reviews</div>;
};

export { Reviews, loader };
