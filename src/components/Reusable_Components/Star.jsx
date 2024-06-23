const Star = ({ filledPercentage, size, fillColor, emptyColor }) => {
	const starStyle = {
		display: "inline-block",
		position: "relative",
		width: size,
		height: size,
		color: fillColor,
	};

	const filledStyle = {
		position: "absolute",
		overflow: "hidden",
		width: "50%",
		height: "100%",
		color: emptyColor,
	};

	return (
		<div style={starStyle}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="none"
			>
				<defs>
					<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop
							offset={filledPercentage}
							style={{ stopColor: fillColor, stopOpacity: 1 }}
						/>
						<stop
							offset={filledPercentage}
							style={{ stopColor: emptyColor, stopOpacity: 1 }}
						/>
					</linearGradient>
				</defs>
				<path
					d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z"
					style={{ fill: "url(#grad1)" }}
				/>
			</svg>
			<div style={filledStyle}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="none"
				>
					<path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
				</svg>
			</div>
		</div>
	);
};

Star.defaultProps = {
	filledPercentage: "100%",
	size: "20px",
	fillColor: "orange",
	emptyColor: "lightgray",
};

export { Star };
