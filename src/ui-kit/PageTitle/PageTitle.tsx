import React, {FC} from 'react';
import cn from 'classnames';

import css from './PageTitle.module.scss';

export interface PageTitleProps{
	size?: 'thin' | 'default'
	className?: string
	children?: React.ReactNode
}
export const PageTitle: FC<PageTitleProps> = ({size, className, children}) => {
	return (
		<h1 className={cn(css.root, className, size === 'thin' && css.thin)}>{children}</h1>
	);
};
