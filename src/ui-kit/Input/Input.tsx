import * as React from 'react';
import cn from 'classnames';
import {isNil} from 'lodash';
import InputMask, {ReactInputMaskOwnProps} from 'react-input-mask';
import {PartialProps} from '../../utils/tsutils';

import css from './Input.module.scss';

export interface InputOwnProps extends PartialProps<Omit<ReactInputMaskOwnProps, 'children'>, 'mask'> {
	showError?: boolean
	showSuccess?: boolean
	styleType?: 'default' | 'small'
	disableIcons?: boolean
}

export interface InputProps extends InputOwnProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'>{}

export class Input extends React.Component<InputProps> {
	render() {
		const {
			showError,
			showSuccess,
			className,
			value,
			mask,
			maskChar,
			formatChars,
			alwaysShowMask,
			inputRef,
			beforeMaskedValueChange,
			disableIcons,
			styleType = 'default',
			...props
		} = this.props;

		return mask ? (
			<InputMask
				mask={mask}
				maskChar={maskChar}
				formatChars={formatChars}
				alwaysShowMask={alwaysShowMask}
				inputRef={inputRef}
				beforeMaskedValueChange={beforeMaskedValueChange}
				{...props}
				className={cn(
					className,
					css.input,
					disableIcons && css.disableIcons,
					styleType === 'small' && css.small,
					showError && css.error,
					showSuccess && css.success,
					props.disabled && css.disabled,
				)}
				value={isNil(value) ? undefined : value}
			/>
		) : (
			<input
				{...props}
				ref={inputRef}
				className={cn(
					className,
					css.input,
					disableIcons && css.disableIcons,
					showError && css.error,
					showSuccess && css.success,
					props.disabled && css.disabled,
					styleType === 'small' && css.small,
				)}
				value={isNil(value) ? undefined : value}
			/>
		);
	}
}
