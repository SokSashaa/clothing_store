import React, {FC} from 'react';
import {CloseOutlined, EditOutlined} from '@ant-design/icons';
import {Button, ButtonProps} from 'antd';

type EditCancelButton = ButtonProps & {
	icontype: 'edit' | 'close';
};

const ActionButton: FC<EditCancelButton> = (props) => {
	const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (props.onClick) {
			props.onClick(event);
		}
		event.stopPropagation();
	};
	return (
		<Button {...props} onClick={onClick}>
			{props.icontype === 'edit' ? <EditOutlined /> : <CloseOutlined />}
		</Button>
	);
};

export default ActionButton;
