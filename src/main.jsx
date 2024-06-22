import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "normalize.css";

import App from "./App.jsx";
import { About } from "./components/Public_Components/About.jsx";
import {
	Home,
	action as homeAction,
} from "./components/Public_Components/Home.jsx";
import {
	Vans,
	loader as vansLoader,
} from "./components/Public_Components/Vans.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import {
	VanDescription,
	loader as vanDescriptionLoader,
} from "./components/Reusable_Components/VanDescription.jsx";
import { Auth, loader as authLoader } from "./components/Auth/Auth.jsx";
import { Login, action as loginAction } from "./components/Auth/Login.jsx";
import { loader as logoutLoader } from "./components/Auth/Logout.jsx";
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
import {
	VanDetails,
	action as vanDetailsAction,
} from "./components/Private_Components/VanDetails.jsx";
import {
	VanPricing,
	action as vanPricingAction,
} from "./components/Private_Components/VanPricing.jsx";
import {
	VanPhotos,
	loader as vanPhotosLoader,
} from "./components/Private_Components/VanPhotos.jsx";
import {
	Income,
	loader as incomeLoader,
} from "./components/Private_Components/Income.jsx";
import {
	Reviews,
	loader as reviewsLoader,
} from "./components/Private_Components/Reviews.jsx";
import {
	VansSnippetsList,
	loader as vansSnippetsListLoader,
} from "./components/Reusable_Components/VansSnippetsList.jsx";
import {
	AddVan,
	action as addVanAction,
} from "./components/Private_Components/AddVan.jsx";

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
							{ path: "logout", loader: logoutLoader },
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
					// Private routes
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
								element: <VansSnippetsList />,
								loader: vansSnippetsListLoader,
							},
							{
								path: ":userId/vans/:vanId",
								element: <VanDescription />,
								loader: vanDescriptionLoader,
								children: [
									{
										index: true,
										path: "*",
										element: <VanDetails />,
										action: vanDetailsAction,
									},
									{
										path: "pricing",
										element: <VanPricing />,
										action: vanPricingAction,
									},
									{
										path: "photos",
										element: <VanPhotos />,
										loader: vanPhotosLoader,
									},
								],
							},
							{
								path: ":userId/income",
								element: <Income />,
								loader: incomeLoader,
							},
							{
								path: ":userId/reviews",
								element: <Reviews />,
								loader: reviewsLoader,
							},
							{
								path: ":userId/vans/addVan",
								element: <AddVan />,
								action: addVanAction,
							},
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
