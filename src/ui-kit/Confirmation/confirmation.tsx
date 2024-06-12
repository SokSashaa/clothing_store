import {Modal} from 'antd';

const {confirm} = Modal;

type confirmationArguments = {
	message: string;
	onOk: () => any;
	onCancel?: () => any;
};

export const confirmation = ({message, onOk, onCancel}: confirmationArguments) => {
	confirm({
		title: `Внимание`,
		content: message,
		cancelText: 'Нет',
		okText: 'Да',
		onOk,
		onCancel,
	});
};
