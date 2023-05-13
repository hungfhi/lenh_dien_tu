import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormAdd from './FormAdd';
import { category } from 'configs';

const Create = ({
  className,
  onHiddenModal,
  onRefreshList,
  itemSelected,
  stations,
  province,
  allRoute,
  allUnit
}) => {
  const [form] = Form.useForm();
  const onFinishFailed = () => {
  };
  const onSave = async (values) => {
    const payload = {
      "route_id": values?.route_id,
      "distance": values?.distance,
      "is_active": values?.is_active ? 1 : 0
    }
    category.createMerchantRoutes(payload).then(res => {
      Ui.showSuccess({ message: "Thành công" });
      onHiddenModal();
      onRefreshList();
    }).catch(err => {
      Ui.showError({ message: 'Có lỗi xảy ra' });
    });

  }
  return (
    <div className={className}>
      <FormAdd
        itemSelected={null}
        stations={stations}
        province={province}
        onSave={onSave}
        onHiddenModal={onHiddenModal}
        allRoute={allRoute}
        allUnit={allUnit}
      />
    </div>
  );
};
Create.propTypes = {
  className: PropTypes.any,
};
export default styled(Create)`
    
`;
