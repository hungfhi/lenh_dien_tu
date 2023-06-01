import { Form, message } from "antd";
import { category } from "configs";
import moment from "moment";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';

const Create = ({
  className,
  onHiddenModal,
  onRefreshList,
  itemSelected
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = () => {
  };
  
  const onSave = async (values) => {
    const payload = {
      ...values,
      name: values?.name
    };
    category.createProduct(payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Thành công" });
        onRefreshList()
        onHiddenModal()
      }
    }).catch(err => {
      Ui.showError({message: 'Có lỗi xảy ra'});
    });
  }
  return (
    <div className={className}>
      <FormAddEdit
        itemSelected={null}
        onSave={onSave}
        onHiddenModal={onHiddenModal}
      />
    </div>
  );
};
Create.propTypes = {
  className: PropTypes.any,
};
export default styled(Create)`
    
`;
