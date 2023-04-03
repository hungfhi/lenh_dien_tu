import React, { useEffect, useState } from 'react';
import { Space, Table, Spin, Input, Row, Col, notification } from 'antd';
import {  SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import IconUserDetailQuality from 'components/Icons/IconUserDetailQuality'
import _ from 'lodash';
import ServiceBase from "utils/ServiceBase";
import formatHash from 'utils/formatHash'

const User = () => {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(0);
  const [loadding, setLoadding] = useState(false)

  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    sortBy: 'createdAt:desc'
  });

  
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uuid',
      key: 'uuid',
    },
    {
      title: 'Gmail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Wallet address',
      dataIndex: 'address',
      key: 'address',
      render: (value) => formatHash(value)
    },
    {
      title: 'Ref',
      dataIndex: '',
      key: '',
      render: ''
    },
    {
      title: 'KYC',
      dataIndex: 'isKyc',
      key: 'isKyc',
      render: (value) => renderKyc(value)
    },
   
  
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
           <Link to="/user-detail"
            state={{ id: record?.id, }}
           >
            <div className='btn_view_detail px-2 py-1 rounded cursor-pointer font-600 fs-12'>
                Xem chi tiết
            </div>
           </Link>
        </Space>
      ),
    },
  ];

  const getListUser = async () => {
    setLoadding(true)
    const result = await ServiceBase.requestJson({
      method: "GET",
      url: `admin/users`,
      data: {
        ...params,
        email: params?.email || undefined
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


  const renderKyc = (isKyc) => {
    if(isKyc) {
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
                    size="large" placeholder="Search by ID, wallet address,..." prefix={<SearchOutlined />} />
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

export default User;