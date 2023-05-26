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
import { category, manage } from "configs";

const Index = ({ className, profile }) => {


  const user = useSelector((state) => state?.rootReducer?.user);

  const [data, setData] = useState([]);
  const [allRoute, setAllRoute] = useState([]);
  const [allUnit, setAllUnit] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [isShowModalEdit, setShowModalEdit] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    route_id: undefined,
    is_active: undefined,
    start_station_id: '',
    end_station_id: '',
    per_page: 10
  });

  useEffect(() => {
    getTransportUnit();
    getAllRoutes();
  }, []);

  const getAllRoutes = useCallback(async () => {
    setLoading(true);
    category.getRoute(params)
      .then(res => {
        if (res.status === 200) {
          const allRoute = []
          res?.data?.data.map(item => {
            allRoute.push({
              ...item,
              value: item?.id,
              label: item?.name,
            })
          })
          setAllRoute(allRoute)
        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0].msg)
          message.error('Error!')
        }
      })
    await setLoading(false);
  }, []);

  const getTransportUnit = useCallback(async () => {
    // setLoading(true);
    manage.getTransport(params).then(res => {
      if (res.status === 200) {
        const allUnit = [];
        res?.data?.data.map(item => {
          allUnit.push({
            ...item,
            value: item?.id,
            label: item?.name,
          });
        });
        setAllUnit(allUnit);
      }
    }).catch(err => {
      Ui.showErrors('Có lỗi xảy ra');
    });
    // await setLoading(false);
  }, []);


  const getDataTable = useCallback(async () => {
    setLoading(true);
    category.getMerchantRoutes(params).then(res => {
      if (res.status === 200) {
        setData(res?.data?.data);
        setTotal(res?.data?.meta?.total);
      }
      setLoading(false);
    }).catch(err => {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
    });
  }, [params]);
  // console.log(allRoute);

  const onHiddenModal = useCallback(() => {
    setShowModal(false);
  });

  const onHiddenModalEdit = useCallback(() => {
    setItemSelected(null);
    setShowModalEdit(false);
  });

  const onEdit = useCallback(async (ids) => {
    setShowModalEdit(true);
        category.getDetailMerchantRoutes(ids)
        .then(res => {
          if (res.status === 200) {
            setItemSelected(res?.data?.data)
          }
        })
        .catch(err => {
          message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
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
        <Filter params={params} setParams={setParams} setShowModal={setShowModal} allRoute={allRoute} />
      </Col>
      <Col xs={24}>
        <Spin spinning={loading}>
          <TableList
            params={params}
            loadding={loading}
            data={data}
            onEdit={onEdit}
            total={total}
            onRefreshList={onRefreshList}
            setParams={setParams}
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
          allRoute={allRoute}
          allUnit={allUnit}
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
              allRoute={allRoute}
              allUnit={allUnit}
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
