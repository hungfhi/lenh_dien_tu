import React, { useState, useCallback, useEffect } from "react";
import { Button, Col, Dropdown, Form, Menu, Modal, Row, Table, Tag, Space } from "antd";
import {  DefineTable } from "components";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
    DeleteTwoTone ,
    EditTwoTone 
} from '@ant-design/icons';
import moment from 'moment';
import ServiceBase from "utils/ServiceBase";


const TableRoles = ({ className, profile, scroll_Y, _dataBin, _handleShowModal, setParams, total }) => {
    let maxHeight = window.innerHeight;
    maxHeight = maxHeight * 65 / 100
    let columns = [
        {
            title: "#",
            width: 50,
            dataIndex: "code",
            align: 'center',
            render: (text, record, index) => (
                <>
                {index + 1}
                </>
            )
        },
        // {
        //     title: "Key",
        //     width: 150,
        //     dataIndex: "code",
        //     render: (text, record) => (
        //         {text}
        //     )
        // },
        {
            title: "Tên hiển thị",
            width: 200,
            dataIndex: "name",
            render: (text, record) => (
                <span>{text}</span>
            )
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (text, record) => (
                <span>{text}</span>
            )
        },
        {
            title: "Thao tác",
            width: 80,
            dataIndex: "code",
            render: (text, record) => (
                <>
                    <Button
                        size="small"
                        type="link"
                        onClick={() => {
                            _handleShowModal(true, true, record.id)
                        }}
                    >
                    <EditTwoTone twoToneColor="#01579B"/>
                    </Button>
                    {/* <Button
                        size="small"
                        type="link"
                        onClick={() => {
                        }}
                    >
                        <DeleteTwoTone twoToneColor="#fb0000"/>
                    </Button> */}
                </>
            )
        }
    ]
    return (
        <div>
             <DefineTable
                bordered
                columns={columns}
                dataSource={_dataBin}
                scroll={{ x: "100%" }}
                rowKey="tableRole"
                pagination={false}
            />
        </div>
    )
};

TableRoles.propTypes = {
    className: PropTypes.any,
};
export default styled(TableRoles)`
`;