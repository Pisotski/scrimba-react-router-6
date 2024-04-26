import { useLoaderData } from "react-router-dom";
const url = "api/vans";

const loader = async ({ params }) => {
	const urlWithId = url + `/${params.vansId}`;
	try {
		const result = await fetch(urlWithId);
		const response = await result.json();
		return response;
	} catch (err) {
		console.log(err);
	}
	// const response = {
	// 	id: "6",
	// 	name: "Green Wonder",
	// 	price: 70,
	// 	description:
	// 		"With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
	// 	imageUrl:
	// 		"https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
	// 	type: "rugged",
	// };
	// return response;
};

const VanDescription = () => {
	const van = useLoaderData();
	console.log(van);
	return <>IMA HAPPY VAN</>;
};

export { VanDescription, loader };
