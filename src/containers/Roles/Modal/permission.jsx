import React, { } from "react";
import { Row, Col, Space, Tag,Checkbox, Divider  } from "antd";
import _ from "lodash"
import moment from "moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TitleModal = ({
    profile,
    definitions,
    _Permission,
    ListPermission,
    className,
    addBody,
    body
}) => {
    const permissions = body?.permissions;
    let defaultValue = _.map(permissions, (i) => {
        return i.id ? i.id : i
    })
    let _checkbox = _.map(ListPermission, (per) =>{
        let detail = per?.permissions || [];
        let detailCheckbox = _.map(detail, (i) => {
            return (
                <Col span={4}>
                    <Checkbox value={i.id} >{i.name}</Checkbox>
                </Col>
            )
        })

        return (
            <Row style={{marginTop: 15}}>
                <Col span="24" style={{marginBottom: 10}}>
                   <div style={{fontWeight:'bold',color:"#01579B"}}>{per.name}</div> 
                </Col>
                <Col span="23" offset="1">
                    <Row>
                        {detailCheckbox}
                    </Row>
                </Col>
            </Row>
        )
    })
    return (
        
        <div className={className}>
            <Checkbox.Group style={{ width: '100%' }} onChange={(checkedValues) => {
                addBody(checkedValues, 'permissions')
            }} value={defaultValue}>
                {_checkbox}
            </Checkbox.Group>
        </div>
    )
}

export default styled(TitleModal)`
`;