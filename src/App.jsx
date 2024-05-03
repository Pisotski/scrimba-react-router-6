import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./App.css";

function App() {
	// TODO: when component is mounted redirect to /home
	return (
		<>
			<div className="app-wrapper">
				<nav id="navbar-1">
					<Link to="/home">
						<h1>#VANLIFE</h1>
					</Link>
					<span id="navbar-2">
						<Link to="/about">About</Link>
						<Link to="/vans">Vans</Link>
					</span>
				</nav>
				<Outlet />
				<footer>
					<span>VANLIFE 2024</span>
				</footer>
			</div>
		</>
	);
}

export default App;
