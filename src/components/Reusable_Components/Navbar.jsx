import { NavLink, useLocation } from "react-router-dom";

const Navbar = ({ links }) => {
	const location = useLocation();
	return (
		<nav>
			{links.map(({ path, label }) => (
				<NavLink
					key={`link-to-${label}-route`}
					to={`${path}`}
					state={location.state}
				>
					{label}
				</NavLink>
			))}
		</nav>
	);
};

export { Navbar };
