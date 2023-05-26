import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import _ from "lodash"
import styled from "styled-components";
import { Col, Drawer, message, Row, Spin } from 'antd';
import Filter from './Filter';
import TableList from './TableList';
import { category } from 'configs';
import { Ui } from 'utils/Ui';
import Update from './Update';

const Index = ({ className }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isShowModal, setShowModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [allRoute, setAllRoute] = useState([]);
    const [stations, setStations] = useState([]);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState({
        page: 1,
        size: 20,
        route_id: '',
        is_active: '',
        start_station_id: '',
        end_station_id: '',
        per_page: 10
    });

    const getDataTable = useCallback(async () => {
        setLoading(true);
        category.getMerchantRoutes(params).then(res => {
            if (res.status === 200) {
                setData(res?.data?.data);
                setTotal(res?.data?.meta?.total);
            }
            setLoading(false);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    }, [params]);

    const onEdit = useCallback(async (ids) => {
        setShowModalEdit(true);
        category.getDetailMerchantRoutes(ids).then(res => {
            if (res.status === 200) {
                setItemSelected(res?.data?.data)
            }
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    }, []);

    const getAllRoutes = useCallback(async () => {
        setLoading(true);
        category.getRoute(params)
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
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })
        await setLoading(false);
    }, []);

    const getStation = useCallback(async () => {

        category.getStation(params)
            .then(res => {
                if (res.status === 200) {
                    const newStations = []
                    const newProvince = []

                    res?.data?.data.map(item => {
                        newStations.push({
                            ...item,
                            value: item?.id,
                            label: item?.name,
                        });
                    });

                    setStations(newStations);
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })

    }, []);

    const onHiddenModalEdit = useCallback(() => {
        onRefreshList();
        setItemSelected(null);
        setShowModalEdit(false);
    });


    useEffect(() => {
        getAllRoutes();
        getStation();
    }, []);

    useEffect(() => {
        getDataTable();
    }, [getDataTable]);

    const onRefreshList = () => {
        getDataTable();
    }

    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter
                    params={params}
                    setParams={setParams}
                    allRoute={allRoute}
                    stations={stations}
                />
            </Col>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        params={params}
                        data={data}
                        onEdit={onEdit}
                        total={total}
                        onRefreshList={onRefreshList}
                        setParams={setParams}
                    />
                </Spin>

            </Col>

            <Drawer
                destroyOnClose
                width={"80%"}
                title={"Cập nhật"}
                placement="right"
                closable={true}
                onClose={onHiddenModalEdit}
                visible={isShowModalEdit}
            >
                {
                    itemSelected ? (
                        <Update
                            onRefresh={onRefreshList}
                            onHiddenModalEdit={onHiddenModalEdit}
                            itemSelected={itemSelected}
                            allRoute={allRoute}
                        />
                    ) : <div><div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spin spinning /></div></div>
                }

            </Drawer>
        </Row>
    );
};

Index.propTypes = {
    className: PropTypes.any,
};

export default styled(Index)`
   `;