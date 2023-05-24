import React, { useCallback } from "react";
import { Row, Col, Select, Button, DatePicker } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
const { Option } = Select;

const Filter = ({ className, setParams, params, allRoute, showModal }) => {


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

  return (
    <div className={className}>
      <Row gutter={15} style={{ marginBottom: 25 }}>
        <Col span={4}>
          <div>Từ ngày</div>
          <DatePicker
            allowClear={false}
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
        <Col span={4}>
          <div>Đến ngày</div>
          <DatePicker
            allowClear={false}
            disabledDate={disableDateRanges({ startDate: moment(params.date_from).format("YYYY-MM-DD") })}
            onChange={(date) => {
              setParams((prevState) => {
                let nextState = { ...prevState };
                nextState.date_to = date;
                return nextState;
              });
            }}
            style={{ width: '100%' }}
            value={params.date_to}
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
            onChange={(data) => {
              setParams((prevState) => {
                let nextState = { ...prevState };
                nextState.route = data;
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
              setParams((prevState) => {
                let nextState = { ...prevState };
                nextState.direction = e;
                return nextState;
              });
            }}
          >
            <Option key={1}>Chiều A</Option>
            <Option key={2}>Chiều B</Option>
          </Select>
        </Col>
        {
          params?.status !== '2' ? null : <Col span={4}>
            <div>Trạng thái</div>
            <Select
              size="default"
              showSearch
              className={className}
              allowClear
              loadOnMount
              style={{ width: "100%" }}
              placeholder="Trạng thái"
              onChange={(e) => {
                setParams((prevState) => {
                  let nextState = { ...prevState };
                  nextState.direction = e;
                  return nextState;
                });
              }}
            >
              <Option key={1}>Chiều A</Option>
              <Option key={2}>Chiều B</Option>
            </Select>
          </Col>
        }
        {
          params?.status === '1' ? <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', marginTop: 20 }}>
            <Button onClick={() => showModal()} style={{ backgroundColor: '#F57F17', color: '#fff', borderRadius: 6, height: 35, width: 120 }}> Ký lệnh </Button>
          </Col> : null
        }
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
