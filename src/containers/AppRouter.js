import React from 'react';
import "../index.scss";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios'
import { useSelector } from 'react-redux';

import PrivateRoute from 'components/PrivateRoute';
// screens 
import User from './User'
import SignIn from './SignIn'
import Withdraw from './Withdraw'
import Statistics from './Statistics'
import Kyc from './Kyc'
import NotFound from './NotFound'
import UserDetail from './UserDetail'

const AppRouter = () => {
  // const user = useSelector((state) => state?.rootReducer?.user);
  // if(user) {
  //   console.log("user", user)
  //   axios.defaults.headers = {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${user?.token}`,
  // }
  // axios.interceptors.response.use((response) => {
  //     return response;
  // }, (error) => {
  //     if (error.response && error.response.status === 401) {
  //         axios.defaults.headers = {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //         }
  //     } else
  //         return Promise.reject(error);
  // });
  // }
  // console.log("ueser", user)
  return (
    <BrowserRouter>
      <Routes>
          <Route path='*' element={<NotFound />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn/>}/>

          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          <Route
            path="/kyc"
            element={
              <PrivateRoute>
                <Kyc />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-detail"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />

      </Routes>
  </BrowserRouter>
  );
};

export default AppRouter;