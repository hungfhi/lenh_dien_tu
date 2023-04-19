import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
const UpdateDinhMuc = ({ 
    className, 
    onHiddenModalEdit,
    onRefreshList,
    itemSelected
  }) => {
    const onSave = useCallback(async (values) => {
    })
  return (
    <div className={className}>
        <FormAddEdit 
          itemSelected={itemSelected}
          onSave={onSave}
          onHiddenModal={onHiddenModalEdit}
        />
    </div>
  );
};
UpdateDinhMuc.propTypes = {
  className: PropTypes.any,
};
export default styled(UpdateDinhMuc)`
    
`;
