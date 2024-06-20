import { StarRating } from "./StarRating";
import { monthDDYYYYFormat } from "../../helpers";

const ReviewsList = ({ reviews }) => {
	return (
		<section>
			{reviews.map((review) => {
				const { guestName, date, reviewText, score } = review;
				return (
					<figure key={review._id} className="review-wrapper">
						<StarRating totalStars={score} />
						<figcaption className="review-header">
							<b>{guestName} </b>
							<time dateTime={date}>{monthDDYYYYFormat(date)}</time>
						</figcaption>
						<blockquote className="review-content">{reviewText}</blockquote>
						<hr />
					</figure>
				);
			})}
		</section>
	);
};

export { ReviewsList };
