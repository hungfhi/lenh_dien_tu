import { Col, Row, Spin, message } from "antd";
import { apis } from "configs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import TableList from './TableList';

const EndPlace = ({ className, itemSelected}) => {
  const [data, setData] = useState(itemSelected?.journey_b);
  const [loadding, setLoading] = useState(false);

  return (
    <Row className={className} gutter={[16, 16]}>
      <Spin spinning={loadding}>
        <Col span={24}>
          <TableList
            data={data}
            itemSelected={itemSelected}
            setData={setData}
          />
        </Col>
      </Spin>
    </Row>
  );
};

EndPlace.propTypes = {
  className: PropTypes.any,
};
export default styled(EndPlace)`
.ant-spin-nested-loading {
  max-width: 100%;
}
 `;
