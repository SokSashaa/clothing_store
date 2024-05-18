import React from 'react';
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AccountPage from "./pages/Account/AccountPage";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/categories'} element={<CategoriesPage/>}>
                    <Route path={'/:id'} element={<><h1>123</h1></>}/>
                </Route>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
                <Route path={'/favorite'} element={<></>}/>
            </Routes>
        </div>
    );
}

export default App;
