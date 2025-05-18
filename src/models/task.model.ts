import { TaskStatus } from "../enum/taskStatus.enum";

export class Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	createdAt: Date;
	updatedAt?: Date;
	constructor(
		title: string,
		description: string,
		status: TaskStatus,
		createdAt: Date,
		id: string = "-",
		updatedAt?: Date
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	static fromJson(json: any): Task {
		return new Task(
			json.title,
			json.description,
			json.status,
			new Date(json.createdAt),
			json.id,
			json.updatedAt ? new Date(json.updatedAt) : undefined
		);
	}
}
