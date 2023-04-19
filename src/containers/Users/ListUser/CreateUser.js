import React, { useCallback } from "react";
import { Row, Col, DatePicker, Select, Button, Form } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import FormUser from './FormUser';
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import axios from 'axios';
import {users} from "configs";
let inputTimer = null;

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
