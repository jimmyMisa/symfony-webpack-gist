function isInert(node) {
	// See https://www.w3.org/TR/html5/editing.html#inert
	let sty = getComputedStyle(node);
	return node.offsetHeight <= 0 || /hidden/.test(sty.getPropertyValue('visibility'));
}
function focusNext(e) {
	// Selector lifted from `jkup/focusable.git`
	let focusable = Array.from(document.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')),
		step = e && e.shiftKey ? -1 : 1,
		activeIndex = focusable.indexOf(document.activeElement),
		nextActiveIndex = activeIndex + step,
		nextActive = focusable[nextActiveIndex];

	// Skip inert elements.
	while (nextActive && isInert(nextActive)) { nextActive = focusable[(nextActiveIndex += step)]; }

	
	if (nextActive) {
		nextActive.focus();
		e && e.preventDefault();
	}
	else {
		// Allow focus to leave the document when there is no nextActive
		document.activeElement.blur();
	}
}