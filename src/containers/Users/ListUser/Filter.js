import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, DatePicker, Select, Button, Input, Spin } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import { TuyenSelect } from "components";
import moment from "moment";
import { category } from "configs";
import { Ui } from "utils/Ui";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, operator }) => {

  const [listPositions, setListPositions] = useState([]);
  const getListPotisions = useCallback(async () => {
    category.getPositions().then(res => {
      setListPositions(res?.data?.data);
    }).catch(err => {
      if (err.response?.status === 422 && err.response?.data?.errors) {
        Ui.showErrors('Có lỗi xảy ra');
      }
    })
  }, []);

  useEffect(() => {
    getListPotisions();
  }, []);

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
          <div>Họ tên</div>
          <Input
            allowClear
            placeholder={"Họ tên"}
            onChange={(e) => {
              _changeQuery({ name: "full_name", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Tên hiển thị</div>
          <Input
            allowClear
            placeholder={"Tên hiển thị"}
            onChange={(e) => {
              _changeQuery({ name: "username", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Số điện thoại</div>
          <Input
            allowClear
            placeholder={"Nhập SĐT"}
            onChange={(e) => {
              _changeQuery({ name: "phone", value: e.target.value });
            }}
          />
        </Col>
        <Col span={4}>
          <div>Email</div>
          <Input
            allowClear
            placeholder={"Nhập Email"}
            onChange={(e) => {
              _changeQuery({ name: "email", value: e.target.value });
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
