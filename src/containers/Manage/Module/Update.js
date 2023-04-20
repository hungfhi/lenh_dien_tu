import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import { useDispatch, useSelector } from 'react-redux';
import manage from "configs/manage";
import { setLoad } from "redux/action";
const UpdateDinhMuc = ({ 
    className, 
    onHiddenModalEdit,
    onRefreshList,
    itemSelected
  }) => {
    const dispatch = useDispatch()
    const onSave = useCallback(async (values) => {
      const payload = {
        uuid: itemSelected?.id,
        name: values?.name,
        path: values?.path,
        is_active: 1,
        icon: values?.icon,
        order_number: values?.order_number,
        permission_slug: values?.permission_slug?.value,
        parent_id:values?.parent_id?.value !== undefined ? values?.parent_id?.value : values?.parent_id || 0,
      }
      manage.updateModule(payload)
        .then(res => {
          if (res.status === 200) {
            Ui.showSuccess({ message: "Sửa module thành công" });
            onRefreshList()
            onHiddenModalEdit()
            dispatch(setLoad(true));
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
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
