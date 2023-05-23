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
  transport
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = () => {
  };
  const onSave = async (values, update_car_contract, update_node_contract) => {
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
      overnight_price: values?.overnight_price,
      status: 1,
    }
    const car = {
      update_car_contract: update_car_contract
    }
    const time = {
      update_node_contract: update_node_contract
    }

    station.createContract(payload)
      .then(res => {
        if (res.status === 200) {
          station.addCarCreate(car)
            .then(res => {
              if (res.status === 200) {
              }
            })
            .catch(err => {
              message.error("Có lỗi xảy ra khi gán xe")
            })
          station.addTimeCreate(time)
            .then(res => {
              if (res.status === 200) {
              }
            })
            .catch(err => {
              message.error("Có lỗi xảy ra khi gán thời gian xe xb!")
            })
          onHiddenModal()
          onRefreshList()
        }
      })
      .catch(err => {
        message.error("Có lỗi xảy ra!")
      })

  }
  return (
    <div className={className}>
      <FormAddEdit
        itemSelected={null}
        onSave={onSave}
        onHiddenModal={onHiddenModal}
        transport={transport}
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
