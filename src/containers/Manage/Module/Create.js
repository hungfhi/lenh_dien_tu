import { Form } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';
import manage from "configs/manage";
import { useDispatch, useSelector } from 'react-redux';
import { setLoad } from "redux/action";
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
      path: values?.path,
      is_active: 1,
      icon: values?.icon,
      order_number: values?.order_number,
      permission_slug: values?.permission_slug?.value,
      parent_id:values?.parent_id||0,
    }
    manage.createModule(payload)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Tạo mới module thành công" });
          onRefreshList()
          onHiddenModal()
          dispatch(setLoad(true));
        }
      })
      .catch(err => {
        Ui.showError({ message: err?.response?.data?.message });
      })

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
