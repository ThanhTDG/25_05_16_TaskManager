import React, { useState } from "react";
import { TaskStatus } from "../../enum/taskStatus.enum";
import { Task } from "../../models/task.model";
import { generateId } from "../../utils";
import { TaskManager } from "../../controllers/taskManager.controller";

interface TaskFormProps {
	onSubmit: (isUpdated: boolean) => void;
	initialTask?: Task;
}
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
	const [formData, setFormData] = useState({
		title: initialTask?.title || "",
		description: initialTask?.description || "",
		status: initialTask?.status || TaskStatus.PENDING,
	});

	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { id, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const updatedTask: Task = {
			id: initialTask?.id || "-",
			title: formData.title,
			description: formData.description,
			status: formData.status as TaskStatus,
			createdAt: initialTask?.createdAt || new Date(),
			updatedAt: undefined,
		};
		if (initialTask?.id && initialTask.id !== "-") {
			TaskManager.getInstance().updateTask(updatedTask);
		} else {
			TaskManager.getInstance().createTask(
				formData.title,
				formData.description
			);
		}
		onSubmit(true);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 border rounded"
		>
			<div className="mb-2 text-start">
				<label
					htmlFor="title"
					className="form-label"
				>
					Title
				</label>
				<input
					type="text"
					className="form-control"
					id="title"
					value={formData.title}
					onChange={handleChange}
					required
				/>
			</div>
			<div className="mb-2 text-start">
				<label
					htmlFor="description"
					className="form-label"
				>
					Description
				</label>
				<textarea
					className="form-control"
					id="description"
					rows={3}
					value={formData.description}
					onChange={handleChange}
					required
				></textarea>
			</div>
			<div className="mb-2 text-start">
				<label
					htmlFor="status"
					className="form-label"
				>
					Status
				</label>
				<select
					className="form-select"
					id="status"
					value={formData.status}
					onChange={handleChange}
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
			</div>

			<button
				type="submit"
				className="btn btn-primary"
			>
				{initialTask ? "Update Task" : "Create Task"}
			</button>
		</form>
	);
};

export default TaskForm;
