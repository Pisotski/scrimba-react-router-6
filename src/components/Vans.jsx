import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Grid } from "./Grid";
import { getAllVans, postVans } from "../helpers";
import("../assets/Vans.css");

// to push more vans to db
// import { vansData } from "../../mockData";
// vansData.map((van) => postVans({ fields: van }));

const loader = async ({ params, request }) => {
	const data = await getAllVans();

	const url = new URL(request.url);
	const q = url.searchParams.get("filter");
	return [data.records, q];
};

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

const Vans = () => {
	const [data, q] = useLoaderData();
	const navigate = useNavigate();

	const filteredVans = (filterBy) =>
		data.filter((van) => filterBy === van.fields.type);
	const [vans, setVans] = useState(q !== null ? filteredVans(q) : data);
	let [searchParams, setSearchParams] = useSearchParams();

	const handleOptionClick = (e) => {
		e.preventDefault();
		setSearchParams({ filter: e.target.innerHTML });
		// navigate(`?filter=${e.target.innerHTML}`);
	};

	useEffect(() => console.log("hi"), [searchParams]);

	const handleClearFiltersClick = (e) => {
		setVans(data);
	};

	return (
		<>
			<div className="vans wrapper">
				<section>
					<h2>Explore our van options</h2>
					<div className="option-bar">
						<div className="vans-options-wrapper">
							{categories.map(({ option, id }) => (
								<div
									key={id}
									className="vans-options"
									onClick={handleOptionClick}
								>
									{option}
								</div>
							))}
						</div>
						<div className="clear-filters" onClick={handleClearFiltersClick}>
							Clear filters
						</div>
					</div>
				</section>
				{/* the grid fades away after user clicked on chosen van */}
				<section className={navigation.state === "loading" ? "loading" : ""}>
					<Grid vans={vans} />
				</section>
			</div>
		</>
	);
};

export { Vans, loader };
