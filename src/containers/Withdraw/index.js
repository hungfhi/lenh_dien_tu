import React, { useEffect, useState } from 'react';
import { Space, Table, Spin, Input, Row, Col, notification } from 'antd';
import {  SearchOutlined } from '@ant-design/icons';
import IconUserDetailQuality from 'components/Icons/IconUserDetailQuality'
import _ from 'lodash';
import ServiceBase from "utils/ServiceBase";
import formatNumber from 'utils/formatNumber'
import formatHash from 'utils/formatHash'

const Withdraw = () => {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(0);
  const [loadding, setLoadding] = useState(false)

  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    sortBy: 'createdAt:asc',
    status: 'pending'
  });

  
    const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'InvestId',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'receipt',
      key: 'receipt',
      render: (value) => value.map((item) => <div className='color-app font-600 text-center'>${formatNumber( ((parseFloat(item?.amount) * item?.amountUsd) / 1e18).toFixed(2) ) }</div>)
    },
    {
      title: 'Currency',
      dataIndex: 'receipt',
      key: 'receipt',
      render: (value) => value.map((item) => <div>{formatHash(item?.token)}</div>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => renderKyc(value)
    },
  
    {
      title: 'Action',
      key: 'status',
      dataIndex: 'status',
      render: (status) => status == 'pending' ? <button className='btn_approve text-white px-4 py-2 font-700' >Approve</button> : '',
    },
  ];

  const getListUser = async () => {
    setLoadding(true)
    const result = await ServiceBase.requestJson({
      method: "GET",
      url: `admin/withdraws`,
      data: {
        ...params,
      },
    });
    if(result?.value) {
      setLoadding(false)
      setData(result?.value?.data)
      setTotalPage(result?.value?.options?.totalResults)
    } else {
      setLoadding(false)
      notification['error']({
        message: 'Lấy dữ liệu thất bại',
        description:
          '',
      });
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
	}, [params])


  const renderKyc = (status) => {
    if(status !== 'pending') {
      return <span className='flex items-center color-xanh-la normal-case'> (Completed <IconUserDetailQuality/>)</span>
    }
    return <span className='flex items-center color-pending normal-case'> (Pending)</span>
  }
    return (
        <div className='mb-10'>
            <div className='filter px-4 mt-3 mb-6'>
              <Row>
                <Col md={8} xs={24}>
                  <Input 
                    allowClear
                    onChange={onSearch}
                    size="large" placeholder="Search by ID..." prefix={<SearchOutlined />} />
                </Col>
              </Row>
            </div>
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

export default Withdraw;