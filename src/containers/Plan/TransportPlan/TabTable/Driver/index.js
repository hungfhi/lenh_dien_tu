import { Button, Col, Drawer, message, Spin } from 'antd';
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
    const [itemStaffSelected, setItemStaffSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [allStaff, setAllStaff] = useState([]);

    const onHiddenModal = () => {
        setShowModal(false);
    }

    const onHiddenModalEdit = () => {
        setItemStaffSelected(null)
        setShowModalEdit(false)
    }

    const onEdit = useCallback(async (row) => {
        setShowModalEdit(true);
        setItemStaffSelected(row);
    });

    const getAllStaff = useCallback(async () => {
        // setLoading(true);
        category.getPersons().then(res => {
            if (res.status === 200) {

                const newAllStaff = []
                res?.data?.data.map(item => {
                    newAllStaff.push({
                        // ...item,
                        value: item?.id,
                        label: item?.staff_code + ' - ' + item?.first_name +  ' ' + item?.last_name + ' - ' + item?.position?.name,
                    })
                })
                setAllStaff(newAllStaff);
            }
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    }, []);

    useEffect(() => {
        getAllStaff();
    }, []);

    const detailStaffTab = useCallback(async () => {
        setLoading(true);
        category.getDetailMerchantRoutes(itemSelected?.id).then(res => {
            if (res.status === 200) {
                setData(res.data.data.merchant_route_drivers);
            }
            setLoading(false);
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    });

    useEffect(() => {
        detailStaffTab();
    }, []);

    const onRefreshList = () => {
        detailStaffTab();
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
                        onEdit={onEdit}
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
                    allStaff={allStaff}
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
                    allStaff={allStaff}
                    itemStaffSelected={itemStaffSelected}
                    setItemStaffSelected={setItemStaffSelected}
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