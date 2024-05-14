import { Link, Outlet } from "react-router-dom";
import { Navbar } from "./components/Reusable_Components/Navbar";

import "./App.css";

function App() {
	const links = [
		{
			path: "auth",
			label: "Host",
		},
		{
			path: "about",
			label: "About",
		},
		{
			path: "vans",
			label: "Vans",
		},
	];
	return (
		<>
			<div className="app-wrapper">
				<Link to="/">
					<h1>
						<strong>#VANLIFE</strong>
					</h1>
				</Link>
				<Navbar links={links} />
				<Outlet />
				<footer>
					<span>&#169; 2024 #VANLIFE</span>
				</footer>
			</div>
		</>
	);
}

export default App;
