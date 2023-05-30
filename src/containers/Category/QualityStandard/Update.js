import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, message } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import { useDispatch, useSelector } from 'react-redux';
import manage from "configs/manage";
import { setLoad } from "redux/action";
import { category } from "configs";
const UpdateDinhMuc = ({
  className,
  onHiddenModalEdit,
  onRefreshList,
  itemSelected
}) => {
  const dispatch = useDispatch()
  const onSave = useCallback(async (values) => {

    const payload = {
      name: values?.name,
      is_active: values?.is_active ? 1 : 0,
      order_number: values?.order_number,
      parent_id: values?.parent_id?.value !== undefined ? values?.parent_id?.value : values?.parent_id || 0,
    }

    category.updateStandard(itemSelected?.id, payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Cập nhật thành công" });
        onRefreshList();
        onHiddenModalEdit();
      }
    }).catch(err => {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
    });

  });

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
