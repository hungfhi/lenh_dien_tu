import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Button, message, Spin } from "antd";
import { Tabs, TabPane } from "components";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Map } from "immutable";
import moment from 'moment'
import Filter from "./Filter"
import { URI } from "utils/constants";
import { Ui } from "utils/Ui";
import { DownloadOutlined } from "@ant-design/icons";
import TableList from './TableList';
import { apis } from "configs";
const data = [
  {
    id: '1',
    name: 'hungf',
    date: 20 - 12 - 2012
  },
  {
    id: '2',
    name: 'mai',
    date: 16 - 11 - 2012
  },
]

const ContractCar = ({ className, profile }) => {
  // const [data, setData] = useState([]);
  const [loadding, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    phone: undefined
  });

  const getDataTable = useCallback(async () => {
    setLoading(true);
    apis.getBusStation(data)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Thành công" });
        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0].msg)
          message.error('Error!')
        }
      })
    await setLoading(false);
  }, [params]);
  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  const onRefreshList = () => {
    getDataTable();
  }

  return (
    <Row className={className} gutter={[16, 16]}>
      <Col span={24}>
        {/* <Filter params={params} setParams={setParams} /> */}
      </Col >
      <Spin spinning={loadding}>
        <Col span={24}>
          <TableList
            data={data}
            params={params}
            setParams={setParams}
            total={total}
            setTotal={setTotal}
          />
        </Col>
      </Spin>
    </Row>
  );
};

ContractCar.propTypes = {
  className: PropTypes.any,
};
export default styled(ContractCar)`
  
 `;
