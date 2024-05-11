import { titleCase } from "../../helpers";
const categories = [
	{
		option: "simple",
		id: 1,
	},
	{
		option: "luxury",
		id: 2,
	},
	{
		option: "rugged",
		id: 3,
	},
];

const VansHeading = ({
	isPrivate,
	type,
	handleOptionClick,
	handleClearFiltersClick,
}) => {
	const label = isPrivate ? "Your listed vans" : "Explore our van options";
	return (
		<section>
			<h2>{label}</h2>
			{!isPrivate && (
				<div className="option-bar">
					<div className="vans-options-wrapper">
						{categories.map(({ option, id }) => (
							<button
								key={id}
								className={`option-button ${type === option ? option : ""}`}
								onClick={handleOptionClick}
							>
								{titleCase(option)}
							</button>
						))}
					</div>

					<div onClick={handleClearFiltersClick}>Clear filters</div>
				</div>
			)}
		</section>
	);
};

export { VansHeading };
