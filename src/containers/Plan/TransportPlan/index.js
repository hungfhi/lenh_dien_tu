//   const [expected, setExpected] = useState([]);       //dự kiến
//   const [licensing, setLicensing] = useState([]);     //đã cấp
//   const [processing, setProcessing] = useState([]);   //đang thực hiện
//   const [success, setSuccess] = useState([]);         //thành công
//   const [refuse , setRefuse ] = useState([]);         //từ chối


import { Tabs, Row, Col, Button } from 'antd';
import React from 'react';
import Expected from './Expected';
import Licensing from './Licensing';
import Processing from './Processing';
import Success from './Success';
import Refuse from './Refuse';
const TabTable = () => (
    <div>
        <Button style={{float:'right',backgroundColor:'#00A991',color:'#fff',borderRadius:6,height: 35, width:120}}>Tạo lệnh</Button>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Dự kiến" key="1">
                <Expected />
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
    </div>
);
export default TabTable;