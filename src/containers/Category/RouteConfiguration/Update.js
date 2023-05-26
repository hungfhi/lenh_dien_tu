import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, message } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormEdit from './FormEdit';
import { Ui } from "utils/Ui";
import { category } from "configs";
const Update = ({
  className,
  onHiddenModalEdit,
  onRefreshList,
  itemSelected,
  stations,
  province,
  allRoute,
  allUnit,
}) => {

  const onSave = useCallback(async (values) => {
    const payload = {
      id: itemSelected?.id,
      distance: values?.distance,
      is_active: values?.is_active ? 1 : 0
    }
    category.updateMerchantRoute(payload).then(res => {
      message.success('Thành công !')
      // onHiddenModalEdit();
      onRefreshList();
    }).catch(err => {
      message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
    });
  });

  return (
    <div className={className}>
      <FormEdit
        itemSelected={itemSelected}
        onSave={onSave}
        onHiddenModal={onHiddenModalEdit}
        stations={stations}
        province={province}
        allRoute={allRoute}
        allUnit={allUnit}
      />
    </div>
  );
};
Update.propTypes = {
  className: PropTypes.any,
};
export default styled(Update)`
    
`;
