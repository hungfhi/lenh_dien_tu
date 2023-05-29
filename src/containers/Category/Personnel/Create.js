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
    // console.log(values);
    const idRoles = [];
    values?.roles.map(item => {
      idRoles.push(item.values);
    });

    const idModels = [];
    idModels.push(values?.model_id);

    const payload = {
      // ...values,
      first_name: values?.first_name,
      last_name: values?.last_name,
      staff_code: values?.staff_code,
      phone: values?.phone,
      citizen_identity: values?.citizen_identity,
      position_id: values?.position_id,
      driving_license: values?.driving_license,
      driving_license_rank_id: values?.driving_license_rank_id,
      driving_license_expire_date: moment(values.driving_license_expire_date).format('YYYY-MM-DD'),
      status: values?.status ? 1 : 0,
      gender: values?.gender,
      date_of_birth: moment(values?.date_of_birth).format('YYYY-MM-DD'),
      address: values?.address,
      modelable_id: values?.modelable_id || 1,
      // modelable_type: values?.modelable_type ||'',
      email: values?.email,
      roles: values?.roles || null,
      station_id: values?.station_id || null,
      model_id: values?.model_id || null
    };
    // console.log(payload);
    category.createPerson(payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Thành công" });
        onRefreshList()
        onHiddenModal()

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
