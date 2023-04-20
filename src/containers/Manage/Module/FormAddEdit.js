import { Button, Col, Form, Input, Row, InputNumber, TreeSelect } from "antd";
import { Module, Permission } from "components";
import manage from "configs/manage";
import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Ui } from "utils/Ui";
const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {
    const [moduleList, setModuleList] = useState([]);


    const getListErrors = useCallback(async () => {
        const payload = {
            is_full: 1
        }
        manage.getModule(payload)
            .then(res => {
                if (res.status === 200) {
                    const dataSet = []
                    _.map(res?.data?.data, (items) => {
                        dataSet.push({
                            value: items.id,
                            id: items.id,
                            title: items.name,
                            parent_id: items.parent_id,
                            disabled: itemSelected?.id === items.id || (itemSelected && items?.parent_id===itemSelected?.parent_id)  ? true : false,
                            children: _.map(items?.children, (item) => {
                                return {
                                    value: item.id,
                                    id: item.id,
                                    title: item.name,
                                    parent_id: item.parent_id,
                                    disabled: true,
                                    children: item.children.length !== 0 ? item.children : null
                                }
                            })
                        });

                    })
                    setModuleList(dataSet);
                }
            })
            .catch(err => {
                Ui.showError({ message: err?.response?.data?.message });
            })
    }, []);

    console.log('itemSelecteditemSelected',itemSelected)

    useEffect(() => {
        getListErrors();
    }, [getListErrors]);



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
                    order_number: itemSelected && itemSelected?.order_number == 0 ? 0 : parseInt(itemSelected?.order_number) || undefined,
                    icon: itemSelected && itemSelected.icon || '',
                    parent_id: itemSelected && itemSelected?.parent_id == 0 ? 0 : parseInt(itemSelected?.parent_id) || undefined,
                    path: itemSelected && itemSelected.path || '',
                    permission_slug: itemSelected && itemSelected.permission_slug || undefined,
                }}
                form={form}
            >
                <>
                    <Col span={24}>
                        <div>Tên module<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Tên module"} />
                        </Form.Item>

                    </Col>
                    <Col>
                        <div>Menu cha</div>
                        <Form.Item
                            name="parent_id"
                        >
                            <TreeSelect
                                allowClear
                                placeholder={"Chọn menu cha"}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                                }
                                treeData={moduleList}
                            >
                            </TreeSelect>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div>Thư mục<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="path"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Thư mục"} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Icon<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="icon"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Icon"} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Thứ tự hiển thị</div>
                        <Form.Item
                            name="order_number"
                        >
                            <InputNumber style={{ width: '100%' }} placeholder={"Thứ tự hiển thị"} />
                        </Form.Item>

                    </Col>
                    <Col span={24}>
                        <div>Quyền sử dụng</div>
                        <Form.Item
                            name="permission_slug"
                        >
                            <Permission placeholder={"Chọn quyền sử dụng"} allowClear />
                        </Form.Item>
                    </Col>
                </>
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
