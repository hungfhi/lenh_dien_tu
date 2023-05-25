import { Col, Row, Spin, Tabs, message } from "antd";
import { manage, station } from "configs";
import _ from "lodash";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Filter from './Filter';
import TableList from './TableList';

const Contract = ({ className, profile }) => {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [stations, setStations] = useState([]);
  const [transport, setTransport] = useState([]);
  const [loadding, setLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    size: 20,
    contract_number: "",
    contract_code: "",
    merchant_id: undefined
  });


  const getDataTable = useCallback(async () => {
    const payload = {
      is_contract : 1
    }
    setLoading(true);
    station.getContract(params)
      .then(res => {
        if (res.status === 200) {
          setLoading(false);
          setTotal(res?.data?.meta?.total)
          manage.getStation(payload)
            .then(res1 => {
              if (res1.status === 200) {
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
                message.error("Có lỗi xảy ra !")
            })

        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.warn(err.response.data?.errors[0].msg)
          message.error('Error!')
        }
      })
  }, [params]);
  const getTransports = useCallback(async () => {
      const payload = {
          is_contract : 1
      }
      manage.getTransport(payload)
          .then(res => {
              if (res.status === 200) {
                  setTransport(res?.data?.data)
              }
          })
          .catch(err => {
              if (err.response?.status === 422 && err.response?.data?.errors) {
                  message.warn(err.response.data?.errors[0].msg)
              }
          })
  }, []);




  useEffect(() => {
    getDataTable();
    getTransports()
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
  }, [getDataTable,getTransports]);


  const onRefreshList = () => {
    getDataTable();
  }

 


  return (
    <Row className={className} gutter={[16, 16]}>
      <Col xs={24}>
        <Filter params={params} setParams={setParams} transport={transport}/>
      </Col>
      <Col xs={24}>
        <Spin spinning={loadding}>
          <TableList
            params={params}
            loadding={loadding}
            stations={stations}
            data={data}
            onRefreshList={onRefreshList}
            setParams={setParams}
          />
        </Spin>
      </Col>
    </Row>
  );
};

Contract.propTypes = {
  className: PropTypes.any,
};
export default styled(Contract)`

 `;
