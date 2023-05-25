import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, message } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import { category } from 'configs';
const UpdateDinhMuc = ({ 
    className, 
    onHiddenModalEdit,
    onRefreshList,
    itemSelected,
    products,
    seatType
  }) => {
    const onSave = async (values) => {
    const params = {
      ...values,
      insurance_expired_date: moment(values.insurance_expired_date).format('YYYY-MM-DD'),
      registration_expired_date: moment(values.registration_expired_date).format('YYYY-MM-DD'),
      is_active: values?.is_active ? 1: 0,
      id: itemSelected?.id,
      seat_type: values?.seat_type
    }
    category.updateVehicle(params)
          .then(res => {
              if (res.status === 200) {
                Ui.showSuccess({ message: "Thành công" });
                onRefreshList()
                onHiddenModalEdit()
               
              }
          })
          .catch(err => {
            // console.log(err);
              if (err.response?.status === 422 && err.response?.data?.errors) {
                  // message.warn(err.response.data?.errors[0].msg)
                  message.error(err?.response?.data?.message);
              }
          })

  }
       
  return (
    <div className={className}>
        <FormAddEdit 
          itemSelected={itemSelected}
          onSave={onSave}
          onHiddenModal={onHiddenModalEdit}
          products={products}
          seatType={seatType}
        />
    </div>
  );
};
UpdateDinhMuc.propTypes = {
  className: PropTypes.any,
};
export default styled(UpdateDinhMuc)`
    
`;
