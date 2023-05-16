import { Col, Row, Spin, message } from "antd";
import { apis } from "configs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import TableList from './TableList';

const datas = [
  {
    id: 3,
    name: 'John Brown',
    time: '11:20',
  },
  {
    id: 4,
    name: 'Jim Green',
    time: '22:12',
  },
  {
    id: 5,
    name: 'hungf',
    time: '00:05',
  },
];




const EndPlace = ({ className,itemSelected,setItemSelected}) => {
  const [data, setData] = useState(datas);
  const [items, setItems] = useState([]);
  const [loadding, setLoading] = useState(false);

  return (
    <Row className={className} gutter={[16, 16]}>
      <Spin spinning={loadding}>
        <Col span={24}>
          <div className="banner">Xuất phát từ bến xe Sơn La</div>
          <TableList
            data={data}
            setData={setData}
            setItems={setItems}
            items={items}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </Col>
      </Spin>
    </Row>
  );
};

EndPlace.propTypes = {
  className: PropTypes.any,
};
export default styled(EndPlace)`
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
