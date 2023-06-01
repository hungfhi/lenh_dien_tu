import {
    CheckOutlined, CloseOutlined, EditOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Modal, Pagination, Row, Space, Switch, Tag, Tooltip, message } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import { users } from 'configs';
import _ from "lodash";
import moment from 'moment';
import PropTypes from "prop-types";
import { memo, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
const { confirm } = Modal;
const History = memo(({ className, data, params, }) => {


    const columns = [
        {
            title: "#",
            dataIndex: "index",
            width: 60,
            fixed: "left",
            align: 'center',
            render: (value, row, index) => {
                return (
                    <h5 style={{ textAlign: 'center' }}>{index + 1}</h5>
                );
            },
        },
        {
            title: "Nhân viên",
            dataIndex: "user",
            width: 200,
            render: (text) => {
                return <div>{text?.full_name}</div>
            }
        },
        {
            title: "Tác vụ",
            dataIndex: "type_des",
            width: 150,
            render: (value) => <div>{value?.name}</div>
        },
        {
            title: "Ngày",
            dataIndex: "date",
            width: 200,
            render: (value) => <div>{value !== undefined ? value?.slice(0, 11) : null}</div>
        },
        {
            title: "Nội dung",
            dataIndex: "email",
        },
    ];

    return (
        <div className={className}>
            <DefineTable
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: "calc(100vh - 330px)" }}
            />
        </div >
    );
});
History.propTypes = {
    className: PropTypes.any,
};
export default styled(History)`
  
`;
