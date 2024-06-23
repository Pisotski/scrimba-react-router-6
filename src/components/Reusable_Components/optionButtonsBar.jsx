import { titleCase } from "../../helpers";
const categories = ["simple", "luxury", "rugged"];

const OptionButtonsBar = ({
	type,
	handleOptionClick,
	handleClearFiltersClick,
}) => {
	return (
		<div className="options-bar">
			<div className="vans-options-wrapper">
				{categories.map((option) => (
					<button
						key={option}
						className={`option-button ${type === option ? option : ""}`}
						onClick={handleOptionClick}
					>
						{titleCase(option)}
					</button>
				))}
			</div>

			<div className="clear-filters" onClick={handleClearFiltersClick}>
				<u>Clear filters</u>
			</div>
		</div>
	);
};

export { OptionButtonsBar };
