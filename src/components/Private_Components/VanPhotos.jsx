import { useLoaderData } from "react-router-dom";
import { getVanIdPhotos } from "../../helpers";

const loader = async ({ params }) => {
	const { vanId } = params;
	const photos = getVanIdPhotos(vanId);
	return photos;
};

const VanPhotos = () => {
	// even though i do have photos stored on this location already,
	// i will make a separate call to fetch data for /photos
	// maybe in future i will add gallery, that will require a database with photos of certain van

	const data = useLoaderData();
	return (
		<>
			{data.map((url) => (
				<img key={url} src={url} />
			))}
		</>
	);
};

export { VanPhotos, loader };
