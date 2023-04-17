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
import TransportUnitManagement from './TransportUnitManagement';
import BusStationManagement from './BusStationManagement';
import VehicleManagement from './VehicleManagement';
import AccountManagement from './AccountManagement';
import BusRouteManagement from './BusRouteManagement';

const AppRouter = () => {
  const user = useSelector((state) => state?.rootReducer?.user);
  if(user) {
    axios.defaults.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${user?.token_type} ${user?.token}`,
  }
  axios.interceptors.response.use((response) => {
      return response;
  }, (error) => {
      if (error.response && error.response.status === 401) {
          axios.defaults.headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      } else
          return Promise.reject(error);
  });
  }
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
          <Route
            path="/category/transport-unit-management"
            element={
              <PrivateRoute>
                <TransportUnitManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/bus-station-management"
            element={
              <PrivateRoute>
                <BusStationManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/vehicle-management"
            element={
              <PrivateRoute>
                <VehicleManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/bus-route-management"
            element={
              <PrivateRoute>
                <BusRouteManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/account-management"
            element={
              <PrivateRoute>
                <AccountManagement />
              </PrivateRoute>
            }
          />

      </Routes>
  </BrowserRouter>
  );
};

export default AppRouter;