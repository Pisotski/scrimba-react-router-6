import { populateReviewsTab } from "../../controllers";

const loader = async ({ params }) => {
	const { userId } = params;
	// populateReviewsTab(20, userId);
	return null;
};

const Reviews = () => {
	return <div>Reviews</div>;
};

export { Reviews, loader };
