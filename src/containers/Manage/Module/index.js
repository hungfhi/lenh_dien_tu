/* eslint-disable no-unused-expressions */
import { Col, Drawer, Row, Spin, message } from "antd";
import manage from "configs/manage";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import Create from './Create';
import Filter from './Filter';
import TableList from './TableList';
import Update from './Update';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { setLoad } from "redux/action";
const Index = ({ className, profile }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadding, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [isShowModalEdit, setShowModalEdit] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    name: "",
  });

  const getDataTable = useCallback(async () => {
    setLoading(true);
    const payload = {
      is_full : 1
  }
    manage.getModule(payload)
      .then(res => {
        if (res.status === 200) {
          const dataSet = []
          _.map(res?.data?.data, (items) => {
            dataSet.push({
              key: items.id,
              icon: items.icon,
              id: items.id,
              name: items.name,
              is_active: items.is_active,
              order_number: items.order_number,
              parent_id: items.parent_id,
              path: items.path,
              permission_slug:items.permission_slug,
              children: _.map(items?.children, (item) => {
                console.log('item.children.length',item.children.length)
                return {
                  key: item.id,
                  icon: item.icon,
                  id: item.id,
                  name: item.name,
                  is_active: item.is_active,
                  order_number: item.order_number,
                  parent_id: item.parent_id,
                  path: item.path,
                  permission_slug: item.permission_slug,
                  children: item.children.length !== 0 ? item.children : null
                }
              })
            });

          })
          setData(dataSet)
          console.log("daaaaa")
        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0].msg)
        }
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

  const onEdit = useCallback(async (row) => {
    setShowModalEdit(true)
    setItemSelected(row)
  }, [])

  const onDel = useCallback(async (ids) => {
    const payload = {
      uuid: ids
    }
    manage.delModule(payload)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Xoá module thành công" });
          onRefreshList()
          dispatch(setLoad(true));
        }
      })
      .catch(err => {
        Ui.showError({ message: err?.response?.data?.message });
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
            onDel={onDel}
            onRefreshList={onRefreshList}
            setParams={setParams}
          />
        </Spin>
      </Col>
      <Drawer
        destroyOnClose
        width={"40%"}
        title="Thêm mới module"
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
        title="Cập nhật module"
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
