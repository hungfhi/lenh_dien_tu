import { ContactsFilled } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { RoleSelect } from "components";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash"
const { RangePicker } = DatePicker;
const { Option } = Select;

const { TextArea } = Input;
const FormAccount = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {
    let perByRole = itemSelected?.roles || []
    let list_roles = _.map(perByRole, (i) => {
        return {
            value: i?.id,
            label: i?.name,
        }
    })
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    return (
        <div className={className}>
            <Form
                form={form}
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    email: itemSelected && itemSelected.email || '',
                    username: itemSelected && itemSelected.username || '',
                    full_name: itemSelected && itemSelected.full_name || '',
                    password: itemSelected && itemSelected.password || '',
                    password_confirmation: itemSelected && itemSelected.password_confirmation || '',
                    roles: list_roles || '',
                    phone: itemSelected && itemSelected.phone,
                    citizen_identity: itemSelected && itemSelected.citizen_identity,
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <div>Email<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email', },
                            { type: "email", message: 'Vui lòng nhập đúng định dạng email' },
                            ]}
                        >
                            <Input placeholder={"Nhập Email"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Họ tên<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="full_name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' },]}
                        >
                            <Input placeholder={"Nhập họ tên"} autocomplete="new-password" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>
                            Tên hiển thị<span style={{ color: "#dc2d2d" }}>(*)</span>
                        </div>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị' },]}
                        >
                            <Input placeholder={"Nhập tên hiển thị"} disabled={itemSelected ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>
                            Số điện thoại<span style={{ color: "#dc2d2d" }}>(*)</span>
                        </div>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại" },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder={"Nhập số điện thoại"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>
                            CCCD | CMT
                        </div>
                        <Form.Item
                            name="citizen_identity"
                            rules={[
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder={"Nhập số CCCD"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Chọn quyền<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item name="roles"
                            rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản' },]}>
                            <RoleSelect
                                mode="multiple"
                                placeholder="Chọn loại tài khoản"
                                loadOnMount
                                onChange={(data) => {
                                    form.setFieldsValue({ role: data });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    {itemSelected ? null : <>
                        <Col span={12}>
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
                        <Col span={12}>
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
                    </>
                    }
                </Row>
                <div
                    className="action"
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        padding: "10px 20px",
                        background: "#fff",
                        textAlign: "left",
                    }}
                >
                    <Button type="danger" style={{ height: 35 }} onClick={onHiddenModal}>
                        Thoát
                    </Button>
                    <Button
                        htmlType="submit"
                        style={{ height: 35, float: "right", backgroundColor: '#01579B', color: '#fff' }}
                    >
                        {itemSelected ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};
FormAccount.propTypes = {
    className: PropTypes.any,
};

export default styled(FormAccount)`
.ant-modal-body {
    padding: 0;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }
`;
