import { Modal, message, Popconfirm, Input, TimePicker, Button, Col, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import { category } from "configs";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import _ from "lodash"
import moment from "moment";
import styled from "styled-components";
const format = 'HH:mm';
const { confirm } = Modal;
let inputTimer = null;
const TableList = ({ className, data, setData, params, total, itemSelected }) => {


    // const onAdd = () => {
    //     let dataClone = _.cloneDeep(data);
    //     const idCheck = dataClone.find(item => item.id === 'h71012');
    //     if (idCheck) {
    //         message.error('Vui lòng nhập điểm trả !')
    //     } else {
    //         dataClone.push({
    //             id: 'h71012',
    //             direction_id: 1,
    //             name: '',
    //         });
    //         setData(dataClone);
    //     }
    // }
    // const onPush = useCallback((name) => {
    //     const payload = {
    //         direction_id: 1,
    //         name: name,
    //         uuid: itemSelected?.id
    //     }
    //     if (inputTimer) {
    //         clearTimeout(inputTimer);
    //     }
    //     inputTimer = setTimeout(() => {
    //         category.updatePlace(payload)
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     let dataClone = _.cloneDeep(data);
    //                     dataClone.find(item => item.id === 'h71012' && (item.name = res?.data?.data?.name, item.id = res?.data?.data?.id));
    //                     setData(dataClone)
    //                 }
    //             })
    //             .catch(err => {
    //                 if (err.response?.data) {
    //                     message.error(err.response?.data?.message)
    //                 }
    //             })
    //     }, 2000);
    // }, [data]);

    // const cancel = (e) => {
    // };

    // const onUpdate = useCallback(async (name, row) => {
    //     const payload = {
    //         id: row?.id,
    //         direction_id: 1,
    //         name: name,
    //         uuid: itemSelected?.id
    //     }
    //     if (inputTimer) {
    //         clearTimeout(inputTimer);
    //     } inputTimer = setTimeout(() => {
    //         category.updatePlace(payload)
    //             .then(res => {
    //                 let dataClone = _.cloneDeep(data);
    //                 dataClone.find(item => item.id === res?.data?.data?.id && (item.name = res?.data?.data?.name, true));
    //                 setData(dataClone)
    //             })
    //             .catch(err => {
    //                 if (err.response?.data) {
    //                     message.error(err.response?.data?.message)
    //                 }
    //             })
    //     }, 2000);
    // }, [data]);

    // const onConfirm = (ids) => {
    //     onDelRow(ids)
    // };



    // const onDelRow = async (ids) => {
    //     const payload = {
    //         id: ids,
    //     }
    //     category.delPlace(payload)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 let dataClone = _.cloneDeep(data);
    //                 setData(dataClone.filter(item => item.id !== ids));
    //             }
    //         })
    //         .catch(err => {
    //             if (err.response?.data) {
    //                 message.error('Error!')
    //             }
    //         })
    // };

    const columns = [
        {
            title: 'Nốt',
            dataIndex: 'departure_time',
            width: 80,
            render: (text, record) => {
                return text.slice(0, 5);
            }
        },
        {
            title: "Kế hoạch",
            dataIndex: "name",
            render: (text, record) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <Col style={{ display: 'flex', alignItems: 'center' }} span={23}>
                            <div>
                                {record?.type_apply?.name} {record?.schedule && '-'} {record?.schedule?.map((item, index) => {

                                    return item + (index == (record?.schedule.length - 1) ? '' : ', ');
                                })}
                            </div>
                        </Col>
                        <Popconfirm
                            title="Chắc chắn xoá ?"
                            // onConfirm={() => onConfirm(ids)}
                            // onCancel={cancel}
                            style={{ justifyContent: 'end' }}
                            okText="Xoá"
                            placement="topLeft"
                            cancelText="Huỷ"
                        >
                            <a>
                                <i class="fa fa-times-circle-o" style={{ fontSize: 18, color: 'red', cursor: 'pointer', marginTop: 11 }} ></i>
                            </a>
                        </Popconfirm>
                    </div>
                );
            }
        },
        {
            title: "Sửa",
            width: 80,
            dataIndex: "active",
            // fixed: "right",
            render: (text, record, row) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Tooltip placement="topLeft">
                            <Button
                                style={{ width: '100%' }}
                                type="link"
                                icon={<EditOutlined />}
                            // onClick={() => onEdit(record?.id)}
                            />
                        </Tooltip>
                    </div>
                )
            }
        },
    ];

    return (
        <div className={className}>
            <DefineTable
                columns={columns}
                bordered
                dataSource={data}
                rowKey="id"
                border
                pagination={false}
            />

        </div >
    );
};

TableList.propTypes = {
    className: PropTypes.any,
};
export default styled(TableList)`
.ant-table-thead > tr > th {
  background: #fff !important;
  color: #000 !important;
  font-family: 'Nunito' !important;
//   font-weight: 700 !important;
  font-size: 16px !important;
}
.ant-table-thead > tr > th {
 border-bottom: 1px solid #f0f0f0 !important; 
 border-right: 1px solid #f0f0f0 !important; 
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td {
  line-height: 35px !important;
  color: #000 !important;
  font-size: 14px;
//   font-weight: 700;
  font-family: 'Nunito' !important;
  text-align: center !important;
}
.ant-input-affix-wrapper > .ant-input {
font-size: inherit;
border: none;
outline: none;
color: #000 !important;
font-size: 14px;
// font-weight: 700;
font-family: 'Nunito' !important;
}
.anticon svg {
display: inline-block;
color: #01579B !important;
}
`;
