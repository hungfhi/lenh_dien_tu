import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAddEdit from './FormAddEdit';
import { station } from "configs";
import moment from "moment";
const Create = ({
  className,
  onHiddenModal,
  onRefreshList,
  stations,
  itemSelected
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = () => {
  };
  const onSave = async (values) => {
    const payload = {
      name: values?.name,
      contract_number: values?.contract_number,
      contract_code: values?.contract_code,
      merchant_id: values?.merchant_id,
      address: values?.address,
      tax_code: values?.tax_code,
      email: values?.email,
      start_date: moment(values?.start_date).format("YYYY-MM-DD"),
      end_date: moment(values?.end_date).format("YYYY-MM-DD"),
      is_full_package: values?.is_full_package === true ? 1 : false,
      stations: values?.stations,
    }
    station.createContract(payload)
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
        stations={stations}
      />
    </div>
  );
};
Create.propTypes = {
  className: PropTypes.any,
};
export default styled(Create)`
    
`;
