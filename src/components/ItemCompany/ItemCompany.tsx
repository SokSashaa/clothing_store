import React, {FC, useState} from 'react';
import {ModalDanger} from '../../ui-kit/ModalDanger/ModalDanger';
import * as Api from '../../api';
import {Modal, notification} from 'antd';
import {companyDto} from '../../api/dto/company.dto';
import css from './ItemCompany.module.scss';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useModalState} from '../../hooks/useModalState';
import FormUpdateCompany from '../Forms/FormUpdateCompany/FormUpdateCompany';

type ItemCompanyProps = {
	company: companyDto;
};

const ItemCompany: FC<ItemCompanyProps> = ({company}) => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);

	const deleteCompany = () => {
		Api.company
			.deleteCompany(company)
			.then(() => {
				notification.success({
					message: 'Успешно!',
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

	const showModalDelete = ModalDanger(
		'Удалить компанию?',
		`Вы уверены, что хотите удалить компанию ${company.name}?`,
		deleteCompany
	);

	return (
		<div className={css.root}>
			<div>
				<p>{company.name}</p>
				<p className={css.firstname}>
					ИНН <span>{company.inn}</span>, ОГРН <span>{company.ogrn}</span>
				</p>
			</div>
			<div className={css.icons}>
				<EditOutlined onClick={openModal} />
				<DeleteOutlined onClick={showModalDelete} />
			</div>
			<Modal open={isModalOpen} title="Обновление компании" onCancel={closeModal} footer={null}>
				<FormUpdateCompany closeModal={closeModal} company={company} />
			</Modal>
		</div>
	);
};
export default ItemCompany;
