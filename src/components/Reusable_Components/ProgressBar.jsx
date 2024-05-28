import { Fragment } from "react";
import "../../assets/ProgressBar.css";

const ProgressBar = ({ starsAndRatio, onClick }) => {
	return (
		<>
			{Object.keys(starsAndRatio).map((star) => (
				<div
					className="reviews-bars-body"
					key={`starsBar${star}`}
					onClick={onClick}
					data-star={star}
				>
					<span>{star}</span>
					<div className="progress-bar">
						<div
							className="progress-bar__fill"
							style={{ width: `${starsAndRatio[star]}%` }}
						></div>
					</div>
					{starsAndRatio[star]}
				</div>
			))}
		</>
	);
};

export { ProgressBar };
