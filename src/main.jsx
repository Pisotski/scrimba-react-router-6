import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { About } from "./components/About.jsx";
import { Home, action as homeAction } from "./components/Home.jsx";
import { Vans, loader as vansLoader } from "./components/Vans.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import {
	VanDescription,
	loader as vanDescriptionLoader,
} from "./components/VanDescription.jsx";
import { Login, action as loginAction } from "./components/Login.jsx";
import { Register, action as registerAction } from "./components/Register.jsx";
import { Host } from "./components/Host.jsx";
import { Auth, loader as authLoader } from "./components/Auth.jsx";
import { ListedVans } from "./components/ListedVans.jsx";

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
						path: "vans/:vansId",
						element: <VanDescription />,
						loader: vanDescriptionLoader,
					},
					{
						path: "host",
						element: <Host />,
						children: [{ path: ":userId", element: <ListedVans /> }],
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
