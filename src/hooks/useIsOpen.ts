import {useCallback, useEffect, useRef, useState} from 'react';

export const useIsOpen = (initialValue = false) => {
	const [isOpen, setIsOpen] = useState<null | boolean>(null);
	const initialValueRef = useRef<boolean>(initialValue);
	const stateRef = useRef<boolean | null>(null);
	useEffect(() => {
		stateRef.current = isOpen;
	}, [isOpen]);
	useEffect(() => {
		initialValueRef.current = initialValue;
	}, [initialValue]);

	return {
		isOpen: isOpen ?? initialValue,
		toggle: useCallback(() => {
			setIsOpen(!(stateRef.current ?? initialValueRef.current))
		}, []),
		open: useCallback(() => {
			setIsOpen(true);
		}, []),
		close: useCallback(() => {
			setIsOpen(false);
		}, []),
	}
};
