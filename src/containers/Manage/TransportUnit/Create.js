import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';
import { manage } from "configs";

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
    const models = []
    if (values?.is_mechant && values?.is_station) {
      models.push(1, 2)
    } else if (values?.is_mechant && !values?.is_station) {
      models.push(1)
    } else if (!values?.is_mechant && values?.is_station) {
      models.push(2)
    } else {
      return null;
    }

    const payload = {
      uuid: itemSelected?.id,
      name: values?.name,
      tax_code: values?.tax_code,
      phone: values?.phone,
      email: values?.email,
      address: values?.address,
      is_active: values?.is_active ? 1 : 0,
      models:models
    }
    manage.createTransport(payload)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Thành công" });
          onRefreshList()
          onHiddenModal()
        }
      })
      .catch(err => {
        message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
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
