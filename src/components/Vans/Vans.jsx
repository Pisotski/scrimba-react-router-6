import { useState, useEffect } from "react";
import { useLoaderData, useSearchParams, useLocation } from "react-router-dom";
import { Grid } from "./Grid";
import { getAllVans, postVans, titleCase } from "../../helpers";
import { VansHeading } from "./VansHeading";
import("../../assets/Vans.css");

// to push more vans to db
// import { vansDataNoId } from "../../../mockData";
// vansDataNoId.map((van) => postVans({ fields: van }));

const loader = async ({ params, request }) => {
	const data = await getAllVans();
	const { userId } = params;
	const url = new URL(request.url);
	const type = url.searchParams.get("filter");
	return { records: data.records, type, userId };
};

const Vans = ({ data }) => {
	const { records, type, userId } = useLoaderData();
	const vansData = records || data || [];
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const isPrivate = location.state?.from
		? location.state.from.includes(`host`)
		: false;

	const filteredVans = (filterBy) =>
		vansData.filter((van) => filterBy === van.fields.type);
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
			<div className="vans wrapper">
				<VansHeading
					isPrivate={isPrivate}
					type={type}
					handleOptionClick={handleOptionClick}
					handleClearFiltersClick={handleClearFiltersClick}
				/>
				{/* the grid fades away after user clicked on chosen van */}
				<section className={`grid-section`}>
					<Grid isPrivate={isPrivate} vans={vans} />
				</section>
			</div>
		</>
	);
};

export { Vans, loader };
