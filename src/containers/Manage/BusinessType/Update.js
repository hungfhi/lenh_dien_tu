import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, message } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import { category, manage } from "configs";
const UpdateDinhMuc = ({
  className,
  onHiddenModalEdit,
  onRefreshList,
  itemSelected
}) => {

  const onSave = async (values) => {

    const idRoles = [];
    values?.roles.map(item => {
      idRoles.push(item.values);
    });
    // console.log(idRoles);

    const payload = {
      name: values?.name,
      roles: values?.roles
    };

    manage.updateBusinessType(itemSelected?.id, payload).then(res => {
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
