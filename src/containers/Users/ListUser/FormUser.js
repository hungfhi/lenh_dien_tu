import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, message } from "antd";
import { RoleSelect } from "components";
import { category, manage } from "configs";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
const FormAccount = ({
    className,
    itemSelected,
    onSave,
    onHiddenModal,
}) => {
    const [isShow, setIsShow] = useState(false)
    const definitions = useSelector((state) => state?.rootReducer?.definitions);

    let perByRole = itemSelected?.roles || []
    let list_roles = _.map(perByRole, (i) => {
        return {
            value: i?.id,
            label: i?.name,
        }
    })
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        onSave(values)
    };
    const onFinishFailed = () => {
    };


    const onChange = (e) => {
        e.target.checked === true ? setIsShow(true) : setIsShow(false)
        setIsStaff(e.target.checked)
    };
    const [isStaff, setIsStaff] = useState(itemSelected ? (itemSelected?.is_staff?.id == 1 ? true : false) : false)
    const [listDrivingLicenseRank, setListDrivingLicenseRank] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listStations, setListStations] = useState([]);
    const [listModel, setListModel] = useState(definitions?.models);
    const [transport, setTransport] = useState([]);
    const [statusChooseModel, setStatusChooseModel] = useState(true);
    const [listModels, setListModels] = useState([]);
    let res = listModel.filter(({is_station}) => is_station).map(({id}) => id);
    let listStation = _.map(itemSelected?.stations, (i) => {
        return i?.id
    });
    useEffect(() => {
        const found = res.find((val, index) => {
            return listModels.includes(val)
          })
          found === 1  ? setStatusChooseModel(false) : setStatusChooseModel(true);
          found === 1  ? form.setFieldsValue({station_id: listStation}) : form.setFieldsValue({station_id: [],})
    }, [listModels]);



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
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        })
    }, []);

    const getListPotisions = useCallback(async () => {
        category.getPositions().then(res => {
            setListPositions(res?.data?.data);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        })
    }, []);

    const getListStations = useCallback(async () => {
        const payload = {};
        category.getStation(payload).then(res => {
            setListStations(res?.data?.data);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        })
    }, []);


    const getTransports = useCallback(async () => {
        const payload = {
        }
        manage.getTransport(payload)
            .then(res => {
                if (res.status === 200) {
                    setTransport(res?.data?.data)
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })
    }, []);

    useEffect(() => {
        getListDrivingLicenseRank();
        getListPotisions();
        getListStations();
        getTransports();
    }, []);

    return (
        <div className={className}>
            <Form
                form={form}
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    email: itemSelected && itemSelected.email || '',
                    username: itemSelected && itemSelected.username || '',
                    full_name: itemSelected && itemSelected.full_name || '',
                    password: itemSelected && itemSelected.password || '',
                    password_confirmation: itemSelected && itemSelected.password_confirmation || '',
                    roles: list_roles || '',
                    phone: itemSelected && itemSelected.phone,
                    citizen_identity: itemSelected && itemSelected.citizen_identity,
                    position_id: itemSelected && itemSelected?.position?.id || undefined,
                    driving_license: itemSelected && itemSelected?.driving_license || '',
                    address: itemSelected && itemSelected?.address || '',
                    date_of_birth: itemSelected && moment(itemSelected?.date_of_birth) || moment(),
                    driving_license_rank_id: itemSelected && itemSelected?.driving_license_rank_id?.id || undefined,
                    merchant_id: itemSelected && itemSelected?.merchant_id || undefined,
                    driving_license_expire_date: itemSelected && moment(itemSelected?.driving_license_expire_date) || moment(),
                    is_staff: isStaff,
                    gender: itemSelected && renderGender(itemSelected?.gender) || null,
                    modelable_id: itemSelected && itemSelected?.modelable_id || null,
                    modelable_type: itemSelected && itemSelected?.modelable_type || null,
                    station_id: listStation,
                    model_id: listModels,
                    staff_code: itemSelected && itemSelected?.staff_code || null,
                }}
            >
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <div>Email<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email', },
                            { type: "email", message: 'Vui lòng nhập đúng định dạng email' },
                            ]}
                        >
                            <Input placeholder={"Nhập Email"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Họ tên<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        <Form.Item
                            name="full_name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' },]}
                        >
                            <Input placeholder={"Nhập họ tên"} autocomplete="new-password" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>
                            Tên hiển thị<span style={{ color: "#dc2d2d" }}>(*)</span>
                        </div>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị' },]}
                        >
                            <Input placeholder={"Nhập tên hiển thị"} disabled={itemSelected ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>
                            Số điện thoại<span style={{ color: "#dc2d2d" }}>(*)</span>
                        </div>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại" },
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder={"Nhập số điện thoại"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>
                            CCCD | CMT
                        </div>
                        <Form.Item
                            name="citizen_identity"
                            rules={[
                                {
                                    pattern: new RegExp(/^[0-9]+$/i),
                                    message: "Chỉ được nhập số",
                                },
                            ]}
                        >
                            <Input placeholder={"Nhập số CCCD"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div>Chọn quyền<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                        {/* <Form.Item name="roles"
                            rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản' },]}>
                            <RoleSelect
                                mode="multiple"
                                placeholder="Chọn loại tài khoản"
                                loadOnMount
                                onChange={(data) => {
                                    form.setFieldsValue({ role: data });
                                }}
                            />
                        </Form.Item> */}

                        <Form.Item
                            name="roles"
                            rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản' }]}
                        >
                            <Select
                                placeholder={"Chọn đơn vị vận tải"}
                                mode="multiple"
                                onChange={(data) => {
                                    form.setFieldsValue({ role: data });
                                }}
                            >
                                {definitions && definitions?.roles.map((item, index) => {

                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>



                    </Col>
                    {itemSelected ? null : <>
                        <Col span={12}>
                            <div>Mật khẩu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 8, message: "Mật khẩu phải từ 8 kí tự trở lên" },
                                {
                                    pattern: new RegExp(/^[a-zA0-9.-]+$/i),
                                    message: "Chỉ được nhập các kí tự là số hoặc chữ",
                                },
                                ]}
                            >
                                <Input.Password placeholder={"Nhập mật khẩu"} autocomplete="new-password" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div>Nhập lại mật khẩu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
                            <Form.Item
                                name="password_confirmation"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy xác nhận lại mật khẩu!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Mật khẩu bạn đã nhập không khớp!!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder={"Xác nhận mật khẩu"} />
                            </Form.Item>
                        </Col>
                    </>
                    }
                    {!itemSelected ? <Col span={24}>
                        <Form.Item
                            name="is_staff"
                        >
                            <Checkbox onChange={onChange} /> <span style={{ color: '#00A991', fontWeight: 700, fontFamily: 'Nunito' }}>Khai báo nhân sự đơn vị vận tải</span>
                        </Form.Item>
                    </Col> : null}

                    {isShow ?
                        <>
                            <Col style={{ margin: 0 }} span={24}>
                                <div>Đơn vị vận tải <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                                <Form.Item
                                    name="merchant_id"
                                    rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
                                >
                                    <Select
                                        placeholder={"Chọn đơn vị vận tải"}
                                    >
                                        {transport && transport.map((item, index) => {

                                            return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                        })}
                                    </Select>
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
                                <div>Chức vụ <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                                <Form.Item
                                    name="position_id"
                                    rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
                                >
                                    <Select
                                        placeholder={"Chọn chức vụ"}
                                    >
                                        {listPositions && listPositions.map((item, index) => {

                                            return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                        })}
                                    </Select>
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

                                            return <Select.Option value={item?.id} is_station={item?.is_station}>{item?.name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col style={{ margin: 0 }} span={12}>
                                <div>Bến làm việc <span style={{ color: '#dc2d2d', fontWeight: 'bold' }}>*</span></div>
                                <Form.Item
                                    name="station_id"
                                    rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
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

                            <Col style={{ marginBottom: 40 }} span={12}>
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
                            <Col style={{ marginBottom: 40 }} span={12}>
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
                        </>

                        : null}
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
FormAccount.propTypes = {
    className: PropTypes.any,
};

export default styled(FormAccount)`
.ant-modal-body {
    padding: 0;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }
  .ant-form-item {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    margin-bottom: 10px !important;
    vertical-align: top;
}

`;
