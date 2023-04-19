import PropTypes from "prop-types";
import styled from "styled-components";

import { Button, Col, Row } from "antd";


const Roles = ({ className, onCloseModal, setParams, params }) => {
    return (
        < div className={className} >
            <Row gutter={[8, 8]}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', paddingBottom: 10 }}>
                        <Button className="btn-add" onClick={() => {onCloseModal(true)}}> Thêm mới</Button>
                </Col>
            </Row>
        </ div>
    )
};

Roles.propTypes = {
    className: PropTypes.any,
};
export default styled(Roles)`
    .btn-add {
        background-color: #01579B;
        color: #fff;
        border-radius: 3px;
        border-color: #01579B;
    }
    .btn-remove {
        background-color: #ffb822;
        color: #212529;
        border-color: #ffb822;
        margin-right: 10px;
        border-radius: 3px
    }
`;