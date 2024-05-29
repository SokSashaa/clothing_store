import React from 'react';
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AccountPage from "./pages/Account/AccountPage";
import ProductPageInCategory from "./pages/ProductPageInCategory/ProductPageInCategory";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkTocken} from "./utils/checkAuth";
import {deleteUser} from "./store/reducers/userSlice";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import SearchPage from "./pages/SearchPage/SearchPage";

import './index.scss'


function App() {
    const dispatch = useAppDispatch();
    !checkTocken() && dispatch(deleteUser())
    return (
        <div className="App" id={'app-root'}>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/categories'} element={<CategoriesPage/>}/>
                <Route path={'/categories/:id'} element={<ProductPageInCategory/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/product/:id'} element={<ProductPage/>}/>
                <Route path={'/search/:name'} element={<SearchPage/>}/>
                <Route path={'/favorite'} element={<></>}/>
                {/*<Route element={<ProtectedRoute isAllow={!!user.email}/>}>*/}
                {/*    <Route path={'/account'} element={<AccountPage/>}/>*/}
                {/*</Route>*/}
            </Routes>
        </div>
    );
}

export default App;
