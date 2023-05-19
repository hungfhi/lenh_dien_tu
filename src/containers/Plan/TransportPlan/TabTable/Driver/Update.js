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
    console.log(data);
    const onFinishFailed = () => {
    };
    const onSave = async (values) => {
        console.log(values);
        onHiddenModal();
        const payload = {
            vehicle_id: values?.vehicle_id,
            expire_date: moment(values?.expire_date).format('YYYY-MM-DD'),
            is_active: 1
        }
        // plan.assignVehicle(itemSelected?.id, payload).then(res => {
        //     // let dataClone = _.cloneDeep(data);
        //     // dataClone.find(item => item?.id === itemVehicleSelected?.id && (item?.vehicle_id = res.data.data.vehicle_id, item.expire_date = res.data.data.expire_date));
        //     // setItemVehicleSelected(dataClone)
        // }).catch(err => {
        //     if (err.response?.data) {
        //         message.error(err.response?.data?.message)
        //     }
        // });

    }
    return (
        <div className={className}>
            <FormAddEdit
                itemVehicleSelected={itemVehicleSelected}
                // stations={stations}
                // province={province}
                onSave={onSave}
                // onHiddenModal={onHiddenModal}
                allVehicle={allVehicle}
            // allUnit={allUnit}
            />
        </div>
    );
};
Update.propTypes = {
    className: PropTypes.any,
};
export default styled(Update)`
    
`;
