import { Link } from "react-router-dom";

const Navbar = ({ links }) => {
	return (
		<nav>
			{links.map(({ path, label }) => (
				<Link key={`link-to-${label}-route`} to={`/${path}`}>
					{label}
				</Link>
			))}
		</nav>
	);
};

export { Navbar };
