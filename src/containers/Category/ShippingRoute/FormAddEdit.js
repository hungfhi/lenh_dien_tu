import { Button, Col, Form, Input, Row, InputNumber, Switch, Select } from "antd";
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
    stations,
    province
}) => {

    const [isActive, setActive] = useState(itemSelected ? (itemSelected.is_active == 1 ? true : false) : true)

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    const onActive = (value) => {
        setActive(!value)
        // console.log(!value)
    }

    // console.log('itemSelected', itemSelected)
    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    "route_code": itemSelected && itemSelected.route_code || '',
                    "start_province_id": itemSelected && itemSelected.start_province?.id || '',
                    "end_province_id": itemSelected && itemSelected.end_province?.id || '',
                    "start_station_id": itemSelected && itemSelected.start_station?.id || '',
                    "end_station_id": itemSelected && itemSelected.end_station?.id || '',
                    "name": itemSelected && itemSelected.name || '',
                    is_active: itemSelected && itemSelected.is_active == 1 ? true : false,
                }}
                form={form}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <div>Tỉnh đi<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="start_province_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn tỉnh đi"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={province}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Bến đi <span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="start_station_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn bến đi"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={stations}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Tỉnh đến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="end_province_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn tỉnh đến"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={province}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Bến đến <span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="end_station_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn bến đến"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={stations}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Mã tuyến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="route_code"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Nhập mã tuyến"} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Tên tuyến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Nhập tên tuyến"} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>

                        <Row>
                            <div style={{ paddingTop: DIMENSION_PADDING_SMALL / 2, paddingRight: DIMENSION_PADDING_NORMAL }}>Trạng thái hoạt động<span style={{ color: '#dc2d2d' }}>*</span></div>
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
