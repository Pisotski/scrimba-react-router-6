import { useLoaderData, useLocation, Link } from "react-router-dom";
import { getAllVansForUser } from "../../controllers";
import "../../assets/VansSnippetsList.css";

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
				>
					<div className="snippet">
						<figure className="image-container">
							<img src={imageUrl} />
						</figure>
						<div className="snippet-content">
							<div>
								<div className="snippet-name">{name}</div>
								<b>{price}</b>
								/day
							</div>
							{!isVansTab ? <div>edit</div> : null}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export { VansSnippetsList, loader };
