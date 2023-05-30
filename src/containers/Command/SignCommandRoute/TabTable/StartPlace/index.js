import { Col, Row, Spin, message } from "antd";
import { apis } from "configs";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TableList from './TableList';


const StartPlace = ({ className, itemSelected, setItemSelected, nodeA }) => {
  const [data, setData] = useState(nodeA?.nodes);
  const [items, setItems] = useState([]);
  const [loadding, setLoading] = useState(false);
  useEffect(() => {
    setData(nodeA?.nodes)
  }, [nodeA]);
  return (
    <Row className={className} gutter={[16, 16]}>
      <Spin spinning={loadding}>
        <Col span={24}>
          <div className="banner">Xuất phát từ bến xe {nodeA?.name}</div>
          <TableList
            data={data}
            items={items}
            setData={setData}
            setItems={setItems}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </Col>
      </Spin>
    </Row>
  );
};

StartPlace.propTypes = {
  className: PropTypes.any,
};
export default styled(StartPlace)`
.banner {
  text-align: center;
  padding: 6px 5px;
  background-color: rgb(228, 232, 236);
  color: rgb(1, 87, 155);
  font-weight: 700;
  font-family: Nunito;
  font-size: 16px;
}
 `;
