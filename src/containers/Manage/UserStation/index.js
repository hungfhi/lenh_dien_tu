import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { manage } from 'configs';
import { Ui } from 'utils/Ui';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { Col, Modal, Row, Spin } from 'antd';
import Filter from './Filter';
import TableList from './TableList';
import FormChangePass from './FormChangePass';

const UserMerchant = ({ className }) => {

    const [loading, setLoading] = useState(false);
    const [listStationUser, setListStationUser] = useState([]);
    const [isShowModal, setShowModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [total, setTotal] = useState(0);
    const [showChange, setShowChange] = useState(false);
    const [getId, setGetId] = useState("");
    const [params, setParams] = useState({
        page: 1,
        size: 20,
        phone: '',
        email: '',
        username: ''
    });

    const getListUserMerchant = useCallback(async () => {
        setLoading(true);

        manage.getStationUser(params).then(res => {
            console.log(res);
            if (res.status === 200) {
                setListStationUser(res?.data?.data);
            }
            setLoading(false);
        }).catch(err => {
            Ui.showError({ message: 'Có lỗi xảy ra' });
        })
    }, [params]);

    const onChangeP = (ids) => {
        setGetId(ids)
        setShowChange(true);
    };
    const handleClose = useCallback(() => {
        setShowChange(false);
    });

    // const onHiddenModal = useCallback(() => {
    //     setShowModal(false);
    // });

    // const onHiddenModalEdit = useCallback(() => {
    //     setItemSelected(null);
    //     setShowModalEdit(false);
    // });

    const onEdit = useCallback(async (ids) => {
        setShowModalEdit(true)
        const payload = {
            uuid: ids
        }
        // users.getInfoUser(payload)
        //     .then(res => {
        //         if (res.status === 200) {
        //             setItemSelected(res?.data?.data)
        //         }
        //     })
        //     .catch(err => {
        //         Ui.showError({ message: err?.response?.data?.message });
        //     })
    }, []);

    useEffect(() => {
        getListUserMerchant();
    }, [getListUserMerchant]);

    const onRefreshList = () => {
        getListUserMerchant();
    }

    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter params={params} setParams={setParams} setShowModal={setShowModal} />
            </Col>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        data={listStationUser}
                        params={params}
                        setParams={setParams}
                        total={total}
                        onRefreshList={onRefreshList}
                        // onEdit={onEdit}
                        onChangeP={onChangeP}
                        setTotal={setTotal}
                    />
                </Spin>
            </Col>
            {/* <Drawer
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
            </Drawer> */}
            {/* <Drawer
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
            </Drawer> */}
            <Modal footer={null} title="Đổi mật khẩu" visible={showChange} closable={false} destroyOnClose>
                <FormChangePass
                    onRefreshList={onRefreshList}
                    handleClose={handleClose}
                    onChangeP={onChangeP}
                    getId={getId}
                />
            </Modal>
        </Row>
    );
};

UserMerchant.propTypes = {
    className: PropTypes.any,
};
export default styled(UserMerchant)`
   `;