import React, { useEffect, useState } from 'react';
import "../index.scss";
import { Link, useLocation } from "react-router-dom"
import _ from 'lodash'
import { Breadcrumb, Layout, Menu, Modal, Dropdown, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setProfileUser } from 'redux/action'
import { COLOR_PRIMARY, COLOR_WHITE } from 'theme/colors';
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
import { UserOutlined, RightOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Ui } from "utils/Ui";
import styled from 'styled-components';
import { auth } from '../configs'
import { DIMENSION_PADDING_MEDIUM } from 'theme/dimensions';
import SubMenu from 'antd/lib/menu/SubMenu';
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

  const onClickMenu = (item) => () => {
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
      <Sider className='cms_sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} trigger={null}>
        <div
          style={{ height: 45 }}
          className="cursor-pointer"
          onClick={() => {
            // navigate('/user')
          }}
        >
          <div className='mx-6 my-2 font-600 fs-20' style={{textAlign:collapsed ?'center':'',display:collapsed ?'flex':'',justifyContent:collapsed ? 'center':''}}>
            {
              !collapsed ? (

                <div style={{ width: 180, color:'#01579B' }}>Admin Havaz <Button
                  type="text"
                  onClick={toggleCollapsed}
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <MenuUnfoldOutlined style={{color:'#01579B'}}/>
                </Button></div>
              ) :
                <Button
                  type="text"
                  onClick={toggleCollapsed}
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <MenuFoldOutlined style={{color:'#01579B'}} />
                </Button>
            }
          </div>
        </div>
        <div style={{ height: 1, backgroundColor: '#E5E5E5' }}></div>
        <Menu
          defaultSelectedKeys={['home']}
          mode="inline"
          inlineIndent={10}
        >
          {_.map(menu, (item) => {
            let _render;

            if (_.size(item.children) > 0) {
              _render = (
                <SubMenu
                  key={item.id}
                  title={<div style={{ color: '#01579B', fontFamily: 'Nunito', fontWeight: 700, fontSize: 14}}>{item.name}</div>}
                  icon={<i className={`fa ${item.icon} pr-2`} style={{ paddingRight: DIMENSION_PADDING_SMALL,color:'#01579B',width:30,display:'flex',justifyContent:'center',alignItems:'center',height:30 }} />}
                  className="menuCustomerItem"
                >
                  {_.map(item.children, (_item, _index) => {
                    return (
                      <Menu.Item
                        key={_item.id}
                        // icon={<i className={`fa ${_item.icon} pr-2`} />}
                        style={{ backgroundColor: '#fff' }}
                      >
                        <div onClick={onClickMenu(_item)} style={{ color: '#01579B', fontFamily: 'Nunito', fontWeight: 700, fontSize: 14 }}>
                          {_item.name}
                        </div>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
              return _render;
            }
          })}

        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{ margin: '0px 0px', }}
        >
          <div className='flex justify-between items-center' style={{ minHeight: 48, backgroundColor: COLOR_PRIMARY, paddingLeft: DIMENSION_PADDING_NORMAL }}>
            <Breadcrumb separator=">">
              {pathnames.map((name, index) => {
                let newName = '';
                menu?.map(item => {
                  item?.children?.map(row => {
                    if (row?.key === location?.pathname) {
                      newName = <div style={{ fontFamily: 'Nunito', fontSize: 14, fontStyle: 'normal' }}>{item?.label}<span> <RightOutlined style={{ fontSize: 12, color: "#fafafa" }} /> </span> <span>{row?.label}</span></div>
                    }
                  })
                })
                return <Breadcrumb.Item>
                  <div style={{ color: 'white' }}>{newName}</div>
                </Breadcrumb.Item>
              })}
            </Breadcrumb>
            <div className='fs-14' style={{ color: COLOR_WHITE, padding: DIMENSION_PADDING_NORMAL, fontWeight:600 }}><Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <div style={{ cursor: 'pointer', padding: "4px 4px", borderRadius: 4, }}><i class="fa-solid fa-user"></i>&nbsp;&nbsp;{user?.info?.username}</div>
            </Dropdown></div>
          </div>
          <div className="site-layout-background" style={{ minHeight: '90%', borderRadius: 10, margin: DIMENSION_PADDING_MEDIUM }}  >
            <div style={{ padding: DIMENSION_PADDING_MEDIUM }}>
              {children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default styled(LayoutContent)`
.ant-menu-inline ul{
  background-color: #ffffff;
}

.ant-menu-inline,
.ant-menu-vertical {
  border-right: 0px solid #f0f0f0;
  background-color: #F9F9F9;
}
.ant-layout-sider-children {
  background-color: #F9F9F9 !important;
  border-right: 1px solid #E5E5E5 !important;
}
.menuCustomerItem .ant-menu .ant-menu-item,
.eNmnEv .ant-menu .ant-menu-submenu-title {
  padding-left: 18px !important;
  border-right: 1px solid #E5E5E5 !important;
}
.ant-menu-inline-collapsed .ant-menu-submenu-title span {
  visibility: hidden;
  transition: all 0.45s ease;
}
.ant-menu-item .ant-menu-item-icon,
.ant-menu-submenu-title .ant-menu-item-icon,
.ant-menu-item .anticon,
.ant-menu-submenu-title .anticon {
  margin-right: unset !important;
}
.ant-menu-submenu-selected {
  color: #000000;
}
.ant-menu-inline .ant-menu-item:hover {
  background: #ffc20e ;
  font-weight: bold;
  color: #000c17 !important;
  a:hover {
    color: #000c17;
  }
}
.ant-menu {
  background-color:#F9F9F9
  .ant-menu-item,
  .ant-menu-submenu-title {
    display: flex;
    align-items: center;
  }
  .ant-menu-submenu-title {
    font-size: 1.1rem;
  }
  .ant-menu-item.ant-menu-item-selected {
    background-color: #F9F9F9;
    color: #000c17 !important;
    border-left: 3px solid #01579B !important;
    border-right: 1px solid #E5E5E5 !important;
    font-weight: bold;
    a {
      color: #000c17 !important;
    }
    .anticon,
    .anticon + span {
      color: #58595b;
      font-weight: bold;
    }
  }
  .ant-menu-submenu-active:hover {
    color: #58595b !important;
    font-weight: bold;
  }
  .ant-menu-item:not(.ant-menu-item-selected):hover > a {
    color: #ffc20e !important;
  }
  .ant-menu-item:hover > a {
    color: #ffc20e !important;
  }
  .ant-menu-item-selected > a {
    color: #58595b;
    font-weight: bold;
  }
  .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-left: 3px solid #01579B !important;
    transform: scaleY(0.0001);
    opacity: 0;
    transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
    content: '';
  }
  .ant-menu-submenu ant-menu-submenu-inline menuCustomerItem ant-menu-submenu-open .ant-menu ant-menu-sub ant-menu-inline {
    background-color: #fff !important
  }
  .ant-menu-inline .ant-menu-item {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    height: 45px
  }
  .ant-menu-submenu-arrow {
    color: #01579B !important;
  }
}
`