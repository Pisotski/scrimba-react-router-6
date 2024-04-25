import { useEffect, useState } from "react";
const url = "api/vans";
const Grid = () => {
	const [vans, setVans] = useState([]);

	useEffect(() => {
		async function startFetching() {
			try {
				const result = await fetch(url);
				const newVans = await result.json();
				setVans(newVans);
			} catch (err) {
				console.log(err);
			}
		}
		startFetching();
	}, []);
	return (
		<>
			<div>hi</div>
		</>
	);
};

export { Grid };
