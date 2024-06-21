import React, {FC} from 'react';
import {Button, Modal} from 'antd';
import css from './EditCompany.module.scss';
import CreateCompanyForm from '../../Forms/FormCreateCompany/CreateCompanyForm';
import {useModalState} from '../../../hooks/useModalState';
import SearchCompany from '../../SearchCompany/SearchCompany';

const EditCompany: FC = () => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);

	return (
		<div className={css.root}>
			<Button type={'primary'} className={css.buttonAdd} onClick={openModal}>
				Создать
			</Button>

			<Modal open={isModalOpen} title="Создание компании" onCancel={closeModal} destroyOnClose footer={null}>
				<CreateCompanyForm closeModal={closeModal} />
			</Modal>
			<SearchCompany />
		</div>
	);
};
export default EditCompany;
