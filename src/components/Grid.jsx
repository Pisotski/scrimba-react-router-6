import { NavLink } from "react-router-dom";

const Grid = ({ vans }) => {
	return (
		<div>
			{vans.map(({ id, fields: { name, type } }) => {
				return (
					<NavLink
						to={`${id}`}
						key={id}
						// TODO: Apply loading class later
						// className={({ isActive, isPending }) =>
						// 	isPending ? "pending" : isActive ? "active" : ""
						// }
					>
						<strong>{name}</strong>
						<div>{type}</div>
					</NavLink>
				);
			})}
		</div>
	);
};

export { Grid };
