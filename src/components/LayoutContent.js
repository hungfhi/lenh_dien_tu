import React, { useEffect, useState } from 'react';
import "../index.scss";
import { Link, useLocation } from "react-router-dom"
import _ from 'lodash'
import { Breadcrumb, Layout, Menu, Modal, Dropdown, Button } from 'antd';
import icon_logo from 'assets/icon_logo.png';
import { LIST_MENU_SIDE_BAR } from 'utils/constants';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setProfileUser } from 'redux/action'
import { COLOR_PRIMARY, COLOR_WHITE } from 'theme/colors';
import { DIMENSION_PADDING_NORMAL } from 'theme/dimensions';
import { UserOutlined } from '@ant-design/icons';
import { Ui } from "utils/Ui";
import styled from 'styled-components';
import { auth } from '../configs'
const { confirm } = Modal;
const { Content, Sider } = Layout;

const LayoutContent = ({ children, className }) => {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.rootReducer?.user);
  const pathnames = location?.pathname.split("/").filter((item) => item);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const [collapsed, setCollapsed] = useState(false);



  const onClickMenu = (item) => {
    if (item.key == 'logout') {
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
  const onLogOut = () => {
    const payload = {
      phone: user?.phone,
      password: user?.password
    }
   
    auth.onLogin(payload)
      .then(res => {
        if (res.status === 200) {
          dispatch(setProfileUser({
            info:res?.data?.data?.info,
            token: res?.data?.data?.access_token,
            token_type: res?.data?.data?.token_type,
          }));
          Ui.showSuccess({ message: "Đăng nhập hệ thống thành công" });
          navigate("/sign-in", { replace: true })
        }
      })
      .catch(err => {
        Ui.showError({ message: err?.response?.data?.message });
      })
    
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/account">
          Thông tin tài khoản
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={onLogOut}>
          Đăng xuất
        </a>
      ),
    },
  ];


  return (
    <Layout
      className={className}
      style={{ minHeight: '100vh', }}
    >
      <Sider className='cms_sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{ height: 50 }}
          className="cursor-pointer"
          onClick={() => {
            // navigate('/user')
          }}
        >
          {
            !collapsed ? (
              <div className='mx-6 my-2 font-600 fs-20 '>
                Admin Havaz
              </div>
            ) : <div className='flex justify-center items-center'>
              <img src={icon_logo} className="img-menu-logo w-10 mt-2" />
            </div>
          }
        </div>
        <Menu
          onClick={onClickMenu}
          defaultSelectedKeys={['home']}
          mode="inline"
          items={LIST_MENU_SIDE_BAR}
          inlineIndent={10}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{ margin: '0px 0px', }}
        >
          <div className='flex justify-between items-center' style={{ minHeight: 48, backgroundColor: COLOR_PRIMARY, paddingLeft: DIMENSION_PADDING_NORMAL }}>
            <Breadcrumb separator=">">
              {pathnames.map((name, index) => {
                let newName = '';
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                if (!isLast || index === 0) {
                  LIST_MENU_SIDE_BAR.map(item => {
                    if (item?.key === name) {
                      newName = item?.label
                    }
                  })
                } else {
                  LIST_MENU_SIDE_BAR.map(item => {
                    item?.children?.map(row => {
                      if (row?.key === location?.pathname.slice(1)) {
                        newName = row?.label
                      }
                    })
                  })
                }
                return isLast ? (
                  <Breadcrumb.Item>{capitalize(newName)}</Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>{capitalize(newName)}</div>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <div className='font-600 fs-14' style={{ color: COLOR_WHITE, padding: DIMENSION_PADDING_NORMAL }}><Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <div style={{ cursor: 'pointer', padding: "4px 4px", borderRadius: 4, border: "2px solid white", }}><UserOutlined style={{ fontSize: 16 }} />&nbsp;&nbsp;{user?.info?.username}</div>
            </Dropdown></div>
          </div>
          <div className="site-layout-background" style={{ minHeight: '90%', borderRadius: 10, margin: 15 }}  >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default styled(LayoutContent)`
  .ant-breadcrumb a {
    font-weight: 600;
    color: white
}
.ant-breadcrumb li:last-child {
  color: white
}
.ant-breadcrumb-separator {
  color: white
}
`