import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { populateIncomeTab, getIncomeThisYear } from "../../helpers";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/Income.css";
const loader = async ({ params }) => {
	const data = await getIncomeThisYear();
	// const { userId } = params;
	// populateIncomeTab(userId);
	return data;
};

const Income = () => {
	const { incomeChart, dataForGraph, months, transactionsChart } =
		useLoaderData();
	const tickValues = Array.from(
		{ length: dataForGraph.length },
		(_, index) => index + 1
	);
	const lastMonth = months[months.length - 1];
	const earningsLastMonth = incomeChart[lastMonth];
	const [selectedMonths, setSelectedMonths] = useState([lastMonth]);
	const [earningsSelected, setEarningsSelected] = useState(earningsLastMonth);
	const [transactionsSelected, setTransactionsSelected] = useState(
		transactionsChart[selectedMonths]
	);
	const handleClick = ({ month, earnings }) => {
		setSelectedMonths([month]);
		setEarningsSelected(earnings);
		setTransactionsSelected(transactionsChart[month]);
	};

	return (
		<div className="wrapper income">
			<h2>Income:</h2>
			<h5>
				Last <u>30 days</u>
			</h5>
			<h1>${earningsSelected}</h1>

			<VictoryChart
				theme={VictoryTheme.material}
				domainPadding={50}
				padding={{ bottom: 50 }}
				min-width={500}
				max-width={500}
				min-height={500}
				max-height={500}
			>
				<VictoryAxis
					tickValues={tickValues}
					tickFormat={months.map((month) => month.slice(0, 2))}
					style={{
						tickLabels: { fontSize: 24 },
					}}
				/>
				<VictoryAxis
					dependentAxis
					tickFormat={(x) => `$${x / 1000}k`}
					style={{
						tickLabels: { fontSize: 20 },
					}}
				/>
				<VictoryBar
					barWidth={50}
					data={dataForGraph}
					x="month"
					y="earnings"
					style={{
						data: {
							fill: ({ datum, index }) =>
								selectedMonths.includes(datum.month)
									? "var(--bright-orange)"
									: "var(--bright-orange-fade)",
						},
					}}
					cornerRadius={{ topLeft: 5, topRight: 5 }}
					events={[
						{
							target: "data",
							eventHandlers: {
								onClick: () => {
									return [
										{
											target: "data",
											mutation: (props) => {
												handleClick(props.datum);
											},
										},
									];
								},
							},
						},
					]}
				/>
			</VictoryChart>
			<div className="wrapper transaction">
				<h3>Your transactions ({transactionsSelected.length})</h3>
				<h5>
					Last <u>30 days</u>
				</h5>
				{transactionsSelected.map((transactions) => {
					return (
						<div key={transactions[0]} className="wrapper transaction-date">
							<div>${transactions[0].reduce((memo, el) => memo + el, 0)}</div>
							<div>{transactions[1]}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { Income, loader };
