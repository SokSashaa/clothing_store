import * as React from 'react';
import {CSSProperties, useCallback, useMemo, useState} from 'react';
import cn from 'classnames';
import {DivWithOutsideClick} from '../../../../ui-kit/DivWithOutsideClick/DivWithOutsideClick';

import css from './AppraiseFilters.module.scss';
import {ProductDTO} from '../../../../api/dto/product.dto';
import {max, min} from 'lodash';
import {Range} from 'react-range';
import {useIsMounted} from '../../../../hooks/useIsMounted';
import {BetterInput} from '../../../../ui-kit/BetterInput/BetterInput';
import {Button} from '../../../../ui-kit/Button/Button';
import {calculatePriceAfterDiscount} from '../../../../utils/formatPrice';

export type AppraiseFilterAdaptiveProps = {
	products: ProductDTO[];
	handleApplyFilter: (fromTo: [number, number]) => void;
};

export function AppraiseFilters(props: AppraiseFilterAdaptiveProps) {
	const [isOpen, setIsOpen] = useState(false);
	const onButtonClick = useCallback(() => setIsOpen((prevState) => !prevState), []);
	const handleClose = useCallback(() => setIsOpen(false), []);
	const isMounted = useIsMounted();
	const isDisabled = !useIsMounted();

	const minValue =
		props.products.length > 1
			? min(
					props.products.map((item) => calculatePriceAfterDiscount(item.product_price, item.product_discount))
				) || 0
			: 0;
	const maxValue =
		max(props.products.map((item) => calculatePriceAfterDiscount(item.product_price, item.product_discount))) ||
		100000;

	const [fromTo, setFromTo] = useState<[number, number]>([minValue, maxValue]);

	const rangeCb = useCallback(([from, to]: number[]) => {
		setFromTo([from, to]);
	}, []);

	const rangeValues = useMemo(() => {
		if (isDisabled) {
			return [minValue, maxValue];
		}

		const from = fromTo[0];
		const to = fromTo[1];

		return [
			Number.isNaN(from) || from < minValue ? minValue : from,
			Number.isNaN(to) || to > maxValue ? maxValue : to,
		];
	}, [minValue, maxValue, isDisabled, fromTo]);

	const histogramPolygonValue = useMemo(() => {
		const histogram = props.products.map((item) => item.product_price);
		if (histogram.length === 0) return;

		const maxX = histogram.length;
		const maxY = Math.max(...histogram);

		return (
			histogram
				.map((val, i) => {
					const xPercent = Math.ceil((i / maxX) * 100);
					const xPercentNext = Math.ceil(((i + 1) / maxX) * 100);
					let yPercent = 100 - Math.ceil((val / maxY) * 100);

					if (Number.isNaN(yPercent)) {
						yPercent = 100;
					}

					return `${xPercent}% 100%, ${xPercent}% ${yPercent}%, ${xPercentNext}% ${yPercent}%, `;
				})
				.join('') + '100% 100%'
		);
	}, [props.products]);

	const cssVariables = useMemo(() => {
		// sort values ascending
		const progress = rangeValues
			.slice(0)
			.sort((a, b) => a - b)
			.map((value) => ((value - minValue) / (maxValue - minValue)) * 100);
		return progress.reduce(
			(acc, point, index) => {
				acc[`--range-gradient-point-${index}`] = `${point}%`;
				return acc;
			},
			{} as Record<string, string>
		) as CSSProperties;
	}, [rangeValues, minValue, maxValue]);
	return (
		<DivWithOutsideClick className={cn(css.root, isOpen && css.isOpen)} onOutsideClick={handleClose}>
			<div className={css.button} onClick={onButtonClick} />
			<div className={css.wrapper} style={cssVariables}>
				<div>
					<div className={css.priceFilter}>
						{histogramPolygonValue && (
							<div
								className={css.histogram}
								data-hui={histogramPolygonValue}
								style={{
									clipPath: `polygon(${histogramPolygonValue})`,
								}}
							/>
						)}
						<Range
							min={minValue}
							max={maxValue}
							disabled={props.products.length === 0}
							onChange={rangeCb}
							values={rangeValues}
							renderTrack={({props, children}) => (
								<div {...props} className={css.rangeTrack}>
									{children}
								</div>
							)}
							renderThumb={({props, index}) => {
								return (
									<div
										className={cn(css.rangeThumb, !isMounted && css.rangeThumbNotMounted)}
										{...(isMounted
											? props
											: {
													...props,
													style: {
														...props.style,
														left: `var(--range-gradient-point-${index})`,
													},
												})}
										key={index}
									/>
								);
							}}
						/>
						<div className={css.inputs}>
							<BetterInput
								key={'from'}
								className={css.input}
								value={rangeValues[0]}
								betterPlaceholder={'От: '}
								betterPlaceholderTop={'Цена от'}
								type={'number'}
								onChange={(event) => setFromTo([Number(event.currentTarget.value), fromTo[1]])}
							/>
							<BetterInput
								key={'to'}
								className={css.input}
								value={rangeValues[1]}
								betterPlaceholder={'До: '}
								betterPlaceholderTop={'Цена до'}
								type={'number'}
								onChange={(event) => setFromTo([fromTo[0], Number(event.currentTarget.value)])}
							/>
						</div>
					</div>
				</div>
				<div className={css.closeButton} onClick={onButtonClick}>
					×
				</div>
				<Button styleType={'blue'} onClick={() => props.handleApplyFilter(fromTo)}>
					Применить
				</Button>
			</div>
		</DivWithOutsideClick>
	);
}
