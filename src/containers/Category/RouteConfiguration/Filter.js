import React, { useCallback } from "react";
import { Row, Col, Select, Button, Input } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

const { Option } = Select;
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
      _changeQuery({ name: "is_active", value: value });
    else
      _changeQuery({ name: "is_active", value: undefined });
  }

  const onChangeRoute = (value) => {
    if (value !== undefined)
      _changeQuery({ name: "route_id", value: value });
    else
      _changeQuery({ name: "route_id", value: '' });
  }


  const onChangeStartStation = (value) => {
    if (value !== undefined)
      _changeQuery({ name: "start_station_id", value: value });
    else
      _changeQuery({ name: "start_station_id", value: '' });
  }


  const onChangeEndStation = (value) => {
    if (value !== undefined)
      _changeQuery({ name: "end_station_id", value: value });
    else
      _changeQuery({ name: "end_station_id", value: '' });
  }




  return (
    <div className={className}>
      <Row gutter={[8, 8]}>
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
              _changeQuery({ name: "is_active", value: e });
            }}
          >
            <Option key={0}>Không hoạt động</Option>
            <Option key={1}>Hoạt động</Option>
          </Select>
        </Col>
        <Col span={4}>
          <div>Bến đi</div>
          <Select
            showSearch
            placeholder="Bến đi"
            optionFilterProp="children"
            allowClear
            style={{ width: '100%' }}
            onChange={onChangeStartStation}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={stations}
          />
        </Col>
        <Col span={4}>
          <div>Bến đến</div>
          <Select
            showSearch
            placeholder="Bến đến"
            optionFilterProp="children"
            allowClear
            style={{ width: '100%' }}
            onChange={onChangeEndStation}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={stations}
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
