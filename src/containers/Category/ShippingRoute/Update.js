import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button } from "antd";
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
  itemSelected,
  stations,
  province,
  allRoute
}) => {
  const onSave = useCallback(async (values) => {
    const params = {
      ...values,
      is_active: values?.is_active ? 1 : 0,
      id: itemSelected?.id
    }
    category.updateRoute(params).then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Thành công" });
          onRefreshList();
          onHiddenModalEdit();

        }
      }).catch(err => {
        Ui.showErrors('Có lỗi xảy ra');
      });

  });
  return (
    <div className={className}>
      <FormAddEdit
        itemSelected={itemSelected}
        onSave={onSave}
        onHiddenModal={onHiddenModalEdit}
        stations={stations}
        province={province}
        allRoute={allRoute}
      />
    </div>
  );
};
UpdateDinhMuc.propTypes = {
  className: PropTypes.any,
};
export default styled(UpdateDinhMuc)`
    
`;
