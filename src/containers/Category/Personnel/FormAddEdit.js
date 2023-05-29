import { Button, Col, Form, Input, Row, InputNumber, Select, DatePicker, Switch, Checkbox, message } from "antd";
import { category } from "configs";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';
import { Ui } from "utils/Ui";
import _ from 'lodash';


const { TextArea } = Input;
const FormAddEdit = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave(values)
    };
    const [status, setStatus] = useState(itemSelected ? (itemSelected?.status?.id == 1 ? true : false) : true)
    const [listDrivingLicenseRank, setListDrivingLicenseRank] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listStations, setListStations] = useState([]);
    const [listByMerchant, setListByMerchant] = useState([]);
    const [listModel, setListModel] = useState([]);
    const [modelChooses, setModelChooses] = useState(itemSelected && itemSelected?.user?.model_used?.id || null);
    const [rolesChooses, setRolesChooses] = useState([]);
    const [statusChooseModel, setStatusChooseModel] = useState(true);

    let listRoles = _.map(itemSelected?.roles, (i) => {
        return i?.id;
    });

    const [listModels, setListModels] = useState(_.map(itemSelected?.models, (i) => {
        return i?.id
    }));

    let listStation = _.map(itemSelected?.stations, (i) => {
        return i?.id
    });
    console.log(listModels);

    useEffect(() => {
        // listModels.map(item => {
        //     if (item == 1) {
        //         setStatusChooseModel(true);
        //     } else {
        //         setStatusChooseModel(false);
        //     }
        // });
        listModels.includes(1) ? setStatusChooseModel(false) : setStatusChooseModel(true);
    }, [listModels]);


    useEffect(() => {
        const newRoles = [];
        listRoles?.map(item => {
            newRoles.push(item?.value);
        });
        setRolesChooses(newRoles);
    }, []);

    const renderGender = (gender) => {
        switch (gender) {
            case 'Giới tính nam':
                return 1;
                break;
            case 'Giới tính nữ':
                return 2;
                break;
            case 'Giới tính khác':
                return 3;
                break;
            default:
                break;
        }
    }

    const getListDrivingLicenseRank = useCallback(async () => {
        category.getDrivingLicenseRank().then(res => {
            setListDrivingLicenseRank(res?.data?.data);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra')
        })
    }, []);

    const getListPotisions = useCallback(async () => {
        category.getPositions().then(res => {
            setListPositions(res?.data?.data);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra')
        })
    }, []);

    const getListStations = useCallback(async () => {
        const payload = {};
        category.getStation(payload).then(res => {
            // console.log(res);
            setListStations(res?.data?.data);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra')
        })
    }, []);

    const getListModel = useCallback(async () => {
        const payload = {};
        category.getModel(payload).then(res => {
            // console.log(res);
            const newListModel = [];
            res?.data?.data?.map(item => {
                newListModel.push({
                    ...item,
                    value: item?.id,
                    label: item?.name
                });
            });

            setListModel(newListModel);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra')
        })
    }, []);

    const getListByMerchant = useCallback(async () => {
        const payload = {};
        category.getByMerchant(payload).then(res => {
            // console.log(res);
            const newListByMerchant = [];
            res?.data?.data?.map(item => {
                newListByMerchant.push({
                    ...item,
                    value: item?.id,
                    label: item?.name
                });
            });

            setListByMerchant(newListByMerchant);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra')
        })
    }, []);

    useEffect(() => {
        getListDrivingLicenseRank();
        getListPotisions();
        getListStations();
        getListByMerchant();
        getListModel();
    }, []);


    const date = (value) => {
        const d = value.substr(0, 11).split("-")
        return d[2] + "-" + d[1] + "-" + d[0];
    }
    const onActive = (value) => {
        setStatus(!value);
    }

    const onFinishFailed = () => {
    };

    console.log(itemSelected);

    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    first_name: itemSelected && itemSelected?.first_name || '',
                    last_name: itemSelected && itemSelected?.last_name || '',
                    staff_code: itemSelected && itemSelected?.staff_code || '',
                    phone: itemSelected && itemSelected?.phone || '',
                    citizen_identity: itemSelected && itemSelected?.citizen_identity || '',
                    position_id: itemSelected && itemSelected?.position?.id || '',
                    driving_license: itemSelected && itemSelected?.driving_license || '',
                    address: itemSelected && itemSelected?.address || '',
                    date_of_birth: itemSelected && moment(itemSelected?.date_of_birth) || moment(),
                    driving_license_rank_id: itemSelected && itemSelected?.driving_license_rank_id?.id || '',
                    driving_license_expire_date: itemSelected && moment(itemSelected?.driving_license_expire_date) || moment(),
                    status: status,
                    gender: itemSelected && renderGender(itemSelected?.gender) || null,
                    modelable_id: itemSelected && itemSelected?.modelable_id || null,
                    modelable_type: itemSelected && itemSelected?.modelable_type || null,
                    email: itemSelected && itemSelected?.user?.email || null,
                    station_id: listStation,
                    roles: listRoles,
                    model_id: listModels
                }}
                form={form}
            >
                <Row gutter={[40, 0]}>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Họ đệm <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="first_name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ đệm' }]}
                        >
                            <Input placeholder={"Họ đệm"} />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Tên <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="last_name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                        >
                            <Input placeholder={"Tên"} />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Email <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: "email", message: 'Vui lòng nhập đúng định dạng email' },
                            ]}
                        >
                            <Input disabled={itemSelected && true || false} placeholder={"Email"} />
                        </Form.Item>
                    </Col>

                    <Col style={{ margin: 0 }} span={12}>
                        <div>Số điện thoại <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại" },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "SĐT chỉ được nhập số",
                                },
                                // {
                                //     pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                                //     message: "SĐT chỉ được nhập 10 chữ số",
                                // },
                            ]}
                        >
                            <Input placeholder={"Số điện thoại"} />
                        </Form.Item>
                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Mã nhân viên <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="staff_code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
                        >
                            <Input placeholder={"Mã NV"} />
                        </Form.Item>
                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Căn cước công dân <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="citizen_identity"
                            rules={[
                                { required: true, message: 'Vui lòng nhập CCCD' },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "CCCD chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder={"CCCD"} />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Ngày sinh <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="date_of_birth"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Nhập ngày sinh"
                                format={'DD/MM/YYYY'}
                            />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Giới tính <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                        >
                            <Select defaultValue placeholder="Chọn giới tính">
                                <Select.Option value={1}>Nam</Select.Option>
                                <Select.Option value={2}>Nữ</Select.Option>
                                <Select.Option value={3}>Giới tính khác</Select.Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Chức vụ <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="position_id"
                            rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
                        >
                            <Select
                                // defaultValue
                                placeholder={"Chọn chức vụ"}
                            >
                                {listPositions && listPositions.map((item, index) => {

                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Quyền tài khoản <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="roles"
                        // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder={"Chọn quyền tài khoản"}
                            // onChange={e => {
                            //     listRoles.push({
                            //         value: e
                            //     })
                            // }}
                            // defaultValue={listRoles}
                            >
                                {listByMerchant && listByMerchant.map((item) => {

                                    return <Select.Option value={item?.value}>{item?.label}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Mô hình kinh doanh <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="model_id"
                        // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder={"Chọn mô hình kinh doanh"}
                                // defaultValue={itemSelected && itemSelected?.user?.model_used?.id || null}
                                onChange={e => {
                                    setListModels(e);
                                }}
                            >
                                {listModel && listModel.map((item) => {

                                    return <Select.Option value={item?.value}>{item?.label}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Bến làm việc <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                        <Form.Item
                            name="station_id"
                        // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                                defaultValue
                                mode="multiple"
                                placeholder="Chọn bến làm việc"
                                disabled={statusChooseModel}
                            >
                                {listStations && listStations.map((item, index) => {

                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                    </Col>

                    <Col style={{ margin: 0 }} span={24}>
                        <div>Địa chỉ</div>
                        <Form.Item
                            name="address"
                        // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Input placeholder="Địa chỉ" />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={24}>
                        <div>Số GPLX</div>
                        <Form.Item
                            name="driving_license"
                            rules={[
                                // { required: true, message: 'Vui lòng nhập dữ liệu' },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder={"Số GPLX"} />
                        </Form.Item>

                    </Col>

                    <Col style={{ margin: 0 }} span={12}>
                        <div>Hạng GPLX</div>
                        <Form.Item
                            name="driving_license_rank_id"
                        // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <Select
                            // placeholder="Hạng GPLX"
                            >
                                {listDrivingLicenseRank && listDrivingLicenseRank.map((item, index) => {

                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0 }} span={12}>
                        <div>Hạn GPLX</div>
                        <Form.Item
                            name="driving_license_expire_date"
                        // rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Hạn GPLX"
                                format={'DD/MM/YYYY'}
                            />
                        </Form.Item>

                    </Col>
                    <Col style={{ margin: 0, display: 'flex' }} span={24}>
                        <div style={{ ...styles.txtTitle }}>Trạng thái hoạt động<span style={{ color: '#dc2d2d' }}>*</span></div>
                        <Form.Item
                            name="status"
                            rules={[{ required: false, message: 'Vui lòng nhập dữ liệu' }]}
                        >

                            <Switch
                                onChange={(e) => onActive(e)}
                                size='small'
                                defaultChecked={status}
                                style={{ marginLeft: 30, top: -5 }}
                            />
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

const styles = {
    txtTitle: {
        // fontWeight: 'bold',
        fontSize: 14,
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
