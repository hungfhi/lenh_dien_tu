import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import DefineTable from 'components/DefineTable';
import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const TableList = ({ className, data }) => {

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
            title: 'Tuyến',
            width: 200,
            render: (text, record) => {
                return record?.route?.name;
            }
        },
        {
            title: 'Số lượng xe',
            dataIndex: 'count_vehicle',
            width: 100,
            align: 'center'
        },
        {
            title: 'Số lượng lái xe',
            dataIndex: 'count_driver',
            width: 120,
            align: 'center'
        },
        {
            title: 'Bến xuất phát chiều đi',
            width: 300,
            children: [
                {
                    title: 'Tên bến',
                    width: 200,
                    render: (text, record) => {
                        return record?.route?.start_station?.name;
                    }
                },
                {
                    title: 'Số lượng nốt',
                    width: 100,
                    align: 'center',
                    render: (text, record) => {
                        return record?.node_a?.length;
                    }
                }
            ]
        },
        {
            title: 'Bến xuất phát chiều về',
            children: [
                {
                    title: 'Tên bến',
                    width: 200,
                    render: (text, record) => {
                        return record?.route?.end_station?.name;
                    }
                },
                {
                    title: 'Số lượng nốt',
                    width: 100,
                    align: 'center',
                    render: (text, record) => {
                        return record?.node_b?.length;
                    }
                }
            ]
        },
        {
            title: "Thao tác",
            width: 80,
            dataIndex: "active",
            fixed: "right",
            render: (text, record, row) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Tooltip placement="topLeft">
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                // onClick={() => onEdit(record?.id)}
                            />
                        </Tooltip>
                    </div>
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