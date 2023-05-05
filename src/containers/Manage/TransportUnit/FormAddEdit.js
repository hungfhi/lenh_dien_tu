import { Button, Col, Form, Input, Row, InputNumber, Checkbox, Switch } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {

    const is_station = itemSelected && itemSelected?.models?.find(item => item?.model_type == 'App\\Models\\Station') !== undefined ? true : false
    const is_mechant = itemSelected && itemSelected?.models?.find(item => item?.model_type == 'App\\Models\\Merchant') !== undefined ? true : false

    console.log('is_station',is_station)
    console.log('is_mechant',is_mechant)

    const [isActive, setActive] = useState(itemSelected && itemSelected.is_active == 1 ? true : false)
    const [isStation, setStation] = useState(is_station)
    const [isMechant, setMechant] = useState(is_mechant)
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    const onStation = (value) => {
        setStation(!value)
    }

    const onMechant = (value) => {
        setMechant(!value)
    }

    const onActive = (value) => {
        setActive(!value)
    }


    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    name: itemSelected && itemSelected.name || '',
                    tax_code: itemSelected && itemSelected.tax_code || '',
                    phone: itemSelected && itemSelected.phone || '',
                    address: itemSelected && itemSelected.address || '',
                    email: itemSelected && itemSelected.email || '',
                    is_active: isActive,
                    is_station: isStation,
                    is_mechant: isMechant
                }}
                form={form}
            >
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <div>Tên Đơn vị vận tải<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Mã số thuế</div>
                        <Form.Item
                            name="tax_code"
                        >
                            <InputNumber placeholder="Nhập mã số thuế" style={{ width: '100%' }} />

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Số điện thoại</div>
                        <Form.Item
                            name="phone"
                        >
                            <InputNumber placeholder="Nhập số điện thoại" style={{ width: '100%' }} />

                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div>Địa chỉ</div>
                        <Form.Item
                            name="address"
                        >
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div>Email</div>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập E-mail" />

                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row style={{ marginBottom: -20 }}>
                            <div style={{ width: 150 }}>Quản lý bến</div>
                            <Form.Item name="is_station">
                                <Checkbox onChange={(e) => onStation(e?.target?.checked)}
                                    size='small'
                                    defaultChecked={isStation} />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row style={{ marginBottom: -20 }}>
                            <div style={{ width: 150 }}>Vận hành tuyến</div>
                            <Form.Item name="is_mechant">
                                <Checkbox onChange={(e) => onMechant(e?.target?.checked)}
                                    size='small'
                                    defaultChecked={isMechant} />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <div style={{ paddingTop: DIMENSION_PADDING_SMALL / 1.5, paddingRight: DIMENSION_PADDING_NORMAL }}>Trạng thái hoạt động<span style={{ color: '#dc2d2d' }}>*</span></div>
                            <Form.Item
                                name="is_active"
                                rules={[{ required: false, message: 'Vui lòng nhập dữ liệu' }]}
                            >
                                <Switch
                                    onChange={(e) => onActive(e)}
                                    size='small'
                                    defaultChecked={isActive}
                                />
                            </Form.Item>
                        </Row>
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
