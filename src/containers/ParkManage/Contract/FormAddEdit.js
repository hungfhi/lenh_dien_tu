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
    stations
}) => {

    const [transport, setTransport] = useState([]);
    const getTransports = useCallback(async () => {
        const payload = {
            is_contract : 1
        }
        manage.getTransport(payload)
            .then(res => {
                if (res.status === 200) {
                    setTransport(res?.data?.data)
                }
            })
            .catch(err => {
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    message.warn(err.response.data?.errors[0].msg)
                }
            })
    }, []);

    useEffect(() => {
        getTransports()
    }, [getTransports]);



    function onChange(checked) {
        console.log("checked = ", checked);
    }

    const date = (value) => {
        const d = value.substr(0, 11).split("-")
        return d[2] + "-" + d[1] + "-" + d[0];
    }

    const station_id = []
    _.map(itemSelected?.stations, (item) => {
        return station_id.push(item?.id)
    })

    const is_full_package = itemSelected?.is_full_package?.value ===1 ? true : false



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
                    end_date: itemSelected && moment((date(itemSelected?.end_date))) || moment(),
                    stations: station_id,
                    is_full_package: is_full_package === 1 ? true : false || true
                }}
                form={form}
            >
                <Row gutter={[8, 0]}>
                    <Col span={24}>
                        <div>Tên hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Số hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="contract_number"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Mã hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="contract_code"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
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
                            >
                                {
                                    _.map(transport, (item) => {
                                        return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Địa chỉ</div>
                        <Form.Item name="address">
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
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
                            <Input placeholder="Nhập mã số thuế" style={{ width: '100%' }} />

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Email<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Ngày bắt đầu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="start_date"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" allowClear={false} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
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
                    <Col span={24}>
                        <span style={{ fontWeight: 600 }}>Danh sách bến<span style={{ color: '#dc2d2d' }}>(*)</span></span>&nbsp;&nbsp;&nbsp;
                        <Form.Item name="stations" initialValue={station_id}>
                            <Checkbox.Group options={stations} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col>
                                <span style={{ fontWeight: 600 }}>Giá lưu đêm được ký thu trọn gói &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </Col>
                            <Col>
                                <Form.Item name="is_full_package" valuePropName="checked">
                                    <Checkbox style={{ color: '#01579B' }} size="small" />
                                </Form.Item>
                            </Col>
                        </Row>


                    </Col>
                    <br />
                    <br />
                    {
                        itemSelected ? <Col span={24}>
                            <TabTable />
                        </Col> : null
                    }

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
