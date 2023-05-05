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
    const payload = {
      name: values?.name,
      station_code: values?.station_code,
      province_id: values?.province,
      district_id: values?.district,
      address: values?.address,
      merchant_id: values?.merchant,
      is_active: values?.is_active ? 1 : 0,
    }
    manage.createCarPark(payload)
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
        }
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
