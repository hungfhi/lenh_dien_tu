import { Button, Col, Form, Input, Row, InputNumber, Switch, DatePicker, Checkbox, message, Select, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import TabTable from "./TabTable";
import moment from "moment";
import _ from "lodash";
import { manage, station } from "configs";
const { Option } = Select;
const { TextArea } = Input;
let inputTimer = null;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
    stations,
    transport
}) => {
    const [car, setCar] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [time, setTime] = useState([]);
    const [merchant, setMerchant] = useState(undefined);
    const [stati, setStati] = useState([]);
    const [itemCar, setItemCar] = useState([]);
    const [itemTime, setItemTime] = useState([]);


    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment(new Date()).endOf('year'));


    const date = (value) => {
        const d = value.substr(0, 11).split("-")
        return d[2] + "-" + d[1] + "-" + d[0];
    }
    const station_id = []
    _.map(itemSelected?.stations, (item) => {
        return station_id.push(item?.id)
    })


    const getDataAll = useCallback(async () => {
        const arr = stati.map((item) => {
            return item.value
        })
        const payload = {
            merchant_id: merchant,
            stations: arr
        }
        setIsLoad(true)
        station.createTabContract(payload)
            .then(res => {
                if (res.status === 200) {
                    let contractCar = []
                    let departureTime = []
                    _.map(res?.data?.data, (item) => {
                        Array.prototype.push.apply(contractCar, item?.merchant_route_vehicles);
                    })
                    _.map(res?.data?.data, (item) => {
                        Array.prototype.push.apply(departureTime, item?.merchant_route_nodes);
                    })
                    setCar(contractCar)
                    setTime(departureTime)
                    setIsLoad(false)
                }
            })
            .catch(err => {
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    message.warn(err.response.data?.errors[0].msg)
                    setIsLoad(false)
                }
            })

    }, [merchant, stati, startDate, endDate]);


    const _changeQuery = useCallback(
        (value) => {
            if (inputTimer) {
                clearTimeout(inputTimer);
            }
            inputTimer = setTimeout(() => {
                setStati(value)
            }, 900);
        },
        [setStati]
    );

    function disableDateRanges(range = { startDate: false, endDate: false }) {
        const { startDate, endDate } = range;
        return function disabledDate(current) {
            let startCheck = true;
            let endCheck = true;
            if (startDate) {
                startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
            }
            if (endDate) {
                endCheck = current && current > moment(endDate, 'YYYY-MM-DD');
            }
            return (startDate && startCheck) || (endDate && endCheck);
        };
    }


    useEffect(() => {
        if (merchant && stati.length !== 0) {
            getDataAll();
        }
    }, [getDataAll, merchant, stati]);


    useEffect(() => {
        if (itemSelected) {
            setCar(itemSelected?.contract_merchant_route_vehicles)
            setTime(itemSelected?.contract_merchant_route_nodes)
        }
    }, [getDataAll, merchant, stati]);




    const is_full_package = itemSelected?.is_full_package?.value === 1 ? true : false
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const update_car_contract = []
        let update_node_contract = []
        let car_data = car.filter(function (item) {
            return itemCar.indexOf(item.id) != -1;
        });
        _.map(car_data, (items) => {
            update_car_contract.push({
                merchant_route_vehicle_id: items.id,
                start_date: items.start_date || null,
                end_date: items.end_date || null,
                trip_number: items.trip_number || null,
                service_price: items.service_price || null,
                is_fixed_time: items.is_fixed_time || null,
                fixed_time: items.fixed_time || null,
                status: items.status || null,
                start_date_stop: items.start_date_stop || null,
                end_date_stop: items.end_date_stop || null,
                is_associate_commerce: items.is_associate_commerce || null,
                note: items.note || null,
                is_pay_later: items.is_pay_later || null,
            });
        })

        let time_data = time.filter(function (item) {
            return itemTime.indexOf(item.id) != -1;
        });
        _.map(time_data, (items) => {
            update_node_contract.push({
                merchant_route_node_id: items.id,
                start_date: items.start_date || null,
                end_date: items.end_date || null,
                trip_number: items.trip_number || null,
                status: items.status || null,
                start_date_stop: items.start_date_stop || null,
                end_date_stop: items.end_date_stop || null,
                note: items.note || null,
            });
        })
        onSave(values, update_car_contract, update_node_contract)
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
                    is_full_package: is_full_package === 1 ? true : false || true,
                    status: 1,
                    overnight_price: itemSelected && itemSelected.overnight_price || '',
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
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
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
                                disabled={itemSelected ? true : false}
                                allowClear={false}
                                placeholder={"Đơn vị vận tải"}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                                }
                                onSelect={(e, value) => {
                                    setMerchant(value?.value)
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
                                disabled={itemSelected ? true : false}
                                allowClear={false}
                                mode="multiple"
                                placeholder={"Bến xe"}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                                }
                                onChange={(e, value) => {
                                    _changeQuery(value)
                                }}
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
                                name="overnight_price"
                                rules={[{ required: true, message: 'Vui lòng nhập số tiền từ 1000 trở lên' },]}
                            >
                                <InputNumber min={1000} put placeholder={"Nhập giá trị tiền lưu đêm trọn gói"} style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
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
                                disabledDate={disableDateRanges({ startDate: moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"), endDate: moment(endDate).format("YYYY-MM-DD") })}
                                allowClear={false}
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"
                                onChange={(date) => {
                                    setStartDate(date)
                                }}
                            />
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
                                disabledDate={disableDateRanges({ startDate: moment(startDate).format("YYYY-MM-DD") })}
                                onChange={(date) => {
                                    setEndDate(date)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <br />
                    <br />
                    {car.length !== 0 || time.length !== 0 ? <Col span={24}>
                        <Spin spinning={isLoad}>
                            <TabTable car={car} setCar={setCar} setTime={setTime} setItemCar={setItemCar} itemCar={itemCar} time={time} setItemTime={setItemTime} itemTime={itemTime} startDate={startDate} endDate={endDate} />
                        </Spin>
                    </Col> :  <Col span={24}></Col>}
                    

                    <Row style={{ marginTop: 10 }}>
                        <span style={{ fontWeight: 600 }}>Kết thúc hợp đồng &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span style={{ marginTop: -4 }}>
                            <Form.Item name="status" valuePropName="checked">
                                <Checkbox style={{ color: '#01579B' }} size="large" />
                            </Form.Item>
                        </span>
                    </Row>
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
                    <Button style={{ backgroundColor: '#9B0101', color: '#fff', borderRadius: 6, height: 35, width: 120 }} onClick={onHiddenModal}>
                        Thoát
                    </Button>

                    <Button
                        htmlType="submit"
                        disabled={itemSelected ? true : false}
                        style={{ borderRadius: 6, height: 35, width: 120, backgroundColor: itemSelected ? '#8c8c8c' : '#01579B', color: itemSelected ? '' : '#fff', marginLeft: 20 }}
                    >
                        {itemSelected ? "Cập nhật" : "Thêm mới"}
                    </Button>
                    {itemSelected ?
                        <Button
                            style={{ height: 35, float: "right", backgroundColor: '#00A991', color: '#fff' }}
                        >
                            Lịch sử
                        </Button>
                        : ''}
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
