import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { About } from "./components/About.jsx";
import { Home } from "./components/Home.jsx";
import { Vans, loader as vansLoader } from "./components/Vans.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import {
	VanDescription,
	loader as vanDescriptionLoader,
} from "./components/VanDescription.jsx";
import { action as homeAction } from "./components/Home.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			// TODO: make home element under index
			{
				index: true,
				element: <Home />,
				action: homeAction,
				errorElement: <ErrorPage />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/vans",
				element: <Vans />,
				loader: vansLoader,
			},
			{
				path: "/vans/:vansId",
				element: <VanDescription />,
				loader: vanDescriptionLoader,
			},
			{
				path: "vans/types/:type",
				element: <Vans />,
				loader: vansLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
