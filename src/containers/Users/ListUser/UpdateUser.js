import { users } from "configs";
import PropTypes from "prop-types";
import { useCallback } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormUser from './FormUser';
import { message } from "antd";
const UpdateAccount = ({
    className,
    onHiddenModalEdit,
    onRefreshList,
    itemSelected,
    parsed
}) => {
    const onSave = useCallback(async (values) => {
        const payload = {
            uuid:itemSelected?.id,
            username: values?.username,
            full_name: values?.full_name,
            phone: values?.phone,
            email: values?.email,
            citizen_identity:values?.citizen_identity,
            password: values?.password,
            roles: values?.roles,
        }
        users.updateInfoUser(payload)
        .then(res => {
          if (res.status === 200) {
            message.success("Cập nhật thông tin tài khoản thành công.")
            onRefreshList()
            onHiddenModalEdit()
          }
        })
        .catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        })
    }, [])

    return (
        <div className={className}>
            <FormUser
                itemSelected={itemSelected}
                onSave={onSave}
                onHiddenModal={onHiddenModalEdit}
            />
        </div>
    );
};
UpdateAccount.propTypes = {
    className: PropTypes.any,
};
export default styled(UpdateAccount)`
    
`;
