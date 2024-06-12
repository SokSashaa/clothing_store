import React from 'react';
import MainPage from './pages/MainPage/MainPage';
import {Route, Routes} from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProductPageInCategory from './pages/ProductPageInCategory/ProductPageInCategory';
import {useAppDispatch} from './hooks/redux';
import {checkToken} from './utils/checkAuth';
import {deleteUser} from './store/reducers/userSlice';
import ProductPage from './pages/ProductPage/ProductPage';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import SearchPage from './pages/SearchPage/SearchPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AccountPage from './pages/Account/AccountPage';
import AdminEditUser from './components/Admin/AdminEditUser/AdminEditUser';
import EditCompany from './components/Admin/EditCompany/EditCompany';
import EditCategory from './components/Admin/EditCategory/EditCategory';
import ProducerPage from './pages/ProducerPage/ProducerPage';
import ProductsProducer from './components/Producer/ProductsProducer';
import Wrapper from './components/Wrapper/Wrapper';
import {CartPage} from './pages/CartPage/CartPage';
import {routesMap} from './utils/routesMap';

function App() {
	const dispatch = useAppDispatch();
	!checkToken() && dispatch(deleteUser());

	return (
		<Wrapper>
			<Routes>
				<Route path={routesMap.main} element={<MainPage />} />
				<Route path={routesMap.categories} element={<CategoriesPage />}></Route>
				<Route path={routesMap.categoriesWithId} element={<ProductPageInCategory />} />
				<Route path={routesMap.register} element={<RegisterPage />} />
				<Route path={routesMap.product} element={<ProductPage />} />
				<Route path={routesMap.search} element={<SearchPage />} />
				<Route path={'/favorite'} element={<></>} />
				<Route path={routesMap.cart} element={<CartPage />} />
				<Route element={<ProtectedRoute rule={'user'} />}>
					<Route path={routesMap.account} element={<AccountPage />} />
				</Route>
				<Route element={<ProtectedRoute rule={'roleAdmin'} />}>
					<Route path={routesMap.admin.page} element={<AdminPage />}>
						<Route path={routesMap.admin.editUser} element={<AdminEditUser />} />
						<Route path={routesMap.admin.company} element={<EditCompany />} />
						<Route path={routesMap.admin.editCategory} element={<EditCategory />}></Route>
					</Route>
				</Route>
				<Route element={<ProtectedRoute rule={'roleProducer'} />}>
					<Route path={routesMap.myCompany.page} element={<ProducerPage />}>
						<Route path={routesMap.myCompany.products} element={<ProductsProducer />} />
					</Route>
				</Route>
			</Routes>
		</Wrapper>
	);
}
export default App;
