import { users } from "configs";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormUser from './FormUser';
import moment from "moment";
import { message } from "antd";
const CreateUser = ({
    className,
    onHiddenModal,
    onRefreshList,
    itemSelected,
    parsed
}) => {
    const onSave = async (values) => {
        let list_roles = [];
        values.roles.map((item) => {
            list_roles.push(item.value);
        });
        const payload = {
            username: values?.username,
            full_name: values?.full_name,
            phone: values?.phone,
            email: values?.email,
            citizen_identity: values?.citizen_identity,
            password: values?.password,
            roles: list_roles,
            position_id: values?.position_id,
            driving_license: values?.driving_license,
            driving_license_rank_id: values?.driving_license_rank_id,
            driving_license_expire_date: moment(values.driving_license_expire_date).format('YYYY-MM-DD'),
            is_staff: values?.is_staff ? 1 : 0,
            gender: values?.gender,
            date_of_birth: moment(values?.date_of_birth).format('YYYY-MM-DD'),
            address: values?.address,
            modelable_id: values?.modelable_id || 1,
            station_id: values?.station_id || undefined,
            model_id: values?.model_id || undefined,
            staff_code: values?.staff_code || undefined,
            merchant_id: values?.merchant_id || undefined
        }
        users.createUser(payload)
            .then(res => {
                if (res.status === 200) {
                    message.success('Tạo mới tài khoản thành công !');
                    onRefreshList()
                    onHiddenModal()
                }
            })
            .catch(err => {
                message.error(err?.response?.data?.message||'Có lỗi xảy ra !')
            })
    }
    return (
        <div className={className}>
            <FormUser
                itemSelected={null}
                onSave={onSave}
                onHiddenModal={onHiddenModal}
            />
        </div>
    );
};
CreateUser.propTypes = {
    className: PropTypes.any,
};
export default styled(CreateUser)`
    
`;
