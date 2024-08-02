import React, {CSSProperties, FC, HTMLAttributes, useCallback, useEffect, useState} from 'react';
import css from './MenuWithCheckBox.module.scss';
import Search from 'antd/es/input/Search';
import {Checkbox} from 'antd';
import cn from 'classnames';

type MenuWithCheckBoxProps = {
	className?: string;
	arrayForSort: any[];
	style?: CSSProperties;
};
const MenuWithCheckBox: FC<MenuWithCheckBoxProps> = (props: MenuWithCheckBoxProps) => {
	const [valueSearch, setValueSearch] = useState('');
	const [array, setArray] = useState(props.arrayForSort);

	const onChange: React.ComponentProps<'input'>['onChange'] = (value) => {
		setValueSearch(value.target.value);
	};

	useEffect(() => {
		setArray(props.arrayForSort.filter((item) => item.includes(valueSearch)));
	}, [valueSearch, props.arrayForSort]);

	const onSearch = useCallback(() => {
		setArray(props.arrayForSort.filter((item) => item.includes(valueSearch)));
	}, [props.arrayForSort, valueSearch]);

	return (
		<div className={cn(css.root, props.className)} style={props.style}>
			<Search placeholder="Поиск..." onSearch={onSearch} onChange={(value) => onChange(value)} />
			<div className={css.items}>
				{array.map((item) => (
					<div className={css.item}>
						<Checkbox />
						<p>{item}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default MenuWithCheckBox;
