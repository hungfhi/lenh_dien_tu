import { Button, Col, Form, Input, Row, InputNumber, Switch, DatePicker, Checkbox, message, Select } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import TabTable from "./TabTable";
import moment from "moment";
import _ from "lodash";
import { manage } from "configs";
const { Option } = Select;
const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
    stations,
    transport
}) => {

    const date = (value) => {
        const d = value.substr(0, 11).split("-")
        return d[2] + "-" + d[1] + "-" + d[0];
    }
    const station_id = []
    _.map(itemSelected?.stations, (item) => {
        return station_id.push(item?.id)
    })




    const is_full_package = itemSelected?.is_full_package?.value === 1 ? true : false
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
                    contract_number: itemSelected && itemSelected.contract_number || '',
                    contract_code: itemSelected && itemSelected.contract_code || '',
                    address: itemSelected && itemSelected.address || '',
                    tax_code: itemSelected && itemSelected.tax_code || '',
                    merchant_id: itemSelected && itemSelected.merchant_id || undefined,
                    email: itemSelected && itemSelected.email || '',
                    start_date: itemSelected && moment((date(itemSelected?.start_date))) || moment(),
                    end_date: itemSelected && moment((date(itemSelected?.end_date))) || moment(new Date()).endOf('year'),
                    stations: station_id,
                    is_full_package: is_full_package === 1 ? true : false || true
                }}
                form={form}
            >
                <Row gutter={[8, 0]}>
                    <Col span={8}>
                        <div>Số hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="contract_number"
                            rules={[
                                { required: true, message: "Vui lòng nhập số hợp đồng" },
                            ]}
                        >
                            <Input placeholder={"Số hợp đồng"} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div>Mã hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="contract_code"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Mã hợp đồng"} />
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <div>Tên hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Tên hợp đồng"} />
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <div>Đơn vị vận tải<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="merchant_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                allowClear={true}
                                placeholder={"Đơn vị vận tải"}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                                }
                                onSelect={(e, value) => {
                                    form.setFieldsValue({
                                        email: value.email,
                                        address: value?.address,
                                        tax_code: value?.tax_code
                                    })
                                }}
                            >
                                {
                                    _.map(transport, (item) => {
                                        return (<Option key={item.id} value={item.id} email={item.email} address={item.address} tax_code={item.tax_code}>{item.name}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div>Bến xe<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="stations"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                allowClear={true}
                                mode="multiple"
                                placeholder={"Bến xe"}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                                }
                            >
                                {
                                    _.map(stations, (item) => {
                                        return (<Option key={item.value} value={item.value}>{item.label}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div>Địa chỉ</div>
                        <Form.Item name="address">
                            <Input placeholder={"Nhập địa chỉ"} disabled />
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <div>Mã số thuế<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="tax_code"
                            rules={[
                                { required: true, message: "Vui lòng nhập mã số thuế" },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã số thuế" style={{ width: '100%' }} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div>Email<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Vui lòng nhập đúng định dạng E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder={"Nhập E-mail!"} disabled />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Row>
                            <span style={{ fontWeight: 600 }}>Giá lưu đêm được ký thu trọn gói &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ marginTop: -4 }}>
                                <Form.Item name="is_full_package" valuePropName="checked">
                                    <Checkbox style={{ color: '#01579B' }} size="large" />
                                </Form.Item>
                            </span>
                        </Row>
                        <div style={{ marginTop: -30 }}>
                            <Form.Item
                                name="price"
                            >
                                <Form.Item
                                    name="amount"
                                    rules={[{ required: true, message: 'Vui lòng nhập số tiền từ 1000 trở lên' },]}
                                >
                                    <InputNumber min={1000} put placeholder={"Nhập giá trị tiền lưu đêm trọn gói"} style={{ width: '100%' }}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>Ngày bắt đầu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="start_date"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker
                                allowClear={false}
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY" />
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <div>Ngày kết thúc<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="end_date"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker
                                allowClear={false}
                                style={{ width: '100%' }}
                                format={'DD-MM-YYYY'}
                            />
                        </Form.Item>
                    </Col>
                    {/* <Col span={24}>
                        <span style={{ fontWeight: 600 }}>Danh sách bến<span style={{ color: '#dc2d2d' }}>(*)</span></span>&nbsp;&nbsp;&nbsp;
                        <Form.Item name="stations" initialValue={station_id}>
                            <Checkbox.Group options={stations} />
                        </Form.Item>
                    </Col> */}

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
                        disabled={itemSelected ? true : false}
                        style={{ height: 35, float: "right", backgroundColor: itemSelected ? '#8c8c8c' : '#01579B', color: itemSelected ? '' : '#fff', marginLeft: 20 }}
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
