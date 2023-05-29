import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import { manage, users } from "configs";
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
const FormChangePass = ({
    className,
    onSave,
    onChangeP,
    onRefreshList,
    params,
    handleClose,
    getId
}) => {
    const [checkLog, setCheckLog] = useState(false);
    const [form] = Form.useForm();
    const onFinish = async (values) => {

        const payload = {
            // uuid: getId,
            password: values?.password,
            password_confirmation: values?.password_confirmation,
            logout_other_devices: checkLog ? 1 : 0
        }

        manage.changeMerchantUserPassword(getId, payload).then(res => {
            if (res.status === 200) {
                Ui.showSuccess({ message: "Thay đổi mật khẩu thành công" });
                onRefreshList();
                handleClose();
            }
        }).catch(err => {
            message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
        });
    };
    const onFinishFailed = () => {
    };

    const onChange = (e) => {
        setCheckLog(e.target.checked)
    }


    return (
        <div className={className}>
            <Form
                form={form}
                style={{ width: "100%", resize: "auto", height: 250, }}
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                initialValues={{
                    password: undefined,
                    // password_confirmation: '',
                }}
            >
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <div>Mật khẩu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' },
                            { min: 8, message: "Mật khẩu phải từ 8 kí tự trở lên" },
                            {
                                pattern: new RegExp(/^[a-zA0-9.-]+$/i),
                                message: "Chỉ được nhập các kí tự là số hoặc chữ",
                            },
                            ]}
                        >
                            <Input.Password placeholder={"Nhập mật khẩu"} autocomplete="new-password" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div>Nhập lại mật khẩu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="password_confirmation"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy xác nhận lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Mật khẩu bạn đã nhập không khớp!!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder={"Xác nhận mật khẩu"} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Checkbox onChange={onChange}>Đăng xuất khỏi tất cả các thiết bị ?</Checkbox>
                    </Col>
                </Row>
                <div
                    className="action"
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        padding: "20px 20px",
                        background: "#fff",
                        textAlign: "left",
                    }}
                >
                    <Button type="danger" style={{ height: 35 }} onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{ height: 35, float: "right" }}
                    >
                        Xác nhận
                    </Button>
                </div>
            </Form>
        </div>
    );
};
FormChangePass.propTypes = {
    className: PropTypes.any,
};

export default styled(FormChangePass)`
`;
