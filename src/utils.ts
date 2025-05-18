export function generateId(): string {
	return Date.now().toString();
}

export function stringToDate(dateString: string): Date {
	return new Date(dateString);
}

export function dateToString(date: Date): string {
	if (!date) return "-";
	if (typeof date === "string") {
		date = new Date(date);
	}
	console.log(date);
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new Error("Invalid date provided to dateToString");
	}
	return date.toISOString().slice(0, 16);
}

export function saveToLocalStorage(key: string, data: any): void {
	try {
		const jsonData = JSON.stringify(data);
		localStorage.setItem(key, jsonData);
	} catch (error) {
		console.error("Failed to save to localStorage:", error);
	}
}

export function loadFromLocalStorage<T>(key: string): T | null {
	const data = localStorage.getItem(key);
	if (!data) return null;
	try {
		return JSON.parse(data) as T;
	} catch (error) {
		console.error("Failed to parse localStorage data:", error);
		return null;
	}
}
