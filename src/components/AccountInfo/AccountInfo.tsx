import React, {FC} from 'react';
import css from './accountInfo.module.scss';
import FormAccountInfo from './FormAccountInfo/FormAccountInfo';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';

const AccountInfo: FC = () => {
	return (
		<div className={css.wrapperAccountInfo}>
			<div style={{flexDirection: 'column'}}>
				<h1>Личный аккаунт</h1>
				<div className={css.forms}>
					<div className={css.formWithTitle}>
						<h3>Смена перс.данных</h3>
						<FormAccountInfo />
					</div>
					<div className={css.formWithTitle}>
						<h3>Смена пароля</h3>
						<ChangePasswordForm />
					</div>
				</div>
			</div>
		</div>
	);
};
export default AccountInfo;
