import { Form, Link, redirect } from "react-router-dom";
import { isValid } from "../../helpers";
import { register } from "../../controllers";

const action = async ({ request }) => {
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);
	const id = await register(credentials);

	return null;
	// return redirect(`/host/${id}`);
};

const Register = () => {
	return (
		<>
			<Form method="POST" className="auth-form">
				<div>
					<label htmlFor="name">Name: </label>
					<input id="name" placeholder="name" name="name"></input>
				</div>
				<div>
					<label htmlFor="email">E-mail: </label>
					<input id="email" placeholder="e-mail" name="email"></input>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input id="password" placeholder="password" name="password"></input>
				</div>
				<button className="option-button simple" type="submit">
					Register
				</button>
				<Link to="/auth">
					<button className="option-button">Login</button>
				</Link>
			</Form>
		</>
	);
};

export { Register, action };
