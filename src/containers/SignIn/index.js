import { Button, Spin, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {setProfileUser} from 'redux/action'
import { useDispatch } from 'react-redux';
import { MailOutlined, LockFilled } from "@ant-design/icons";
import ServiceBase from "utils/ServiceBase";
import { $Cookies } from 'utils/cookies';

const SignIn = ({className}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true)
    const payload = {
      email: values?.email,
      password: values?.password
    }
     dispatch(setProfileUser({
        ...values,
        token: 'result?.value?.token?.token',
      }));
      setTimeout(() => {
        navigate("/user", {replace: true}) 
      }, 500)
    // const result = await ServiceBase.requestJson({
    //   method: "POST",
    //   url: `auth/admin/login`,
    //   data: payload,
    // });
    // setLoading(false)
    // if(result?.value?.status == 200) {
    //   $Cookies.set('JWT_TOKEN', result?.value?.token?.token);

    //   dispatch(setProfileUser({
    //     ...values,
    //     token: result?.value?.token?.token,
    //   }));
    //   setTimeout(() => {
    //     navigate("/user", {replace: true}) 
    //   }, 500)
    // } else {
    //   setLoading(false)
    //   notification['error']({
    //     message: 'Đăng nhập thất bại',
    //     description: result?.value?.msg,
    //   });
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  console.log("Button", form)

  return (
    <div className={className}>
      <div style={{background: '#CD5D42', width: 200, height: '100vh'}}/>
      <div className='flex items-center justify-center flex-1'>
        <div className='form flex flex-col items-center justify-center bg-white px-16 py-10 rounded-2xl'>
          <div className='font-600 fs-48 mb-6'>Log in</div>
          <Spin spinning={loading}>
            <Form name="basic" autoComplete="off" onFinish={onFinish} form={form}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                  size="large"
                  placeholder={'Your email'}
                  prefix={<MailOutlined />}
                  style={{  backgroundColor: "#F4F4F4", borderRadius: 12, height: 50, width: 300, }}
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input.Password
                  size="large"
                  placeholder={'Password'}
                  prefix={<LockFilled />}
                  style={{  backgroundColor: "#F4F4F4", borderRadius: 12, height: 50, width: 300, }}
                />
              </Form.Item>
              <Form.Item>
                <Button loading={false} htmlType="submit" className="login-button">
                  <b className='fs-16' style={{ color: "#fff" }}>{'Log in'}</b>
                </Button>
              </Form.Item>
            </Form>
          </Spin>
          
        </div>
      </div>
      <div style={{ width: 200,}}/>
    </div>
  );
};

export default styled(SignIn)`
  background-color: #FFE8DB !important;
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
  
    background: rgba(255, 106, 0);
    border: 0px;
    border-radius: 12px;
  }
  .login-button:hover {
    background: rgba(255, 106, 0, 0.8);
  }
  .login-button:active {
    background: rgba(255, 106, 0, 0.8);
  }
  .login-button:focus {
    background: rgba(255, 106, 0, 0.8);
  }
  .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
    border-color: #FF7043 !important;
    box-shadow: 0 0 0 2px rgba(240, 115, 13, 0.2) !important;
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: #FF7043 !important;
  }
`;