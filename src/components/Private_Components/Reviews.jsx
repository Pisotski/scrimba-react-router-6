import { useLoaderData, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star } from "../Reusable_Components/Star";
import {
	getReviewsForUser,
	getAverageScore,
	getStarBarsData,
} from "../../controllers";
import { ProgressBar } from "../../components/Reusable_Components/ProgressBar";
import { ReviewsList } from "../Reusable_Components/ReviewsList";
import { PaginationButtonsGroup } from "../Reusable_Components/PaginationButtonsGroup";

const loader = async ({ params, request }) => {
	const { userId } = params;

	const reviewsAll = await getReviewsForUser(userId);
	const { averageScore } = await getAverageScore();
	const { starBarsData } = await getStarBarsData();

	// *********************************************************
	// ************************** pagination and stars filter **
	const url = new URL(request.url);
	const star = url.searchParams.get("star");
	const skip = url.searchParams.get("skip") || 0;
	const limit = url.searchParams.get("limit") || 5;
	// ********************** end pagination and stars filter **
	// *********************************************************
	const filteredReviews = reviewsAll.filter(
		(review) => review.score === Number(star)
	);

	// *********************************************************
	// // this part is needed for star bars
	// // TODO: design DB that will sort/filter information
	const reviewsCount = reviewsAll.length;
	// *********************************************************

	return {
		reviewsAll,
		reviewsCount,
		starBarsData,
		filteredReviews,
		averageScore,
	};
};

const Reviews = () => {
	const data = useLoaderData();

	const {
		reviewsAll,
		reviewsCount,
		starBarsData,
		filteredReviews,
		averageScore,
	} = data;

	const [searchParams, setSearchParams] = useSearchParams();
	const [reviews, setReviews] = useState(reviewsAll);

	useEffect(() => {
		setSearchParams({ skip: 0, limit: 5 });
	}, []);

	const handleOnProgressBarClick = (e) => {
		e.currentTarget.preventDefault;
		const { star } = e.currentTarget.dataset;
		const skip = parseInt(searchParams.get("skip")) || 1;
		const limit = parseInt(searchParams.get("limit")) || 5;
		setReviews(filteredReviews);
		setSearchParams({ skip, limit, star });
	};

	// refresh
	const handleOnReviewsClick = (e) => {
		e.currentTarget.preventDefault;
		setSearchParams({ skip: 0, limit: 5 });
	};

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
					<span>{averageScore}</span>
					<Star filledPercentage={`${(averageScore / 5) * 100}%`} />
					<span>overall rating</span>
				</div>
				<ProgressBar
					starsAndRatio={starBarsData}
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
