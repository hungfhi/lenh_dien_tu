import { Button, Col, Modal, Row, Spin, message } from 'antd';
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
    const [fileUrl, setfileUrl] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = useCallback(async (ids) => {
        setfileUrl(undefined)
        setIsModalOpen(true);
        const payload = {
            ids: ids,
            responseType: "blob",
        }
        command.viewCommand(payload)
            .then(res => {
                if (res.status === 200) {
                    onRefreshList()
                    const file = new Blob([res.data], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    setfileUrl(fileURL)
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
            })
    }, []);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <div>
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
                            allMerchant={allMerchant}
                            allDriver={allDriver}
                            showModal={showModal}
                        />
                    </Spin>
                </Col>
            </Row>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title={null} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} bodyStyle={{ height: window.innerHeight - 40 }} style={{
                top: 20
            }}>
                {fileUrl ? <object data={fileUrl} type="application/pdf" width="100%" height="100%">
                    <p>Alternative text - include a link <a href={fileUrl}>to the PDF!</a></p>
                </object> : <Spin>Đang load dữ liệu</Spin>}
            </Modal>
        </div>

    );
};

Processing.propTypes = {
    className: PropTypes.any,
};
export default styled(Processing)`
`;