import {useEffect, useRef} from 'react';

const useFirstRender = () => {
	const firstRender = useRef(false);

	useEffect(() => {
		firstRender.current = true;
	}, []);

	return firstRender.current;
};

export default useFirstRender;
