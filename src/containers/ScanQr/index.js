import { Col, Row, Spin, message } from 'antd';
import { command } from 'configs';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import * as qs from "query-string";
import { useLocation,  } from "react-router-dom";
import _ from "lodash"

const District = ({ className }) => {
    const { search } = useLocation();
    let parsed = qs.parse(search);
    let code = parsed?.code
    const [fileUrl, setfileUrl] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const getData = useCallback(async () => {
        setLoading(true)
        setfileUrl(undefined)
        const payload = {
            ids: code,
            responseType: "blob",
        }
        command.viewCommand(payload)
            .then(res => {
                if (res.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("view", `command_${code}.pdf`);
                    document.body.appendChild(link);
                    const file = new Blob([res.data], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    console.log("fileURL",fileURL,URL)
                    setfileUrl(fileURL)
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
            })
    }, []);

    useEffect(() => {
        if (code) {
            getData()
        }
    }, [code, getData]);

    return (
        <Row className={className} gutter={[16, 16]} style={{ height: window.innerHeight}}>
            <Col xs={24}>
                {fileUrl ? <object data={fileUrl} type="application/pdf" width="100%" height="100%">
                    <p>Alternative text - include a link <a href={fileUrl}>to the PDF!</a></p>
                </object> : <Spin>Đang load dữ liệu</Spin>}
            </Col>
        </Row>
    );
};

District.propTypes = {
    className: PropTypes.any,
};
export default styled(District)`
   `;