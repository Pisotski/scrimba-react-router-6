import { useLoaderData } from "react-router-dom";
import { getVan } from "../helpers";

const loader = async ({ params }) => {
	const data = await getVan(params.vansId);
	return data.fields;
};

const VanDescription = () => {
	const van = useLoaderData();
	console.log(van);
	return <>IMA HAPPY VAN</>;
};

export { VanDescription, loader };
