import React, { useCallback, useState } from "react";
import { Row, Col, DatePicker, Select, Button, Input, Spin } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import { Module, TuyenSelect } from "components";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, operator }) => {
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
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <Module
            placeholder="Chọn tên module"
            allowClear
            loadOnMount
            onChange={(data) => {
              setParams((prevState) => {
                let nextState = { ...prevState };
                nextState.id = data ? data.value : null;
                return nextState;
              });
            }} />
        </Col>
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
