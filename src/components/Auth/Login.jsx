import { Form, Link, redirect } from "react-router-dom";
import { login } from "../../controllers";

const action = async ({ request }) => {
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);
	const id = await login(credentials);
	console.log(id);
	return redirect(`/host/${id}`);
};

const Login = () => {
	return (
		<>
			<Form method="POST" className="auth-form">
				<div>
					<label htmlFor="email">email: </label>
					<input id="email" placeholder="e-mail" name="email"></input>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input id="password" placeholder="password" name="password"></input>
				</div>
				<button className="option-button simple" type="submit">
					Login
				</button>
				<Link to="register">
					<button className="option-button">Register</button>
				</Link>
			</Form>
		</>
	);
};

export { Login, action };
