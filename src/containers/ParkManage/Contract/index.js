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
import { apis, station } from "configs";
const { TabPane } = Tabs;

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
    size: 20,
    name: "",
  });

  const getDataTable = useCallback(async () => {
    setLoading(true);
    station.getContract(data)
      .then(res => {
        if (res.status === 200) {
          setData(res?.data?.data)
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
    setShowModalEdit(true)
    // const result = await ServiceBase.requestJson({
    //   method: "GET",
    //   url: `/v1/category-declare/quota/${ids}`,
    //   data: {

    //   },
    // });
    // if (result.hasErrors) {
    //   Ui.showErrors(result?.errors);
    // } else {
    //   setItemSelected(result?.value?.data)
    // }
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
          
            <Update
              onRefreshList={onRefreshList}
              onHiddenModalEdit={onHiddenModalEdit}
              itemSelected={itemSelected}
            />
          
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
