import { useLoaderData, useLocation, Link } from "react-router-dom";
import { getAllVansForUser } from "../../controllers";

const loader = async () => {
	const vans = await getAllVansForUser();
	return vans;
};

const VansSnippetsList = ({ vans }) => {
	const vansList = vans || useLoaderData();
	const location = useLocation();
	const isVansTab = location.pathname.includes("vans");

	return (
		<div className="vans-snippets-wrapper">
			{vansList.map(({ _id, name, imageUrl, price }) => (
				<Link
					to={isVansTab ? _id : `vans/${_id}`}
					key={_id}
					state={{ from: location }}
					className="van-snippet"
				>
					<figure className="image-container">
						<img src={imageUrl} />
					</figure>
					<div className="snippet-content">
						<div>
							<div className="snippet-name">{name}</div>
							<div className="snipper-price">{price}/day</div>
						</div>
						<div className="smallest-font">edit</div>
					</div>
				</Link>
			))}
			<Link
				to={isVansTab ? `addVan` : `vans/addVan`}
				className="add-button-wrapper"
			>
				<button className="button tall wide">Add van</button>
			</Link>
		</div>
	);
};

export { VansSnippetsList, loader };
