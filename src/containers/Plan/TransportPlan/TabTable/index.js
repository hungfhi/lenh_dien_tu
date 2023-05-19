import { Tabs, Row, Col, Button } from 'antd';
import React from 'react';
import styled from "styled-components";
import Driver from './Driver';
import Trip from './Trip';
import Vehicle from './Vehicle';

const TabTable = ({ className, itemSelected, allRoute, onRefreshList }) => {
    const route = allRoute.find(x => x.id === itemSelected?.route?.id)?.name;
    const route_name = route.split("-");
    return (
        <div className={className} >
            <Tabs defaultActiveKey="2">
                <Tabs.TabPane tab={<div>Chuyến đi</div>} key="1">
                    <Row gutter={[16,16]}>
                        <Trip 
                            itemSelected={itemSelected}
                        />
                    </Row>

                </Tabs.TabPane>
                <Tabs.TabPane tab={<div>Phương tiện</div>} key="2">

                    <Row gutter={[16,16]}>
                        <Vehicle itemSelected={itemSelected} onRefreshList={onRefreshList} />
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<div>Lái xe</div>} key="3">

                    <Row gutter={[16,16]}>
                        <Driver itemSelected={itemSelected} onRefreshList={onRefreshList} />
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )

}
export default styled(TabTable)`
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #000000 !important;
    font-weight: 700;
    font-family: Nunito;
    text-shadow: none !important;
},
`;