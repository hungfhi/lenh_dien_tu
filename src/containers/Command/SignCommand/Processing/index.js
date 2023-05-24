import { Col, Row, Spin, message } from 'antd';
import { category, command } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Ui } from 'utils/Ui';
import PropTypes from "prop-types";
import TableList from './TableList';
import _ from "lodash"
import moment from 'moment';

const Processing = ({ className, allRoute, data, params, setParams, onRefreshList, setIdRow, allMerchant, allDriver, loading }) => {

    const [itemSelected, setItemSelected] = useState([]);
    const [total, setTotal] = useState(0);

    const onView = useCallback(async (ids) => {
        const payload = {
            ids: ids,
            responseType: "blob",
        }
        command.viewCommand(payload)
            .then(res => {
                if (res.status === 200) {
                    // const url = window.URL.createObjectURL(new Blob([res.data]));
                    // const link = document.createElement("a");
                    // link.href = url;
                    // link.setAttribute("download", `command_${ids}.pdf`);
                    // document.body.appendChild(link);
                    // link.click();
                    onRefreshList()
                    const file = new Blob([res.data],{ type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                }
            })
            .catch(err => {
                message.error("Có lỗi xảy ra !")
            })
    }, []);



    return (
        <div>
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
                            onView={onView}
                        // setTotal={setTotal}
                        />
                    </Spin>
                </Col>
            </Row>
        </div>

    );
};

Processing.propTypes = {
    className: PropTypes.any,
};
export default styled(Processing)`
   `;