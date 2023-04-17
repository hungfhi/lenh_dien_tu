import React, { } from "react";
import { Row, Col, Space, Tag, } from "antd";
import _ from "lodash"
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TitleModal = ({
    profile,
    definitions,
    uuid,
    objOrder,
    className
}) => {
    return (
        <div className={className}>
            Thêm mới Role đại lý
        </div>
    )
}

export default styled(TitleModal)`
`;