import { Col, Row, Spin, message } from "antd";
import { apis } from "configs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import TableList from './TableList';

const TimeStart = ({ className, itemSelected}) => {
  const [data, setData] = useState(itemSelected?.node_a);
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

TimeStart.propTypes = {
  className: PropTypes.any,
};
export default styled(TimeStart)`
.ant-spin-nested-loading {
  max-width: 100%;
}
 `;
