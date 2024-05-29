import React from 'react';
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProductPageInCategory from "./pages/ProductPageInCategory/ProductPageInCategory";
import {useAppDispatch} from "./hooks/redux";
import {checkToken} from "./utils/checkAuth";
import {deleteUser} from "./store/reducers/userSlice";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AccountPage from "./pages/Account/AccountPage";


function App() {
    const dispatch = useAppDispatch();
    !checkToken() && dispatch(deleteUser())

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/categories'} element={<CategoriesPage/>}/>
                <Route path={'/categories/:id'} element={<ProductPageInCategory/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
                <Route path={'/product/:id'} element={<ProductPage/>}/>
                <Route path={'/search/:name'} element={<SearchPage/>}/>
                <Route path={'/favorite'} element={<></>}/>
                <Route element={<ProtectedRoute rule={'user'}/>}>
                    <Route path={'/account'} element={<AccountPage/>}/>
                </Route>
                <Route element={<ProtectedRoute rule={'role'}/>}>
                    <Route path={'/admin'} element={<AdminPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
