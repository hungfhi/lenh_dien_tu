import { Button, Col, DatePicker, Input, Row, Select, Spin } from "antd";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, stations }) => {
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState(false);
  const getQuery = useCallback(
    (value, name) => {
      setParams((preState) => {
        let nextState = { ...preState };
        nextState[name] = value;
        return nextState;
      });
    },
    [params]
  );

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
          <div>Tên đơn vị vận tải</div>
          <Input
            allowClear
            placeholder={"Tên đơn vị vận tải"}
            onChange={(e) => {
              _changeQuery({ name: "merchant_name", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Bến quản lý</div>
          <Select
            size="default"
            style={{ width: "100%" }}
            placeholder="Chọn bến xe"
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
                nextState.station_id = data;
                return nextState;
              });
            }}
          >
            {_.map(stations, (item, itemId) => (
              <Select.Option key={itemId} value={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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
