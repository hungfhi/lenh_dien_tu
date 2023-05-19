import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import DefineTable from 'components/DefineTable';
import { Button, Popconfirm, Switch, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const TableList = ({ className, data, setData, itemSelected }) => {

    console.log(data);

    const columns = [
        {
            title: 'STT',
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
            title: 'Tên lái xe',
            width: 200,
            render: (text, record) => {
                console.log(record);
                return <div>{record?.staff?.first_name} {record?.staff?.last_name}</div>;
            }
        },
        {
            title: 'Số điện thoại',
            width: 150,
            dataIndex: 'phone',
            render: (text, record) => {
                return record?.staff?.phone;
            }
        },
        {
            title: 'Hạng bằng lái',
            dataIndex: 'expire_date',
            width: 100,
            align: 'center',
            render: (text, record) => {
                return record?.staff?.driving_license_rank_id?.name;
            }
        },
        {
            title: 'Hạn bằng lái',
            dataIndex: 'expire_date',
            width: 150,
            align: 'center',
            render: (text, record) => {
                return moment(record?.staff?.driving_license_expire_date).format('DD/MM/YYYY');
            }
        },
        {
            title: 'Thời hạn',
            dataIndex: 'expire_date',
            width: 150,
            align: 'center',
            render: (text, record) => {
                return moment(record?.vehicle?.registration_expired_date).format('DD/MM/YYYY');
            }
        },
        {
            title: "Thao tác",
            width: 80,
            dataIndex: "active",
            fixed: "right",
            render: (text, record, row) => {
                return (
                    <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        <Tooltip placement="topLeft">
                            <Button
                                type="link"
                                // onClick={() => onEdit(ids)}
                            >
                                <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
                            </Button>
                        </Tooltip>
                        &nbsp;&nbsp;
                        <Popconfirm
                            title="Chắc chắn xoá phương tiện này?"
                            // onConfirm={() => onConfirm(ids)}
                            // onCancel={cancel}
                            okText="Xoá"
                            placement="topLeft"
                            cancelText="Huỷ"
                        >
                            <a>
                                <i class="fa-solid fa-trash-can" style={{ color: 'red', fontSize: 20 }}></i>
                            </a>
                        </Popconfirm>
                    </div >
                )
            }
        }
    ];

return (
    <div className={className}>
        <DefineTable
            columns={columns}
            dataSource={data}
            scroll={{ y: "calc(100vh - 330px)" }}
            pagination={false}
        />
    </div>
);
};

TableList.propTypes = {
    className: PropTypes.any,
};
export default styled(TableList)`
  
  `;