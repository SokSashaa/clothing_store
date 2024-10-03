import React, {FC, useCallback, useMemo} from 'react';
import {notification, Select, Tag} from 'antd';
import {statusOrderEnum, statusOrderWithNamesAndColors} from '../../../api/dto/orders.dto';
import {useMutation} from 'react-query';
import * as Api from '../../../api';

export type SelectStatusOrderProps = {
	status: statusOrderEnum;
	onChangeOnCancel?: () => void;
	id_order?: string;
};

const SelectStatusOrder: FC<SelectStatusOrderProps> = ({status, onChangeOnCancel, id_order}) => {
	const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
	};

	const changeStatus = useMutation((newStatus: statusOrderEnum) => { //TODO Подумать
		return Api.orders
			.orderUpdate({
				id_order: id_order,
				status: newStatus,
			})
			.then(() => notification.success({message: 'Успех!'}))
			.catch((error) => notification.error({message: 'Ошибка', description: error.response.data.message}));
	});

	const searchCancel = useMemo(
		() => statusOrderWithNamesAndColors.find((item) => item.status === statusOrderEnum.cancel),
		[]
	);

	const handleChange = useCallback((value: string, option: any) => {
		if (value === searchCancel?.name && onChangeOnCancel) onChangeOnCancel();
		else {
			const search = statusOrderWithNamesAndColors.find((item) => item.name === value);
			search && changeStatus.mutate(search?.status);
		}
	}, []);

	const settingTag = statusOrderWithNamesAndColors.find((item) => item.status === status);
	return settingTag ? (
		<Select
			defaultValue={settingTag.name}
			onClick={onClick}
			onChange={handleChange}
			disabled={status === statusOrderEnum.cancel}
		>
			{statusOrderWithNamesAndColors.map((item) => (
				<Select.Option key={item.name}>
					<Tag color={item.color}>{item.name}</Tag>
				</Select.Option>
			))}
		</Select>
	) : (
		<Tag>Ошибка!</Tag>
	);
};

export default SelectStatusOrder;
