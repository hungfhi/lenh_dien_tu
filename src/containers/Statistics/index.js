import React, { useEffect, useState } from 'react';
import { Table, Spin, Input, Row, Col, notification } from 'antd';
import _ from 'lodash';
import ServiceBase from "utils/ServiceBase";
import formatHash from 'utils/formatHash'
import icon_down from 'assets/icon_down.png'
import icon_up from 'assets/icon_up.png'
import formatNumber from 'utils/formatNumber';
import moment from 'moment'
import styled from "styled-components";



const Statistics = ({className}) => {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(0);
  const [loadding, setLoadding] = useState(false)
  const [loaddingTop, setLoaddingTop] = useState(false)

  const [dataStatistic, setDataStatistic] = useState(null);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
    
  ]
  
 

  const getListInvestmentList = async () => {
    setLoadding(true)
    const result = await ServiceBase.requestJson({
      method: "GET",
      url: `admin/investments?date=2022-07-12&isClosed=0&sortBy=amount:asc&populate=depositRef`,
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

  const getStatistic = async () => {
    setLoaddingTop(true)
    const result = await ServiceBase.requestJson({
      method: "GET",
      url: `admin/investments/volume`,
      data: {},
    });
    if(result?.value?.data) {
      setLoaddingTop(false)
      setDataStatistic(result?.value?.data)
    }
    else {
      setLoaddingTop(false)
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



  useEffect(() => {
		// getListInvestmentList()
	}, [params])


  useEffect(() => {
    // getStatistic()
  }, [])


  
  const renderItem = (item) => {
    return (
        <Col md={6} sm={12} xs={24} >
            <div className='item mx-2'  data-aos={item?.animate}>
                <div className='flex font-700 mb-2'>
                    <div className='color-vol'>{item?.name}</div>
                </div>
                <div className='fs-20 flex items-center font-700 item_value'>
                    {!loaddingTop ?  formatNumber(item?.value) : 0}&nbsp;
                    <span className='fs-16 font-600' style={{color: item?.isRed ? '#E53935' : '#28C700' }}>{item?.isRed ? '-' : '+'}{item?.percent}%</span>
                    <span><img className='w-4 ml-1' src={item?.isRed ? icon_down : icon_up}/></span>
                </div>
            </div>
        </Col>
    )
}

  
    return (
       <div className={className}>
         <div className='mb-10'>
           
            <div className='font-600 color-black fs-18 mx-2 mb-3'>
              Investment list
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
       </div>
    )
};
export default styled(Statistics)`
  .item {
    background: #fff !important;
    padding: 10px;
    box-shadow: 0px 4px 6px rgba(231, 219, 210, 0.24);
    border-radius: 5px;
  }
`


