import { useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Star } from "../Reusable_Components/Star";
import {
	populateReviewsTab,
	getAllReviewsForUser,
	getFilteredReviewsByStars,
	getPageReviews,
} from "../../controllers";
import { countTotalScore, countStarsPercentage } from "../../helpers";
import { ProgressBar } from "../../components/Reusable_Components/ProgressBar";
import { ReviewsList } from "../Reusable_Components/ReviewsList";
import { PaginationButtonsGroup } from "../Reusable_Components/PaginationButtonsGroup";

const loader = async ({ params, request }) => {
	// populateReviewsTab(20, userId);
	const { userId } = params;
	const url = new URL(request.url);
	const star = url.searchParams.get("star");
	const page = url.searchParams.get("page") || 0;
	const pageSize = url.searchParams.get("size") || 5;
	const reviewsAll = await getAllReviewsForUser(userId);
	const filteredReviews =
		star && (await getFilteredReviewsByStars(userId, star));
	// this part is needed for star bars
	// TODO: design DB that will sort/filter information
	const reviewsCount = reviewsAll.length;
	const totalScore = countTotalScore(reviewsAll);
	const starsPercentage = countStarsPercentage(reviewsAll);

	return {
		reviewsAll,
		reviewsCount,
		totalScore,
		starsPercentage,
		filteredReviews,
	};
};

const Reviews = () => {
	const data = useLoaderData();
	const {
		reviewsAll,
		reviewsCount,
		totalScore,
		starsPercentage,
		filteredReviews,
	} = data;

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setSearchParams({ page: 1, size: 5 });
	}, []);

	const handleOnProgressBarClick = (e) => {
		e.currentTarget.preventDefault;
		const { star } = e.currentTarget.dataset;
		const page = parseInt(searchParams.get("page")) || 1;
		const pageSize = parseInt(searchParams.get("pageSize")) || 5;
		setSearchParams({ page, pageSize, star });
	};

	const handleOnReviewsClick = (e) => {
		e.currentTarget.preventDefault;
		setSearchParams({ page: 1, size: 5 });
	};

	const reviews = filteredReviews || reviewsAll;
	return (
		<>
			<section className="reviews-header">
				<h2>Your reviews</h2>
				<span>
					last <strong>30 days</strong>
				</span>
			</section>
			<section className="reviews-bars">
				<div className="reviews-bars-summary">
					<span>{totalScore}</span>
					<Star filledPercentage={`${(totalScore / 5) * 100}%`} />
					<span>overall rating</span>
				</div>
				<ProgressBar
					starsAndRatio={starsPercentage}
					onClick={handleOnProgressBarClick}
				/>
			</section>
			<section className="reviews-list">
				<h3 onClick={handleOnReviewsClick}>Reviews ({reviewsCount})</h3>
				<ReviewsList reviews={reviews} />
				{/* pagination to be displayed only if there are more than x reviews */}
				{/* store reviews amount in location state */}
				<PaginationButtonsGroup totalNumber={reviewsCount} />
			</section>
		</>
	);
};

export { Reviews, loader };
