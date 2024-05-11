import { useState, useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
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
	const isPrivate = !!userId;
	const vansData = records || data || [];

	const filteredVans = (filterBy) =>
		vansData.filter((van) => filterBy === van.fields.type);

	const [vans, setVans] = useState(
		type !== null || undefined ? filteredVans(type) : vansData
	);
	const [searchParams, setSearchParams] = useSearchParams();

	const handleOptionClick = (e) => {
		e.preventDefault();
		const filter = e.target.innerHTML.toLowerCase();
		setSearchParams({ filter });
	};

	useEffect(
		() => (type !== null ? setVans(filteredVans(type)) : setVans(vansData)),
		[searchParams]
	);
	console.log(searchParams);

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
