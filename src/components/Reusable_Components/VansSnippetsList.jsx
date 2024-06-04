import { useLoaderData, useLocation, Link } from "react-router-dom";
import { getAllVansForUser } from "../../controllers";
import "../../assets/VansSnippetsList.css";

const loader = async () => {
	const vans = await getAllVansForUser();
	return vans;
};

const VansSnippetsList = ({ vansListPreview }) => {
	const vansList = vansListPreview || useLoaderData();
	const location = useLocation();
	return (
		<div className="list">
			{vansList.map(({ _id, name, imageUrl, price }) => (
				<Link
					to={location.pathname.includes("vans") ? _id : `vans/${_id}`}
					key={_id}
					state={{ from: location }}
				>
					<div className="snippet">
						<figure className="image-container">
							<img src={imageUrl} />
						</figure>
						<h2>{name}</h2>
						<div>
							<strong>{price}</strong>
							<span>/day</span>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export { VansSnippetsList, loader };
