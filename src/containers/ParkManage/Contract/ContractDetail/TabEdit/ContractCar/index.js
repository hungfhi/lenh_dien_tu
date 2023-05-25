import { Col, Row, Button, Drawer, message, Spin } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import TableList from './TableList';
import FormAddCar from "./FormAddCar";
import _ from "lodash";
import { station } from "configs";
const ContractCar = ({ className, car, setCar, allRoute, allVehicle, startDate, endDate, isEdit, onRefreshList }) => {
  const [data, setData] = useState(car);
  const [isActive, setIsActive] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [addCar, setAddCar] = useState();
  const [itemCar, setItemCar] = useState([]);
  const [params, setParams] = useState({
    route_id: undefined,
    vehicle_id: undefined
  });
  const [isShowModal, setShowModal] = useState(false);
  const onHiddenModal = useCallback(() => {
    setShowModal(false);
    setItemCar([])
  });

  const getDataAll = useCallback(async () => {
    const arr = isEdit?.stations.map((item) => {
      return item.id
    })
    const payload = {
      merchant_id: isEdit?.merchant_id,
      stations: arr,
      contract_id: !isActive ? isEdit?.id : undefined,
      route_id: params?.route_id,
      vehicle_id: params?.vehicle_id,
    }
    setIsLoad(true)
    station.createTabContract(payload)
      .then(res => {
        if (res.status === 200) {
          let contractCar = []
          let departureTime = []
          _.map(res?.data?.data, (item) => {
            Array.prototype.push.apply(contractCar, item?.merchant_route_vehicles);
          })

          _.map(res?.data?.data, (item) => {
            Array.prototype.push.apply(departureTime, item?.merchant_route_nodes);
          })
          setItemCar([])
          setAddCar(contractCar)
          setIsLoad(false)
        }
      })
      .catch(err => {
        message.error("Có lỗi xảy ra!")
      })

  }, [isActive, isEdit,params]);

  const onRefreshModal = () => {
    getDataAll();
  }

  const onUpdate = useCallback(async (itemCar) => {
    const payload = {
      merchant_route_vehicle_array_id: itemCar,
      id: isEdit?.id,
    }
    station.addCarEdit(payload)
      .then(res => {
        if (res.status === 200) {
          onRefreshList()
          onRefreshModal()
          onHiddenModal()
        }
      })
      .catch(err => {
        message.error("Có lỗi xảy ra !")
      })
  }, [itemCar]);


  useEffect(() => {
    setData(car)
    getDataAll()
  }, [car, setData, getDataAll]);



  return (
    <div className={className}>
      <Row gutter={[16, 16]}>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', marginTop: -70 }}>
          <Button className="btn-add" onClick={() => setShowModal(true)} style={{ backgroundColor: '#01579B', color: '#fff', borderRadius: 6, height: 35, width: 120 }}> Thêm xe</Button>
        </Col>
        <Col span={24} style={{ width: 'calc(100% - 10px)' }}>
          <TableList
            data={data}
            setCar={setCar}
            allRoute={allRoute}
            setData={setData}
            startDate={startDate}
            endDate={endDate}
          />
        </Col>
        <Drawer
          destroyOnClose
          width={"40%"}
          title={<div style={{ textAlign: 'center', color: '#fff' }}>Thêm xe vào hợp đồng</div>}
          placement="right"
          closable={true}
          onClose={onHiddenModal}
          visible={isShowModal}
        >
          <FormAddCar
            // onRefreshList={onRefreshList}
            onUpdate={onUpdate}
            addCar={addCar}
            params={params}
            setParams={setParams}
            setItemCar={setItemCar}
            itemCar={itemCar}
            allRoute={allRoute}
            allVehicle={allVehicle}
            onHiddenModal={onHiddenModal}
            setIsActive={setIsActive}
            isActive={isActive}
            isLoad={isLoad}
          />
        </Drawer>
      </Row>
    </div>
  );
};

export default styled(ContractCar)`
.ant-drawer-header {
  background-color: #01579B !important;
}
`;
