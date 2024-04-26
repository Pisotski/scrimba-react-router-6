import { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Grid } from "./Grid";
import("../assets/Vans.css");
const url = "api/vans";

const loader = async () => {
	try {
		const result = await fetch(url);
		const response = await result.json();
		return response.vans;
	} catch (err) {
		console.log(err);
	}
};

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

const Vans = () => {
	const data = useLoaderData();

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
					<Grid vans={data} />
				</section>
			</div>
		</>
	);
};

export { Vans, loader };
