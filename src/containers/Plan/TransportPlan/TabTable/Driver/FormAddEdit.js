import { Button, Col, Form, Input, Row, InputNumber, Switch, Select, TimePicker, Checkbox, DatePicker } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR_RED } from "theme/colors";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';

const { TextArea } = Input;
const FormEdit = ({
    className,
    itemSelected,
    itemStaffSelected,
    onSave,
    onHiddenModal,
    isShowModalTripPlan,
    stations,
    province,
    allStaff,
    allUnit,
}) => {
    // const [isActive, setActive] = useState(itemSelected ? (itemSelected?.is_active == 1 ? true : false) : true);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    // const onActive = (value) => {
    //     setActive(!value)
    // }

    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    staff_id: itemStaffSelected && itemStaffSelected?.staff?.id || '',
                    expire_date: itemStaffSelected && moment(itemStaffSelected?.expire_date) || ''
                }}
                form={form}
            >
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <div>Chọn lái xe <span style={{ fontWeight: 'bold', color: COLOR_RED }}>*</span></div>
                        <Form.Item
                            name="staff_id"
                            rules={[{ required: true, message: 'Vui lòng chọn lái xe' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn lái xe"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={allStaff}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div>Thời hạn <span style={{ fontWeight: 'bold', color: COLOR_RED }}>*</span></div>
                        <Form.Item
                            name="expire_date"
                            rules={[{ required: true, message: 'Vui lòng nhập thời hạn' }]}
                        >

                            <DatePicker 
                            style={{ width: '100%' }}
                                placeholder="Thời hạn"
                                format={'DD/MM/YYYY'}
                            />
                        </Form.Item>
                    </Col>

                    {/* <div
                        className="action"
                        style={{
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            padding: "10px 20px",
                            background: "#fff",
                            textAlign: "left",
                        }}
                    >
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ height: 35, float: "right" }}
                        >
                            {itemSelected ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div> */}
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
                </Row>

            </Form>
        </div>
    );
};
FormEdit.propTypes = {
    className: PropTypes.any,
};
export default styled(FormEdit)`
  .btn-add {
    background-color: #01579B;
    color: #fff;
    border-radius: 3px;
    border-color: #01579B;
  }
`;
