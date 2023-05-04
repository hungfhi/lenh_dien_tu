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

    const [isActive, setActive] = useState(true)

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    const onActive = (value) => {
        setActive(!value)
        console.log(!value)
    }

    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    name: itemSelected && itemSelected?.name || '',
                }}
                form={form}
            >
                <Row gutter={[16, 16]}>
                    <Col style={{ margin: 0 }} span={24}>
                        <div>Tên loại xe <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên loại xe' }]}
                        >
                            <Input placeholder={""} />
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
