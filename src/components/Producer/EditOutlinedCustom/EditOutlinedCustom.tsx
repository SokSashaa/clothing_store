import React, {FC} from 'react';
import {ProductWithCategoryDTO} from '../../../api/dto/product.dto';
import {EditOutlined} from '@ant-design/icons';
import {Modal} from 'antd';
import {useModalState} from '../../../hooks/useModalState';
import FormUpdateProduct from '../../Forms/FormUpdateProduct/FormUpdateProduct';

type EditOutlinedCustomProps = {
	product: ProductWithCategoryDTO;
};
const EditOutlinedCustom: FC<EditOutlinedCustomProps> = ({product}) => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);

	return (
		<>
			<EditOutlined onClick={openModal} />
			<Modal open={isModalOpen} title="Обновление продукта" onCancel={closeModal} footer={null}>
				<FormUpdateProduct product={product} closeModal={closeModal} />
			</Modal>
		</>
	);
};
export default EditOutlinedCustom;
