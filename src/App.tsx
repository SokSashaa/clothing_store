import React from 'react';
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AccountPage from "./pages/Account/AccountPage";
import ProductPageInCategory from "./pages/ProductPageInCategory/ProductPageInCategory";
import {useAppDispatch} from "./hooks/redux";
import {checkTocken} from "./utils/checkAuth";
import {deleteUser} from "./store/reducers/userSlice";
import ProductPage from "./pages/ProductPage/ProductPage";


function App() {
    const dispatch = useAppDispatch();
    !checkTocken()&&dispatch(deleteUser())
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/categories'} element={<CategoriesPage/>}/>
                <Route path={'/categories/:id'} element={<ProductPageInCategory/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
                <Route path={'/product/:id'} element={<ProductPage/>}/>
                <Route path={'/favorite'} element={<></>}/>
            </Routes>
        </div>
    );
}

export default App;
