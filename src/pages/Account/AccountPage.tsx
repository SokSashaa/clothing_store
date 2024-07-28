import React, {FC} from 'react';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import {Helmet} from 'react-helmet';

const AccountPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Аккаунт - СпецОдежда</title>
				<meta name={'description'} content={'Личный аккаунт пользователя'} />
			</Helmet>
			<AccountInfo />
		</>
	);
};
export default AccountPage;
