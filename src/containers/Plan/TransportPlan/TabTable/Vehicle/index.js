import { Button, Col, Drawer, message, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import TableList from './TableList';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Create from './Create';
import Update from './Update';
import { category } from 'configs';
import { Ui } from 'utils/Ui';

const Vehicle = ({ className, itemSelected }) => {

    // console.log(itemSelected);
    const [data, setData] = useState();
    const [isShowModal, setShowModal] = useState(false);
    const [itemVehicleSelected, setItemVehicleSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [allVehicle, setAllVehicle] = useState([]);
    const [loading, setLoading] = useState(false);

    const onHiddenModal = () => {
        setShowModal(false);
    }

    const onHiddenModalEdit = () => {
        setItemVehicleSelected(null)
        setShowModalEdit(false)
    }

    const onEdit = useCallback(async (row) => {
        setShowModalEdit(true);
        setItemVehicleSelected(row);
    });

    const getAllVehicle = useCallback(async () => {
        // setLoading(true);
        category.getVehicle().then(res => {
            if (res.status === 200) {
                const newAllVehicle = []
                res?.data?.data.map(item => {
                    newAllVehicle.push({
                        // ...item,
                        value: item?.id,
                        label: item?.license_plate,
                    })
                })
                setAllVehicle(newAllVehicle);
            }
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    }, []);

    useEffect(() => {
        getAllVehicle();
    }, []);

    const detailVehicleTab = useCallback(async () => {
        setLoading(true);
        category.getDetailMerchantRoutes(itemSelected?.id).then(res => {
            if (res.status === 200) {
                setData(res.data.data.merchant_route_vehicles);
            }
            setLoading(false);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    });

    useEffect(() => {
        detailVehicleTab();
    }, []);

    const onRefreshList = () => {
        detailVehicleTab();
    }

    return (
        <div className={className}>
            <Col span={24}>
                <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 10 }}>
                    <Button
                        className="btn-add"
                        style={{
                            background: '#01579B',
                            color: '#fff',
                            borderRadius: 3,
                            borderColor: '#01579B',
                            justifyContent: 'flex-end'
                        }}
                        onClick={() => setShowModal(true)}
                    >
                        Thêm xe
                    </Button>
                </div>
                <Spin spinning={loading}>
                    <TableList
                        data={data}
                        setData={setData}
                        onEdit={onEdit}
                        itemSelected={itemSelected}
                        onRefreshList={onRefreshList}
                    />
                </Spin>

            </Col>
            <Drawer
                destroyOnClose
                width={"40%"}
                title="Thêm mới"
                placement="right"
                closable={true}
                onClose={onHiddenModal}
                visible={isShowModal}
            >
                <Create
                    onRefreshList={onRefreshList}
                    onHiddenModal={onHiddenModal}
                    allVehicle={allVehicle}
                    itemSelected={itemSelected}
                />
            </Drawer>

            <Drawer
                destroyOnClose
                width={"40%"}
                title="Cập nhật"
                placement="right"
                closable={true}
                onClose={onHiddenModalEdit}
                visible={isShowModalEdit}
            >
                <Update
                    onHiddenModal={onHiddenModalEdit}
                    onRefreshList={onRefreshList}
                    data={data}
                    itemSelected={itemSelected}
                    allVehicle={allVehicle}
                    itemVehicleSelected={itemVehicleSelected}
                    setItemVehicleSelected={setItemVehicleSelected}
                />
            </Drawer>
        </div>

    );
};

Vehicle.prototype = {
    className: PropTypes.any,
}

export default styled(Vehicle)`
.btn-add {
    background-color: #01579B;
    color: #fff;
    border-radius: 3px;
    border-color: #01579B;
    justify-content: flex-end;
  }
`;