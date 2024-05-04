import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./App.css";

function App() {
	return (
		<>
			<div className="app-wrapper">
				<nav id="navbar-1">
					{/* // TODO: Apply loading class
						// when current tab is active apply pink color to it and grey? transparent padding
						// className={({ isActive, isPending }) =>
						// 	isPending ? "pending" : isActive ? "active" : ""
						// } */}
					<Link to="/">
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
