interface offsetResult {
    top: number
    left: number
}

function offset(elem: Element): offsetResult { // кроме IE8-
	const box = elem.getBoundingClientRect();

	return {
		top: box.top + window.pageYOffset,
		left: box.left + window.pageXOffset,
	};
}

export default offset;
