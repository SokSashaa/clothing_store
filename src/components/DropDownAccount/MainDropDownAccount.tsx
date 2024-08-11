import {FC} from 'react';
import DropDownAccount from './DropDownAccount';
import account from '../../images/account.svg';
import Cart from '../Header/Cart/Cart';
import React from 'react';
import FavouriteButtonInHeader from '../Header/FavouriteButtonInHeader/FavouriteButtonInHeader';

const MainDropDownAccount: FC = () => {
	return (
		<div className={'wrapperIconsInHeader'}>
			<DropDownAccount>
				<div className={'blockWrapperIconInHeader'}>
					<img className={'imgInHeader'} src={account} alt={'Аккаунт'} />
					<p>Аккаунт</p>
				</div>
			</DropDownAccount>
			<Cart />
			<FavouriteButtonInHeader />
		</div>
	);
};

export default MainDropDownAccount;
