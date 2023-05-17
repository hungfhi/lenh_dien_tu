import { Col, Row, Spin } from 'antd';
import { category } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Ui } from 'utils/Ui';
import Filter from './Filter';
import PropTypes from "prop-types";
import TableList from './TableList';
import _ from "lodash"

const District = ({ className,allRoute }) => {

    const [itemSelected, setItemSelected] = useState([]);
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
            Ui.showError({ message: 'Có lỗi xảy ra' });
        })
        // await setLoading(false);
    }, [params]);



    const activeAll = useCallback(async () => {
        if (itemSelected.length > 0) {
            const dataConvert = itemSelected
            category.getDistrict(dataConvert).then(res => {
                if (res.status === 200) {
                    setListDistrict(res?.data?.data);
                    setTotal(res?.meta?.total);
                    setLoading(false);
                }
            }).catch(err => {
                Ui.showError({ message: 'Có lỗi xảy ra' });
            })
            await getListDistrict();
            Ui.showSuccess({
                message: "Thay đổi trạng thái thành công",
            });
        } else {
            Ui.showWarning({ message: "Vui lòng chọn 1 bản ghi" })
        }

    }, [itemSelected]);











    useEffect(() => {
        getListDistrict();
    }, [getListDistrict]);

    const onRefreshList = () => {
        getListDistrict()
    }
    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter params={params} setParams={setParams} allRoute={allRoute} activeAll={activeAll}/>
            </Col>
            <Col xs={24}>
                <Spin spinning={loading}>
                    <TableList
                        params={params}
                        // loadding={loadding}
                        data={listDistrict}
                        total={total}
                        onRefreshList={onRefreshList}
                        setParams={setParams}
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
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