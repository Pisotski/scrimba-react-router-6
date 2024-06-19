import { StarRating } from "./StarRating";
import { monthDDYYYYFormat } from "../../helpers";

const ReviewsList = ({ reviews }) => {
	return (
		<section>
			{reviews.map((review) => {
				const { guestName, date, reviewText, score } = review;
				return (
					<figure key={review._id}>
						<StarRating totalStars={score} />
						<figcaption>
							<b>{guestName} </b>
							<time dateTime={date}>{monthDDYYYYFormat(date)}</time>
						</figcaption>
						<blockquote>{reviewText}</blockquote>
						<div className="horizontal-line">___________</div>
					</figure>
				);
			})}
		</section>
	);
};

export { ReviewsList };
