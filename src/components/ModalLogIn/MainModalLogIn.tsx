import React, {FC} from 'react';
import Cart from '../Header/Cart/Cart';
import account from '../../images/account.svg';
import {useModalState} from '../../hooks/useModalState';
import {Modal} from 'antd';
import LogInForm from '../Forms/LogInForm/LogInForm';
import FavouriteButtonInHeader from '../Header/FavouriteButtonInHeader/FavouriteButtonInHeader';

const MainModalLogIn: FC = () => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);
	return (
		<div className={'wrapperIconsInHeader'}>
			<div className={'blockWrapperIconInHeader'} onClick={openModal}>
				<img className={'imgInHeader'} src={account} alt={'Аккаунт'} />
				<p>Вход</p>
			</div>
			<Modal title={'Вход'} open={isModalOpen} onCancel={closeModal} onOk={() => closeModal} centered footer={[]}>
				<LogInForm closeModal={closeModal} />
			</Modal>
			<Cart />
			<FavouriteButtonInHeader />
		</div>
	);
};

export default MainModalLogIn;
