import React, {FC} from 'react';
import css from './FavouriteButton.module.scss';
import {StarTwoTone} from '@ant-design/icons';
import cn from 'classnames';

type FavouriteButtonProps = {
	funcActive?: Function;
	funcNoActive?: Function;
	className?: string;
	initialValue?: boolean;
	setInitialValue?: React.Dispatch<React.SetStateAction<boolean>>;
	type?: 'active' | 'default';
};
const FavouriteButton: FC<FavouriteButtonProps> = ({
	className,
	funcNoActive,
	funcActive,
	initialValue,
	setInitialValue,
	type,
}) => {
	const onClick = () => {
		if (setInitialValue) setInitialValue(!initialValue);
		if (type === 'default' && funcActive) funcActive();
		if (type === 'active' && funcNoActive) funcNoActive();
	};

	return (
		<StarTwoTone
			twoToneColor={type === 'active' ? 'red' : undefined}
			className={cn(css.cartFavorites, className)}
			onClick={onClick}
		/>
	);
};
export default FavouriteButton;
