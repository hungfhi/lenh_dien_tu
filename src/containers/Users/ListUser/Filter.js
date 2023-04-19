import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, Input } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;
var fnTimeOut;
const Filter = ({ className, setParams, params, setShowModal }) => {
    const searchTimeOut = function (value, key) {
        window.clearTimeout(fnTimeOut);
        fnTimeOut = window.setTimeout(function () {
            if (key) {
                queryFillter(value, key);
            }
        }, 800);
    };

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


    const queryFillter = useCallback(
        (value, name) => {
            setParams((props) => {
                let nextState = { ...props };
                nextState[name] = value;
                return nextState;
            });
        },
        [setParams]
    );

    return (
        <div className={className}>
            <Row gutter={[16, 16]}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', paddingBottom: 10 }}>
                    <Button className="btn-add" onClick={() => setShowModal(true)} > Thêm mới</Button>
                </Col>
            </Row>
        </div>
    );
};
Filter.propTypes = {
    className: PropTypes.any,
};
export default styled(Filter)`
  .btn-add {
    background-color: #01579B;
    color: #fff;
    border-radius: 3px;
    border-color: #01579B;
  }
`;
