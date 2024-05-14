import { NavLink } from "react-router-dom";
import { titleCase } from "../../helpers";
import "../../assets/Grid.css";

const Grid = ({ vans, fromDashboard }) => {
	return (
		<div className="grid">
			{vans.map(({ id, fields: { name, type, price, imageUrl } }) => {
				const path = fromDashboard ? `vans/${id}` : id;
				return (
					<NavLink
						to={path}
						key={id}
						// TODO: Apply loading class
						//
						// className={({ isActive, isPending }) =>
						// 	isPending ? "pending" : isActive ? "active" : ""
						// }
					>
						<img src={imageUrl}></img>
						<div className="grid-van-details">
							<div>
								<strong>{name}</strong>
								<strong>${price}</strong>
							</div>
							<div>
								<button className={`option-button grid-button ${type}`}>
									{titleCase(type)}
								</button>
								<span>/day</span>
							</div>
						</div>
					</NavLink>
				);
			})}
		</div>
	);
};

export { Grid };
