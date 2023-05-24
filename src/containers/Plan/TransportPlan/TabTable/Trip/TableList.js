import { Modal, message, Popconfirm, Input, TimePicker, Button, Col, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import { category, plan } from "configs";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import _ from "lodash"
import moment from "moment";
import styled from "styled-components";
import { Ui } from "utils/Ui";
const format = 'HH:mm';
const { confirm } = Modal;
let inputTimer = null;
const TableList = ({ className, data, setData, params, total, itemSelected, onTripPlan }) => {


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

    const cancel = (e) => {
    };

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

    const onConfirm = (row) => {
        onDelRow(row)
    };



    const onDelRow = async (row) => {
        // console.log(row);
        const departure_time = row?.departure_time.slice(0, 5);
        const payload = {
            direction_id: row?.direction?.id,
            depature_time: departure_time,
            merchant_route_id: row?.id
        }
        // console.log(payload);
        plan.deleteAssignTime(payload).then(res => {
            if (res.status === 200) {
                let dataClone = _.cloneDeep(data);
                setData(dataClone.filter(item => item.id !== row?.id));
            }
        }).catch(err => {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                message.error('Error!')
            }
        })
    };

    const renderItem = (item) => {
        switch (item) {
            case 1:
                return 'Thứ 2'
                break;
            case 2:
                return 'Thứ 3'
                break;
            case 3:
                return 'Thứ 4'
                break;
            case 4:
                return 'Thứ 5'
                break;
            case 5:
                return 'Thứ 6'
                break;
            case 6:
                return 'Thứ 7'
                break;
            case 7:
                return 'Chủ nhật'
                break;

            default:
                break;
        }
    }

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
                // console.log(record);
                // const newRecordSchedule = record?.schedule && [...record?.schedule].sort((a, b) =>
                //     a > b ? 1 : -1
                // );

                return (
                    <div style={{ display: 'flex' }}>
                        <Col style={{ display: 'flex', alignItems: 'center' }} span={23}>
                            {record?.type_apply?.id == 1 &&
                                <div>
                                    {record?.type_apply?.name} {record?.schedule && '-'} {record?.schedule?.map((item, index) => {

                                        return item + (index == (record?.schedule.length - 1) ? '' : ', ');
                                    })}
                                </div>
                            }
                            {record?.type_apply?.id == 2 &&
                            <div>
                                {record?.type_apply?.name} {record?.schedule && '-'} {record?.schedule?.map((item, index) => {

                                    return renderItem(item) + (index == (record?.schedule.length - 1) ? '' : ', ');
                                })}
                            </div>
                            }
                        </Col>
                        <Popconfirm
                            title="Chắc chắn xoá ?"
                            onConfirm={() => onConfirm(record)}
                            onCancel={cancel}
                            style={{ justifyContent: 'end' }}
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
                                type="link"
                                onClick={() => onTripPlan(record)}
                            >
                                <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
                            </Button>
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
