import { Col, Row, Spin, message } from "antd";
import { apis } from "configs";
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import TableList from './TableList';


const datas = [
  {
    id: 1,
    name: 'John Brown',
    time: '11:20',
  },
  {
    id: 2,
    name: 'Jim Green',
    time: '11:20',
  },
];

const StartPlace = ({ className,itemSelected,setItemSelected }) => {
  const [data, setData] = useState(datas);
  const [items, setItems] = useState([]);
  const [loadding, setLoading] = useState(false);

  return (
    <Row className={className} gutter={[16, 16]}>
      <Spin spinning={loadding}>
        <Col span={24}>
          <div className="banner">Xuất phát từ bến xe Mỹ Đình</div>
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
