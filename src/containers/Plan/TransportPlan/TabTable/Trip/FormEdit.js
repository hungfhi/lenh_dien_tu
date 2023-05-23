import { Button, Col, Form, Input, Row, InputNumber, Switch, Select, TimePicker, Checkbox } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DIMENSION_PADDING_NORMAL, DIMENSION_PADDING_SMALL } from 'theme/dimensions';

const { TextArea } = Input;
const FormEdit = ({
    className,
    itemTripSelected,
    onSave,
    onHiddenModalTripPlan,
    isShowModalTripPlan,
    stations,
    province,
    allRoute,
    allUnit,
}) => {
    // const [isActive, setActive] = useState(itemSelected ? (itemSelected?.is_active == 1 ? true : false) : true);

    const [typeApply, setTypeApply] = useState(itemTripSelected && itemTripSelected?.type_apply?.id);
    const [buttonChooseByDay, setButtonChooseByDay] = useState(null);
    const [scheduleTrip, setScheduleTrip] = useState(typeApply == 1 ? (itemTripSelected && itemTripSelected?.schedule) : []);

    console.log(scheduleTrip);
    const [buttonItem, setButtonItem] = useState({
        item: null,
        choosed: false
    })

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        onSave({
            ...values,
            schedule: scheduleTrip,
            merchant_route_node_id: itemTripSelected && itemTripSelected?.id,
        })
    };
    const onFinishFailed = () => {
    };

    const onChangeTypeApply = (value) => {
        setTypeApply(value);
    }

    const pushAllDay = (month, year) => {
        console.log(month, year);
        let newSchedule = [];

        switch (month) {
            case 1:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 2:
                for (let index = 1; index <= year % 4 == 0 ? 39 : 18; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 3:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 4:
                for (let index = 1; index <= 30; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 5:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 6:
                for (let index = 1; index <= 30; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 7:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 8:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 9:
                for (let index = 1; index <= 30; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 10:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 11:
                for (let index = 1; index <= 30; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            case 12:
                for (let index = 1; index <= 31; index++) {
                    newSchedule.push(index);

                }
                setScheduleTrip(newSchedule)
                break;
            default:
                break;
        }
    }

    const pushEvenDay = (month, year) => {
        console.log(month, year);
        let newSchedule = [];

        switch (month) {
            case 1:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }
                }
                setScheduleTrip(newSchedule)
                break;
            case 2:
                for (let index = 1; index <= year % 4 == 0 ? 39 : 18; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 3:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 4:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 5:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 6:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 7:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 8:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 9:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 10:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 11:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 12:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 == 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            default:
                break;
        }
    }

    const pushOddDay = (month, year) => {
        console.log(month, year);
        let newSchedule = [];

        switch (month) {
            case 1:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }
                }
                setScheduleTrip(newSchedule)
                break;
            case 2:
                for (let index = 1; index <= year % 4 == 0 ? 39 : 18; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 3:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 4:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 5:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 6:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 7:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 8:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 9:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 10:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 11:
                for (let index = 1; index <= 30; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            case 12:
                for (let index = 1; index <= 31; index++) {
                    if (index % 2 != 0) {
                        newSchedule.push(index);
                    }

                }
                setScheduleTrip(newSchedule)
                break;
            default:
                break;
        }
    }

    const renderButtonAllDay = () => {
        const date = new Date();
        const newDate = [];
        for (let index = 1; index <= moment(date).daysInMonth(); index++) {
            newDate.push(index);

        }

        return (
            <>
                <Col span={6}></Col>
                <Col style={{ justifyContent: 'center', marginTop: 20 }} span={12}>
                    {newDate.map(item => {
                        let newButtonItem = [];

                        return (
                            <Button
                                onClick={e => {
                                    newButtonItem.push(item);
                                    setScheduleTrip(newButtonItem);
                                }}
                                style={{
                                    width: 40,
                                    padding: 0,
                                    height: 40,
                                    borderColor: '#3f3f3f',
                                    color: '#000',
                                    borderRadius: 0,
                                    background: (buttonItem.choosed && item == buttonItem.item) && '#01579B'
                                }}
                                defaultValue={(buttonItem.choosed && item == buttonItem.item) && item}
                            >
                                {item}
                            </Button>
                        );
                    })}
                </Col>
                <Col span={6}></Col>
            </>

        );
    }

    const onActive = (value) => {
        // setActive(!value)
    }

    useEffect(() => {
        setScheduleTrip(scheduleTrip);
    }, [scheduleTrip]);

    console.log(scheduleTrip);

    return (
        <div className={className}>
            <Form
                onFinishFailed={onFinishFailed}
                className={className}
                onFinish={onFinish}
                name="control-hooks"
                initialValues={{
                    // "route_id": itemSelected && itemSelected?.route?.id || '',
                    // "distance": itemSelected && itemSelected?.distance || '',
                    // "is_active": isActive,
                    schedule: scheduleTrip ?? scheduleTrip,
                    type_apply: typeApply
                }}
                form={form}
            >
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <div>Nốt</div>
                        <Form.Item
                        // name="node"
                        >
                            <Input
                                disabled
                                defaultValue={itemTripSelected?.departure_time.slice(0, 5)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <div>Chọn hình thức</div>
                        <Form.Item
                            name="type_apply"
                        >
                            <Select
                                // defaultValue={typeApply}
                                onChange={e => {
                                    onChangeTypeApply(e);
                                    setScheduleTrip([]);
                                }}
                            >
                                <Select.Option value={1}>Theo ngày</Select.Option>
                                <Select.Option value={2}>Theo thứ</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {typeApply == 1 &&
                        <>
                            <Col span={12}>
                                <Button
                                    disabled={buttonChooseByDay == 1 && true}
                                    onClick={e => {
                                        setButtonChooseByDay(1);
                                        let date = new Date();
                                        pushAllDay(date.getMonth() + 1, date.getFullYear());
                                    }}
                                    style={{
                                        width: '100%',
                                        marginBottom: 10,
                                        background: buttonChooseByDay == 1 && '#01579B',
                                        borderColor: buttonChooseByDay == 1 ? '#01579B' : '#ccc',
                                        color: buttonChooseByDay == 1 ? '#fff' : '#000'
                                    }}
                                >Tất cả các ngày trong tháng</Button>

                            </Col>
                            <Col span={12}>
                                <Button
                                    disabled={buttonChooseByDay == 2 && true}
                                    onClick={e => {
                                        setButtonChooseByDay(2);
                                        let date = new Date();
                                        pushEvenDay(date.getMonth() + 1, date.getFullYear());
                                    }}
                                    style={{
                                        width: '100%',
                                        marginBottom: 10,
                                        background: buttonChooseByDay == 2 && '#01579B',
                                        borderColor: buttonChooseByDay == 2 ? '#01579B' : '#ccc',
                                        color: buttonChooseByDay == 2 ? '#fff' : '#000'
                                    }}
                                >Tất cả ngày chẵn trong tháng</Button>
                            </Col>
                            <Col span={12}>
                                <Button
                                    disabled={buttonChooseByDay == 3 && true}
                                    onClick={e => {
                                        setButtonChooseByDay(3);
                                        let date = new Date();
                                        pushOddDay(date.getMonth() + 1, date.getFullYear());
                                    }}
                                    style={{
                                        width: '100%',
                                        marginBottom: 10,
                                        background: buttonChooseByDay == 3 && '#01579B',
                                        borderColor: buttonChooseByDay == 3 ? '#01579B' : '#ccc',
                                        color: buttonChooseByDay == 3 ? '#fff' : '#000'
                                    }}
                                >Tất cả ngày lẻ trong tháng</Button>
                            </Col>
                            <Col span={12}>
                                <Button
                                    disabled={buttonChooseByDay == 4 && true}
                                    onClick={e => {
                                        setButtonChooseByDay(4);
                                        setScheduleTrip([]);
                                    }}
                                    style={{
                                        width: '100%',
                                        marginBottom: 10,
                                        background: buttonChooseByDay == 4 && '#01579B',
                                        borderColor: buttonChooseByDay == 4 ? '#01579B' : '#ccc',
                                        color: buttonChooseByDay == 4 ? '#fff' : '#000'
                                    }}
                                >Chọn ngày trong tháng</Button>
                            </Col>

                            {buttonChooseByDay == 4 &&
                                renderButtonAllDay()
                            }
                        </>
                    }

                    {typeApply == 2 &&
                        <>
                            <Col span={8}>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 1 ||
                                            scheduleTrip[1] == 1 ||
                                            scheduleTrip[2] == 1 ||
                                            scheduleTrip[3] == 1 ||
                                            scheduleTrip[4] == 1 ||
                                            scheduleTrip[5] == 1 ||
                                            scheduleTrip[6] == 1
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 1];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(1), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={1}
                                    >Thứ 2</Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 2 ||
                                            scheduleTrip[1] == 2 ||
                                            scheduleTrip[2] == 2 ||
                                            scheduleTrip[3] == 2 ||
                                            scheduleTrip[4] == 2 ||
                                            scheduleTrip[5] == 2 ||
                                            scheduleTrip[6] == 2
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 2];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(2), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={2}
                                    >Thứ 3</Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 3 ||
                                            scheduleTrip[1] == 3 ||
                                            scheduleTrip[2] == 3 ||
                                            scheduleTrip[3] == 3 ||
                                            scheduleTrip[4] == 3 ||
                                            scheduleTrip[5] == 3 ||
                                            scheduleTrip[6] == 3
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 3];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(3), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={3}
                                    >Thứ 4</Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 4 ||
                                            scheduleTrip[1] == 4 ||
                                            scheduleTrip[2] == 4 ||
                                            scheduleTrip[3] == 4 ||
                                            scheduleTrip[4] == 4 ||
                                            scheduleTrip[5] == 4 ||
                                            scheduleTrip[6] == 4
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 4];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(4), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={4}
                                    >Thứ 5</Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 5 ||
                                            scheduleTrip[1] == 5 ||
                                            scheduleTrip[2] == 5 ||
                                            scheduleTrip[3] == 5 ||
                                            scheduleTrip[4] == 5 ||
                                            scheduleTrip[5] == 5 ||
                                            scheduleTrip[6] == 5
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 5];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(5), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={5}
                                    >Thứ 6</Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 6 ||
                                            scheduleTrip[1] == 6 ||
                                            scheduleTrip[2] == 6 ||
                                            scheduleTrip[3] == 6 ||
                                            scheduleTrip[4] == 6 ||
                                            scheduleTrip[5] == 6 ||
                                            scheduleTrip[6] == 6
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 6];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(6), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={6}
                                    >Thứ 7</Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        defaultChecked={(
                                            scheduleTrip[0] == 7 ||
                                            scheduleTrip[1] == 7 ||
                                            scheduleTrip[2] == 7 ||
                                            scheduleTrip[3] == 7 ||
                                            scheduleTrip[4] == 7 ||
                                            scheduleTrip[5] == 7 ||
                                            scheduleTrip[6] == 7
                                        ) && true}
                                        onClick={e => {
                                            var updatedList = [...scheduleTrip];
                                            if (e.target.checked) {
                                                updatedList = [...scheduleTrip, 7];
                                            } else {
                                                updatedList.splice(scheduleTrip.indexOf(6), 1);
                                            }
                                            setScheduleTrip(updatedList);
                                        }} value={7}
                                    >Chủ nhật</Checkbox>
                                </div>

                            </Col>

                        </>
                    }

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
                        <Button type="danger" style={{ height: 35 }} onClick={onHiddenModalTripPlan}>
                            Thoát
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ height: 35, float: "right" }}
                        >
                            {itemTripSelected ? "Cập nhật" : "Thêm mới"}
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
