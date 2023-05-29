import { Col, message, Row, Spin } from 'antd';
import { category } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Ui } from 'utils/Ui';
import Filter from './Filter';
import PropTypes from "prop-types";
import TableList from './TableList';
import _ from "lodash"

const District = ({ className }) => {

    const [listDistrict, setListDistrict] = useState([]);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState({
        page: 1,
        size: 20,
        name: '',
        limit: 20
    });
    const [loading, setLoading] = useState(false);

    const getListDistrict = useCallback(async () => {
        setLoading(true);
        category.getDistrict(params).then(res => {
            if (res.status === 200) {
                setListDistrict(res?.data?.data);
                setTotal(res?.meta?.total);
                setLoading(false);
            }
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        })
        // await setLoading(false);
    }, [params]);

    useEffect(() => {
        getListDistrict();
    }, [getListDistrict]);

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
                        data={listDistrict}
                        // onEdit={onEdit}
                        total={total}
                        // onRefreshList={onRefreshList}
                        setParams={setParams}
                    // setTotal={setTotal}
                    />
                </Spin>
            </Col>
        </Row>
    );
};

District.propTypes = {
    className: PropTypes.any,
};
export default styled(District)`
   `;