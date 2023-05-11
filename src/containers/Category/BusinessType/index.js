import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import _ from "lodash"
import { Col, Drawer, Row, Spin } from 'antd';
import Filter from './Filter';
import TableList from './TableList';
import Create from './Create';
import Update from './Update';
import { manage } from 'configs';
import { Ui } from 'utils/Ui';

const BusinessType = ({ className }) => {

    const [loading, setLoading] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [listBusinessModel, setListBusinessModel] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        size: 20,
    });

    const getListBusinessModel = useCallback(async () => {
        setLoading(true);
        manage.getBusinessModel(params).then(res => {

            setListBusinessModel(res.data.data);
            setLoading(false);
        }).catch(err => {
            Ui.showErrors('Có lỗi xảy ra');
        })
    }, [params]);

    const onHiddenModal = useCallback(() => {
        setShowModal(false);
    });

    const onHiddenModalEdit = useCallback(() => {
        setItemSelected(null);
        setShowModalEdit(false);
    });

    const onEdit = useCallback(async (ids) => {
        setShowModalEdit(true)
        const payload = {
            id: ids
        };
        manage.getDetailBusinessType(payload).then(res => {
            if (res.status === 200) {
                setItemSelected(res?.data?.data)
            }
        }).catch(err => {
            Ui.showError({ message: err?.response?.data?.message });
        })
    }, []);

    useEffect(() => {
        getListBusinessModel();
    }, [getListBusinessModel]);

    const onRefreshList = () => {
        getListBusinessModel();
    }


    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter params={params} setParams={setParams} setShowModal={setShowModal} />
            </Col>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        params={params}
                        // loadding={loadding}
                        data={listBusinessModel}
                        onEdit={onEdit}
                        // total={total}
                        onRefreshList={onRefreshList}
                        setParams={setParams}
                    // setTotal={setTotal}
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
                {
                    itemSelected ? (
                        <Update
                            onRefreshList={onRefreshList}
                            onHiddenModalEdit={onHiddenModalEdit}
                            itemSelected={itemSelected}
                        />
                    ) : <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spin spinning /></div>
                }
            </Drawer>
        </Row>
    );
};

BusinessType.propTypes = {
    className: PropTypes.any,
};
export default styled(BusinessType)`
   `;