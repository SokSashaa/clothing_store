import React, {ButtonHTMLAttributes, FunctionComponent} from 'react';
import cn from 'classnames';

import css from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	styleType?: 'default' | 'secondary' | 'blue' | 'gray' | 'orange'
	parentBg?: 'light' | 'dark'
	loading?: boolean
	size?: 'large' | 'small' | 'default'
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
	const
		{
			className,
			styleType,
			disabled,
			children,
			loading,
			parentBg,
			size,
			...restProps
		} = props;
	const buttonProps = {
		className: cn(
			css.root,
			className,

			disabled && !loading && css.disabled,
			loading && css.loading,

			styleType === 'secondary' && css.styleTypeSecondary,
			styleType === 'gray' && css.styleTypeGray,
			styleType === 'orange' && css.styleTypeOrange,
			styleType === 'blue' && css.styleTypeBlue,

			parentBg === 'light' && css.parentBgLight,
			parentBg === 'dark' && css.parentBgDark,

			size === 'small' && css.small,
			size === 'large' && css.large,
		),
		disabled,
		...restProps,
	};

	return (
		<button {...buttonProps}>
			<div
				className={css.inner}
			>
				{children}
			</div>
		</button>
	);
};
