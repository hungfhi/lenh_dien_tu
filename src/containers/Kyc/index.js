import React, { useEffect, useState } from 'react';
import { Space, Table, Spin, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import {  SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import IconUserDetailQuality from 'components/Icons/IconUserDetailQuality'
import _ from 'lodash';

const Kyc = () => {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(0);
  const [loadding, setLoadding] = useState(false)

  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    email: ''
  });

  
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uuid',
      key: 'uuid',
    },
    {
      title: 'Wallet address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },
   
  ];

  const getListUser = () => {
    // setLoadding(true)

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


  const renderKyc = (isKyc) => {
    if(isKyc) {
      return <span className='flex items-center color-xanh-la normal-case'> (Completed <IconUserDetailQuality/>)</span>
    }
    return <span className='flex items-center color-pending normal-case'> (Pending)</span>
  }
    const renderStatusCompleted = () => {
      return <button className='status_completed font-700 px-3 py-1 flex'>
        Completed
      </button>
    }
    const renderStatusPending = () => {
      return <button className='status_pending font-700 px-3 py-1 flex'>
        Pending
      </button>
    }
    const renderStatusNotVerified = () => {
      return <button className='status_notVerified font-700 px-3 py-1 flex'>
        Not verified
      </button>
    }
    return (
        <div>
            <div className='filter px-4 mt-3 mb-6'>
              <Row>
                <Col md={8} xs={24}>
                  <Input 
                    allowClear
                    onChange={onSearch}
                    size="large" placeholder="Search by ID,..." prefix={<SearchOutlined />} />
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

export default Kyc;