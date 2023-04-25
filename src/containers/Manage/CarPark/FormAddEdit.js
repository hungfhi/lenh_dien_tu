import { Button, Col, Form, Input, Row, InputNumber, Switch } from "antd";
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
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

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
                <Row>
                    <Col span={24}>
                        <div>Tên bến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Mã bến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Tỉnh/Thành phố<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Quận,Huyện<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Địa chỉ bến</div>
                        <Form.Item name="dmo_name">
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Đơn vị quản lý bến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <span>Trạng thái hoạt động<span style={{ color: '#dc2d2d' }}>*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch defaultChecked style={{color:'#01579B'}} onChange={onChange} size="small"/></span>
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
                        style={{ height: 35, float: "right",backgroundColor:'#01579B',color:'#fff' }}
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