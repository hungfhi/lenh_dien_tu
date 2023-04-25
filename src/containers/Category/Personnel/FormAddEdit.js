import { Button, Col, Form, Input, Row, InputNumber, Select, DatePicker, Switch } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {


    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };
    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    dmo_name: itemSelected && itemSelected.dmo_name || '',
                    dmo_intro: itemSelected && itemSelected.dmo_intro || '',
                }}
                form={form}
            >
                <Row gutter={[40, 0]}>
                    <Col style={{ margin: 0 }} span={24}>
                        <div>Tên <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Mã nhân viên <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Số điện thoại <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div>Căn cước công dân <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Chức vụ <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select>
                                <Select.Option>
                                    Admin
                                </Select.Option>
                                <Select.Option>
                                    Manager
                                </Select.Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Số GPLX</div>
                        <Form.Item
                            name="dmo_name"
                            // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>

                    <Col span={12}>
                        <div>Hạng GPLX</div>
                        <Form.Item
                            name="dmo_name"
                            // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select>
                                <Select.Option>
                                    Admin
                                </Select.Option>
                                <Select.Option>
                                    Manager
                                </Select.Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Hạn GPLX</div>
                        <Form.Item
                            name="dmo_name"
                            // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Hạn GPLX"
                                format={'DD/MM/YYYY'}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Tên tài khoản <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Mật khẩu <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: '' }} span={24}>
                        <div>Trạng thái hoạt động <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Switch style={{ marginLeft: 50 }} defaultChecked/>
                    </Col>
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
                        type="primary"
                        style={{ height: 35, float: "right" }}
                    >
                        {itemSelected ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};
FormAddEdit.propTypes = {
    className: PropTypes.any,
};
export default styled(FormAddEdit)`
  .btn-add {
    background-color: #08976d;
    color: #fff;
    border-radius: 3px;
    border-color: #08976d;
  }
`;
