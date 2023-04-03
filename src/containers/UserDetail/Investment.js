import React, { useEffect, useState } from 'react';
import { Space, Table, Spin, Input, Row, Col, notification } from 'antd';
import { useSelector } from 'react-redux';
import {  SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import IconUserDetailQuality from 'components/Icons/IconUserDetailQuality'
import _ from 'lodash';
import formatHash from 'utils/formatHash'
import formatNumber from 'utils/formatNumber'
import moment from 'moment';
import ServiceBase from "utils/ServiceBase";


const Investment = ({uuid}) => {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(0);
  const [loadding, setLoadding] = useState(false)

  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    isClosed: 0,
    sortBy: 'amount:asc',
    populate: 'depositRef'
  });

  
  const columns = [
    {
      title: 'No.1',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Time',
      dataIndex: 'depositRef',
      key: 'depositRef',
      render: (value) => moment(value?.depositRef).format("DD/MM/YYYY HH:mm:ss")
    },
    {
      title: 'Sender',
      dataIndex: 'depositRef',
      key: 'depositRef',
      render: value => formatHash(value?.address)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => <div className='color-app font-600 text-center'>${`${formatNumber(value)}`}</div>
    },
    {
      title: 'Token',
      dataIndex: 'depositRef',
      key: 'depositRef',
      render: value => formatHash(value.token)
    },
    {
      title: 'Hash',
      dataIndex: 'depositRef',
      key: 'depositRef',
      render: value => formatHash(value.txHash)
    },
    
  ];

  const getListUser = async () => {
    setLoadding(true)
    const result = await ServiceBase.requestJson({
      method: "GET",
      url: `admin/investments?uuid=${uuid}`,
      data: params,
    });
    if(result?.value) {
      setLoadding(false)
      setData(result?.value?.data)
      setTotalPage(result?.value?.options?.totalResults)
    } else {
      setLoadding(false)
      notification.error("Lấy dữ liệu thất bại")
    }
	}

  const onChange = (pagination) => {
    setParams((prevState) => {
      let nextState = { ...prevState };
      nextState.page = pagination?.current;
      return nextState;
    });
  }


  const onSearch = _.debounce(async (e) => {
    setParams((prevState) => {
      let nextState = { ...prevState };
      nextState.email = e.target.value;
      return nextState;
    });
  }, 300);

  useEffect(() => {
		// getListUser()
	}, [params, uuid])



    return (
        <div>
            <Spin spinning={loadding}>
              <Table columns={columns} 
                dataSource={data} 
                scroll={{x: '100%'}}
                pagination={{
                  total: totalPage
                }}
                onChange={onChange}
              />
            </Spin>
           
        </div>
    )
};

export default Investment;