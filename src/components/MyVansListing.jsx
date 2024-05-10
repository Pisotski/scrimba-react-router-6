import "../assets/MyVansListing.css";
import { Link } from "react-router-dom";

const MyVansListing = ({ vanInfo: { imageUrl, name, price, id } }) => {
	return (
		<Link to={`myVans/${id}`} className="van-listing wrapper">
			<img src={imageUrl} />
			<div>
				<strong>{name}</strong>
				<div>${price}/day</div>
			</div>
		</Link>
	);
};

export { MyVansListing };
