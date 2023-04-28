import { Button, Col, Form, Input, Row, InputNumber, Switch, DatePicker, Checkbox } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import TabTable from "./TabTable";

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
                <Row gutter={[8, 0]}>
                    <Col span={24}>
                        <div>Tên hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Số hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Mã hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Đơn vị vận tải<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Địa chỉ</div>
                        <Form.Item name="dmo_name">
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Mã số thuế<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Email<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="dmo_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Ngày bắt đầu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="suc_time_bat_dau"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" allowClear={false} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Ngày kết thúc<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="suc_time_xong"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker
                                allowClear={false}
                                style={{ width: '100%' }}
                                format={'DD-MM-YYYY'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <span style={{ fontWeight: 600 }}>Giá lưu đêm được ký thu trọn gói &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Checkbox defaultChecked style={{ color: '#01579B' }} onChange={onChange} size="small" /></span>
                    </Col>
                    <br />
                    <br />
                    <Col span={24}>
                        <TabTable />
                    </Col>
                </Row>
                <div
                    className="action"
                    style={{
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        padding: "10px 0px",
                        background: "#fff",
                        textAlign: "left",
                    }}
                >
                    <Button type="danger" style={{ height: 35 }} onClick={onHiddenModal}>
                        Thoát
                    </Button>

                    <Button
                        htmlType="submit"
                        style={{ height: 35, float: "right", backgroundColor: '#01579B', color: '#fff', marginLeft: 20 }}
                    >
                        {itemSelected ? "Cập nhật" : "Thêm mới"}
                    </Button>
                    <Button
                        style={{ height: 35, float: "right", backgroundColor: '#00A991', color: '#fff' }}
                    >
                        Lịch sử
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
