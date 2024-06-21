import React, {FC} from 'react';
import {userDTO} from '../../api/dto/user.dto';
import css from './ItemUser.module.scss';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import * as Api from '../../api';
import {Modal, notification} from 'antd';
import {ModalDanger} from '../../ui-kit/ModalDanger/ModalDanger';
import {useModalState} from '../../hooks/useModalState';
import FormUpdateUser from '../Forms/FormUpdateUser/FormUpdateUser';

type ItemUserProps = {
	user: userDTO;
};

const ItemUser: FC<ItemUserProps> = ({user}) => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);
	const deleteUser = () => {
		Api.userApi
			.deleteUser(user.id)
			.then(() => {
				notification.success({
					message: 'Успешно!',
					duration: 2,
				});
			})
			.catch((error) => {
				notification.error({
					message: 'Ошибка!',
					description: error.response.data.message,
					duration: 2,
				});
			});
	};

	const showModelDelete = ModalDanger(
		'Удалить пользователя?',
		`Вы уверены, что хотите удалить пользователя ${user.email}?`,
		deleteUser
	);

	return (
		<div className={css.root}>
			<div>
				<p>{user.email}</p>
				<p className={css.firstname}>
					{user.firstname} {user.lastname}
				</p>
			</div>

			<div className={css.icons}>
				<EditOutlined onClick={openModal} />
				<DeleteOutlined onClick={showModelDelete} />
			</div>
			<Modal open={isModalOpen} title="Обновление пользователя" onCancel={closeModal} footer={null}>
				<FormUpdateUser user={user} closeModal={closeModal} />
			</Modal>
		</div>
	);
};

export default ItemUser;
