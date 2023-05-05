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
    console.log('dsadasdasd',values)
    const models = []
    if (values?.is_mechant && values?.is_station) {
      models.push(1, 2)
    } else if (values?.is_mechant && !values?.is_station) {
      models.push(1)
    } else if (!values?.is_mechant && values?.is_station) {
      models.push(2)
    } else {
      return null;
    }

    console.log("models", models)

    const payload = {
      name: values?.name,
      merchant_code: values?.merchant_code,
      tax_code: values?.tax_code,
      phone: values?.phone,
      email: values?.email,
      address: values?.address,
      is_active: values?.is_active,
    }
    // manage.createCarPark(payload)
    //   .then(res => {
    //     if (res.status === 200) {
    //       Ui.showSuccess({ message: "Thành công" });
    //       onRefreshList()
    //       onHiddenModalEdit()
    //     }
    //   })
    //   .catch(err => {
    //     if (err.response?.status === 422 && err.response?.data?.errors) {
    //       message.warn(err.response.data?.errors[0].msg)
    //     }
    //   })

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
