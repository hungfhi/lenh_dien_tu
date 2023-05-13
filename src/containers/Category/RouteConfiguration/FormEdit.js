import { Button, Col, Form, Input, Row, InputNumber, Switch, Select } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
import TabTable from "./TabTable";

const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
    stations,
    province,
    allRoute,
    allUnit,
}) => {
    const [isActive, setActive] = useState(itemSelected ? (itemSelected?.is_active == 1 ? true : false) : true);

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

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
                    "route_id": itemSelected && itemSelected?.id || '',
                    "distance": itemSelected && itemSelected?.distance || '',
                    "is_active": isActive,
                }}
                form={form}
            >
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <div>Tuyến<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="route_id"
                            rules={[{ required: true, message: 'Vui lòng chọn tuyến' }]}
                        >
                            <Select
                                showSearch
                                disabled
                                placeholder="Chọn tuyến"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={allRoute}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <div>Cự ly<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="distance"
                            rules={[
                                { required: true, message: 'Vui lòng nhập cự ly' },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder="Cự ly" />
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
                    <div
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
                </div>

                    <Col span={24}>
                        <TabTable itemSelected={itemSelected} allRoute={allRoute} />
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
                    {/* <Button
                        htmlType="submit"
                        type="primary"
                        style={{ height: 35, float: "right" }}
                    >
                        {itemSelected ? "Cập nhật" : "Thêm mới"}
                    </Button> */}
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
