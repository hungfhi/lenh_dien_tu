import React, { useEffect, useState } from 'react';
import {  Tabs, Typography, Row, Col, Spin, notification } from 'antd';
import { useSelector } from 'react-redux';
import IconUserDetailQuality from 'components/Icons/IconUserDetailQuality'
import Investment from './Investment'
import Direct from './Direct'
import Indirect from './Indirect'
import MonthlyProfit from './MonthlyProfit'
import { useLocation } from "react-router-dom";
import moment from 'moment';
import formatNumber from 'utils/formatNumber'
import styled from "styled-components";
import ServiceBase from "utils/ServiceBase";

const { Title } = Typography;
const { TabPane } = Tabs;

const UserDetail = ({className}) => {
    const location = useLocation();
    const [data, setData] = useState([])
    const [loadding, setLoadding] = useState(false)

    const getUserDetail = async () => {
      setLoadding(true)
      const result = await ServiceBase.requestJson({
        method: "GET",
        url: `admin/users/${location?.state?.id}`,
        data: {},
      });

      if(result?.value) {
        setLoadding(false)
        setData(result?.value?.data)
        
      } else {
        setLoadding(false)
        notification['error']({
          message: 'Lấy dữ liệu thất bại',
          description:
            '',
        });
      }
    }

    useEffect(() => {
      // getUserDetail()
    }, [location?.state?.id])

    const renderKyc = (isKyc) => {
      if(isKyc) {
        return <span className='flex items-center color-xanh-la normal-case'> (Completed <IconUserDetailQuality/>)</span>
      }
      return <span className='flex items-center color-pending normal-case'> (Pending)</span>
    }
    return (
        <div className={className}>
          <div>
            <Spin spinning={loadding}>
              <div div className='px-4 my-3'>
                <Row>
                  <Col md={18} xs={24}>
                    <Row>
                      <Col md={10}>
                        <div className='font-600 fs-16 py-2 uppercase'>User ID</div>
                        <div className='font-600 fs-16 py-2 uppercase'>Gmail</div>
                        <div className='font-600 fs-16 py-2 uppercase'>Wallet address</div>
                        <div className='font-600 fs-16 py-2 uppercase'>DATE OF BIRTH</div>
                        <div className='font-600 fs-16 py-2 uppercase'>Nationality </div>
                        <div className='font-600 fs-16 py-2 uppercase flex '>VERIFIED&nbsp;&nbsp;&nbsp;
                          {renderKyc(data?.user?.isKyc)}
                        </div>
                      </Col>
                      <Col md={14}>
                        <div className='font-500 fs-16 py-2 color-cam'>{data?.user?.uuid}</div>
                        <div className='font-500 fs-16 py-2 color-cam'>{data?.user?.email}</div>
                        <div className='font-500 fs-16 py-2 color-cam'>{data?.user?.address}</div>
                        <div className='font-500 fs-16 py-2 color-cam'>{data?.kyc?.date_of_birth == "0" ? "Unknown" : moment(data?.kyc?.date_of_birth).format("MM/DD/YYYY") }</div>
                        <div className='font-500 fs-16 py-2 color-cam'>{data?.kyc?.country}</div>
                      </Col>
                    </Row>
                    
                  </Col>

                  <Col md={6} xs={24}>
                    <div className='rounded-md px-4 py-2' style={{background: '#FFA537'}}>
                      <Row justify='space-between'>
                        <Col >
                          <div className='font-600 fs-16 py-2 uppercase text-white'>Total INVEST</div>
                          <div className='font-600 fs-16 py-2 uppercase text-white'>Total WITHDRAW</div>
                        </Col>
                        <Col >
                          <div className='font-500 fs-16 py-2 text-white'>{formatNumber(data?.totalInvest && data?.totalInvest.reduce((a, b) => a + b?.amount, 0))}</div>
                          <div className='font-500 fs-16 py-2 text-white'>{data?.totalWithdraw}</div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <Row gutter={[16]} className="mt-6">
                  <Col md={6} xs={24}>
                    <div className='rounded flex justify-center items-center overflow-hidden ' style={{background: '#FFEACB'}}>
                      <img className='px-3 py-3' style={{maxHeight: 200}} src={data?.kyc?.imageAll}/>
                    </div>
                  </Col>
                  <Col md={6} xs={24}>
                    <div className='rounded flex justify-center items-center overflow-hidden ' style={{background: '#FFEACB'}}>
                      <img className='px-3 py-3' style={{maxHeight: 200}} src={data?.kyc?.imageIdBack}/>
                    </div>
                  </Col>
                  <Col md={6} xs={24}>
                    <div className='rounded flex justify-center items-center overflow-hidden ' style={{background: '#FFEACB'}}>
                      <img className='px-3 py-3' style={{maxHeight: 200}} src={data?.kyc?.imageIdFront}/>
                    </div>
                  </Col>
                  <Col md={6} xs={24}>
                    {
                      data?.user?.isKyc ? null : (
                        <button className='btn_approve text-white px-4 py-2 font-700' style={{marginTop: 80}}>Approve</button>
                      )
                    }
                  </Col>
                </Row>
              </div>

              <div className='mt-10 mb-20'>
                <Tabs defaultActiveKey="1" style={{width: '100%'}}>
                  <TabPane tab={<Title level={5}>Investment</Title>} key="1">
                    <Investment uuid={data?.user?.uuid}/>
                  </TabPane>
                  <TabPane tab={<Title level={5}>Monthly profit</Title>} key="2">
                    <MonthlyProfit />
                  </TabPane>
                  <TabPane tab={<Title level={5}>Direct referral profit</Title>} key="3">
                    <Direct />
                  </TabPane>
                  <TabPane tab={<Title level={5}>Indirect referral  profit</Title>} key="4">
                    <Indirect />
                  </TabPane>
                </Tabs>
              </div>
            </Spin>
          </div>
            
           
        </div>
    )
};

export default styled(UserDetail)`
  .ant-tabs-tab-active {
    h5 {
      color: #CD5D42
    }
  }
  .ant-tabs-ink-bar {
    height: 5px;
    background: #CD5D42
  }
  
  .ant-tabs-nav-list {
    margin-left: 22px;
  }
  .btn_approve {
    background: #F94703;
    border-radius: 4px;
  }
`;