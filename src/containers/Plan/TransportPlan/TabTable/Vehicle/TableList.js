import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import DefineTable from 'components/DefineTable';
import { Button, message, Popconfirm, Switch, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { plan } from 'configs';
import _ from 'lodash';
import { Ui } from 'utils/Ui';
import { COLOR_GREEN, COLOR_RED } from 'theme/colors';

const TableList = ({ className, data, setData, itemSelected, onEdit, onRefreshList }) => {

    const onConfirm = (row) => {
        onDelRow(row)
    };

    const cancel = (e) => {
    };

    const onDelRow = async (row) => {

        plan.deleteVehicle(row.id).then(res => {
            if (res.status === 200) {

                message.success(res.data.message ? res.data.message : res.data.data.message);
                onRefreshList();
            }
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        })
    };


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
            title: 'Biển kiểm soát',
            width: 200,
            render: (text, record) => {
                return record?.vehicle?.license_plate;
            }
        },
        {
            title: 'Hạn phù hiệu',
            dataIndex: 'expire_date',
            width: 150,
            align: 'center',
            render: (text, record) => {
                return moment(text).format('DD/MM/YYYY');
            }
        },
        {
            title: 'Ngày cấp',
            dataIndex: 'updated_at',
            width: 150,
            align: 'center',
            render: (text, record) => {
                return moment(record?.vehicle?.updated_at).format('DD/MM/YYYY');
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "is_active",
            width: '100',
            align: 'center',
            render: (text, record) => {

                return <span style={{ color: text == 1 ? COLOR_GREEN : COLOR_RED }}>{text == 1 ? 'Active' : 'In Active'}</span>;

            },
            width: 120,
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
                                onClick={() => onEdit(record)}
                            >
                                <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
                            </Button>
                        </Tooltip>
                        &nbsp;&nbsp;
                        <Popconfirm
                            title="Chắc chắn xoá phương tiện này?"
                            onConfirm={() => onConfirm(record)}
                            onCancel={cancel}
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