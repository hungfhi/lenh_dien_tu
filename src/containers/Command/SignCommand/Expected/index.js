import { Col, Row, Spin, message } from 'antd';
import { category, command } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Ui } from 'utils/Ui';
import PropTypes from "prop-types";
import TableList from './TableList';
import _ from "lodash"
import moment from 'moment';

const Expected = ({ className, allRoute, data, params, setParams, onRefreshList, setIdRow,loading, setItemSelected, itemSelected }) => {

    const [total, setTotal] = useState(0);
    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        params={params}
                        data={data}
                        total={total}
                        onRefreshList={onRefreshList}
                        setParams={setParams}
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
                        setIdRow={setIdRow}
                    // setTotal={setTotal}
                    />
                </Spin>

            </Col>
        </Row>
    );
};

Expected.propTypes = {
    className: PropTypes.any,
};
export default styled(Expected)`
   `;