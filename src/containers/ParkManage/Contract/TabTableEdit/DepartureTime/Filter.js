import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, Input } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params }) => {

  // const searchTimeOut = function (value, key) {
  //     window.clearTimeout(fnTimeOut);
  //     fnTimeOut = window.setTimeout(function () {
  //       if (key) {
  //         _changeQuery(value, key);
  //       }
  //     }, 10000);
  // };

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
  return (
    <div className={className}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input 
            allowClear
            placeholder={"Số điện thoại"}
            onChange={(e) => {
            _changeQuery({ name: "phone", value: e.target.value });
          }}
          />
        </Col>
        {/* <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', paddingBottom: 10 }}>
          <Button className="btn-add" >Xóa bộ lọc</Button>
       </Col> */}
      </Row>
    </div>
  );
};
Filter.propTypes = {
  className: PropTypes.any,
};
export default styled(Filter)`
  .label {
    padding: 0px 0px 8px;
  }
  .btn-add {
    color: #1890ff;
    border-radius: 3px;
    border-color: #1890ff;
  }
`;
