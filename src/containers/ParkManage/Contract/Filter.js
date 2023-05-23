import React, { useCallback, useState } from "react";
import { Row, Col, DatePicker, Select, Button, Input, Spin } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import { TuyenSelect } from "components";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, transport }) => {
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState(false);

  const _handleSearch = useCallback((input) => {
    setTimeout(() => {
      setSearch(input || "");
    }, 666000)
  }, []);

  const localSearchFunc = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

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
          <div>Mã hợp đồng</div>
          <Input
            allowClear
            placeholder={"Mã hợp đồng"}
            onChange={(e) => {
              _changeQuery({ name: "contract_code", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Số hợp đồng</div>
          <Input
            allowClear
            placeholder={"Số hợp đồng"}
            onChange={(e) => {
              _changeQuery({ name: "contract_number", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Đơn vị vận tải</div>
          <Select
            size="default"
            style={{ width: "100%" }}
            placeholder="Đơn vị vận tải"
            allowClear
            loadOnMount
            showSearch
            className={className}
            loading={fetching}
            notFoundContent={fetching ? <Spin size="small" /> : "Không có dữ liệu"}
            onSearch={_handleSearch}
            filterOption={localSearchFunc}
            onChange={(data) => {
              setParams((prevState) => {
                let nextState = { ...prevState };
                nextState.merchant_id = data;
                return nextState;
              });
            }}
          >
            {_.map(transport, (item, itemId) => (
              <Select.Option key={itemId} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', paddingBottom: 10 }}>
          <Button className="btn-add" onClick={() => setShowModal(true)} style={{ backgroundColor: '#01579B', color: '#fff', borderRadius: 6, height: 35, width: 120 }}> Thêm mới</Button>
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
