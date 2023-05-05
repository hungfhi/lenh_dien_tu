import { Button, Col, Form, Input, Row, message, Switch, Select, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { manage } from "configs";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
    typeSearch = "local",
}) => {
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

    const localSearchFunc = (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const [isActive, setActive] = useState(itemSelected && itemSelected.is_active == 1 ? true : false)

    const [fetching, setFetching] = useState(false);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [transport, setTransport] = useState([]);

    const [province_id, setProvinceId] = useState(undefined);


    const getProvinces = useCallback(async () => {
        manage.getProvince()
            .then(res => {
                if (res.status === 200) {
                    setProvince(res?.data?.data)
                }
            })
            .catch(err => {
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    message.warn(err.response.data?.errors[0].msg)
                }
            })
    }, []);

    const getDistricts = useCallback(async () => {
        const payload = {
            limit: -1,
            province_id: province_id
        }
        manage.getDistrict(payload)
            .then(res => {
                if (res.status === 200) {
                    setDistrict(res?.data?.data)
                }
            })
            .catch(err => {
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    message.warn(err.response.data?.errors[0].msg)
                }
            })
    }, [province_id]);



    const getTransports = useCallback(async () => {
        manage.getTransport()
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
        getProvinces();
        getDistricts();
        getTransports()
    }, [getProvinces, getDistricts, getTransports]);


    const onActive = (value) => {
        setActive(!value)
        console.log("!value",isActive)
    }

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
                    station_code: itemSelected && itemSelected.station_code || undefined,
                    province: itemSelected && itemSelected.province?.id || undefined,
                    district: itemSelected && itemSelected.district?.id || undefined,
                    address: itemSelected && itemSelected.address || undefined,
                    merchant: itemSelected && itemSelected.merchant?.id || undefined,
                    is_active: itemSelected && itemSelected.is_active === 1 ? true : false,
                }}
                form={form}
            >
                <Row>
                    <Col span={24}>
                        <div>Tên bến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Mã bến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="station_code"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Tỉnh/Thành phố<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="province"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn tỉnh/thành phố"
                                showSearch
                                allowClear
                                className={className}
                                loading={fetching}
                                filterOption={typeSearch === "local" ? localSearchFunc : false}
                                notFoundContent={fetching ? <Spin size="small" /> : "Không có dữ liệu"}
                                onSelect={(e, value) => {
                                    setProvinceId(value?.value)
                                    form.setFieldsValue({
                                        district: undefined,
                                    })
                                }}
                            >
                                {_.map(province, (item, itemId) => (
                                    <Select.Option key={itemId} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Quận,Huyện<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="district"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn quận/huyện"
                                showSearch
                                allowClear
                                className={className}
                                loading={fetching}
                                filterOption={typeSearch === "local" ? localSearchFunc : false}
                                notFoundContent={fetching ? <Spin size="small" /> : "Không có dữ liệu"}
                                onSelect={(e, value) => {
                                    console.log('value', value)
                                    form.setFieldsValue({
                                        province: value?.provinceId,
                                    })
                                }}
                            >
                                {_.map(district, (item, itemId) => (
                                    <Select.Option key={itemId} value={item.id} provinceId={item?.province?.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Địa chỉ bến</div>
                        <Form.Item name="address">
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Đơn vị quản lý bến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="merchant"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                placeholder="Chọn đơn vị"
                                style={{ width: "100%" }}
                                showSearch
                                className={className}
                                loading={fetching}
                                filterOption={typeSearch === "local" ? localSearchFunc : false}
                                notFoundContent={fetching ? <Spin size="small" /> : "Không có dữ liệu"}
                            >
                                {_.map(transport, (item, itemId) => (
                                    <Select.Option key={itemId} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
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
                        style={{ height: 35, float: "right", backgroundColor: '#01579B', color: '#fff' }}
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
