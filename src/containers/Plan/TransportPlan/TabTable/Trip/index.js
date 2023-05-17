import { Col } from 'antd';
import React, { useState } from 'react';
import TableList from './TableList';

const Trip = ({ itemSelected }) => {

    // console.log(itemSelected);

    const [dataA, setDataA] = useState(itemSelected?.node_a);
    const [dataB, setDataB] = useState(itemSelected?.node_b);

    return (
        <>
            <Col span={12}>
                <div
                    style={{
                        textAlign: 'center',
                        padding: '10px 0',
                        background: '#f5f5f5',
                        color: '#01579B',
                        fontWeight: 'bold'
                    }}
                >
                    Xuất phát từ bến xe {itemSelected?.route?.start_station?.name}
                </div>
                <TableList
                    data={dataA}
                    itemSelected={itemSelected}
                    setData={setDataA}
                />
            </Col>
            <Col span={12}>
                <div
                    style={{
                        textAlign: 'center',
                        padding: '10px 0',
                        background: '#f5f5f5',
                        color: '#01579B',
                        fontWeight: 'bold'
                    }}
                >
                    Xuất phát từ bến xe {itemSelected?.route?.end_station?.name}
                </div>
                <TableList
                    data={dataB}
                    itemSelected={itemSelected}
                    setData={setDataB}
                />
            </Col>
        </>
    );
};

export default Trip;