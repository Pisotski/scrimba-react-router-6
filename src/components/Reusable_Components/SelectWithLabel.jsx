import { Form, useSubmit } from "react-router-dom";

const SelectWithLabel = ({
	display: { defaultOption, options, label, field },
}) => {
	const submit = useSubmit();
	return (
		<Form
			method="post"
			onBlur={(event) => {
				submit(event.currentTarget);
			}}
			className="input-with-label"
		>
			<label>{label}: </label>
			<select name={field}>
				{options.map((opt) => (
					<option key={opt} value={opt === defaultOption ? "" : opt}>
						{opt}
					</option>
				))}
			</select>
		</Form>
	);
};

export { SelectWithLabel };
