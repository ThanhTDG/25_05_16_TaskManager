import React from "react";
import TaskForm from "./form.component"; // Assuming form.component.tsx is in the same directory
import { Task } from "../../models/task.model"; // Adjust path as needed

interface TaskDialogProps {
	show: boolean;
	onClose: () => void;
	onComplete: (isSuccess: boolean) => void;
	initialTask?: Task;
}

const DialogTask: React.FC<TaskDialogProps> = ({
	show,
	onClose,
	onComplete,
	initialTask,
}) => {
	if (!show) {
		return null;
	}

	const handleFormSubmit = (isSuccess: boolean) => {
		onComplete(isSuccess);
	};

	const modalTitle = initialTask ? "Edit Task" : "Create New Task";

	return (
		<div
			className="modal d-block"
			tabIndex={-1}
			role="dialog"
			style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
		>
			<div
				className="modal-dialog"
				role="document"
			>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{modalTitle}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<TaskForm
							initialTask={initialTask}
							onSubmit={handleFormSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DialogTask;
