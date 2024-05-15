import { NavLink, useLocation } from "react-router-dom";
import { titleCase } from "../../helpers";
import "../../assets/Grid.css";

const Grid = ({ vans, children }) => {
	return (
		<>
			{children}
			<div className="grid">
				{vans.map(({ id, fields: { name, type, price, imageUrl } }) => {
					const path = location.pathname.includes(`host`) ? id : `vans/${id}`;
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
							<div className="grid-name-price">
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
		</>
	);
};

export { Grid };
