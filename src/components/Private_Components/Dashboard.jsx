import { VansSnippetsList } from "../Reusable_Components/VansSnippetsList.jsx";
import {
	getAllVansForUser,
	getIncome,
	getAverageScore,
} from "../../controllers";
import { useLoaderData, Link } from "react-router-dom";
import "../../assets/Dashboard.css";

const loader = async ({ params }) => {
	const { userId } = params;
	const [vansListPreview, income, score] = await Promise.all([
		getAllVansForUser(3),
		getIncome(),
		getAverageScore(),
	]);
	const incomeTotal = income.incomeLast30Days.reduce((total, transaction) => {
		return total + transaction.transactionAmount;
	}, 0);

	return [vansListPreview || [], incomeTotal, score || "no score yet"];
};

const Dashboard = () => {
	const [vansListPreview, income, score] = useLoaderData();

	return (
		<div className="wrapper dashboard">
			<section className="wrapper welcome">
				<h2>Welcome!</h2>
				<div className="space-between">
					<div className="smallest-font">income last 30 days</div>
					<Link to="income">
						<span className="smallest-font">Details</span>
					</Link>
				</div>
				<h1>${income}</h1>
			</section>
			<section className="dashboard-review">
				<div className="space-between">
					<strong>Review score</strong>
					<span>
						<strong>{score.averageScore}</strong>/5
					</span>
					<Link to="reviews">
						<span className="smallest-font">Details</span>
					</Link>
				</div>
			</section>
			<section>
				<VansSnippetsList vans={vansListPreview}></VansSnippetsList>
			</section>
		</div>
	);
};

export { Dashboard, loader };
