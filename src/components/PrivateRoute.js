import React from 'react';
import { Navigate } from "react-router-dom";
import LayoutContent from './LayoutContent'
import { useSelector, useDispatch } from 'react-redux';

const PrivateRoute = ({ children}) => {
    const user = useSelector((state) => state?.rootReducer?.user);

    const auth = user?.token || false;
    return auth ? <LayoutContent children={children}/> : <Navigate to="/sign-in" />;
}


export default PrivateRoute;