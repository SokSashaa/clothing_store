import React, {FC} from 'react';
import {Tag} from 'antd';
import {statusOrderEnum, statusOrderWithNamesAndColors} from '../../../api/dto/orders.dto';

export type TagsOrdersProps = {
	status: statusOrderEnum;
};

const TagsOrders: FC<TagsOrdersProps> = ({status}) => {
	const settingTag = statusOrderWithNamesAndColors.find((item) => item.status === status);
	return settingTag ? <Tag color={settingTag.color}>{settingTag.name}</Tag> : <Tag>Ошибка!</Tag>;
};

export default TagsOrders;
