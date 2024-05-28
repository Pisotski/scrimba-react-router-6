import { StarRating } from "./StarRating";

const ReviewsList = ({ reviews }) => {
	return (
		<section>
			{reviews.map((review) => {
				const { guestName, date, reviewText, score } = review.fields;
				return (
					<figure key={review.id}>
						<StarRating totalStars={score} />
						<figcaption>
							<b>{guestName} </b>
							{/* TODO: when making DB do
							<time datetime={dateTime}>{date}</time> instead */}
							<i className="grey-text">{date}:</i>
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
