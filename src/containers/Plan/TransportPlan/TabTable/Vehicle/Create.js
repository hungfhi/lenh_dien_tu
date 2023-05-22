import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import { category, plan } from 'configs';
import FormAddEdit from "./FormAddEdit";
import moment from "moment";

const Create = ({
    className,
    onHiddenModal,
    onRefreshList,
    itemSelected,
    stations,
    province,
    allVehicle,
    allUnit
}) => {
    const [form] = Form.useForm();
    const onFinishFailed = () => {
    };
    const onSave = async (values) => {
        const payload = {
            vehicle_id: values?.vehicle_id,
            is_active: values.is_active ? 1 : 0,
            expire_date: moment(values?.expire_date).format('YYYY-MM-DD')
        }
        // console.log(payload);
        plan.assignVehicle(itemSelected?.id, payload).then(res => {
            Ui.showSuccess({ message: "Thành công" });
            onRefreshList();
            onHiddenModal();
        }).catch(err => {
            Ui.showError({ message: 'Có lỗi xảy ra' });
        });

    }
    return (
        <div className={className}>
            <FormAddEdit
                itemSelected={itemSelected}
                itemVehicleSelected={null}
                onSave={onSave}
                onHiddenModal={onHiddenModal}
                allVehicle={allVehicle}
            />
        </div>
    );
};
Create.propTypes = {
    className: PropTypes.any,
};
export default styled(Create)`
    
`;
