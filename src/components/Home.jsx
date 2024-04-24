import { useState } from "react";
import "../assets/Home.css";

const Home = () => {
	return (
		<>
			<div className="home wrapper">
				<section>
					<h1>You got the travel plans, we got the travel vans.</h1>
					<p>Add adventure to your life by joining the #vanlife movement.</p>
					<p>Rent the perfect van to make you perfect road trip.</p>
				</section>
				<form className="wide-submit-button">
					<button type="submit">Find your van</button>
				</form>
			</div>
		</>
	);
};

export { Home };
