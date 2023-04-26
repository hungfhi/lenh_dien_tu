import { Button, Col, Form, Input, Row, DatePicker, Switch, Select } from "antd";
import moment from 'moment';
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';

const FormAddEdit = ({ 
        className,
        itemSelected,
        onSave,
        onHiddenModal,
        products
    }) => {
   

    const [form] = Form.useForm();

    const [isActive, setActive] = useState(itemSelected && itemSelected.is_active?.value ===1?true: false)

    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };

    const onChangeDateInsurance = (date, dateString) => {
        console.log(date, dateString);
    };

      const onChangeDateRegistration = (date, dateString) => {
        console.log(date, dateString);
    };

    const onActive =(value)=>{
        setActive(!value)
        console.log(!value)
    }

    const onChangeProduct = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearchProduct = (value) => {
        console.log('search:', value);
    };

    const date = (value) => {
        const d = value.substr(0, 11).split("-")
        return d[2] + "-" + d[1] + "-" + d[0];
    }

    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    license_plate: itemSelected && itemSelected.license_plate || '',
                    number_seat: itemSelected && itemSelected.number_seat || '',
                    registration_number: itemSelected && itemSelected.registration_number || '',
                    product_id: itemSelected && itemSelected.product_id || '',
                    insurance_expired_date: itemSelected && moment((date(itemSelected?.insurance_expired_date))) || moment(),
                    is_active: itemSelected && itemSelected.is_active?.value ===1?true: false || true,
                    registration_expired_date: itemSelected && moment((date(itemSelected?.registration_expired_date))) || moment(),
                }}
                form={form}
            >
                <Row>
                     <Col span={11}>
                        <div style={styles.txtTitle}>Biển kiểm soát<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="license_plate"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={"Nhập biển kiểm soát"} />
                        </Form.Item>

                    </Col>
                    <Col span={2}/>
                    <Col span={11}>
                        <div style={styles.txtTitle}>Số chỗ<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="number_seat"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={"Số chỗ"} />
                        </Form.Item>

                    </Col>
                 
                    <Col span={11}>
                        <div style={styles.txtTitle}>Đăng ký xe<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="registration_number"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input  placeholder={"Nhập số đăng ký"} />
                        </Form.Item>

                    </Col>
                    <Col span={2}/>
                    <Col span={11}>
                        <div style={styles.txtTitle}>Loại xe<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="product_id"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn loại xe"
                                optionFilterProp="children"
                                onChange={onChangeProduct}
                                onSearch={onSearchProduct}
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={products}
                            />
                        </Form.Item>

                    </Col>

                     <Col span={11}>
                        <div style={styles.txtTitle}>Hạn bảo hiểm xe<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="insurance_expired_date"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                             <DatePicker style={{width:'100%'}} format='DD-MM-YYYY' onChange={onChangeDateInsurance} />
                        </Form.Item>

                    </Col>
                    <Col span={2}/>
                    <Col span={11}>
                        <div style={styles.txtTitle}>Hạn đăng kiểm xe<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="registration_expired_date"
                            rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                             <DatePicker style={{width:'100%'}} format='DD-MM-YYYY' onChange={onChangeDateRegistration} />
                        </Form.Item>

                    </Col>

                    <Row>
                       
                        <div style={{...styles.txtTitle, paddingTop: DIMENSION_PADDING_SMALL/2, paddingRight: DIMENSION_PADDING_NORMAL}}>Trạng thái hoạt động<span style={{ color: '#dc2d2d' }}>*</span></div>
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

const styles = {
    txtTitle:{
       
    }
}
export default styled(FormAddEdit)`
  .btn-add {
    background-color: #08976d;
    color: #fff;
    border-radius: 3px;
    border-color: #08976d;
  }
  
`;
