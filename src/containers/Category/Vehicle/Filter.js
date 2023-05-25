import React, { useCallback } from "react";
import { Row, Col, Select, Button, Input } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";


let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, operator }) => {
  const _changeQuery = useCallback(
    (payload) => {
      // console.log('payload',payload)
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
  
    if(value !== undefined) 
      _changeQuery({ name: "is_active", value: value?1: 0 });
      else 
      _changeQuery({ name: "is_active", value: 1 });
  }

  

  return (
    <div className={className}>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <div>Biển kiểm soát</div>
          <Input
            allowClear
            placeholder={"Biển kiểm soát"}
            onChange={(e) => {
              _changeQuery({ name: "license_plate", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Số điện thoại</div>
          <Input
            allowClear
            placeholder={"Số điện thoại"}
            onChange={(e) => {
              _changeQuery({ name: "registration_number", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Trạng thái</div>
          <Select
            placeholder="Trạng thái"
            optionFilterProp="children"
            allowClear
            style={{width:'100%'}}
            onChange={onChangeStatus}
       
            options={[
              {
                value: true,
                label: 'Hoạt động',
              },
              {
                value: false,
                label: 'Không hoạt động',
              },
              
          ]}
            />
          {/* <Input
            allowClear
            placeholder={"Trạng thái"}
            onChange={(e) => {
              _changeQuery({ name: "is_active", value: e.target.value });
            }}
          /> */}
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
