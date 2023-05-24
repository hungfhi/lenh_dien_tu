import { Tabs, message, Spin } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import styled from "styled-components";
import ContractCar from './ContractCar';
import DepartureTime from './DepartureTime';
import BackupCar from './BackupCar';
import { station } from 'configs';
const TabTable = ({ className, car, time, itemCar, setItemCar, itemTime, setItemTime, setCar, setTime, startDate, endDate, setIsLoad, isLoad }) => {
    const [allRoute, setAllRoute] = useState([]);
    const getAllRoutes = useCallback(async () => {
        station.getRoute()
            .then(res => {
                if (res.status === 200) {
                    const allRoute = []
                    res?.data?.data.map(item => {
                        allRoute.push({
                            id: item?.id,
                            name: item?.name,
                            route_code: item?.route_code,
                        })
                    })
                    setAllRoute(allRoute)
                }
            })
            .catch(err => {
                message.error("Có lỗi xảy ra !")
            })
    }, []);

    useEffect(() => {
        getAllRoutes();
    }, [getAllRoutes]);

    return (
        <div className={className}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Xe hợp đồng" key="1">
                    <ContractCar
                        car={car}
                        setCar={setCar}
                        allRoute={allRoute}
                        itemCar={itemCar}
                        setItemCar={setItemCar}
                        startDate={startDate}
                        endDate={endDate}
                        isLoad={isLoad}
                        setIsLoad={setIsLoad}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Thời gian xuất bến" key="2">
                    <DepartureTime
                        time={time}
                        setTime={setTime}
                        allRoute={allRoute}
                        itemTime={itemTime}
                        setItemTime={setItemTime}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Xe dự phòng" key="3">
            <BackupCar />
        </Tabs.TabPane> */}
            </Tabs>
        </div>
    )

};
export default styled(TabTable)`
.ant-tabs-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 12px 0;
    font-size: 14px;
    background: transparent;
    border: 1px solid white !important;
    outline: none;
    cursor: pointer;
    width: 150px !important;
    font-weight: 500 !important;
    font-family: Nunito;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-weight: 400 !important;
    font-family: Nunito !important;
    color:#01579B !important;
}
.ant-tabs-nav-wrap {
    width: 60% !important;
    z-index:1 !important;
    flex:none !important
}

`;