import { users } from "configs";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import FormUser from './FormUser';

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
            citizen_identity:values?.citizen_identity,
            password: values?.password,
            roles:list_roles
        }
        users.createUser(payload)
        .then(res => {
          if (res.status === 200) {
            Ui.showSuccess({ message: "Tạo mới tài khoản thành công" });
            onRefreshList()
            onHiddenModal()
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
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
