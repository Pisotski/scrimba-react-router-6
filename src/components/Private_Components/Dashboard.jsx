import { Grid } from "../Reusable_Components/Grid.jsx";
import { getVansByUser } from "../../controllers";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import "../../assets/Dashboard.css";

const loader = async ({ params }) => {
	const { userId } = params;
	const data = await getVansByUser(userId, 3);
	return data.records;
};

const Dashboard = () => {
	const income = 1234;
	const score = 5;
	const vansShort = useLoaderData();

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
				<Grid vans={vansShort} fromDashboard={true}>
					<div className="space-between">
						<h2>Your listed vans</h2>
						<span className="smallest-font">
							<Link to="vans" state={{ header: "Your listed vans" }}>
								View all
							</Link>
						</span>
					</div>
				</Grid>
			</section>
		</div>
	);
};

export { Dashboard, loader };
