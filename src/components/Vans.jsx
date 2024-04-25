import { useState } from "react";
import { Grid } from "./Grid";
import("../assets/Vans.css");

const Vans = () => {
	const categories = [
		{
			option: "Simple",
			id: 1,
		},
		{
			option: "Luxury",
			id: 2,
		},
		{
			option: "Rugged",
			id: 3,
		},
	];
	return (
		<>
			<div className="vans wrapper">
				<section>
					<h2>Explore our van options</h2>
					<div className="option-bar">
						<div className="vans-options-wrapper">
							{categories.map(({ option, id }) => (
								<div key={id} className="vans-options">
									{option}
								</div>
							))}
						</div>
						<div className="clear-filters">Clear filters</div>
					</div>
				</section>
				<section>
					<Grid />
				</section>
			</div>
		</>
	);
};

export { Vans };
