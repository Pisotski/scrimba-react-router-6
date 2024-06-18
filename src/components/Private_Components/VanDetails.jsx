import { useLocation } from "react-router-dom";
import { InputWithLabel } from "../Reusable_Components/InputWithLabel";
import { SelectWithLabel } from "../Reusable_Components/SelectWithLabel";

import { updateVan } from "../../controllers";

const action = async ({ request, params }) => {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	const { vanId } = params;
	console.log(params.vanId);
	updateVan({ vanId, updates });
	return null;
};

const VanDetails = () => {
	const location = useLocation();
	const vanInfo = location.state.van;

	return (
		<>
			<InputWithLabel
				display={{
					label: "Name",
					input: vanInfo.name,
					field: "name",
				}}
			/>
			<SelectWithLabel
				display={{
					label: "Category",
					defaultOption: vanInfo.type,
					options: ["simple", "luxury", "rugged"],
					field: "type",
				}}
			/>
			<InputWithLabel
				display={{
					label: "Description",
					input: vanInfo.description,
					field: "description",
				}}
			/>
			<SelectWithLabel
				display={{
					label: "Visibility",
					defaultOption: vanInfo.visibility || "public",
					options: ["public", "private"],
					field: "visibility",
				}}
			/>
		</>
	);
};

export { VanDetails, action };
