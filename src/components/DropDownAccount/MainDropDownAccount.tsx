import {FC} from 'react';
import DropDownAccount from './DropDownAccount';
import account from '../../images/account.svg';
import Cart from '../Cart/Cart';
import React from 'react';

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
		</div>
	);
};

export default MainDropDownAccount;
