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

const Index = ({ className, profile }) => {


  const user = useSelector((state) => state?.rootReducer?.user);

  const [data, setData] = useState([]);
  const [allRoute, setAllRoute] = useState([]);
  const [stations, setStations] = useState([]);
  const [province, setProvince] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadding, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [isShowModalEdit, setShowModalEdit] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    route_id: '',
    is_active: '',
    station_start_id: '',
    station_end_id: ''
  });

  const getStation = useCallback(async () => {

    category.getStation(params)
      .then(res => {
        if (res.status === 200) {
          const newStations = []
          const newProvince = []

          res?.data?.data.map(item => {
            newStations.push({
              ...item,
              value: item?.id,
              label: item?.name,
            })
            // newProvince.push({
            //   ...item,
            //   value: item?.province?.id,
            //   label: item?.province?.name,
            // });
          });

          setStations(newStations);
        }
      })
      .catch(err => {
        message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
      })

  }, []);

  const getListProvinceCity = useCallback(async () => {

    setLoading(true);
    category.getProvinceCity().then(res => {
      if (res.status === 200) {

        const newProvince = [];

        res?.data?.data.map(item => {

          newProvince.push({
            ...item,
            value: item?.id,
            label: item?.name,
          });
        });
        setProvince(newProvince);
      }
    }).catch(err => {
      // message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
    });
  }, []);

  // console.log(province);

  useEffect(() => {
    getStation()
    getAllRoutes()
    getListProvinceCity();
  }, [])

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
          // message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        }
      })
    await setLoading(false);
  }, []);

  const getDataTable = useCallback(async () => {
    setLoading(true);
    category.getRoute(params).then(res => {
      if (res.status === 200) {
        setData(res?.data?.data)
        setTotal(res?.data?.meta?.total)
      }
      setLoading(false);
    }).catch(err => {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
    });
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
        <Filter
          stations={stations}
          params={params}
          setParams={setParams}
          setShowModal={setShowModal}
          allRoute={allRoute}
        />
      </Col>
      <Col xs={24}>
        <Spin spinning={loadding}>
          <TableList
            params={params}
            loadding={loadding}
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
          stations={stations}
          province={province}
          allRoute={allRoute}
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
              stations={stations}
              province={province}
              allRoute={allRoute}
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
