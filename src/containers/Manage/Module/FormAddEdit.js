import { Button, Col, Form, Input, Row,InputNumber } from "antd";
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
                    name: itemSelected && itemSelected.name || '',
                    order_number: itemSelected && itemSelected.order_number || '',
                    icon: itemSelected && itemSelected.icon || '',
                    parent_id: itemSelected && itemSelected.parent_id || '',
                    path: itemSelected && itemSelected.path || '',
                }}
                form={form}
            >
                <>
                    <Col span={24}>
                        <div>Tên module<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Menu cha<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="parent_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Thư mục<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="path"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Icon<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="icon"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Thứ tự hiển thị<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="order_number"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Quyền sử dụng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="permission_slug"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={""} />
                        </Form.Item>

                    </Col>
                </>
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
