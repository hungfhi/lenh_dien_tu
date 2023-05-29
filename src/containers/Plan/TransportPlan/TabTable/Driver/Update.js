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
    itemStaffSelected,
    allStaff,
    itemSelected,
    data,
    setItemStaffSelected,
}) => {
    const [form] = Form.useForm();

    const onFinishFailed = () => {
    };
    
    const onSave = async (values) => {
        const payload = {
            staff_id: values?.staff_id,
            expire_date: moment(values?.expire_date).format('YYYY-MM-DD'),
        }
        // console.log(payload);
        plan.updateAssignStaff(itemStaffSelected?.id, payload).then(res => {
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
                itemStaffSelected={itemStaffSelected}
                onSave={onSave}
                allStaff={allStaff}
            />
        </div>
    );
};
Update.propTypes = {
    className: PropTypes.any,
};
export default styled(Update)`
    
`;
