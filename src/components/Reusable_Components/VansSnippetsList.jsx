import { useLoaderData, useLocation, Link } from "react-router-dom";
import { getAllVans } from "../../controllers";
import "../../assets/VansSnippetsList.css";
//
const loader = async (params) => {
	// load all vans for current user
	const { userId } = params;
	const data = await getAllVans();
	return data.records;
};

const VansSnippetsList = ({ vansListPreview }) => {
	const vansList = vansListPreview || useLoaderData();
	const location = useLocation();
	// use data from props if data provided
	// otherwise use data from loader
	// display a list of vans with short description
	// each snippet should have a link to corresponding van

	return (
		<div className="list">
			{vansList.map(({ id, fields: { name, imageUrl, price } }) => (
				<Link
					to={location.pathname.includes("vans") ? id : `vans/${id}`}
					key={id}
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
