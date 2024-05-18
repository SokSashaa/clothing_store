import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {BrowserRouter,} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

