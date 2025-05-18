import { TaskStatus } from "../enum/taskStatus.enum";
import { Task } from "../models/task.model";
import TaskService from "../services/task.service";
import { generateId } from "../utils";

export class TaskManager {
	private taskService: TaskService;
	private static instance: TaskManager;

	private constructor() {
		this.taskService = TaskService.getInstance();
	}

	public static getInstance(): TaskManager {
		if (!TaskManager.instance) {
			TaskManager.instance = new TaskManager();
		}
		return TaskManager.instance;
	}
	public updateStatus(taskId: string, status: TaskStatus): boolean {
		const task = this.taskService.getById(taskId);
		if (!task) {
			return false;
		}
		task.status = status;
		task.updatedAt = new Date();
		this.taskService.update(taskId, task);
		return true;
	}
	public createTask(title: string, description: string): Task {
		const newTask = new Task(
			title,
			description,
			TaskStatus.PENDING,
			new Date(),
			generateId()
		);
		this.taskService.create(newTask);
		return newTask;
	}
	public deleteTask(taskId: string): boolean {
		const task = this.taskService.getById(taskId);
		if (!task) {
			return false;
		}
		this.taskService.delete(taskId);
		return true;
	}
	public updateTask(task: Task): boolean {
		const existingTask = this.taskService.getById(task.id!);
		if (!existingTask) {
			return false;
		}
		existingTask.title = task.title;
		existingTask.description = task.description;
		existingTask.status = task.status;
		existingTask.updatedAt = new Date();
		this.taskService.update(task.id!, existingTask);
		return true;
	}
	public getAllTasks(): Task[] {
		return this.taskService.getAll();
	}
}
