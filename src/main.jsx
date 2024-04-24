import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { About } from "./components/About.jsx";
import { Home } from "./components/Home.jsx";
import { Vans } from "./components/Vans.jsx";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
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
