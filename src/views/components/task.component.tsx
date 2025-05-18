import React, { useState } from "react";
import { TaskStatus } from "../../enum/taskStatus.enum";
import { Task } from "../../models/task.model";
import { TaskManager } from "../../controllers/taskManager.controller";
import DialogTask from "./dialogTask.compoent";

interface TaskCardProps {
	task: Task;
	handleTaskChange: (isUpdated: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleTaskChange }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = event.target.value as TaskStatus;
		TaskManager.getInstance().updateStatus(task.id!, newStatus);
		handleTaskChange(true);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};
	const handleDeleteClick = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this task? This action cannot be undone."
			)
		) {
			TaskManager.getInstance().deleteTask(task.id!);
			handleTaskChange(true);
		}
	};

	const handleCloseEditDialog = () => {
		setIsEditing(false);
	};

	const handleEditComplete = (isSuccess: boolean) => {
		if (isSuccess) {
			setIsEditing(false);
			handleTaskChange(true);
		}
	};

	return (
		<div className="task-card px-3 border rounded m-3 shadow-sm">
			<div className="d-flex justify-content-between align-items-center">
				<div className="fs-3 fw-medium">{task.title}</div>
				<div className="d-flex gap-2">
					<button
						className="btn btn-sm btn-outline-secondary"
						onClick={handleEditClick}
					>
						✏️
					</button>
					<button
						className="btn btn-sm btn-outline-secondary"
						onClick={handleDeleteClick}
					>
						🗑️
					</button>
				</div>
			</div>
			<p className="text-start">
				<div>
					<strong>Description:</strong>
				</div>
				<div>{task.description}</div>
			</p>
			<select
				className="form-select mb-3"
				id={`task-status-select-${task.id}`}
				value={task.status}
				onChange={handleStatusChange}
			>
				{Object.values(TaskStatus).map((status) => (
					<option
						key={status}
						value={status}
					>
						{status.replace("_", " ").toUpperCase()}
					</option>
				))}
			</select>
			<p className="text-start">
				<strong>Created At:</strong> {task.createdAt.toLocaleDateString()}
			</p>
			<p className="text-start">
				<strong>Updated At:</strong>{" "}
				{task.updatedAt ? task.updatedAt.toLocaleDateString() : "N/A"}
			</p>

			{isEditing && (
				<DialogTask
					show={isEditing}
					onClose={handleCloseEditDialog}
					initialTask={task}
					onComplete={handleEditComplete}
				/>
			)}
		</div>
	);
};

export default TaskCard;
