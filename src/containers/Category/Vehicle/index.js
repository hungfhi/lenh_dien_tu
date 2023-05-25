import { Col, Drawer, Row, Spin, message } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import Filter from './Filter';
import Create from './Create';
import TableList from './TableList';
import Update from './Update';
import { category } from "configs";

const Index = ({ className, profile }) => {

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadding, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [isShowModalEdit, setShowModalEdit] = useState(false);
  const [seatType, setSeatType] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    size: 20
  });

  const getListProduct = useCallback(async () => {

    category.getProduct()
      .then(res => {
        if (res.status === 200) {
          const newProducts = []
          res?.data?.data.map(item => {
            newProducts.push({
              ...item,
              value: item?.id,
              label: item?.name,
            })
          })
          setProducts(newProducts)
          setTotal(res?.data?.meta?.total)
        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0].msg)
          message.error('Error!')
        }
      })

  }, []);

  const getDataTable = useCallback(async () => {
    setLoading(true);
    category.getVehicle(params)
      .then(res => {
        if (res.status === 200) {
          setData(res?.data?.data);
          const newSeatType = [];
          res.data.data.map(item => {
            newSeatType.push({
              value: item?.seat_type?.value,
              label: item?.seat_type?.name
            });
          });
          setSeatType(newSeatType);
        }
        setLoading(false);
      }).catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0]?.msg)
          message.error('Error!')
        }
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
    getListProduct();
  }, []);


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
            onRefreshList={onRefreshList}
            setParams={setParams}
            setTotal={setTotal}
          />
        </Spin>
      </Col>
      <Drawer
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
          products={products}
          seatType={seatType}
        />
      </Drawer>
      <Drawer
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
              products={products}
              onHiddenModalEdit={onHiddenModalEdit}
              itemSelected={itemSelected}
              seatType={seatType}
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
