import { Col, Drawer, Spin, message } from 'antd';
import { category } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import { Ui } from 'utils/Ui';
import TableList from './TableList';
import Update from './Update';

const Trip = ({ itemSelected }) => {

    // console.log(itemSelected);

    const [dataA, setDataA] = useState(itemSelected?.node_a);
    const [dataB, setDataB] = useState(itemSelected?.node_b);
    const [isShowModalTripPlan, setIsShowModalTripPlan] = useState(false);
    const [itemTripSelected, setItemTripSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const onTripPlan = useCallback(async (row) => {
        setIsShowModalTripPlan(true);
        setItemTripSelected(row);
    }, []);

    const onHiddenModalTripPlan = () => {
        setIsShowModalTripPlan(false);
        setItemTripSelected(null);
    }

    // const onRefreshList = () => {
    //     setDataA(dataA);
    //     setDataB(dataB)
    // }

    // useEffect(() => {
    //     setDataA(dataA);
    // }, [dataA]);
    // useEffect(() => {
    //     setDataB(dataB);
    // }, [dataB]);

    const getDataTable = useCallback(async () => {
        setLoading(true);
        category.getDetailMerchantRoutes(itemSelected?.id).then(res => {

            if (res.status === 200) {
                setDataA(res?.data?.data?.node_a);
                setDataB(res?.data?.data?.node_b);

                // console.log(res);
                // setData(res?.data?.data);
                // setTotal(res?.data?.meta?.total);
            }
            setLoading(false);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    }, []);
    useEffect(() => {
        getDataTable();
    }, []);

    const onRefreshList = () => {
        getDataTable();
    }

    // console.log(itemTripSelected);

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
                <Spin spinning={loading}>
                    <TableList
                        data={dataA}
                        itemSelected={itemSelected}
                        setData={setDataA}
                        onTripPlan={onTripPlan}
                    />
                </Spin>

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
                <Spin spinning={loading}>
                    <TableList
                        data={dataB}
                        itemSelected={itemSelected}
                        setData={setDataB}
                        onTripPlan={onTripPlan}
                    />
                </Spin>

            </Col>
            <Drawer
                destroyOnClose
                width={"40%"}
                title={"Lập kế hoạch chuyến đi"}
                placement="right"
                closable={true}
                onClose={onHiddenModalTripPlan}
                visible={isShowModalTripPlan}
            >
                {
                    itemTripSelected ? (
                        <Update
                            onRefreshList={onRefreshList}
                            onHiddenModalTripPlan={onHiddenModalTripPlan}
                            itemTripSelected={itemTripSelected}
                            isShowModalTripPlan={isShowModalTripPlan}
                            data={itemTripSelected?.direction?.id == 1 ? dataA : dataB}
                            setData={itemTripSelected?.direction?.id == 1 ? setDataA : setDataB}
                        // allRoute={allRoute}
                        />
                    ) : <div><div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spin spinning /></div></div>
                }

            </Drawer>
        </>
    );
};

export default Trip;