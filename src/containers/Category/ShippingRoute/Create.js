import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';
import { category } from 'configs';

const Create = ({
  className,
  onHiddenModal,
  onRefreshList,
  itemSelected,
  stations,
  province
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = () => {
  };
  const onSave = async (values) => {

    const payload = {
      ...values,
      is_active: values?.is_active ? 1 : 0
    }
    // console.log(payload);
    category.createRoute(payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Thành công" });
        onRefreshList();
        onHiddenModal();
      }
    }).catch(err => {
      message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
    });
  }
  return (
    <div className={className}>
      <FormAddEdit
        itemSelected={null}
        stations={stations}
        province={province}
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
