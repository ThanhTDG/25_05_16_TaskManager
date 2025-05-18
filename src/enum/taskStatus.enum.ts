export enum TaskStatus {
	PENDING = "pending",
	IN_PROGRESS = "in_progress",
	COMPLETED = "completed",
}

export function DefaultStatus(status: TaskStatus) {
	return function (target: any, propertyKey: string) {
		let value: TaskStatus = status;
		const getter = function () {
			return value;
		};
		const setter = function (newVal: TaskStatus) {
			value = newVal;
		};
		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	};
}
