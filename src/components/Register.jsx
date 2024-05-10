import { Form, Link, redirect } from "react-router-dom";
import { register, isValid } from "../helpers";

const action = async ({ request }) => {
	localStorage.clear();
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData) || null;

	if (!isValid(credentials)) throw new Error("invalid credentials");
	const { JWT, id } = await register(credentials);
	if (!JWT) throw new Error("user not found or credentials are incorrect");
	localStorage.setItem("JWT", JWT);
	return redirect(`/host/${id}`);
};

const Register = () => {
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
