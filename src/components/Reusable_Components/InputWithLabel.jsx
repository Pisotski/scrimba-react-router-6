import { Form, useSubmit } from "react-router-dom";

const InputWithLabel = ({ display: { input, label, field, actionRoute } }) => {
	const submit = useSubmit();

	return (
		<Form
			method="post"
			onBlur={(event) => {
				if (event.currentTarget.children[1].value !== input)
					submit(event.currentTarget, { action: actionRoute });
			}}
			className="input-with-label"
		>
			<label>{label}: </label>
			<input defaultValue={input} name={field} />
		</Form>
	);
};

export { InputWithLabel };
