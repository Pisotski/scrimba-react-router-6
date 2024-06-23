import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputWithLabel } from "../Reusable_Components/InputWithLabel";
import { SelectWithLabel } from "../Reusable_Components/SelectWithLabel";
import { TextAreaWithLabel } from "../Reusable_Components/TextAreaWithLabel";
import { ConfirmDialog } from "../Reusable_Components/ConfirmDialog";
import TrashBin from "../../assets/deleteButton.svg?react";
import { updateVan, deleteVan } from "../../controllers";

const action = async ({ request, params }) => {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	const { vanId } = params;

	updateVan({ vanId, updates });
	return null;
};

const VanDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const vanInfo = location.state.van;
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

	const handleDelete = () => {
		setIsConfirmDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		await deleteVan(vanInfo._id);
		setIsConfirmDialogOpen(false);
		return navigate("/auth");
	};

	const handleCancelDelete = () => {
		setIsConfirmDialogOpen(false);
	};

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
					label: "Picture",
					input: vanInfo.imageUrl,
					field: "imageUrl",
				}}
			/>
			<TextAreaWithLabel
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
			{isConfirmDialogOpen && (
				<ConfirmDialog
					message="Are you sure you want to delete this item?"
					onConfirm={handleConfirmDelete}
					onCancel={handleCancelDelete}
				/>
			)}
			<button className="standard-button delete-button" onClick={handleDelete}>
				<span>Delete Van </span>
				<TrashBin className="trash-bin-SVG">SVG</TrashBin>
			</button>
		</>
	);
};

export { VanDetails, action };
