import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Pagination, Row, Table, Tooltip } from 'antd';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import DefineTable from 'components/DefineTable';
import { EditOutlined } from '@ant-design/icons';

const TableList = ({ className, data, params, setParams, onEdit, onRefreshList, setTotal, total }) => {

    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            width: 60,
            fixed: "left",
            align: 'center',
            render: (value, row, index) => {
                const stringIndex = `${((params.page - 1) * params.size + index)}`;
                return (
                    <h5 style={{ textAlign: 'center' }}>{params.page === 1 ? index + 1 : parseInt(stringIndex) + 1}</h5>
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
                                style={{ width: '100%' }}
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => onEdit(record?.id)}
                            />
                        </Tooltip>
                    </div>
                )
            }
        }
    ];

    const renderContent = () => {
        return (
            <Row justify="end" style={{ marginBottom: 5, marginTop: 5 }}>
                <Pagination
                    onShowSizeChange={(current, size) => {
                        setParams((prevState) => {
                            let nextState = { ...prevState };
                            nextState.page = 1;
                            nextState.size = size;
                            return nextState;
                        });
                    }}
                    onChange={(page, pageSize) => {
                        setParams((prevState) => {
                            let nextState = { ...prevState };
                            nextState.page = page;
                            return nextState;
                        });
                    }}
                    total={total}
                    current={params.page}
                    pageSize={params.size}
                    showSizeChanger
                />
            </Row>
        );
    };

    return (
        <div className={className}>
            <DefineTable
                columns={columns}
                dataSource={data}
                scroll={{ y: "calc(100vh - 330px)" }}
                pagination={false}
            />
            {renderContent()}
        </div>
    );
};

TableList.propTypes = {
    className: PropTypes.any,
};
export default styled(TableList)`
  
  `;
