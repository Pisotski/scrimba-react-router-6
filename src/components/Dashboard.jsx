import { MyVans } from "./MyVans.jsx";
import "../assets/Dashboard.css";

const Dashboard = () => {
	const income = 1234;
	const score = 5;
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
				<MyVans />
			</section>
		</div>
	);
};

export { Dashboard };
