import React, {FC} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import css from './Wrapper.module.scss';

type propsWrapper = {
	children: React.ReactNode;
};
const Wrapper: FC<propsWrapper> = ({children}) => {
	return (
		<div className={css.master}>
			<main>
				<Header />
				{/*<Breadcrumbs />*/}
				{children}
			</main>
			<Footer />
		</div>
	);
};
export default Wrapper;
