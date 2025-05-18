import React from "react";
import TaskCard from "./task.component";
import { Task } from "../../models/task.model";

const ListTaskComponent: React.FC<{
	listTask: Task[];
	title?: string;
	handleTaskChange: (isUpdated: boolean) => void;
}> = ({ listTask, title, handleTaskChange }) => {
	return (
		<div className="list-task">
			<h2 className="text-center p-3 bg-primary text-white">
				{title || "Task List"}
			</h2>
			<div
				className="list-task-details"
				style={{
					maxHeight: "800px",
					overflowY: "auto",
				}}
			>
				{listTask.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						handleTaskChange={handleTaskChange}
					/>
				))}
			</div>
		</div>
	);
};

export default ListTaskComponent;
