import { Col, Row, Spin } from 'antd';
import { category } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Ui } from 'utils/Ui';
import Filter from './Filter';
import PropTypes from "prop-types";
import TableList from './TableList';
import _ from "lodash"

const ProvinceCity = ({className}) => {

    const [listProvinceCity, setListProvinceCity] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        size: 20,
        name: '',
        limit: 60
    });
    const [loading, setLoading] = useState(false);

    const getListProvinceCity = useCallback(async () => {
        setLoading(true);
        category.getProvinceCity(params).then(res => {
            if (res.status === 200) {
                // console.log(res);
                setListProvinceCity(res?.data?.data);
                setLoading(false);
            }
        }).catch(err => {
            Ui.showError({ message: 'Có lỗi xảy ra' });
        })
        // await setLoading(false);
    }, [params]);

    useEffect(() => {
        getListProvinceCity();
    }, [getListProvinceCity]);

    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter params={params} setParams={setParams} />
            </Col>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        params={params}
                        // loadding={loadding}
                        data={listProvinceCity}
                        // onEdit={onEdit}
                        // total={total}
                        // onRefreshList={onRefreshList}
                        setParams={setParams}
                    // setTotal={setTotal}
                    />
                </Spin>
            </Col>
        </Row>
    );
};

ProvinceCity.propTypes = {
    className: PropTypes.any,
};
export default styled(ProvinceCity)`
   `;