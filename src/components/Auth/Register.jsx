import { Form, Link, redirect, useActionData } from "react-router-dom";
import { register, setAuthCookie } from "../../controllers";
import { hasEmptyField } from "../../helpers";

const action = async ({ request }) => {
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);
	if (hasEmptyField(credentials)) return { msg: "All fields are required." };

	const result = await register(credentials);
	if (result.userId && result.userName) setAuthCookie(result);
	return redirect("/auth");
};

const Register = () => {
	const errors = useActionData();
	return (
		<Form method="POST" className="auth-form">
			{errors ? <div className="error-message">{errors.msg}</div> : null}
			<div className="space-between">
				<label htmlFor="name">Name: </label>
				<input id="name" placeholder="name" name="name"></input>
			</div>
			<div className="space-between">
				<label htmlFor="email">E-mail: </label>
				<input id="email" placeholder="e-mail" name="email"></input>
			</div>
			<div className="space-between">
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
	);
};

export { Register, action };
