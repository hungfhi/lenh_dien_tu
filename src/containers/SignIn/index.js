import { Button, Spin, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setProfileUser } from 'redux/action'
import { useDispatch } from 'react-redux';
import { PhoneOutlined, LockFilled } from "@ant-design/icons";
import ServiceBase from "utils/ServiceBase";
import { $Cookies } from 'utils/cookies';
import { COLOR_PRIMARY } from 'theme/colors';
import BG from '../../assets/images/bg.png';
import { Ui } from "utils/Ui";
import { auth } from '../../configs'
const SignIn = ({ className }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [form] = Form.useForm();

  const isNumber = (str) => {
    var pattern = /^\d+$/;
    return pattern.test(str)
  }

  const onFinish = async (values) => {
    const payload = {
      phone: values?.phone,
      password: values?.password
    }
    if (!isNumber(payload?.phone))
      return message.warning('Số điện thoại không hợp lệ');
    if (!(payload?.phone).startsWith('0'))
      return message.warning('Số điện thoại không hợp lệ');

    auth.onLogin(payload)
      .then(res => {
        if (res.status === 200) {
          dispatch(setProfileUser({
            info:res?.data?.data?.info,
            token: res?.data?.data?.access_token,
            token_type: res?.data?.data?.token_type,
          }));
          Ui.showSuccess({ message: "Đăng nhập hệ thống thành công" });
          navigate("/", { replace: true })
        }
      })
      .catch(err => {
        Ui.showError({ message: err?.response?.data?.message });
      })

    // setTimeout(() => {
    //   navigate("/home", { replace: true })
    // }, 500)

  };

  const onFinishFailed = (errorInfo) => {
  };


  return (
    <div className={className} >
      {/* style={{ backgroundImage: `url(${BG})` }} */}
      <div className='flex items-center justify-center flex-1' style={{ marginTop: -200, }}>
        <div className='form flex flex-col items-center justify-center bg-white px-16 py-10 rounded-2xl'>
          <div className='font-600 fs-32 mb-6'>Đăng nhập</div>
          <Spin spinning={loading}>
            <Form name="basic" autoComplete="off" onFinish={onFinish} form={form}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="phone" rules={[{ required: true, message: 'Hãy nhập tài khoản đăng nhập' }]}>
                <Input
                  size="large"
                  placeholder={'Tên đăng nhập'}
                  prefix={<PhoneOutlined />}
                  style={{ borderRadius: 12, height: 50, width: 300, }}
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Hãy nhập mật khẩu của bạn' }]}>
                <Input.Password
                  size="large"
                  placeholder={'Mật khẩu'}
                  prefix={<LockFilled />}
                  style={{ borderRadius: 12, height: 50, width: 300, }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={false}
                  htmlType="submit"
                  className="login-button" style={{
                    backgroundColor: COLOR_PRIMARY
                  }}>
                  <b className='fs-16' style={{ color: "#fff" }}>{'Đăng nhập'}</b>
                </Button>
              </Form.Item>
            </Form>
          </Spin>

        </div>
      </div>
    </div>
  );
};

export default styled(SignIn)`
  background-image:url(${BG})
  height: 100vh;
  display: flex;
  background-position: center center!important;
  background-size: cover!important;
  transition: all 0.5s ease;
  background-color: white !important;
  height: 100vh;
  display: flex;
  align-items: center;
  .login-button {
    /* Auto layout */
  
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
  
    width: 100%;
    height: 48px;
  
    background: '#01579B';
    border: 0px;
    border-radius: 12px;
  }
  .login-button:hover {
    background: '#01579B';
  }
  .login-button:active {
    background: '#01579B';
  }
  .login-button:focus {
    background: '#01579B';
  }
  .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
    border-color: #01579B !important;
    box-shadow: 0 0 0 2px rgba(240, 115, 13, 0.2) !important;
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: #01579B !important;
  }
`;