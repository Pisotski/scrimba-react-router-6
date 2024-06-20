import { useState, useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Grid } from "../Reusable_Components/Grid";
import { getAllVans } from "../../controllers";
import { OptionButtonsBar } from "../Reusable_Components/OptionButtonsBar";
import("../../assets/Vans.css");

// to push more vans to airtable
// import { vansDataNoId } from "../../../mockData";
// vansDataNoId.map((van) => postVans({ fields: van }));

const loader = async ({ params, request }) => {
	const { allVans } = await getAllVans();
	const { userId } = params;
	const url = new URL(request.url);
	const type = url.searchParams.get("filter");
	return { allVans, type, userId };
};

const Vans = ({ data }) => {
	const { allVans, type } = useLoaderData();

	const [searchParams, setSearchParams] = useSearchParams();
	const vansData = allVans || data || [];

	const filteredVans = (filterBy) =>
		vansData.filter((van) => filterBy === van.type);

	const [vans, setVans] = useState(
		type !== null || undefined ? filteredVans(type) : vansData
	);

	useEffect(
		() => (type !== null ? setVans(filteredVans(type)) : setVans(vansData)),
		[searchParams]
	);

	const handleOptionClick = (e) => {
		e.preventDefault();
		const filter = e.target.innerHTML.toLowerCase();
		setSearchParams({ filter });
	};
	const handleClearFiltersClick = (e) => {
		setSearchParams("");
	};

	return (
		<>
			<Grid vans={vans}>
				<div className="vans-header">Explore our van options</div>
				<OptionButtonsBar
					type={type}
					handleOptionClick={handleOptionClick}
					handleClearFiltersClick={handleClearFiltersClick}
				/>
			</Grid>
		</>
	);
};

export { Vans, loader };
