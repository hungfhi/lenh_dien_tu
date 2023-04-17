import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Button, Drawer, Spin,Modal } from "antd";
import { Tabs, TabPane } from "components";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Map } from "immutable";
import moment from 'moment'
import ServiceBase from "utils/ServiceBase";
import { URI } from "utils/constants";
import { Ui } from "utils/Ui";
import { DownloadOutlined } from "@ant-design/icons";
import Filter from './Filter';
import FormChangePass from './FormChangePass';
import UsertList from './UsertList';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import { useLocation } from "react-router-dom";
import * as qs from "query-string";
import users from "configs/users";
const ListUser = ({ className, profile }) => {
    const { search } = useLocation();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadding, setLoading] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [isShowModal, setShowModal] = useState(false);
    const [isShowModalEdit, setShowModalEdit] = useState(false)
    const [showChange, setShowChange] = useState(false);
    const [getId, setGetId] = useState("");
    const [params, setParams] = useState({
        page: 1,
        per_page: 10,
    });


    const getAgencyAccount = useCallback(async () => {
        setLoading(true);

        const payload = {
            page: params?.page,
            per_page: params?.per_page
          }

          users.getUsers(payload)
            .then(res => {
              if (res.status === 200) {
                setData(res?.data?.data)
                setTotal(res?.data?.meta?.total)
              }
            })
            .catch(err => {
              Ui.showError({ message: err?.response?.data?.message });
            })
        await setLoading(false);
    }, [params]);



    const onEdit = useCallback(async (ids) => {
        setShowModalEdit(true)
        const payload = {
            uuid:ids
        }
        users.getInfoUser(payload)
        .then(res => {
          if (res.status === 200) {
            setItemSelected(res?.data?.data)
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
        })
    }, [])

    const onChangeP = (ids) => {
        setGetId(ids)
        setShowChange(true);
      };
      const handleClose = useCallback(() => {
        setShowChange(false);
    });

    const onHiddenModal = useCallback(() => {
        setShowModal(false);
    });

    const onHiddenModalEdit = useCallback(() => {
        setItemSelected(null);
        setShowModalEdit(false);
    });


    useEffect(() => {
        getAgencyAccount();
    }, [getAgencyAccount]);
    const onRefreshList = () => {
        getAgencyAccount();
    }
    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter params={params} setParams={setParams} setShowModal={setShowModal} />
            </Col>
            <Col xs={24}>
                <Spin spinning={loadding}>
                    <UsertList
                        data={data}
                        params={params}
                        setParams={setParams}
                        total={total}
                        onRefreshList={onRefreshList}
                        onEdit={onEdit}
                        onChangeP={onChangeP}
                        setTotal={setTotal}
                    />
                </Spin>
            </Col>
            <Drawer
                destroyOnClose
                width={"60%"}
                title="Thêm mới tài khoản"
                placement="right"
                closable={true}
                onClose={onHiddenModal}
                visible={isShowModal}
            >
                <CreateUser
                    onRefreshList={onRefreshList}
                    onHiddenModal={onHiddenModal}
                />
            </Drawer>
            <Drawer
                destroyOnClose
                width={"60%"}
                title="Sửa tài khoản"
                placement="right"
                closable={true}
                onClose={onHiddenModalEdit}
                visible={isShowModalEdit}
            >
                {
                    itemSelected ? (
                        <UpdateUser
                            onRefreshList={onRefreshList}
                            onHiddenModalEdit={onHiddenModalEdit}
                            itemSelected={itemSelected}
                        />
                    ) : <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spin spinning /></div>
                }
            </Drawer>

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

ListUser.propTypes = {
    className: PropTypes.any,
};
export default styled(ListUser)`
 `;
