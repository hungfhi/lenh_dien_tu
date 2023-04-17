/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import "../index.scss";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
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
import profile from 'configs/profile';
import { Ui } from 'utils/Ui';
import { setMenu } from 'redux/action';
import Roles from './Roles';
import ListUser from './ListUser';
import Merchants from './Merchants';

const AppRouter = () => {
  const dispatch = useDispatch()
 const user = useSelector((state) => state?.rootReducer?.user);

  if(user) {
    console.log("user", user)
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
 

  useEffect(()=>{
    if(user) {
      axios.defaults.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${user?.token_type} ${user?.token}`,
      }
    profile.getMenu()
        .then(res => {
          if (res.status === 200 && res?.data?.data) {
              let convertMenu = []
              res?.data?.data.map(item => {
                let newChild = []
                item?.children.map(row => {
                  newChild.push({
                      ...row,
                    key: row?.path,
                    label: row?.name,
                    children:null
                  })
                })
                convertMenu.push( {
                  ...item,
                  key: item?.path === '#' ? '#'+item?.name : item?.path,
                  label: item?.name,
                  children: newChild
                })
              })
          
              dispatch(setMenu(convertMenu));
            }
        })
        .catch(err => {
          console.log('errerr')
          Ui.showError({ message: err?.response?.data?.message });
        })
    }
  },[user])

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
          <Route
              path="/users"
              element={
                <PrivateRoute>
                  <ListUser />
                </PrivateRoute>
              }
          />
          <Route
              path="/roles"
              element={
                <PrivateRoute>
                  <Roles />
                </PrivateRoute>
              }
          />
          <Route
              path="/merchants"
              element={
                <PrivateRoute>
                  <Merchants />
                </PrivateRoute>
              }
          />

      </Routes>
  </BrowserRouter>
  );
};

export default AppRouter;