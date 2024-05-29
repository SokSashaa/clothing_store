import React, {HTMLAttributes, useEffect, useRef} from 'react';

export interface DivWithOutsideClickProps<T> extends HTMLAttributes<HTMLDivElement> {
	callbackData?: T
	onOutsideClick?: (event: MouseEvent, callbackData: T) => unknown
}

export function DivWithOutsideClick<T>(props: DivWithOutsideClickProps<T>) {
	const {onOutsideClick, callbackData, ...restProps} = props;
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (onOutsideClick === undefined) return;

		const onDocumentClick = (event: MouseEvent) => {
			const rootNode = rootRef.current;
			const targetElement = event.target as Element;

			if (
				rootNode &&
				rootNode !== targetElement &&
				!rootNode.contains(targetElement)
			) {
				onOutsideClick(event, callbackData as T);
			}
		};
		const appRootNode = document.getElementById('app-root');
		appRootNode?.addEventListener('click', onDocumentClick);

		return () => appRootNode?.removeEventListener('click', onDocumentClick);
	}, [onOutsideClick, callbackData]);

	return (
		<div ref={rootRef} {...restProps} />
	);
}
