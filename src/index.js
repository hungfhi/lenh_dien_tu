import React from "react";
import ReactDOM from "react-dom";
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import 'antd/dist/antd.css'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios'
import AppRouter from './containers/AppRouter'

const applicationState = JSON.parse(localStorage.getItem('applicationState'));
if(applicationState?.rootReducer?.user?.token) {
    const token = applicationState?.rootReducer?.user?.token

    console.log('applicationState?.rootReducer?.user',applicationState?.rootReducer?.user)
    axios.defaults.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
}

ReactDOM.render(
    <React.StrictMode>
            <Provider store={store}>
                <AppRouter/>
            </Provider>
            <ToastContainer/>
    </React.StrictMode>,
    document.getElementById("root")
);
