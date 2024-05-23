import React from 'react';
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AccountPage from "./pages/Account/AccountPage";
import ProductPageInCategory from "./pages/ProductPageInCategory/ProductPageInCategory";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/categories'} element={<CategoriesPage/>}/>
                <Route path={'/categories/:id'} element={<ProductPageInCategory/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
                <Route path={'/favorite'} element={<></>}/>
            </Routes>
        </div>
    );
}

export default App;
