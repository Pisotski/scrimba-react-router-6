import { useLoaderData, Link } from "react-router-dom";
import "../../assets/VansSnippetsList.css";
//
const loader = async () => {
	// load all vans for current user
	return null;
};

const VansSnippetsList = ({ vansListPreview }) => {
	const vansList = vansListPreview || useLoaderData();
	// use data from props if data provided
	// otherwise use data from loader
	// display a list of vans with short description
	// each snippet should have a link to corresponding van
	return (
		<div className="list">
			{vansList.map(({ id, fields: { name, imageUrl, price } }) => (
				<Link to={`vans/${id}`} key={id}>
					<div className="snippet">
						<img src={imageUrl} />
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
