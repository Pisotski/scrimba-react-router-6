import { Form, useSubmit } from "react-router-dom";

const InputWithLabel = ({ display: { input, label, field, actionRoute } }) => {
	const submit = useSubmit();
	return (
		<Form
			method="post"
			onBlur={(event) => {
				submit(event.currentTarget, { action: actionRoute });
			}}
		>
			<label>{label}: </label>
			<input defaultValue={input} name={field} />
		</Form>
	);
};

export { InputWithLabel };
