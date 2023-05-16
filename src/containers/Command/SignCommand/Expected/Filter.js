import React, { useCallback } from "react";
import { Row, Col, Select, Button, DatePicker } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params, allRoute, activeAll }) => {
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
          <div>Chiều</div>
          <Select
            size="default"
            showSearch
            className={className}
            allowClear
            loadOnMount
            style={{ width: "100%" }}
            placeholder="Chiều"
            onChange={(e) => {
              _changeQuery({ name: "type", value: e });
            }}
          >
            <Option key={1}>Chiều A</Option>
            <Option key={2}>Chiều B</Option>
          </Select>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', }}>
          <Button style={{ backgroundColor: '#F57F17', color: '#fff', borderRadius: 6, height: 35, width: 120 }} onClick={activeAll} >Kí Lệnh</Button>
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
