import { Button, Modal, Pagination, Row, Col, Select, Checkbox } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { COLOR_GREEN, COLOR_RED } from 'theme/colors';
import { Ui } from "utils/Ui";
let inputTimer = null;
const { confirm } = Modal;

const TableList = memo(({ className, params, addTime, allRoute, itemTime, setItemTime, onHiddenModal, setParams, onUpdate,isActive,setIsActive }) => {
    const onChange = (e) => {
        setIsActive(e.target.checked)
    };

    const _changeQuery = useCallback(
        (payload) => {
            if (inputTimer) {
                clearTimeout(inputTimer);
            }
            inputTimer = setTimeout(() => {
                setParams((prevState) => {
                    let nextState = { ...prevState };
                    nextState[payload.name] = payload.value;
                    return nextState;
                });
            }, 900);
        },
        [setParams]
    );

    const _handleSelectAll = async (selected, selectedRows, changeRows) => {
        if (!selected) {
            setItemTime([])
        } else {
            if (addTime.length === itemTime.length) { // Trường hợp click vào xóa tất cả khi chưa full item
                setItemTime([])
            } else {
                let selectKeyNew = [];
                await selectedRows.map((item) => {
                    selectKeyNew.push(item.id)
                })
                await setItemTime(selectKeyNew);
            }
        }
    }

    const _handleSelect = (record, status) => {
        if (!itemTime.includes(record.id)) {
            const selectKeyNew = [...itemTime]
            selectKeyNew.push(record.id)
            setItemTime(selectKeyNew)
        } else {
            const selectKeyNew = [...itemTime]
            const index = selectKeyNew.indexOf(record.id);
            selectKeyNew.splice(index, 1);
            setItemTime(selectKeyNew)
        }
    };

    const onChangeRoute = (value) => {
        if (value !== undefined)
            _changeQuery({ name: "route_id", value: value });
        else
            _changeQuery({ name: "route_id", value: '' });
    }


    const columns = [
        {
            title: "Mã tuyến",
            width: 80,
            dataIndex: "route_id",
            fixed: 'left',
            render: (text, record, index) => {
                const name = allRoute.find(item => item?.id === text)?.route_code;
                return {
                    children: <div>{name}</div>,
                };
            },
        },
        {
            title: "Tên tuyến",
            dataIndex: "route_id",
            width: 160,
            render: (text, record, index) => {
                const name = allRoute.find(item => item?.id === text)?.name;
                return {
                    children: <div>{name}</div>,
                };
            },
        },
        {
            title: "Thời gian",
            dataIndex: "departure_time",
            width: 100,
            render: (text, record, index) => {
                const time = (record?.departure_time).substring(0, 5);
                return (<div style={{textAlign:'center'}}>{time}</div>)
            },
        },
    ];

    return (
        <div className={className}>
            <Row gutter={[16, 16]} style={{marginBottom:10}}>
                <Col span={10}>
                    <div>Tuyến</div>
                    <Select
                        showSearch
                        placeholder="Tuyến"
                        optionFilterProp="children"
                        allowClear
                        style={{ width: '100%' }}
                        onChange={onChangeRoute}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={allRoute}
                    />
                </Col>
                <Col span={10}>
                    <div>Biển kiểm sát</div>
                    <Select
                        showSearch
                        placeholder="Tuyến"
                        optionFilterProp="children"
                        allowClear
                        style={{ width: '100%' }}
                        onChange={onChangeRoute}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={allRoute}
                    />
                </Col>
                <Col span={4}>
                        <div style={{ marginTop: 25 }}>
                            <Checkbox onChange={onChange} />&nbsp; Trùng lặp
                        </div>
                    </Col>
            </Row>
            <DefineTable
                rowSelection={{
                    selectedRowKeys: itemTime,
                    onSelect: _handleSelect,
                    onSelectAll: _handleSelectAll,
                }}
                rowKey="id"
                columns={columns}
                dataSource={addTime}
                scroll={{ y: "calc(100vh - 330px)" }}
                pagination={false}
            />

            <div
                className="action"
                style={{
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    padding: "10px 0px",
                    background: "#fff",
                    textAlign: "left",
                }}
            >
                <Button style={{ backgroundColor: '#9B0101', color: '#fff', borderRadius: 6, height: 35, width: 120 }} onClick={onHiddenModal}>
                    Huỷ
                </Button>
                <Button style={{ borderRadius: 6, height: 35, width: 120, backgroundColor: '#01579B', color: '#fff', marginLeft: 20 }} onClick={()=>onUpdate(itemTime)}>
                    Cập nhật
                </Button>

            </div>

        </div >
    );
});
TableList.propTypes = {
    className: PropTypes.any,
};
export default styled(TableList)`
  
`;
