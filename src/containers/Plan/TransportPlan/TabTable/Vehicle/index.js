import { Col } from 'antd';
import React, { useState } from 'react';
import TableList from './TableList';

const Vehicle = ({itemSelected}) => {

    console.log(itemSelected);
    const [data, setData] = useState(itemSelected?.merchant_route_vehicles);

    return (
        <Col span={24}>
            <TableList 
                data={data}
            />
        </Col>
    );
};

export default Vehicle;