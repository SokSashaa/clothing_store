import React, {FC} from 'react';
import css from './EditCategory.module.scss';
import {Button, Modal} from 'antd';
import {useModalState} from '../../../hooks/useModalState';
import CreateCategoryForm from '../../Forms/CreateCategoryForm/CreateCategoryForm';
import SearchCategory from './SearchCategory/SearchCategory';

const EditCategory: FC = () => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);
	// const [categories,setCategories] = useState<categoryDto[]>(initCategory)
	// useEffect(() => {
	//     Api.category.getAllCategory().then((value)=>setCategories(value))
	// }, []);
	return (
		<div className={css.root}>
			<Button type={'primary'} className={css.buttonAdd} onClick={openModal}>
				Создать
			</Button>
			<Modal open={isModalOpen} title="Создание категории" onCancel={closeModal} destroyOnClose footer={null}>
				<CreateCategoryForm closeModal={closeModal} />
			</Modal>
			<SearchCategory />
			{/*<div className={css.items}>*/}
			{/*    {categories.map(item=> <ItemEditCategory category={item}/>)}*/}
			{/*</div>*/}
		</div>
	);
};
export default EditCategory;
