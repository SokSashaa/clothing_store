import {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import * as React from 'react';
import cn from 'classnames';
import css from './RevealText.module.scss';

interface RevealTextProps {
	className?: string
	shrinkedClassName?: string
	fullClassName?: string
	lines?: 1 | 2 | 3 | 4 | 5 | 6
	direction?: 'top' | 'bottom'
	children?: ReactNode
}

export const RevealText: React.FC<RevealTextProps> = (props) => {
	const {
		children,
		className,
		fullClassName,
		shrinkedClassName,
		direction = 'bottom',
		lines = 1,
	} = props;
	const [shouldShow, setShouldShow] = useState(false);
	const timerIdRef = useRef<number>();
	const shrinkedRef = useRef<HTMLDivElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);

	const onWrapperMouseOver = useCallback(() => {
		clearTimeout(timerIdRef.current);
		const shrinked = shrinkedRef.current;
		const span = spanRef.current;

		if (shrinked === null || span === null) return;

		if (
			shrinked.offsetWidth < shrinked.scrollWidth ||
			shrinked.offsetWidth < span.getBoundingClientRect().width ||
			shrinked.offsetHeight < shrinked.scrollHeight ||
			shrinked.offsetHeight < span.getBoundingClientRect().height
		) {
			setShouldShow(true);
		} else {
			setShouldShow(false);
		}
	}, []);

	const onWrapperMouseOut = useCallback(() => {
		clearTimeout(timerIdRef.current);
		timerIdRef.current = window.setTimeout(() => {
			setShouldShow(false);
		});
	}, []);

	useEffect(() => () => clearTimeout(timerIdRef.current), []);

	return (
		<div
			className={cn(
				css.wrapper,
				className,
				direction === 'top' ? css.directionTop : css.directionBottom,
				css[`lines-` + lines],
			)}
			onMouseOver={onWrapperMouseOver}
			onMouseOut={onWrapperMouseOut}
		>
			<div
				className={cn(css.shrinked, shrinkedClassName)}
				ref={shrinkedRef}
			>
				<span ref={spanRef}>{children}</span>
			</div>
			{shouldShow && <div className={cn(css.full, fullClassName)}>{children}</div>}
		</div>
	);
};
