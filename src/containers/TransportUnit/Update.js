import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormAddEdit from './FormAddEdit';
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
const UpdateDinhMuc = ({ 
    className, 
    onHiddenModalEdit,
    onRefreshList,
    itemSelected
  }) => {
    const onSave = useCallback(async (values) => {
      const result = await ServiceBase.requestJson({
          method: "PUT",
          url: `/v1/category-declare/quota/${itemSelected.dmo_id}`,
          data: {
            dmo_name: values.dmo_name,
            dmo_intro: values.dmo_intro,
          },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
          Ui.showSuccess({ message: "Cập nhật option định mức." });
          onHiddenModalEdit();
          onRefreshList();
      }
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
