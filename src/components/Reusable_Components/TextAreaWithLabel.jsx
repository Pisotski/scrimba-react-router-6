import { Form, useSubmit } from "react-router-dom";

const TextAreaWithLabel = ({
	display: { input, label, field, actionRoute },
}) => {
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
			<textarea defaultValue={input} name={field} />
		</Form>
	);
};

export { TextAreaWithLabel };
