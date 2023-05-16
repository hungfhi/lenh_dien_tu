//   const [expected, setExpected] = useState([]);       //dự kiến
//   const [licensing, setLicensing] = useState([]);     //đã cấp
//   const [processing, setProcessing] = useState([]);   //đang thực hiện
//   const [success, setSuccess] = useState([]);         //thành công
//   const [refuse , setRefuse ] = useState([]);         //từ chối


import { Tabs, message, Col, Button, Drawer, Spin } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import styled from "styled-components";
import Expected from './Expected';
import Licensing from './Licensing';
import Processing from './Processing';
import Success from './Success';
import Refuse from './Refuse';
import moment from "moment";
import TabTable from './TabTable';
import { category } from 'configs';

const SignCommand = ({
    className,
}) => {
    const [isShowModal, setShowModal] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const [allRoute, setAllRoute] = useState([]);
    const [params, setParams] = useState({
        start_date: moment(),
        end_date: moment(),
        route_id:undefined
    });
    const onHiddenModal = useCallback(() => {
        setShowModal(false);
        setParams([])
    });

    

    const getAllRoutes = useCallback(async () => {
        category.getRoute()
            .then(res => {
                if (res.status === 200) {
                    const allRoute = []
                    res?.data?.data.map(item => {
                        allRoute.push({
                            ...item,
                            value: item?.id,
                            label: item?.name,
                        })
                    })
                    setAllRoute(allRoute)
                }
            })
            .catch(err => {
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    message.warn(err.response.data?.errors[0].msg)
                }
            })
    }, []);

    useEffect(() => {
        getAllRoutes();
    }, [getAllRoutes]);


    return (
        <div className={className}>
            <div style={{ zIndex: 1, float: 'right', top: 90, right: 33, position: 'absolute', }}>
                <Button onClick={() => setShowModal(true)} style={{ backgroundColor: '#00A991', color: '#fff', borderRadius: 6, height: 35, width: 120 }}>Tạo lệnh</Button>
            </div>
            <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                <Tabs.TabPane tab="Dự kiến" key="1">
                    <Expected allRoute={allRoute}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã cấp" key="2">
                    <Licensing />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đang thực hiện" key="3">
                    <Processing />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Thành công" key="4">
                    <Success />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Từ chối" key="5">
                    <Refuse />
                </Tabs.TabPane>
            </Tabs>
            <Drawer
                destroyOnClose
                width={"100%"}
                title={<div style={{ fontFamily: 'Nunito', fontSize: 16, fontWeight: 700, color: '#01579B' }}>Tạo lệnh vận chuyển</div>}
                placement="right"
                closable={false}
                onClose={onHiddenModal}
                visible={isShowModal}
            >
                {
                    allRoute.length !== 0 ? <TabTable
                        onHiddenModal={onHiddenModal}
                        allRoute={allRoute}
                        params={params}
                        setParams={setParams}
                    /> : <Spin></Spin>

                }

            </Drawer>
        </div>
    )

};
export default styled(SignCommand)`
.ant-tabs-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 12px 0;
    font-size: 16px;
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
    width: 150px !important;
    font-weight: 500 !important;
    font-family: Nunito;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-weight: 500 !important;
    font-family: Nunito;
}
`;