import { Form, redirect } from "react-router-dom";
import "../assets/Home.css";

const action = () => {
	return redirect(`/vans`);
};

const Home = () => {
	return (
		<>
			<div className="home wrapper">
				<section>
					<h1>You got the travel plans, we got the travel vans.</h1>
					<p>Add adventure to your life by joining the #vanlife movement.</p>
					<p>Rent the perfect van to make you perfect road trip.</p>
				</section>
				{/* Although this should definitely be <Link/> react router element
				i decided to use Form for educational purposes
				<Link/> technically should work faster */}
				<Form method="post" className="wide-submit-button">
					<button type="submit">Find your van</button>
				</Form>
			</div>
		</>
	);
};

export { Home, action };
