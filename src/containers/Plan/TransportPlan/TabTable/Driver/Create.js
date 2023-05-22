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
    allStaff,
    allUnit
}) => {
    const [form] = Form.useForm();
    const onFinishFailed = () => {
    };
    const onSave = async (values) => {
        const payload = {
            staff_id: values?.staff_id,
            expire_date: moment(values?.expire_date).format('YYYY-MM-DD')
        }
        // console.log(payload, itemSelected);
        plan.assignStaff(itemSelected?.id, payload).then(res => {
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
                // stations={stations}
                // province={province}
                onSave={onSave}
                onHiddenModal={onHiddenModal}
                allStaff={allStaff}
                // allUnit={allUnit}
            />
        </div>
    );
};
Create.propTypes = {
    className: PropTypes.any,
};
export default styled(Create)`
    
`;
