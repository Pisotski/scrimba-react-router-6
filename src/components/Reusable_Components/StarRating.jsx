import "../../assets/StarRating.css";

const StarRating = ({ totalStars = 5 }) => {
	return (
		<div className="star-rating">
			{[...Array(totalStars)].map((star, index) => {
				const ratingValue = index + 1;

				return (
					<label key={index}>
						<input type="radio" name="rating" value={ratingValue} />
						<svg
							className="star"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="orange"
						>
							<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.404 8.182L12 18.897l-7.338 3.862 1.404-8.182-5.934-5.788 8.2-1.192z" />
						</svg>
					</label>
				);
			})}
		</div>
	);
};

export { StarRating };
