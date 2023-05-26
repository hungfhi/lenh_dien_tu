import { Spin, message } from "antd";
import { manage, station } from "configs";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import * as qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormAdd from "./FormAdd";
import FormEdit from "./FormEdit";

const ContractDetail = ({ className }) => {
    const { search } = useLocation();
    let parsed = qs.parse(search);
    let id = parsed?.id
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [stations, setStations] = useState([]);
    const [transport, setTransport] = useState([]);
    const [stationConvert, setStationConvert] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment(new Date()).endOf('year'));

    const getDataTable = useCallback(async () => {
        const payload = {
            is_contract: 1
        }
        station.getContract()
            .then(res => {
                if (res.status === 200) {
                    manage.getStation(payload)
                        .then(res1 => {
                            if (res1.status === 200) {
                                const stationCheck = []
                                _.map(res1?.data?.data, (items) => {
                                    stationCheck.push({
                                        value: items.id,
                                        label: items.name
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
                            message.error('Có lỗi xảy ra')
                        })

                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })
    }, []);
    const getTransports = useCallback(async () => {
        const payload = {
            is_contract: 1
        }
        manage.getTransport(payload)
            .then(res => {
                if (res.status === 200) {
                    setTransport(res?.data?.data)
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })
    }, []);

    const onGetItm = useCallback(async (ids) => {
        setLoading(true);
        station.getDetailContract(ids)
            .then(res => {
                if (res.status === 200) {
                    setLoading(false);
                    setIsEdit(res?.data?.data)
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })
    }, [isEdit])
    useEffect(() => {
        if (id) {
            setLoading(true);
            onGetItm(id)
        }
    }, [id]);

    const onRefreshList = () => {
        onGetItm(id);
    }


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
    }, [getDataTable, getTransports]);

    const onSave = async (values, update_car_contract, update_node_contract) => {
        const payload = {
            name: values?.name,
            contract_number: values?.contract_number,
            contract_code: values?.contract_code,
            merchant_id: values?.merchant_id,
            address: values?.address,
            tax_code: values?.tax_code,
            email: values?.email,
            start_date: moment(values?.start_date).format("YYYY-MM-DD"),
            end_date: moment(values?.end_date).format("YYYY-MM-DD"),
            is_full_package: values?.is_full_package === true ? 1 : 0,
            stations: values?.stations,
            overnight_price: values?.overnight_price,
            status: 1,
        }
        const car = {
            update_car_contract: update_car_contract
        }
        const time = {
            update_node_contract: update_node_contract
        }

        station.createContract(payload)
            .then(res => {
                if (res.status === 200) {
                    station.addCarCreate(car)
                        .then(res => {
                            if (res.status === 200) {
                            }
                        })
                        .catch(err => {
                            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
                        })
                    station.addTimeCreate(time)
                        .then(res => {
                            if (res.status === 200) {
                            }
                        })
                        .catch(err => {
                            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
                        })
                    navigate(`/contract`, { replace: true })
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })

    }

    return (
        <div className={className}>
            <Spin spinning={loading}>
                {isEdit ?
                    <FormEdit
                        transport={transport}
                        stations={stationConvert}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        endDate={endDate}
                        startDate={startDate}
                        onSave={onSave}
                        isEdit={isEdit}
                        loading={loading}
                        onRefreshList={onRefreshList}
                    />
                    : <FormAdd
                        transport={transport}
                        stations={stationConvert}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        endDate={endDate}
                        startDate={startDate}
                        onSave={onSave}
                    />}
            </Spin>
        </div>

    );
};
ContractDetail.propTypes = {
    className: PropTypes.any,
};
export default styled(ContractDetail)`
`;
