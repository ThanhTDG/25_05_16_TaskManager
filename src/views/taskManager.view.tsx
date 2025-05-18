import React, { useEffect, useState } from "react";
import ListTaskComponent from "./components/listTask.component";
import { TaskStatus } from "../enum/taskStatus.enum";
import { Task } from "../models/task.model";
import { TaskManager } from "../controllers/taskManager.controller";
import TaskForm from "./components/form.component";
import DialogTask from "./components/dialogTask.compoent";

const TaskManagerView: React.FC = () => {
	const [listTask, setListTask] = useState<Task[]>([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	useEffect(() => {
		const fetchTasks = () => {
			const tasks = TaskManager.getInstance().getAllTasks();
			setListTask(tasks);
		};
		fetchTasks();
	}, [isUpdate]);

	const handleTaskChange = (isUpdate: boolean) => {
		console.log(isUpdate, " isUpdate");
		if (isUpdate) {
			const tasks = TaskManager.getInstance().getAllTasks();
			setListTask([...tasks]);
			setIsUpdate(!isUpdate);
		}
	};

	return (
		<div className="container">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Task Manager</h1>
				<button
					className="btn btn-primary"
					onClick={() => setIsDialogOpen(true)}
				>
					+ Add Task
				</button>
			</div>

			<DialogTask
				show={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onComplete={(isSuccess) => {
					handleTaskChange(isSuccess);
					setIsDialogOpen(!isSuccess);
				}}
			/>
			<div className="row">
				<div className="col-sm border rounded p-0 overflow-auto">
					<ListTaskComponent
						title="Pending Tasks"
						handleTaskChange={handleTaskChange}
						listTask={listTask
							.filter((task) => task.status === TaskStatus.PENDING)
							.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())}
					/>
				</div>
				<div className="col-sm border rounded mx-3 p-0 overflow-auto">
					<ListTaskComponent
						title="In Progress Tasks"
						handleTaskChange={handleTaskChange}
						listTask={listTask.filter(
							(task) => task.status === TaskStatus.IN_PROGRESS
						)}
					/>
				</div>
				<div className="col-sm border rounded p-0 overflow-auto">
					<ListTaskComponent
						title="Completed Tasks"
						handleTaskChange={handleTaskChange}
						listTask={listTask
							.filter((task) => task.status === TaskStatus.COMPLETED)
							.sort((a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime())}
					/>
				</div>
			</div>
		</div>
	);
};

export default TaskManagerView;
