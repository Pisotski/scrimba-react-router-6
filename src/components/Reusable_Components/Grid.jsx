import { NavLink, useLocation } from "react-router-dom";
import { titleCase } from "../../helpers";

const Grid = ({ vans, children }) => {
	const location = useLocation();
	return (
		<>
			{children}
			<div className="grid">
				{vans.map(({ _id, name, type, price, imageUrl }) => {
					return (
						<NavLink
							to={`${_id}`}
							key={_id}
							// TODO: Apply loading class
							//
							// className={({ isActive, isPending }) =>
							// 	isPending ? "pending" : isActive ? "active" : ""
							// }
							className="grid-item"
						>
							<img src={imageUrl}></img>
							<div className="space-between">
								<div className="grid-item-name">{name}</div>
								<div className="grid-item-price">
									<div>${price}</div>
									<div>
										<i className="smallest-font">/day</i>
									</div>
								</div>
							</div>
							<button className={`option-button grid-button ${type}`}>
								{titleCase(type)}
							</button>
						</NavLink>
					);
				})}
			</div>
		</>
	);
};

export { Grid };
