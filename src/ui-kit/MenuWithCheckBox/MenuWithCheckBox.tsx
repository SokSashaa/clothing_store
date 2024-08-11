import React, {CSSProperties, FC, useCallback, useEffect, useState} from 'react';
import css from './MenuWithCheckBox.module.scss';
import Search from 'antd/es/input/Search';
import {Checkbox} from 'antd';
import cn from 'classnames';
import {getAllCompaniesNameType} from '../../api/dto/company.dto';

type MenuWithCheckBoxProps = {
	className?: string;
	arrayForSort: getAllCompaniesNameType[];
	style?: CSSProperties;
	accessArray?: string[];
	setItemInAccessArray?: (accessArray: string[]) => void;
};
const MenuWithCheckBox: FC<MenuWithCheckBoxProps> = ({accessArray = [], setItemInAccessArray = () => {}, ...props}) => {
	const [valueSearch, setValueSearch] = useState('');
	const [array, setArray] = useState(props.arrayForSort);

	const onChange: React.ComponentProps<'input'>['onChange'] = (value) => {
		setValueSearch(value.target.value);
	};

	useEffect(() => {
		setArray(props.arrayForSort.filter((item) => item.name.includes(valueSearch)));
	}, [valueSearch, props.arrayForSort]);

	const onSearch = useCallback(() => {
		setArray(props.arrayForSort.filter((item) => item.name.includes(valueSearch)));
	}, [props.arrayForSort, valueSearch]);

	const onChangeCheckBox = useCallback(
		(item: string) => {
			const index = accessArray.indexOf(item);
			if (index > -1) {
				accessArray.splice(index, 1);
				setItemInAccessArray(accessArray);
			} else setItemInAccessArray([...accessArray, item]);
		},
		[accessArray, setItemInAccessArray]
	);

	return (
		<div className={cn(css.root, props.className)} style={props.style}>
			<Search placeholder="Поиск..." onSearch={onSearch} onChange={(value) => onChange(value)} />
			<div className={css.items}>
				{array.map((item) => (
					<div className={css.item} key={item.id}>
						<Checkbox onChange={() => onChangeCheckBox(item.id)} />
						<p>{item.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default MenuWithCheckBox;
