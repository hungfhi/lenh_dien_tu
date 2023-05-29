import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';
import manage from "configs/manage";
import { useDispatch, useSelector } from 'react-redux';
import { setLoad } from "redux/action";
import { category } from "configs";
const Create = ({
  className,
  onHiddenModal,
  onRefreshList,
  itemSelected
}) => {
  const dispatch = useDispatch()

  const onSave = async (values) => {
    const payload = {
      name: values?.name,
      is_active: values?.is_active ? 1 : 0,
      order_number: values?.order_number || 1,
      parent_id: values?.parent_id || 0,
    }

    category.createStandard(payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Thêm mới thành công" });
        onRefreshList();
        onHiddenModal();
      }
    }).catch(err => {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
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
