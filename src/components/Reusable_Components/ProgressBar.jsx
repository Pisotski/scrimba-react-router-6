const ProgressBar = ({ starsAndRatio, onClick }) => {
	return (
		<>
			{Object.keys(starsAndRatio)
				.reverse()
				.map((star) => (
					<div
						className="reviews-bars-body"
						key={`starsBar${star}`}
						onClick={onClick}
						data-star={star}
					>
						<span>
							{star} {star === "1" ? "star" : "stars"}
						</span>
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
