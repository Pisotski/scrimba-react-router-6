import { useLoaderData, useSearchParams } from "react-router-dom";
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

const loader = async ({ request }) => {
	// *********************************************************
	// ************************** pagination and stars filter **
	const url = new URL(request.url);
	const star = url.searchParams.get("star");
	const skip = url.searchParams.get("skip") || 0;
	const limit = url.searchParams.get("limit") || 5;
	// ********************** end pagination and stars filter **
	// *********************************************************

	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	const [{ reviews, totalReviews }, { averageScore }, { starBarsData }] =
		await Promise.all([
			getReviewsForUser({ skip, limit, star }),
			getAverageScore(thirtyDaysAgo),
			getStarBarsData(),
		]);

	return {
		reviews,
		totalReviews,
		starBarsData,
		averageScore,
	};
};

const Reviews = () => {
	const data = useLoaderData();

	const { reviews, totalReviews, starBarsData, averageScore } = data;

	const [searchParams, setSearchParams] = useSearchParams();
	const [reviewsState, setReviewsState] = useState(reviews);

	useEffect(
		() =>
			setSearchParams({
				skip: 0,
				limit: 5,
			}),
		[]
	);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const newReviews = await getReviewsForUser(searchParams);
				setReviewsState(newReviews.reviews);
			} catch (error) {
				console.log(error);
			}
		};

		fetchReviews();
	}, [searchParams]);

	const handleOnProgressBarClick = (e) => {
		e.preventDefault();
		const { star } = e.currentTarget.dataset;
		setSearchParams({ skip: 0, limit: 5, star });
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
				<h3 onClick={handleOnReviewsClick}>Reviews ({totalReviews})</h3>
				<ReviewsList reviews={reviewsState} />
				{/* pagination to be displayed only if there are more than x reviews */}
				{/* store reviews amount in location state */}
				<PaginationButtonsGroup totalNumber={totalReviews} />
			</section>
		</>
	);
};

export { Reviews, loader };
