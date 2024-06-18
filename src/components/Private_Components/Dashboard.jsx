import { VansSnippetsList } from "../Reusable_Components/VansSnippetsList.jsx";
import { getAllVansForUser, getIncome } from "../../controllers";
import { useLoaderData } from "react-router-dom";
import "../../assets/Dashboard.css";

const loader = async ({ params }) => {
	const { userId } = params;
	const [vansListPreview, income] = await Promise.all([
		getAllVansForUser(3),
		getIncome(),
	]);
	const incomeTotal = income.incomeLast30Days.reduce((total, transaction) => {
		return total + transaction.transactionAmount;
	}, 0);

	return [vansListPreview || [], incomeTotal];
};

const Dashboard = () => {
	const score = 5;
	const [vansListPreview, income] = useLoaderData();

	return (
		<div className="wrapper dashboard">
			<section className="wrapper welcome">
				<h2>Welcome!</h2>
				<div className="space-between">
					<div className="smallest-font">income last 30 days</div>
					<span className="smallest-font">Details</span>
				</div>
				<h1>${income}</h1>
			</section>
			<section className="dashboard-review">
				<div className="space-between">
					<div>
						<strong>Review score</strong>
						<span>
							<strong>{score}</strong>/5
						</span>
					</div>
					<span className="smallest-font">Details</span>
				</div>
			</section>
			<section>
				<VansSnippetsList vans={vansListPreview}></VansSnippetsList>
			</section>
		</div>
	);
};

export { Dashboard, loader };
