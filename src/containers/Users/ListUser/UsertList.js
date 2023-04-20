import {
    CheckOutlined, CloseOutlined, EditOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Modal, Pagination, Row, Space, Switch, Tag, Tooltip } from "antd";
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
const UsertList = memo(({ className, data, params, total, setTotal, setParams, onEdit, onRefreshList, onChangeP }) => {
    const onChange = async (e, value, row) => {
        const payload = {
            uuid: row?.id
        }
        users.lockUser(payload)
            .then(res => {
                if (res.status === 200) {
                    Ui.showSuccess({ message: "Thay đổi trạng thái thành công" });
                    onRefreshList()
                }
            })
            .catch(err => {
                Ui.showError({ message: err?.response?.data?.message });
            })
    };

    const onActive = (e, value, row) => {
        let name = ''
        if (e == false) {
            name = 'Bạn muốn bỏ active tài khoản này không?'
        } else {
            name = 'Bạn muốn active tài khoản này không?'
        }
        confirm({
            title: `Thông báo`,
            icon: <ExclamationCircleOutlined />,
            content: `${name}`,
            okText: "Có",
            cancelText: "Không",
            onOk() {
                onChange(e, value, row);
            },
            onCancel() { },
        });
    };



    const columns = [
        {
            title: "#",
            dataIndex: "index",
            width: 60,
            fixed: "left",
            align: 'center',
            render: (value, row, index) => {
                const stringIndex = `${((params.page - 1) * params.limit + index)}`;
                return (
                    <h5 style={{ textAlign: 'center' }}>{params.page === 1 ? index + 1 : parseInt(stringIndex) + 1}</h5>
                );
            },
        },
        {
            title: "Họ tên",
            dataIndex: "full_name",
            width: 150,
        },
        {
            title: "Tên hiển thị",
            dataIndex: "username",
            width: 150,
            render: (value) => <div>{value}</div>
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            width: 150,
            render: (value) => <div>{value}</div>
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 180,
        },
        {
            title: "CCCD",
            dataIndex: "citizen_identity",
            width: 120,
        },
        {
            title: "Loại tài khoản",
            dataIndex: "roles",
            width: 250,
            render: (text, record) => (
                <>
                    {_.map(text, (i) => {
                        return (
                            <Tag>{i.name}</Tag>
                        )
                    })}
                </>
            )
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            width: 120,
            render: (text, record) => (
                <span>{moment(text).format("DD-MM-YYYY HH:mm")}</span>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "is_active",
            render: (value, row) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Switch
                            onChange={(e) => onActive(e, value?.id, row)}
                            checked={value?.id == 1 ? true : false}
                            size='small'
                        />
                    </div>
                )
            },
            width: 120,
        },
        {
            title: "Thao tác",
            width: 100,
            dataIndex: "action",
            render: (record, value, row) => {
                const ids = value.id
                const values = value.status
                return (
                    <div style={{ textAlign: 'center',display:'flex' }}>
                        <Button
                            type="link"
                            onClick={() => onEdit(ids)}
                        >
                            <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
                        </Button>
                        <Tooltip placement="topLeft" title="Đổi mật khẩu">
                            <Button
                                type="link"
                                onClick={() => onChangeP(ids)}
                            >
                                <i class="fas fa-key" style={{ color: '#01579B', fontSize: 20 }} />
                            </Button>
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
                    onShowSizeChange={(current, per_page) => {
                        setParams((prevState) => {
                            let nextState = { ...prevState };
                            nextState.page = 1;
                            nextState.per_page = per_page;
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
                    pageSize={params.per_page}
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
                pagination={false}
                scroll={{ y: "calc(100vh - 330px)" }}
            />
            {renderContent()}
        </div >
    );
});
UsertList.propTypes = {
    className: PropTypes.any,
};
export default styled(UsertList)`
  
`;
