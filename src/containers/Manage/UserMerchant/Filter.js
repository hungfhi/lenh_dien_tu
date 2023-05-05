import React, { useCallback } from "react";
import { Row, Col, Select, Button, Input } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";


let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, operator, stations, allRoute }) => {
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

  const onChangeStatus = (value) => {

    if (value !== undefined)
      _changeQuery({ name: "is_active", value: value ? 1 : 0 });
    else
      _changeQuery({ name: "is_active", value: 1 });
  }

  const onChangeRoute = (value) => {
    if (value !== undefined)
      _changeQuery({ name: "route_id", value: value });
    else
      _changeQuery({ name: "route_id", value: '' });
  }


  const onChangeStartStation = (value) => {
    if (value !== undefined)
      _changeQuery({ name: "station_start_id", value: value });
    else
      _changeQuery({ name: "station_start_id", value: '' });
  }


  const onChangeEndStation = (value) => {
    if (value !== undefined)
      _changeQuery({ name: "station_end_id", value: value });
    else
      _changeQuery({ name: "station_end_id", value: '' });
  }




  return (
    <div className={className}>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <div>Tên loại xe</div>
          <Input
            allowClear
            placeholder={"Nhập tên loại xe"}
            onChange={(e) => {
              _changeQuery({ name: "name", value: e.target.value });
            }}
          />
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
