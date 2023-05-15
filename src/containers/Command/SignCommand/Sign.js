import { Button, Col, Form, Input, Row, InputNumber, Switch, Select } from "antd";
import { manage } from "configs";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
import { Ui } from "utils/Ui";

const { TextArea } = Input;
const FormSign = ({
    className,
    onSave,
    onHiddenModal,
}) => {

    const [form] = Form.useForm();
    const [allRoles, setAllRoles] = useState([]);


    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    return (
        <div className={className}>

            {/* <Row gutter={15}>
        <Col span={3}>
          <DatePicker
            allowClear={false}
            onChange={(date) => {
              setParams((prevState) => {
                let nextState = { ...prevState };
                nextState.day = date;
                return nextState;
              });
            }}
            style={{ width: '100%' }}
            value={params.day}
            format={'DD-MM-YYYY'}
          />
        </Col>
        
      </Row> */}
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    name:  '',
                    roles: ''
                }}
                form={form}
            >
                <Row gutter={[16, 16]}>
                    <Col style={{ margin: 0 }} span={24}>
                        <div>Tên loại hình <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên loại hình' }]}
                        >
                            <Input placeholder={""} />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={24}>
                        <div>Roles</div>
                        <Form.Item
                            name="roles"
                        // rules={[{ required: true, message: 'Vui lòng nhập tên loại hình' }]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder={'Chọn roles'}
                            >
                                {allRoles?.map(item => {

                                    return <Select.Option value={item?.value}>{item?.label}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

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
                        Tạo lệnh
                    </Button>
                </div>
            </Form>
        </div>
    );
};
FormSign.propTypes = {
    className: PropTypes.any,
};
export default styled(FormSign)`
  .btn-add {
    background-color: #08976d;
    color: #fff;
    border-radius: 3px;
    border-color: #08976d;
  }
`;
