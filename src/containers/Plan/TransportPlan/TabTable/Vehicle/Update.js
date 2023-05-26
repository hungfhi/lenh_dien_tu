import { Form, message } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import { category, plan } from 'configs';
import FormAddEdit from "./FormAddEdit";
import _ from "lodash";
import moment from "moment";

const Update = ({
    className,
    onHiddenModal,
    onRefreshList,
    itemVehicleSelected,
    stations,
    province,
    allVehicle,
    itemSelected,
    data,
    allUnit,
    setItemVehicleSelected,
}) => {
    const [form] = Form.useForm();

    const onFinishFailed = () => {
    };
    const onSave = async (values) => {

        const payload = {
            vehicle_id: values?.vehicle_id,
            expire_date: moment(values?.expire_date).format('YYYY-MM-DD'),
            is_active: values?.is_active ? 1 : 0
        }
        plan.updateAssignVehicle(itemVehicleSelected.id, payload).then(res => {
            if (res.status === 200) {
                onRefreshList();
                onHiddenModal();
            }
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });

    }
    return (
        <div className={className}>
            <FormAddEdit
                itemVehicleSelected={itemVehicleSelected}
                onSave={onSave}
                allVehicle={allVehicle}
            />
        </div>
    );
};
Update.propTypes = {
    className: PropTypes.any,
};
export default styled(Update)`
    
`;
