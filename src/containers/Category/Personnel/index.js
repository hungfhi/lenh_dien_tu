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
import { useSelector, } from 'react-redux';
import { category } from "configs";

const Personnel = ({ className, profile }) => {


  const user = useSelector((state) => state?.rootReducer?.user);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [isShowModalEdit, setShowModalEdit] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    name: "",
    phone: '',
    status: '',
    position_id: '',
    per_page: null
  });

  const getDataTable = useCallback(async () => {
    setLoading(true);
    category.getPersons(params).then(res => {
      setData(res?.data?.data);
      setTotal(res?.data?.meta?.total)
      setLoading(false);
    }).catch(err => {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
    });
    // await setLoading(false);
  }, [params]);
  const onHiddenModal = useCallback(() => {
    setShowModal(false);
  });

  const onHiddenModalEdit = useCallback(() => {
    setItemSelected(null);
    setShowModalEdit(false);
  });

  const onEdit = useCallback(async (row) => {
    setShowModalEdit(true)
    setItemSelected(row);
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
        <Spin spinning={loading}>
          <TableList
            params={params}
            data={data}
            onEdit={onEdit}
            onRefreshList={onRefreshList}
            setParams={setParams}
            setTotal={setTotal}
            total={total}
          />
        </Spin>
      </Col>
      <Drawer
        destroyOnClose
        width={"80%"}
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
        width={"80%"}
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

Personnel.propTypes = {
  className: PropTypes.any,
};
export default styled(Personnel)`
 `;
