import { getIncomeLast4Months } from "../../controllers";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../assets/Income.css";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		y: {
			beginAtZero: true,
			barThickness: 5,
			maxBarThickness: 5,
		},
		x: {
			barThickness: 5,
			maxBarThickness: 5,
			categoryPercentage: 0.4,
		},
	},
};

const loader = async ({ params }) => {
	const data = await getIncomeLast4Months();
	return data.income;
};

const Income = () => {
	const income = useLoaderData();
	const labels = Object.keys(income);
	console.log(income);
	const data = {
		labels,
		datasets: [
			{
				data: Object.values(income).map((inc) =>
					inc.reduce(
						(accumulator, currentValue) => accumulator + currentValue,
						0
					)
				),
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};
	return (
		<div style={{ width: "100%", height: "300px" }}>
			<Bar data={data} options={options} />
		</div>
	);
};

export { Income, loader };
