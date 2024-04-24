import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "../server.js";

import App from "./App.jsx";
import { About } from "./components/About.jsx";
import { Home } from "./components/Home.jsx";
import { Vans } from "./components/Vans.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/vans",
				element: <Vans />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
