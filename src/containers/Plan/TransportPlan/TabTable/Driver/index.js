import { Button, Col, Drawer, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import TableList from './TableList';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Update from './Update';
import Create from './Create';
import { category } from 'configs';
import { Ui } from 'utils/Ui';

const Driver = ({ className, itemSelected }) => {

    const [data, setData] = useState(itemSelected?.merchant_route_drivers);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [itemVehicleSelected, setItemVehicleSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false);

    useEffect(() => {
        // getAllVehicle();
    }, []);

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

    const detailVehicleTab = useCallback(async () => {
        setLoading(true);
        category.getDetailMerchantRoutes(itemSelected?.id).then(res => {
            if (res.status === 200) {
                setData(res.data.data.merchant_route_drivers);
            }
            setLoading(false);
        }).catch(err => {
            Ui.showError({ message: err?.response?.data?.message });
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
                        style={{
                            background: '#01579B',
                            color: '#fff',
                            borderRadius: 3,
                            borderColor: '#01579B',
                            justifyContent: 'flex-end'
                        }}
                        className="btn-add"
                        onClick={() => setShowModal(true)}
                    >
                        Thêm lái xe
                    </Button>
                </div>
                <Spin spinning={loading}>
                    <TableList
                        data={data}
                        setData={setData}
                        itemSelected={itemSelected}
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
                    // allVehicle={allVehicle}
                    itemSelected={itemSelected}
                // allUnit={allUnit}
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
                    // onRefreshList={onRefreshList}
                    onHiddenModal={onHiddenModalEdit}
                    onRefreshList={onRefreshList}
                    data={data}
                    itemSelected={itemSelected}
                    // allVehicle={allVehicle}
                    itemVehicleSelected={itemVehicleSelected}
                    setItemVehicleSelected={setItemVehicleSelected}
                // allUnit={allUnit}
                />
            </Drawer>
        </div>

    );
};

Driver.prototype = {
    className: PropTypes.any,
}

export default styled(Driver)`
.btn-add {
    background-color: #01579B;
    color: #fff;
    border-radius: 3px;
    border-color: #01579B;
    justify-content: flex-end;
  }
`;