import { useEffect, useState } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";

const Grid = ({ vans }) => {
	return (
		<div>
			{vans.map((van) => {
				return (
					<NavLink
						to={`${van.id}`}
						key={van.id}
						// TODO: Apply loading class later
						// className={({ isActive, isPending }) =>
						// 	isPending ? "pending" : isActive ? "active" : ""
						// }
					>
						<strong>{van.name}</strong>
						<div>{van.type}</div>
					</NavLink>
				);
			})}
		</div>
	);
};

export { Grid };
