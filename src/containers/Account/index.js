import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Input, Form, Tag, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from 'moment';
import ServiceBase from "utils/ServiceBase";
import { useSelector, useDispatch } from 'react-redux';
import { Map } from "immutable";
import { URI } from "utils/constants";
import { Ui } from "utils/Ui";
import _ from "lodash";
import avatar from '../../assets/images/avatar.jpeg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { auth } from "configs";


const Roles = ({ className, profile }) => {
  const user = useSelector((state) => state?.rootReducer?.user?.info);

  const [users, setUser] = useState({
    logout_other_devices: false
  });
  const [form] = Form.useForm();
  const addBody = useCallback(
    (value, name) => {
      setUser((props) => {
        let nextState = { ...props };
        let strName = name.split('.')
        if (strName.length === 1) {
          nextState[name] = value;
        } else {
          nextState[strName[0]][strName[1]] = value
        }
        return nextState;
      });

    },
    [setUser]
  );


  const checkPassword = useCallback((pass) => {
    let result = false;
    if (pass != users.password)
      result = true

    return result
  }, [users])


  const onUpdate = async () => {
    const payload = {
      password: users?.password,
      password_confirmation: users?.password_confirmation,
      logout_other_devices: users?.logout_other_devices
    }
    auth.onUpdatePass(payload)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Thay đổi mật khẩu thành công" });
        }
      })
      .catch(err => {
        Ui.showError({ message: err?.response?.data?.message });
      })
  };


  useEffect(() => {
  }, [profile])

  return (
    <Row className={className} gutter={[16, 16]}>
      <Form form={form}>
        <Row>
          <Col offset="4" span="8">
            <Row className={className} gutter={[30, 30]}>
              <Col span="24">
                <span className="title-info">Thông tin tài khoản</span>
              </Col>
              <Col span="8">
                <b>Họ tên:</b>
              </Col>
              <Col span="16">{user?.full_name}</Col>
              <Col span="8">
                <b>Email:</b>
              </Col>
              <Col span="16">{user?.email}</Col>
              <Col span="8">
                <b>Sô điện thoại:</b>
              </Col>
              <Col span="16">{user?.phone}</Col>
              <Col span="24">
                <span className="title-info">Cập nhật mật khẩu</span>
              </Col>
              <Col span="8">
                <b>Mật khẩu mới:</b>
              </Col>
              <Col span="16">
                <Form.Item
                  name="password"
                  initialValue={users?.password}
                  rules={[
                    {
                      required: false,
                      message: '',
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (!value) {
                          callback(new Error(`Nhập mật khẩu`));
                        } else if (value.length < 8) {
                          callback(new Error(`Mật khẩu ít nhất 8 ký tự`));
                        } else {
                          callback();
                        }
                      }
                    }
                  ]}
                >
                  <Input.Password
                    placeholder="input password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={(e) => {
                      let { value } = e.target;
                      addBody(value, 'password');
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span="8">
                <b>Xác nhận mật khẩu:</b>
              </Col>
              <Col span="16">
                <Form.Item
                  name="password_confirmation"
                  initialValue={users?.password_confirmation}
                  rules={[
                    {
                      required: false,
                      message: '',
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (!value) {
                          callback(new Error(`Nhập mật khẩu`));
                        } else if (checkPassword(value)) {
                          callback(new Error(`Mật khẩu không khớp`));
                        } else {
                          callback();
                        }
                      }
                    }
                  ]}
                >
                  <Input.Password
                    placeholder="input password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={(e) => {
                      let { value } = e.target;
                      addBody(value, 'password_confirmation');
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span="8"></Col>
              <Col span="16">
                <Button type="primary" onClick={onUpdate}>Cập nhật</Button>
              </Col>
            </Row>
          </Col>
          <Col span="8" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Row>
              <Col>
                <img src={avatar} style={{width:200, height:250}} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Row>
  )
};

Roles.propTypes = {
  className: PropTypes.any
};

export default styled(Roles)`
.order-content {
}
.filter-tab1 {
    margin-top: 20px;
}
.title-info {
  font-size: 24px;
  font-weight: bold;
}

`;