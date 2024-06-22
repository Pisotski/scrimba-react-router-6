import { useState } from "react";
const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleConfirm = () => {
		onConfirm();
		handleClose();
	};

	const handleCancel = () => {
		onCancel();
		handleClose();
	};

	return (
		<div className="confirm-dialog">
			<div className="confirm-dialog-content">
				<p>{message}</p>
				<div className="confirm-dialog-buttons">
					<button className="standard-button" onClick={handleConfirm}>
						Confirm
					</button>
					<button className="standard-button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export { ConfirmDialog };
