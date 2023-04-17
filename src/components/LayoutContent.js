import React, { useEffect, useState } from 'react';
import "../index.scss";
import { Link,  useLocation } from "react-router-dom"
import _ from 'lodash'
import { Breadcrumb, Layout, Menu, Modal, Dropdown, Button } from 'antd';
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
import { DIMENSION_PADDING_MEDIUM } from 'theme/dimensions';
const { confirm } = Modal;
const { Content, Sider } = Layout;

const LayoutContent = ({ children, className }) => {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.rootReducer?.user);
  const menu = useSelector((state) => state?.rootReducer?.menu);
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
          }
        },
      });
    } else {
      navigate(`${item.key}`, { replace: true });
    }
  }
  const onLogOut = () => {
    const payload = {
      phone: user?.phone,
      password: user?.password
    }
   
    auth.onLogout(payload)
      .then(res => {
        if (res.status === 200) {
          dispatch(setProfileUser(null));
          Ui.showSuccess({ message: "Đăng xuất hệ thống thành công" });
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
        <a target="_blank" rel="noopener noreferrer" href="/me">
          Tài khoản
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
            ) :  <div className='mx-6 my-2 font-600 fs-20 '>
                HV
              </div>
          }
        </div>
        <Menu
          onClick={onClickMenu}
          defaultSelectedKeys={['home']}
          mode="inline"
          items={menu}
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

                // if (!isLast || index === 0) {
                //   menu.map(item => {
                //     if (item?.key === name) {
                //       newName = item?.label
                //     }
                //   })
                // } else {
                  menu?.map(item => {
                    item?.children?.map(row => {
                      if (row?.key === location?.pathname) {
                        newName =<div>{item?.label}<span> > </span> <span style={{fontWeight:600}}>{row?.label}</span></div>
                      }
                    })
                  })
                // }
                console.log('newName',newName)
                return  <Breadcrumb.Item>
                    <div style={{color:'white'}}>{newName}</div>
                  </Breadcrumb.Item>
              })}
            </Breadcrumb>
            <div className='font-600 fs-14' style={{ color: COLOR_WHITE, padding: DIMENSION_PADDING_NORMAL }}><Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <div style={{ cursor: 'pointer', padding: "4px 4px", borderRadius: 4,  }}><UserOutlined style={{ fontSize: 16 }} />&nbsp;&nbsp;{user?.info?.username}</div>
            </Dropdown></div>
          </div>
          <div className="site-layout-background" style={{ minHeight: '90%', borderRadius: 10, margin: DIMENSION_PADDING_MEDIUM }}  >
           <div style={{padding: DIMENSION_PADDING_MEDIUM }}>
            {children}
           </div>
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