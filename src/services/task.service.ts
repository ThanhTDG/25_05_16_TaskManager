import { taskData } from "../datas/task.data";
import { Task } from "../models/task.model";
import { BaseService } from "./base.service";

export default class TaskService extends BaseService<Task> {
	private static instance: TaskService;
	public constructor() {
		super("tasks", (data) => Task.fromJson(data));
		if (this.getAll().length === 0) {
			taskData.forEach((task) => {
				this.create(task);
			});
		}
	}

	public static getInstance(): TaskService {
		if (!TaskService.instance) {
			TaskService.instance = new TaskService();
		}
		return TaskService.instance;
	}
}
