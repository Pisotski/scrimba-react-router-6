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

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
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
				//FIXME: redo routes. no need to have Grid separately. Just /vans:id
				// useEffect on click. remake the grid. i don't think react router covers this scenario
				path: "/vans",
				element: <Vans />,
				loader: vansLoader,
			},
			{
				path: "/vans/:vansId",
				element: <VanDescription />,
				loader: vanDescriptionLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
