import { getIncome } from "../../controllers";
import { MMDDYYFormat } from "../../helpers";

import { useLoaderData } from "react-router-dom";
import { useState, useRef } from "react";
import "../../assets/Income.css";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
const mango = "rgb(255,140,56)";
const peach = "rgb(255,234,208)";
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
	const data = await getIncome();
	return data;
};

const Income = () => {
	const { incomeLast30Days, incomeLast4Months } = useLoaderData();
	const [incomeToDisplay, setIncomeToDisplay] = useState(incomeLast30Days);
	const [backgroundColor, setBackgroundColor] = useState([
		peach,
		peach,
		mango,
		mango,
	]);
	const chartRef = useRef(null);

	const handleBarClick = (event) => {
		const element = getElementsAtEvent(chartRef.current, event);
		if (element.length) {
			const dataPoint = element[0].index;
			const month = data.labels[dataPoint];
			setBackgroundColor(
				backgroundColor.map((color, index) => {
					if (index === dataPoint) return mango;
					return peach;
				})
			);
			setIncomeToDisplay(incomeLast4Months[month]);
		}
	};
	const data = {
		labels: Object.keys(incomeLast4Months),
		datasets: [
			{
				data: Object.values(incomeLast4Months).map((transactions) =>
					transactions.reduce(
						(total, currentTransaction) =>
							total + currentTransaction.transactionAmount,
						0
					)
				),
				backgroundColor,
			},
		],
	};

	return (
		// FIXME: remove inline styling
		<>
			<section style={{ width: "100%", height: "300px" }}>
				<Bar
					data={data}
					options={options}
					ref={chartRef}
					onClick={handleBarClick}
				/>
			</section>
			<section>
				<ul>
					<label>
						Your transactions ({incomeToDisplay.length})
						<span>last 30 days</span>{" "}
					</label>
					{incomeToDisplay.map((transaction) => (
						<li key={transaction._id}>
							<span>${transaction.transactionAmount}</span>
							<span>{MMDDYYFormat(transaction.date)}</span>
						</li>
					))}
				</ul>
			</section>
		</>
	);
};

export { Income, loader };
