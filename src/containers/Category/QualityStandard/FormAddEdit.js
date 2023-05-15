import { Button, Col, Form, Input, Row, InputNumber, TreeSelect, Switch } from "antd";
import { Module, Permission } from "components";
import manage from "configs/manage";
import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Ui } from "utils/Ui";
import { category } from "configs";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from "theme/dimensions";
const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {
    const [standardList, setStandardList] = useState([]);
    const [isActive, setActive] = useState(itemSelected ? (itemSelected?.is_active == 1 ? true : false) : true);
    const onActive = (value) => {
        setActive(!value)
        // console.log(!value)
    }

    const getListStandard = useCallback(async () => {
        // const payload = {
        //     is_full: 1
        // }
        category.getQualityStandard().then(res => {
            if (res.status === 200) {
                const dataSet = []
                _.map(res?.data?.data, (items) => {

                    dataSet.push({
                        value: items.id,
                        id: items.id,
                        title: items.name,
                        parent_id: items.parent_id,
                        disabled: itemSelected?.id === items.id || (itemSelected && items?.parent_id===itemSelected?.parent_id && itemSelected?.child?.length!==0 )  ? true : false,
                        children: _.map(items?.child, (item) => {
                            return {
                                value: item.id,
                                id: item.id,
                                title: item.name,
                                parent_id: item.parent_id,
                                disabled: true,
                                // children: item.children.length !== 0 ? item.children : null
                            }
                        })
                    });

                })
                setStandardList(dataSet);
            }
        }).catch(err => {
            Ui.showError({ message: err?.response?.data?.message });
        })
    }, []);

    useEffect(() => {
        getListStandard();
    }, [getListStandard]);



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
                    parent_id: itemSelected && itemSelected?.parent_id == 0 ? '' : parseInt(itemSelected?.parent_id) || undefined,
                    is_active: isActive
                }}
                form={form}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <div>Danh mục cấp 1</div>
                        <Form.Item
                            name="parent_id"
                        >
                            <TreeSelect
                                allowClear
                                placeholder={"Chọn danh mục cấp 1"}
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input, option) =>
                                    option.child.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                                }
                                treeData={standardList}
                            >
                            </TreeSelect>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Tên tiêu chuẩn<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder={"Tên module"} />
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
                        type="primary"
                        style={{ height: 35, float: "right" }}
                    >
                        {itemSelected ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </div>
            </Form>
        </div >
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
