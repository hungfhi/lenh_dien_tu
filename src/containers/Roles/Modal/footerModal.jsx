import React, { memo, useCallback, useState, useEffect } from "react";
import { Row, Col, Button, Space, Modal , Form } from "antd";
import _ from "lodash"
import { DefineSelect } from "components";
import styled from "styled-components";

const FooterModal = ({
    onCloseModal,
    className,
    onCreted,
    onUpdate,
    modal
}) => {
    return (
        <Row justify="start" gutter={[8, 8]} className={className}>
            <Col span={5}>
              <Button type="danger" onClick={() => onCloseModal(false)}>Thoát</Button>
            </Col>
            <Col span={19}>
                <Row justify="end" gutter={[8, 8]}>
                    <Button type="primary" onClick={()=> {
                        if(modal.get('isEdit')){
                            onUpdate()
                        } else {
                            onCreted()
                        }
                        
                    }}>{modal.get('isEdit') ? 'Lưu thông tin' : 'Tạo mới' }</Button>
                </Row>
            </Col>
        </Row>
    )
}


export default styled(FooterModal)`

`;