import React, {ReactNode, useCallback} from 'react';
import cn from 'classnames';
import {isNil} from 'lodash';
import InputMask, {ReactInputMaskProps} from 'react-input-mask';
import {PartialProps, PropsType} from '../../utils/tsutils';

import css from './BetterInput.module.scss';

export interface BetterInputOwnProps extends PartialProps<Omit<ReactInputMaskProps, 'children'>, 'mask'> {
	inputClassName?: string
	betterPlaceholder?: ReactNode
	betterPlaceholderTop?: ReactNode
	showError?: boolean
	showSuccess?: boolean
	errorMessage?: ReactNode
	successMessage?: ReactNode
	showInfo?: boolean
	infoMessage?: ReactNode
	styleType?: 'default' | 'small'
	selectArrow?: boolean
	disabledStyle?: boolean
	/**
	 * При фокусе прокручивает до инпута в мобильной версии
	 */
	autoscroll?: boolean
	autoscrollOffset?: number
	fullWidth?: boolean
	onClear?: () => void
}

export const BetterInput = (props: BetterInputOwnProps) => {
	const {
		className,
		style,
		inputClassName,
		betterPlaceholder,
		betterPlaceholderTop,
		value,
		errorMessage,
		successMessage,
		showError,
		showSuccess,
		showInfo,
		infoMessage,
		disabledStyle,
		mask,
		maskChar,
		formatChars,
		alwaysShowMask,
		inputRef,
		beforeMaskedValueChange,
		styleType,
		selectArrow,
		autoscroll,
		autoscrollOffset = 36,
		fullWidth,
		onClear,
		...inputRestProps
	} = props;
	const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
		if (autoscroll) {
			const offset = e.currentTarget.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({top: offset - autoscrollOffset, behavior: 'smooth'});
		}
		inputRestProps.onFocus && inputRestProps.onFocus(e);
		// eslint-disable-next-line
	}, [autoscroll, autoscrollOffset, inputRestProps.onFocus]);
	
	const inputProps = {
		...inputRestProps,
		className: cn(
			inputClassName,
			css.input,
			styleType === 'small' && css.small,
			selectArrow && css.select,
			showError && css.error,
			onClear && !showSuccess && css.disableIcons,
			showSuccess && css.success,
			(disabledStyle || inputRestProps.disabled) && css.disabled,
		),
		value: isNil(value) ? undefined : value,
	};
	
	return (
		<div
			className={cn(
				className,
				css.root,
				value && css.hasValue,
				styleType === 'small' && css.rootSmall,
				(betterPlaceholder || betterPlaceholderTop) && css.hasBetterPlaceholder,
				fullWidth && css.fullWidth,
			)}
			style={style}
		>
			{mask ? (
				<InputMask
					mask={mask}
					maskChar={maskChar}
					formatChars={formatChars}
					alwaysShowMask={alwaysShowMask}
					inputRef={inputRef}
					beforeMaskedValueChange={beforeMaskedValueChange}
					{...inputProps}
					onFocus={onFocus}
				/>
			) : (
				<input
					ref={inputRef}
					{...inputProps}
					onFocus={onFocus}
				
				/>
			)}
			{onClear && value && !showSuccess && (
				<button
					onClick={onClear}
					type={'button'}
					className={cn(css.clearButton)}
				>
					<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.76648 10.2785C1.47263 9.98311 1.47263 9.50422 1.76648 9.20886L9.21547 1.72153C9.50932 1.42616 9.98575 1.42616 10.2796 1.72152C10.5735 2.01689 10.5735 2.49578 10.2796 2.79114L2.83063 10.2785C2.53677 10.5738 2.06034 10.5738 1.76648 10.2785Z" />
						<path d="M10.2335 10.2785C10.5274 9.98311 10.5274 9.50422 10.2335 9.20886L2.78453 1.72153C2.49068 1.42616 2.01425 1.42616 1.72039 1.72152C1.42654 2.01689 1.42654 2.49578 1.72039 2.79114L9.16937 10.2785C9.46323 10.5738 9.93966 10.5738 10.2335 10.2785Z" />
					</svg>
				</button>
			)}
			<div
				className={cn(
					css.betterPlaceholder,
					inputClassName,
					css.input,
					styleType === 'small' && css.small,
				)}
			>
				<div className={css.betterPlaceholderInner}>
					<span className={css.betterPlaceholderMainText}>{betterPlaceholder}</span>
					<span className={css.betterPlaceholderTopText}>{betterPlaceholderTop || betterPlaceholder}</span>
				</div>
			</div>
			{showInfo && infoMessage && (
				<span className={css.infoMessage}>
					{infoMessage}
				</span>
			)}
			
			{showError && errorMessage && (
				<span className={css.errorMessage}>
					{errorMessage}
				</span>
			)}
			
			{showSuccess && successMessage && (
				<span className={css.successMessage}>
					{successMessage}
				</span>
			)}
		</div>
	);
};

export type BetterInputProps = PropsType<typeof BetterInput>;
