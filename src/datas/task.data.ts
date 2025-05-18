import { TaskStatus } from "../enum/taskStatus.enum";
import { Task } from "../models/task.model";

export const taskData: Task[] = [
	new Task(
		"Task 1",
		"Description for Task 1",
		TaskStatus.PENDING,
		new Date("2025-05-01"),
		"1",
		new Date("2025-05-02")
	),
	new Task(
		"Task 2",
		"Description for Task 2",
		TaskStatus.IN_PROGRESS,
		new Date("2025-05-03"),
		"2",
		new Date("2025-05-04")
	),
	new Task(
		"Task 3",
		"Description for Task 3",
		TaskStatus.IN_PROGRESS,
		new Date("2025-05-05"),
		"3",
		new Date("2025-05-06")
	),
	new Task(
		"Task 4",
		"Description for Task 4",
		TaskStatus.COMPLETED,
		new Date("2025-05-07"),
		"4",
		new Date("2025-05-08")
	),
	new Task(
		"Task 5",
		"Description for Task 5",
		TaskStatus.IN_PROGRESS,
		new Date("2025-05-09"),
		"5",
		new Date("2025-05-10")
	),
	new Task(
		"Task 6",
		"Description for Task 6",
		TaskStatus.IN_PROGRESS,
		new Date("2025-05-11"),
		"6",
		new Date("2025-05-12")
	),
	new Task(
		"Task 7",
		"Description for Task 7",
		TaskStatus.IN_PROGRESS,
		new Date("2025-05-13"),
		"7",
		new Date("2025-05-14")
	),
	new Task(
		"Task 8",
		"Description for Task 8",
		TaskStatus.IN_PROGRESS,
		new Date("2025-05-15"),
		"8",
		new Date("2025-05-16")
	),
	new Task(
		"Task 9",
		"Description for Task 9",
		TaskStatus.COMPLETED,
		new Date("2025-05-17"),
		"9",
		new Date("2025-05-18")
	),
	new Task(
		"Task 10",
		"Description for Task 10",
		TaskStatus.COMPLETED,
		new Date("2025-05-19"),
		"10",
		new Date("2025-05-20")
	),
];
