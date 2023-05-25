import { Col, Row, Button, message, Drawer } from "antd";
import PropTypes from "prop-types";
import { useState,useEffect,useCallback } from "react";
import styled from "styled-components";
import TableList from './TableList';
import _ from "lodash";
import { station } from "configs";
import FormAddTime from "./FormAddTime";
const ContractCar = ({ className,time,allRoute,isEdit,setTime,startDate,endDate,onRefreshList }) => {

  const [data, setData] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [itemTime, setItemTime] = useState([]);
  const [addTime, setAddTime] = useState();
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    phone: undefined
  });

  const [isShowModal, setShowModal] = useState(false);
  const onHiddenModal = useCallback(() => {
    setShowModal(false);
    setItemTime([])
  });

  const getDataAll = useCallback(async () => {
    const arr = isEdit?.stations.map((item) => {
      return item.id
    })
    const payload = {
      merchant_id: isEdit?.merchant_id,
      stations: arr,
      contract_id: !isActive ? isEdit?.id : undefined,
      // route:undefined,

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
          setAddTime(departureTime)
          setIsLoad(false)
        }
      })
      .catch(err => {
        message.error("Có lỗi xảy ra!")
      })

  }, [isEdit,isActive]);

  const onRefreshModal = () => {
    getDataAll();
}

  const onUpdate = useCallback(async (itemTime) => {
    const payload = {
      merchant_route_node_array_id: itemTime,
      id: isEdit?.id,
    }
    station.addTimeEdit(payload)
      .then(res => {
        if (res.status === 200) {
          onRefreshList()
          onRefreshModal()
          onHiddenModal()
        }
      })
      .catch(err => {
        message.error("Có lỗi xảy ra hehehehe!")
      })
  }, [itemTime]);


  useEffect(() => {
    setData(time)
    getDataAll()
  }, [time, setData, getDataAll]);


  return (
    <Row className={className} gutter={[16, 16]}>
       <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', marginTop:-70 }}>
        <Button className="btn-add" onClick={() => setShowModal(true)} style={{ backgroundColor: '#01579B', color: '#fff', borderRadius: 6, height: 35, width: 120 }}> Thêm nốt</Button>
      </Col>
      <Col span={24} style={{ width: 'calc(100% - 10px)' }}>
          <TableList
            data={data}
            setTime={setTime}
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
          <FormAddTime
            // onRefreshList={onRefreshList}
            onUpdate={onUpdate}
            addTime={addTime}
            params={params}
            isLoad={isLoad}
            setParams={setParams}
            setItemTime={setItemTime}
            itemTime={itemTime}
            allRoute={allRoute}
            onHiddenModal={onHiddenModal}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </Drawer>
    </Row>
  );
};

ContractCar.propTypes = {
  className: PropTypes.any,
};
export default styled(ContractCar)`
.ant-spin-nested-loading {
  width: 100% !important;
}
 `;
