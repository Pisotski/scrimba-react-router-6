import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./App.css";

function App() {
	return (
		<>
			<nav id="navbar-1">
				<Link to="/">
					<h1>#VANSLIFE</h1>
				</Link>
				<span id="navbar-2">
					<Link to="/about">About</Link>
					<Link to="/vans">Vans</Link>
				</span>
			</nav>
			<Outlet />
			<footer>
				<span>vanslife 2024</span>
			</footer>
		</>
	);
}

export default App;
