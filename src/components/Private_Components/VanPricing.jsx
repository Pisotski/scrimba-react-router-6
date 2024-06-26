import { useLocation } from "react-router-dom";
import { InputWithLabel } from "../Reusable_Components/InputWithLabel";
import { updateVan } from "../../controllers";

const action = async ({ request, params }) => {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	updates.price = Number(updates.price);
	const { vanId } = params;
	const response = await updateVan({ vanId, updates });
	if (response) console.log(`${response.updatedVan.name} van price updated`);
	return null;
};

const VanPricing = () => {
	const location = useLocation();
	const vanInfo = location.state.van;

	return (
		<InputWithLabel
			display={{
				label: "Price",
				input: vanInfo.price,
				field: "price",
			}}
		/>
	);
};

export { VanPricing, action };
