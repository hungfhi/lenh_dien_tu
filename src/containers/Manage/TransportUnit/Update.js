import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, message } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import { manage } from "configs";
const UpdateDinhMuc = ({
  className,
  onHiddenModalEdit,
  onRefreshList,
  itemSelected
}) => {
  const onSave = useCallback(async (values) => {

    const models = []
    if (values?.is_mechant && values?.is_station) {
      models.push(1, 2)
    } else if (values?.is_mechant && !values?.is_station) {
      models.push(2)
    } else if (!values?.is_mechant && values?.is_station) {
      models.push(1)
    } else {
      return null;
    }

    const payload = {
      uuid: itemSelected?.id,
      name: values?.name,
      tax_code: values?.tax_code,
      phone: values?.phone,
      email: values?.email,
      address: values?.address,
      is_active: values?.is_active ? 1 : 0,
      models:models
    }
    manage.updateTransport(payload)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Thành công" });
          onRefreshList()
          onHiddenModalEdit()
        }
      })
      .catch(err => {
        message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
      })
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
