import { Button, Col, Row, Spin } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TableList from './TableList';
const ContractCar = ({ className, car, setItemCar, setCar, itemCar, allRoute,startDate,endDate }) => {

  const [data, setData] = useState(car);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    phone: undefined
  });

  useEffect(() => {
    setData(car)
  }, [car]);


  return (
    <Row className={className} gutter={[16, 16]}>
      <Col span={24} style={{ width: 'calc(100% - 10px)' }}>
        <TableList
          data={data}
          params={params}
          setCar={setCar}
          setParams={setParams}
          total={total}
          setTotal={setTotal}
          itemCar={itemCar}
          setItemCar={setItemCar}
          allRoute={allRoute}
          setData={setData}
          startDate={startDate}
          endDate={endDate}
        />
      </Col>
    </Row>
  );
};

ContractCar.propTypes = {
  className: PropTypes.any,
};
export default styled(ContractCar)`
.ant-spin-nested-loading {
  width: 100% !important;
}
`;
