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
    const payload = {
      uuid: itemSelected?.id,
      name: values?.name,
      station_code: values?.station_code,
      province_id: values?.province,
      district_id: values?.district,
      address: values?.address,
      merchant_id: values?.merchant,
      is_active: values?.is_active ? 1 : 0,
    }
    manage.updateCarPark(payload)
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
