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
import Home from './Home'
import NotFound from './NotFound'
import Plan from './Plan';
import Category from './Category';
import Command from './Command';
import Report from './Report';
import Admin from './Admin';

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
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <PrivateRoute>
               <Plan />
              </PrivateRoute>
            }
          />
          <Route
            path="/category"
            element={
              <PrivateRoute>
                <Category/>
              </PrivateRoute>
            }
          />
          <Route
            path="/command"
            element={
              <PrivateRoute>
               <Command/>
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />


      </Routes>
  </BrowserRouter>
  );
};

export default AppRouter;