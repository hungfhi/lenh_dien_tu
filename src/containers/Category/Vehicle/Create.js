import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';
import { category } from 'configs';
import moment from 'moment';

const Create = ({
  className,
  onHiddenModal,
  onRefreshList,
  itemSelected,
  products
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = () => {
  };

  

  const onSave = async (values) => {
    
    const params = {
      ...values,
      insurance_expired_date: moment(values.insurance_expired_date).format('YYYY-MM-DD'),
      registration_expired_date: moment(values.registration_expired_date).format('YYYY-MM-DD'),
      is_active: values?.is_active ? 1: 0
    }
    category.createVehicle(params)
          .then(res => {
              if (res.status === 200) {
                Ui.showSuccess({ message: "Thành công" });
                onRefreshList()
                onHiddenModal()
               
              }
          })
          .catch(err => {
              if (err.response?.status === 422 && err.response?.data?.errors) {
                  message.warn(err.response.data?.errors[0].msg)
                  message.error('Error!')
              }
          })

  }
  return (
    <div className={className}>
      <FormAddEdit
        itemSelected={null}
        onSave={onSave}
        onHiddenModal={onHiddenModal}
        products={products}
      />
    </div>
  );
};
Create.propTypes = {
  className: PropTypes.any,
};
export default styled(Create)`
    
`;
