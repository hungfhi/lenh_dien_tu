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
import SignIn from './SignIn'
import Home from './Home'
import NotFound from './NotFound'
import Account from './Account';
import { Ui } from 'utils/Ui';
import { setLoad, setMenu } from 'redux/action';
import { setProfileUser } from '../redux/action';
import ListUser from './Users/ListUser';
import Roles from './Users/Roles';
import TransportUnit from './Manage/TransportUnit';
import { apis } from 'configs';
import Router from './Manage/Router';
import Module from './Manage/Module';
import Personnel from './Category/Personnel';
import Vehicle from './Category/Vehicle';
import ShippingRoute from './Category/ShippingRoute';
import CarPark from './Manage/CarPark';
import Contract from './ParkManage/Contract';
import Product from './Category/Product';
import ProvinceCity from './Category/ProvinceCity';
import District from './Category/District';
import UserMerchant from './Manage/UserMerchant';
import RouteManagement from './Category/RouteConfiguration';
import BusinessType from './Category/BusinessType';
import UserStation from './Manage/UserStation';
import QualityStandard from './Category/QualityStandard';
const AppRouter = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.rootReducer?.user);
  const load = useSelector((state) => state?.rootReducer?.load);
  useEffect(() => {
    if (user) {
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
          dispatch(setProfileUser(null));
        } else
          return Promise.reject(error);
      });
    }
  }, [user])



  useEffect(() => {
    if (user) {
      axios.defaults.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${user?.token_type} ${user?.token}`,
      }
      apis.getMenu()
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
                  children: null
                })
              })
              convertMenu.push({
                ...item,
                key: item?.path === '#' ? '#' + item?.name : item?.path,
                label: item?.name,
                children: newChild
              })
            })

            dispatch(setMenu(convertMenu));
            dispatch(setLoad(false));
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
        })
    }
  }, [user, load])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />

        <Route path="/sign-in" element={<SignIn />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/me"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/transport-unit"
          element={
            <PrivateRoute>
              <TransportUnit />
            </PrivateRoute>
          }
        />

        <Route
          path="/module"
          element={
            <PrivateRoute>
              <Module />
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
          path="/personnel"
          element={
            <PrivateRoute>
              <Personnel />
            </PrivateRoute>
          }
        />
        <Route
          path="/vehicle"
          element={
            <PrivateRoute>
              <Vehicle />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipping-route"
          element={
            <PrivateRoute>
              <ShippingRoute />
            </PrivateRoute>
          }
        />
        <Route
          path="/car-park"
          element={
            <PrivateRoute>
              <CarPark />
            </PrivateRoute>
          }
        />
        <Route
          path="/contract"
          element={
            <PrivateRoute>
              <Contract />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/province-city"
          element={
            <PrivateRoute>
              <ProvinceCity />
            </PrivateRoute>
          }
        />
        <Route
          path="/district"
          element={
            <PrivateRoute>
              <District />
            </PrivateRoute>
          }
        />
        <Route
          path="/merchant-user"
          element={
            <PrivateRoute>
              <UserMerchant />
            </PrivateRoute>
          }
        />
        <Route
          path="/business-type"
          element={
            <PrivateRoute>
              <BusinessType />
            </PrivateRoute>
          }
        />
        <Route
          path="/route-configuration"
          element={
            <PrivateRoute>
              <RouteManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/station-user"
          element={
            <PrivateRoute>
              <UserStation />
            </PrivateRoute>
          }
        />
        <Route
          path="/quality-standard"
          element={
            <PrivateRoute>
              <QualityStandard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;