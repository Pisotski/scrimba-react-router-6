import { Form, Link, redirect } from "react-router-dom";
import { login, isValid } from "../helpers";

const action = async ({ request }) => {
	localStorage.clear();
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);
	if (!isValid(credentials)) throw new Error("invalid credentials");
	const { JWT, id } = await login(credentials);
	if (!JWT) throw new Error("no token");
	localStorage.setItem("JWT", JWT);
	return redirect(`/host/${id}`);
};

const Login = () => {
	return (
		<>
			<Form method="POST" className="auth-form">
				<div>
					<label htmlFor="login">Name: </label>
					<input
						id="login"
						placeholder="e-mail or phone number"
						name="login"
					></input>
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
