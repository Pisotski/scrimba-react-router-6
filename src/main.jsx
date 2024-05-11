import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { About } from "./components/Public_Components/About.jsx";
import {
	Home,
	action as homeAction,
} from "./components/Public_Components/Home.jsx";
import { Vans, loader as vansLoader } from "./components/Vans/Vans.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import {
	VanDescription,
	loader as vanDescriptionLoader,
} from "./components/Vans/VanDescription.jsx";
import { Auth, loader as authLoader } from "./components/Auth/Auth.jsx";
import { Login, action as loginAction } from "./components/Auth/Login.jsx";
import {
	Register,
	action as registerAction,
} from "./components/Auth/Register.jsx";
import {
	Host,
	loader as hostLoader,
} from "./components/Private_Components/Host.jsx";
import {
	Dashboard,
	loader as dashboardLoader,
} from "./components/Private_Components/Dashboard.jsx";
import { Income } from "./components/Private_Components/Income.jsx";
import { Reviews } from "./components/Private_Components/Reviews.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Home />,
						action: homeAction,
					},
					{
						path: "auth",
						element: <Auth />,
						loader: authLoader,
						children: [
							{
								index: true,
								element: <Login />,
								action: loginAction,
							},
							{
								path: "register",
								element: <Register />,
								action: registerAction,
							},
						],
					},
					{
						path: "vans",
						element: <Vans />,
						loader: vansLoader,
					},
					{
						path: "vans/:vanId",
						element: <VanDescription />,
						loader: vanDescriptionLoader,
					},
					{
						path: "host",
						element: <Host />,
						loader: hostLoader,
						children: [
							{
								path: ":userId",
								element: <Dashboard />,
								loader: dashboardLoader,
							},
							{
								path: ":userId/vans",
								element: <Vans />,
								loader: vansLoader,
							},
							{
								path: ":userId/vans/:vanId",
								element: <VanDescription />,
								loader: vanDescriptionLoader,
							},
							{ path: ":userId/income", element: <Income /> },
							{ path: ":userId/reviews", element: <Reviews /> },
						],
					},
				],
			},
		],
	},
	{
		path: "/about",
		element: <About />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
