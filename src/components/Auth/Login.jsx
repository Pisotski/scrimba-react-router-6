import { Form, Link, redirect } from "react-router-dom";
import { login, setAuthCookie } from "../../controllers";

const action = async ({ request }) => {
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);
	const result = await login(credentials);
	if (result.userId && result.userName) setAuthCookie(result);
	return redirect("/auth");
};

const Login = () => (
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
);

export { Login, action };
