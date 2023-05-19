import { Button, Col, DatePicker, Input, Row, Select, message } from "antd";
import PropTypes from "prop-types";
import { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import EndPlace from "./EndPlace";
import StartPlace from "./StartPlace";
import { command } from "configs";
import moment from "moment";
const { TextArea } = Input;

let inputTimer = null;
const FormSign = ({
    className,
    onSave,
    onHiddenModal,
    allRoute,
    onRefreshList
}) => {
    const [showForm, setShowForm] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const [nodeA, setNodeA] = useState({});
    const [nodeB, setNodeB] = useState({});
    const [params, setParams] = useState({
        date_from: moment(),
        date_to: moment(),
        route_id: undefined,
    });

    function disableDateRanges(range = { startDate: false, endDate: false }) {
        const { startDate, endDate } = range;
        return function disabledDate(current) {
            let startCheck = true;
            let endCheck = true;
            if (startDate) {
                startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
            }
            if (endDate) {
                endCheck = current && current > moment(endDate, 'YYYY-MM-DD');
            }
            return (startDate && startCheck) || (endDate && endCheck);
        };
    }


    const getNode = useCallback(async () => {
        const payload = {
            route_id: params.route_id,
            date_from: moment(params.date_from).format("YYYY-MM-DD"),
            date_to: moment(params.date_to).format("YYYY-MM-DD"),
        }
        command.getNode(payload)
            .then(res => {
                if (res.status === 200) {
                    setNodeA(res?.data?.data?.start_station)
                    setNodeB(res?.data?.data?.end_station)
                    setShowForm(true)
                }
            })
            .catch(err => {
                setNodeA({})
                setNodeB({})
                setShowForm(false)
                message.error("Có lỗi xảy ra !")
            })
    }, [params]);

    useEffect(() => {
        if (params?.route_id === undefined) {
            setNodeA({})
            setNodeB({})
            setShowForm(false)
        }
    }, [params]);


    const onCreate = useCallback(async () => {
        const payload = {
            route_id: params.route_id,
            date_from: moment(params.date_from).format("YYYY-MM-DD"),
            date_to: moment(params.date_to).format("YYYY-MM-DD"),
            nodes: itemSelected
        }
        command.createCommand(payload)
            .then(res => {
                if (res.status === 200) {
                    message.success("Tạo lệnh thành công")
                    onHiddenModal();
                    onRefreshList();
                }
            })
            .catch(err => {
                message.error("Có lỗi xảy raaaaaaa !")
            })
    }, [itemSelected]);

    return (
        <div className={className}>
            <Row gutter={15}>
                <Col span={5}>
                    <div>Từ ngày</div>
                    <DatePicker
                        allowClear={false}
                        disabledDate={(current) => {
                            let customDate = moment().format("YYYY-MM-DD");
                            return current && current < moment(customDate, "YYYY-MM-DD");
                        }}
                        onChange={(date) => {
                            if (date > params.date_to) {
                                setParams((prevState) => {
                                    let nextState = { ...prevState };
                                    nextState.date_from = date;
                                    nextState.date_to = date;
                                    return nextState;
                                });
                            }
                            else {
                                setParams((prevState) => {
                                    let nextState = { ...prevState };
                                    nextState.date_from = date;
                                    return nextState;
                                });
                            }
                        }}
                        style={{ width: '100%' }}
                        value={params.date_from}
                        format={'DD-MM-YYYY'}
                    />
                </Col>
                <Col span={5}>
                    <div>Đến ngày</div>
                    <DatePicker
                        allowClear={false}
                        disabledDate={disableDateRanges({ startDate: moment(params.date_from).format("YYYY-MM-DD") })}
                        onChange={(date) => {
                            setParams((prevState) => {
                                let nextState = { ...prevState };
                                nextState.date_to = date ? date : null;
                                return nextState;
                            });
                        }}
                        style={{ width: '100%' }}
                        value={params.date_to}
                        format={'DD-MM-YYYY'}
                    />
                </Col>

                <Col span={5}>
                    <div>Tuyến</div>
                    <Select
                        showSearch
                        placeholder="Tuyến"
                        optionFilterProp="children"
                        allowClear
                        style={{ width: '100%' }}
                        onChange={(data) => {
                            setParams((prevState) => {
                                let nextState = { ...prevState };
                                nextState.route_id = data ? data : undefined;
                                return nextState;
                            });
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={allRoute}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        disabled={params?.route_id !== undefined ? false : true}
                        onClick={getNode} style={{
                            marginTop: 20, fontFamily: 'Nunito', backgroundColor: params?.route_id === undefined ? "" : '#00A991',
                            color: params?.route_id === undefined ? "" : '#fff',
                            borderRadius: 6, height: 35, width: 120
                        }}>
                        Tìm kiếm
                    </Button>
                </Col>
            </Row>

            {showForm ?
                <Row gutter={[16, 16]} style={{ marginTop: 35 }}>
                    <Col span={12}>
                        <StartPlace itemSelected={itemSelected} setItemSelected={setItemSelected} nodeA={nodeA} />
                    </Col>
                    <Col span={12}>
                        <EndPlace itemSelected={itemSelected} setItemSelected={setItemSelected} nodeB={nodeB} />
                    </Col>
                    {
                        itemSelected?.length !== 0 ? <Button onClick={onCreate}
                            style={{ marginTop: 20, fontFamily: 'Nunito', backgroundColor: '#01579B', color: '#fff', borderRadius: 6, height: 35, width: 120 }}
                        >
                            Tạo lệnh
                        </Button> : ''
                    }
                </Row>
                : <div style={{ marginTop: 40, fontFamily: 'Nunito', fontSize: 18, fontWeight: 700 }}>Vui lòng chọn tuyến đường để thực hiện tạo lệnh</div>}
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
            </div>
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



