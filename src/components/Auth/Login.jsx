import { Form, Link, redirect, useActionData } from "react-router-dom";
import { login, setAuthCookie } from "../../controllers";
import { hasEmptyField } from "../../helpers";

const action = async ({ request }) => {
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);
	if (hasEmptyField(credentials)) return { msg: "All fields are required." };

	const result = await login(credentials);
	if (result.userId && result.userName) setAuthCookie(result);

	return redirect("/auth");
};

const Login = () => {
	const errors = useActionData();

	return (
		<Form method="POST" className="auth-form">
			{errors ? <div className="error-message">{errors.msg}</div> : null}
			<div className="space-between">
				<label htmlFor="email">email: </label>
				<input id="email" placeholder="e-mail" name="email"></input>
			</div>
			<div className="space-between">
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
};

export { Login, action };
