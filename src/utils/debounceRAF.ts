interface DebouncedProps {
	cancel(): void
}

export function debounceRAF<T extends(...args: any[]) => any>(cb: T): T & DebouncedProps {
	let timerId: number;
	const debounced: any = function (...args: any[]) {
		debounced.cancel();
		timerId = window.requestAnimationFrame(() => {
			cb(...args);
		});
	};
	debounced.cancel = () => {
		window.cancelAnimationFrame(timerId);
	};

	return debounced;
}
