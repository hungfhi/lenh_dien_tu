import { Button, Col, Drawer, Row, Spin, message } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import Filter from './Filter';
import Create from './Create';
import TableList from './TableList';
import Update from './Update';
import _ from "lodash"
import { useSelector,  } from 'react-redux';
import { apis, manage } from "configs";

const Index = ({ className, profile }) => {

  const user = useSelector((state) => state?.rootReducer?.user);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadding, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [isShowModalEdit, setShowModalEdit] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    per_page: 20,
    name: "",
  });

  const getDataTable = useCallback(async () => {
    setLoading(true);
      manage.getCarPark(params)
          .then(res => {
              if (res.status === 200) {
                setData(res?.data?.data)
                setTotal(res?.data?.meta?.total)
              }
          })
          .catch(err => {
            message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
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
    setShowModalEdit(true);
        manage.getDetailCarPark(ids)
        .then(res => {
          if (res.status === 200) {
            setItemSelected(res?.data?.data)
          }
        })
        .catch(err => {
          message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
        })
  }, [])


  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  const onRefreshList = () => {
    getDataTable();
  }


  return (
    <Row className={className} gutter={[16, 16]}>
      <Col xs={24}>
        <Filter params={params} setParams={setParams} setShowModal={setShowModal} />
      </Col>
      <Col xs={24}>
        <Spin spinning={loadding}>
          <TableList
            params={params}
            loadding={loadding}
            data={data}
            onEdit={onEdit}
            total={total}
            setTotal={setTotal}
            onRefreshList={onRefreshList}
            setParams={setParams}
          />
        </Spin>
      </Col>
      <Drawer
        destroyOnClose
        width={"40%"}
        title="Thêm mới bến xe"
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
        title="Cập nhật bến xe"
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

Index.propTypes = {
  className: PropTypes.any,
};
export default styled(Index)`
 `;
