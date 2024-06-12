import {FC} from 'react';
import {Cookies} from 'react-cookie';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import React from 'react';

const cookies = new Cookies();
const AccountPage: FC = () => {
	return <AccountInfo />;
};
export default AccountPage;
