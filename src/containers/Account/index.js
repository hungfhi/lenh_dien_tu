import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import { auth } from "configs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import avatar from '../../assets/images/avatar.jpeg';
import { setProfileUser } from '../../redux/action';
const Roles = ({ className, profile }) => {
  const user = useSelector((state) => state?.rootReducer?.user?.info);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkLog, setCheckLog] = useState(false);
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
      logout_other_devices: checkLog
    }
    auth.onUpdatePass(payload)
      .then(res => {
        if (res.status === 200) {
          message.success('Thay đổi mật khẩu thành công')
          if (payload?.logout_other_devices === true) {
            dispatch(setProfileUser(null));
            navigate("/sign-in", { replace: true })
          }
        }
      })
      .catch(err => {
        message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
      })
  };

  const onChange = (e) => {
    setCheckLog(e.target.checked)
  }


  useEffect(() => {
  }, [profile])


  return (
    <Row className={className} gutter={[16, 16]}>
      <Form form={form} style={{ fontFamily: 'NUNITO' }}>
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
              <Col span="8">
                <b>Căn cước công dân:</b>
              </Col>
              <Col span="16">{user?.citizen_identity}</Col>
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
                <Checkbox onChange={onChange}>Đăng xuất khỏi tất cả các thiết bị ?</Checkbox>
              </Col>
              <Col span="8"></Col>
              <Col span="16">
                <Button type="primary" onClick={onUpdate}>Cập nhật</Button>
              </Col>
            </Row>
          </Col>
          <Col span="8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Row>
              <Col>
                <img src={avatar} style={{ width: 200, height: 250 }} />
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