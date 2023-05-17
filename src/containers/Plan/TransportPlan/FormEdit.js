import { Button, Col, Form, Input, Row, InputNumber, Switch, Select } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
import TabTable from "./TabTable";

const { TextArea } = Input;
const FormEdit = ({
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
                    "route_id": itemSelected && itemSelected?.route?.id || '',
                    "distance": itemSelected && itemSelected?.distance || '',
                    "is_active": isActive,
                }}
                form={form}
            >
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <TabTable itemSelected={itemSelected} allRoute={allRoute} />
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
    background-color: #08976d;
    color: #fff;
    border-radius: 3px;
    border-color: #08976d;
  }
`;
