import { category } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { Ui } from 'utils/Ui';
import { Col, Drawer, Row, Spin } from 'antd';
import Filter from './Filter';
import TableList from './TableList';
import Create from './Create';
import Update from './Update';
import _ from "lodash"

const Product = ({ className }) => {

    const [loading, setLoading] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false)
    const [params, setParams] = useState({
        page: 1,
        size: 20,
        name: ''
    });

    const [listProduct, setListProduct] = useState([]);

    const getListProduct = useCallback(async () => {
        setLoading(true);
        category.getProduct(params).then(res => {
            if (res.status === 200) {
                setListProduct(res?.data?.data);
            }
        }).catch(err => {
            Ui.showError({ message: 'Có lỗi xảy ra' });
        })
        await setLoading(false);
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
            uuid: ids
        }
        category.getDetailProduct(payload)
            .then(res => {
                if (res.status === 200) {
                    setItemSelected(res?.data?.data)
                }
            })
            .catch(err => {
                Ui.showError({ message: err?.response?.data?.message });
            })
    }, [])

    useEffect(() => {
        getListProduct();
    }, [getListProduct]);

    const onRefreshList = () => {
        getListProduct();
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
                        data={listProduct}
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

Product.propTypes = {
    className: PropTypes.any,
};
export default styled(Product)`
   `;