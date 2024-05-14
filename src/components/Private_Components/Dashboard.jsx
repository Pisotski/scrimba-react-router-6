import { Grid } from "../Vans/Grid.jsx";
import { getVansByUser } from "../../helpers.js";
import { useLoaderData, useLocation } from "react-router-dom";
import { VansHeading } from "../Vans/VansHeading.jsx";
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
			<section>
				<h3>Welcome</h3>
				<div>
					<h6>income last 30 days</h6>
					<h6>Details</h6>
				</div>
				<h2>${income}</h2>
			</section>
			<section>
				<strong>Review score</strong>
				<span>
					<span>
						<strong>${score}</strong>/5
					</span>
					<span>Details</span>
				</span>
			</section>
			<section>
				<VansHeading isPrivate={true} />
				<Grid vans={vansShort} fromDashboard={true} />
			</section>
		</div>
	);
};

export { Dashboard, loader };
