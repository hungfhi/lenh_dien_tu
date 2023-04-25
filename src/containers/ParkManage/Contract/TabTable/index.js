import { Tabs } from 'antd';
import React from 'react';
import ContractCar from './ContractCar';
import DepartureTime from './DepartureTime';
import BackupCar from './BackupCar';
const TabTable = () => (
    <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Xe hợp đồng" key="1">
            <ContractCar/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Thời gian xuất bến" key="2">
            <DepartureTime/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Xe dự phòng" key="3">
            <BackupCar/>
        </Tabs.TabPane>
    </Tabs>
);
export default TabTable;