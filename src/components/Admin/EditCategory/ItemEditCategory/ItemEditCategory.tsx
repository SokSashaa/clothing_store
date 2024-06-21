import React, {FC, useState} from 'react';
import {getSrcOnImgCategory} from '../../../../api/category';
import css from './ItemEditCategory.module.scss';
import {categoryDto} from '../../../../api/dto/category.dto';
import {Button, Modal, notification} from 'antd';
import {ModalDanger} from '../../../../ui-kit/ModalDanger/ModalDanger';
import * as Api from '../../../../api';
import FormUpdateCategory from '../../../Forms/FormUpdateCategory/FormUpdateCategory';
import {useModalState} from '../../../../hooks/useModalState';

type ItemEditCategoryProps = {
	category: categoryDto;
};
const ItemEditCategory: FC<ItemEditCategoryProps> = ({category}) => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);

	const deleteCategory = () => {
		Api.category
			.deleteCategory(category)
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
		'Удалить категорию?',
		`Вы уверены, что хотите удалить категорию ${category.category_name}?`,
		deleteCategory
	);

	return (
		<div className={css.wrapperItemCategory}>
			<h3>{category.category_name}</h3>
			<img src={`${getSrcOnImgCategory}${category.category_img_name}`} alt={category.category_name} />
			<div className={css.buttons}>
				<Button type={'primary'} onClick={openModal}>
					Изменить
				</Button>
				<Button danger onClick={showModalDelete}>
					Удалить
				</Button>
			</div>
			<Modal open={isModalOpen} title="Обновление категории" onCancel={closeModal} footer={null}>
				<FormUpdateCategory category={category} closeModal={closeModal} />
			</Modal>
		</div>
	);
};
export default ItemEditCategory;
