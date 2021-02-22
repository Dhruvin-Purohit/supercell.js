export function seasonEnd(month: number) {
	const year = new Date().getFullYear();
	let day = 0;
	let lastDate = new Date(Date.UTC(year, month));
	while (true) {
		lastDate = new Date(Date.UTC(year, month, day, 5, 0));
		if (lastDate.getDay() === 1) break;
		day -= 1;
	}

	return lastDate;
}