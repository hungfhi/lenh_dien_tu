import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, message } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import { category } from "configs";
const UpdateDinhMuc = ({
  className,
  onHiddenModalEdit,
  onRefreshList,
  itemSelected
}) => {

  const onSave = async (values) => {
    console.log(values);
    const payload = {
      ...values,
      first_name: values?.first_name,
      last_name: values?.last_name,
      staff_code: values?.staff_code,
      phone: values?.phone,
      citizen_identity: values?.citizen_identity,
      position_id: values?.position_id,
      driving_license: values?.driving_license,
      driving_license_rank_id: values?.driving_license_rank_id,
      driving_license_expire_date: moment(values.driving_license_expire_date).format('YYYY-MM-DD'),
      status: values?.status ? 1 : 0,
      gender: values?.gender,
      date_of_birth: moment(values?.date_of_birth).format('YYYY-MM-DD'),
      address: values?.address,
      modelable_id: values?.modelable_id,
      modelable_type: values?.modelable_type,
    };

    category.updatePerson(itemSelected?.id, payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Thành công" });
        onRefreshList();
        onHiddenModalEdit();

      }
    }).catch(err => {
      Ui.showError({ message: 'Có lỗi xảy ra' });
    });
  }
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
