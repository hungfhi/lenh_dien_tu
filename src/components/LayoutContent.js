import React, { useState } from 'react';
import "../index.scss";
import { matchRoutes, useLocation } from "react-router-dom"

import { Breadcrumb, Layout, Menu, Modal } from 'antd';
import icon_logo from 'assets/icon_logo.png';
import {LIST_MENU_SIDE_BAR} from 'utils/constants';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {setProfileUser} from 'redux/action'


const { confirm } = Modal;
const {  Content, Sider } = Layout;

const LayoutContent = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);


  const useCurrentRoute = () => {
    const location = useLocation()
    if(location?.pathname == '/') return {}
    if(matchRoutes(LIST_MENU_SIDE_BAR, location)) {
      const [{ route }] = matchRoutes(LIST_MENU_SIDE_BAR, location)
      return route
    } else {
      return {}
    }
  }
  const currentPathLabel = useCurrentRoute()?.label

  const onClickMenu = (item) => {
    if(item.key == 'logout') {
      confirm({
        title: <>Do you want to log out?</>,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          try {
            dispatch(setProfileUser(null));
          } finally {
            // localStorage.clear();
            // window.location.replace("/");
          }
        },
      });
    } else {
      navigate(`/${item.key}`, { replace: true });
    }
  }

  return (
    <Layout
      style={{ minHeight: '100vh', }}
    >
      <Sider className='cms_sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{height: 50}} className="cursor-pointer" 
          onClick={() => {
            navigate('/user')
          }}
        >
          {
            !collapsed ? (
              <div className='mx-6 my-2 font-600 fs-24 '>
                Admin
              </div>
            ) : <div className='flex justify-center items-center'>
              <img src={icon_logo} className="img-menu-logo w-10 mt-2"/>
            </div>
          }
        </div>
        <Menu onClick={onClickMenu} defaultSelectedKeys={[useCurrentRoute()?.key]} mode="inline" items={LIST_MENU_SIDE_BAR} />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{ margin: '0 16px', }}
        >
          <div className='flex justify-between items-center' style={{minHeight: 60}}>
            <Breadcrumb style={{ margin: '16px 0', }} >
              <Breadcrumb.Item className='font-600 color-black fs-18'>{currentPathLabel}</Breadcrumb.Item>
              <Breadcrumb.Item>{currentPathLabel}</Breadcrumb.Item>
            </Breadcrumb>
           
          </div>
          <div className="site-layout-background" style={{  minHeight: '90%',  borderRadius: 10, }}  >
              {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContent;