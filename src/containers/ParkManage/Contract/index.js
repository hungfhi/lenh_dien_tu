import { Button, Col, Drawer, Row, Spin, Tabs, message } from "antd";
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
import { apis, manage, station } from "configs";
const { TabPane } = Tabs;

const Index = ({ className, profile }) => {


  const user = useSelector((state) => state?.rootReducer?.user);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [stations, setStations] = useState([]);
  const [stationConvert, setStationConvert] = useState([]);
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
    const payload = {
      is_contract : 1
    }
    setLoading(true);
    station.getContract(params)
      .then(res => {
        if (res.status === 200) {

          manage.getStation(payload)
            .then(res1 => {
              if (res1.status === 200) {
                const stationCheck = []
                _.map(res1?.data?.data, (items) => {
                  stationCheck.push({
                    value: items.id,
                    label:items.name
                  });

                })
                setStationConvert(stationCheck)
                setStations(res1?.data?.data)
                setData(_.map(res?.data?.data, (item) => {
                  let arr = _.map(item.station, (_item) => {
                    _item.ativeNew = 1;
                    return _item;
                  });
                  let dataConcat = _.concat(arr, res1?.data?.data);
                  let arrNew = _.uniqBy(dataConcat, "id");
                  item.arrNew = arrNew;
                  return item;
                }));
              }
            })
            .catch(err1 => {
              if (err1.response?.status === 422 && err1.response?.data?.errors) {
                message.warn(err1.response.data?.errors[0].msg)
              }
            })

        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0].msg)
          message.error('Error!')
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

  const onEdit = useCallback(async (ids) => {
    setShowModalEdit(true);
    station.getDetailContract(ids)
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
    getDataTable();
    if (stations.length !== 0 && data.length !== 0) {
      setData(_.map(data, (item) => {
        let arr = _.map(item.station, (_item) => {
          _item.ativeNew = 1;
          return _item;
        });
        let dataConcat = _.concat(arr, stations);
        let arrNew = _.uniqBy(dataConcat, "id");
        item.arrNew = arrNew;
        return item;
      }));
    }
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
            stations={stations}
            data={data}
            onEdit={onEdit}
            onRefreshList={onRefreshList}
            setParams={setParams}
          />
        </Spin>
      </Col>


      <Drawer
        destroyOnClose
        width={"100%"}
        title="Thêm mới hợp đồng"
        placement="right"
        closable={true}
        onClose={onHiddenModal}
        visible={isShowModal}
      >
        <Create
          onRefreshList={onRefreshList}
          onHiddenModal={onHiddenModal}
          stations={stationConvert}
        />
      </Drawer>
      <Drawer
        destroyOnClose
        width={"100%"}
        title="Cập nhật hợp đồng"
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
              stations={stationConvert}
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
