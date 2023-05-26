import { Col, Drawer, Modal, Row, Spin, message } from "antd";
import { users } from "configs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import CreateUser from './CreateUser';
import Filter from './Filter';
import FormChangePass from './FormChangePass';
import UpdateUser from './UpdateUser';
import UsertList from './UsertList';
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
        size: 20,
    });


    const getAgencyAccount = useCallback(async () => {
        setLoading(true);

        const payload = {
            page: params?.page,
            size: params?.size
          }

          users.getUsers(payload)
            .then(res => {
              if (res.status === 200) {
                setData(res?.data?.data)
                setTotal(res?.data?.meta?.total)
              }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
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
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
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
