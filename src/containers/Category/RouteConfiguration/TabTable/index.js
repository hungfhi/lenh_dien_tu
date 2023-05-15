import { Tabs, Row, Col } from 'antd';
import React from 'react';
import styled from "styled-components";
import TimeStart from './TimeStart';
import TimeEnd from './TimeEnd';
import StartPlace from './StartPlace';
import EndPlace from './EndPlace';
const TabTable = ({ className, itemSelected, allRoute }) => {
    console.log("first",itemSelected?.route?.id)
    const route = allRoute.find(x => x.id === itemSelected?.route?.id)?.name;
    const route_name = route.split("-");
    return (
        <div className={className} >
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab={<div>Chiều đi (Đi từ {route_name[0]})</div>} key="1">
                    <Row gutter={[16,16]}>
                        <Col span={12}>
                            <TimeStart itemSelected={itemSelected} />
                        </Col>
                        <Col span={12}>
                            <StartPlace itemSelected={itemSelected} />
                        </Col>
                    </Row>

                </Tabs.TabPane>
                <Tabs.TabPane tab={<div>Chiều về (Đi từ {route_name[1]})</div>} key="2">

                    <Row gutter={[16,16]}>
                        <Col span={12}>
                            <TimeEnd itemSelected={itemSelected} />
                        </Col>
                        <Col span={12}>
                            <EndPlace itemSelected={itemSelected} />
                        </Col>
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