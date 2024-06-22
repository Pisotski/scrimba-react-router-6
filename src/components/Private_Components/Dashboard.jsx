import { VansSnippetsList } from "../Reusable_Components/VansSnippetsList.jsx";
import {
	getAllVansForUser,
	getIncome,
	getAverageScore,
} from "../../controllers";
import { useLoaderData, Link } from "react-router-dom";
import "../../assets/Dashboard.css";

const loader = async () => {
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
		<div className="wrapper-dashboard">
			<section className="wrapper-dashboard-welcome">
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
					<span className="dashboard-review-left">
						<h3>Review score {score.averageScore}/5</h3>
					</span>
					<Link to="reviews">
						<span className="smallest-font">Details</span>
					</Link>
				</div>
			</section>
			<section className="dashboard-vans-snippets">
				<div className="space-between">
					<header>
						<h3>Your listed vans</h3>
					</header>
					<Link to="vans">
						<span className="smallest-font">View all</span>
					</Link>
				</div>
				<VansSnippetsList vans={vansListPreview}></VansSnippetsList>
			</section>
		</div>
	);
};

export { Dashboard, loader };
