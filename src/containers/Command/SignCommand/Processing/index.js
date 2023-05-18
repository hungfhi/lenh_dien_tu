import { Col, Row, Spin } from 'antd';
import { category } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Ui } from 'utils/Ui';
import PropTypes from "prop-types";
import TableList from './TableList';
import _ from "lodash"
import moment from 'moment';

const District = ({ className,allRoute,data,params,setParams,onRefreshList,setIdRow, allMerchant,allDriver,loading }) => {

    const [itemSelected, setItemSelected] = useState([]);
    const [total, setTotal] = useState(0);

    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        params={params}
                        // loadding={loadding}
                        data={data}
                        total={total}
                        onRefreshList={onRefreshList}
                        setParams={setParams}
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
                        setIdRow={setIdRow}
                        allMerchant={allMerchant}
                        allDriver={allDriver}
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