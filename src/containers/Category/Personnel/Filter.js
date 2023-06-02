import { Button, Col, DatePicker, Input, Row, Select, message } from "antd";
import { definitions } from "configs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
const { RangePicker } = DatePicker;
const { Option } = Select;

let inputTimer = null;

const Filter = ({ className, setParams, params, setShowModal, operator }) => {

  const [listPositions, setListPositions] = useState([]);
  const getListPotisions = useCallback(async () => {
    definitions.getPositions().then(res => {
      setListPositions(res?.data?.data);
    }).catch(err => {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')                          
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
          <div>Tên nhân sự</div>
          <Input
            allowClear
            placeholder={"Nhập tên nhân sự"}
            onChange={(e) => {
              _changeQuery({ name: "name", value: e.target.value });
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
          <div>Chức vụ</div>
          <Select
            style={{ width: '100%' }}
            placeholder={'Chọn chức vụ'}
            allowClear={true}
            onChange={(e) => {
              _changeQuery({ name: "position_id", value: e });
            }}
          >
            {listPositions && listPositions.map((item, index) => {

              return <Select.Option value={item?.id}>{item?.name}</Select.Option>
            })}
          </Select>
        </Col>
        <Col span={4}>
          <div>Trạng thái</div>
          <Select
            style={{ width: '100%' }}
            allowClear={true}
            placeholder={'Chọn trạng thái'}
            onChange={(e) => {
              _changeQuery({ name: "status", value: e });
            }}
          >
            <Select.Option value={0}>Đã bị khóa</Select.Option>
            <Select.Option value={1}>Đang hoạt động</Select.Option>
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
