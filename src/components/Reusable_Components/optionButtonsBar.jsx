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

const OptionButtonsBar = ({
	type,
	handleOptionClick,
	handleClearFiltersClick,
}) => {
	return (
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

			<div onClick={handleClearFiltersClick} className="smallest-font">
				Clear filters
			</div>
		</div>
	);
};

export { OptionButtonsBar };
