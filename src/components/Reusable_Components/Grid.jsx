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
							className="grid-item"
						>
							<img src={imageUrl}></img>
							<strong className="grid-item-name">{name}</strong>
							<strong className="grid-item-price">
								${price}
								<i className="smallest-font">/day</i>
							</strong>
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
