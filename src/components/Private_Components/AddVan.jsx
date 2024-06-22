import { Form, useActionData, Link, redirect } from "react-router-dom";
import { createVan } from "../../controllers";
import { hasEmptyField } from "../../helpers";

const action = async ({ request }) => {
	const formData = await request.formData();
	const newVan = Object.fromEntries(formData);

	if (hasEmptyField(newVan)) return { msg: "All fields are required." };
	const result = await createVan(newVan);

	return redirect("/auth");
};

const AddVan = () => {
	const error = useActionData();

	return (
		<Form method="POST" className="auth-form">
			{error && <div className="error-message">{error.msg}</div>}
			<div>
				<label htmlFor="name">Van Name: </label>
				<input id="name" placeholder="Mimosa in disguise" name="name"></input>
			</div>
			<div>
				<label htmlFor="price">Price: </label>
				<input id="price" placeholder="100" name="price"></input>
			</div>
			<div>
				<label htmlFor="description">Description: </label>
				<input
					id="description"
					placeholder="My awesome van details"
					name="description"
				></input>
			</div>
			<div>
				<label htmlFor="imageUrl">Picture: </label>
				<input
					id="imageUrl"
					placeholder="https://image.url"
					name="imageUrl"
				></input>
			</div>
			<div>
				<label>Type: </label>
				<select name="type">
					<option value={"simple"} id={"simple"}>
						Simple
					</option>
					<option value={"luxury"} id={"luxury"}>
						Luxury
					</option>
					<option value={"rugged"} id={"rugged"}>
						Rugged
					</option>
				</select>
			</div>
			<button type="submit" className="option-button">
				Submit
			</button>
		</Form>
	);
};

export { AddVan, action };
