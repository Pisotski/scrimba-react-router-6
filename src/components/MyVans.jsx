import { Link } from "react-router-dom";
import { myVansData } from "../../mockData.js";
import { MyVansListing } from "./MyVansListing.jsx";

const MyVans = () => {
	//TODO: useLocation. if location is Dashboard = display View All
	const isDashboard = true;
	return (
		<div className="wrapper">
			<div>Your listed vans</div>
			{isDashboard && (
				<Link to="myVans">
					<span>View all Vans</span>
				</Link>
			)}
			<div className="wrapper">
				{myVansData.map((el) => (
					<MyVansListing key={el.id} vanInfo={el} />
				))}
			</div>
		</div>
	);
};

export { MyVans };
