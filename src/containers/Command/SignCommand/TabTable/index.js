import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import styled from "styled-components";
import EndPlace from "./EndPlace";
import StartPlace from "./StartPlace";

const { TextArea } = Input;

let inputTimer = null;
const FormSign = ({
    className,
    onSave,
    onHiddenModal,
    setParams,
    allRoute,
    params
}) => {
    const [showForm, setShowForm] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const _changeQuery = useCallback(
        (payload) => {
            if (inputTimer) {
                clearTimeout(inputTimer);
            }
            inputTimer = setTimeout(() => {
                setParams((prevState) => {
                    let nextState = { ...prevState };
                    nextState[payload.name] = payload.value;
                    return nextState;
                });
            }, 900);
        },
        [setParams]
    );


    const onChangeRoute = (value) => {
        if (value !== undefined)
            _changeQuery({ name: "route_id", value: value });
        else
            _changeQuery({ name: "route_id", value: undefined });
    }

    const searchCommand = () => {
        setShowForm(true)
    }

    console.log('params?.route_id',params?.route_id)


    return (
        <div className={className}>
            <Row gutter={15}>
                <Col span={4}>
                    <div>Từ ngày</div>
                    <DatePicker
                        allowClear={false}
                        onChange={(date) => {
                            setParams((prevState) => {
                                let nextState = { ...prevState };
                                nextState.start_date = date;
                                return nextState;
                            });
                        }}
                        style={{ width: '100%' }}
                        value={params.start_date}
                        format={'DD-MM-YYYY'}
                    />
                </Col>
                <Col span={4}>
                    <div>Đến ngày</div>
                    <DatePicker
                        allowClear={false}
                        onChange={(date) => {
                            setParams((prevState) => {
                                let nextState = { ...prevState };
                                nextState.end_date = date;
                                return nextState;
                            });
                        }}
                        style={{ width: '100%' }}
                        value={params.end_date}
                        format={'DD-MM-YYYY'}
                    />
                </Col>

                <Col span={4}>
                    <div>Tuyến</div>
                    <Select
                        showSearch
                        placeholder="Tuyến"
                        optionFilterProp="children"
                        allowClear
                        style={{ width: '100%' }}
                        onChange={onChangeRoute}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={allRoute}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        disabled={params?.route_id !== undefined ? false : true}
                        onClick={searchCommand} style={{
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
                        <StartPlace itemSelected={itemSelected} setItemSelected={setItemSelected} />
                    </Col>
                    <Col span={12}>
                        <EndPlace itemSelected={itemSelected} setItemSelected={setItemSelected} />
                    </Col>
                    {
                        itemSelected?.length !== 0 ? <Button
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



