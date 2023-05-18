import { Checkbox, Spin, Select, message } from "antd";
import PropTypes from "prop-types";
import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import _ from "lodash";
import { AgencyGroupNameCode } from "components";
import { command } from "configs";
const localSearchFunc = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const ItemRow = memo(({ className, nameColumn, values,setItemSelected, record, data, onRefreshList, typeSearch = "local",loading }) => {

    const [loadding, setLoadding] = useState(false);
    const valuedefault = (nameColumn) => {
        if (nameColumn === 'vehicle') {
            return values?.license_plate
        } else {
            if (values?.first_name !== undefined && values?.last_name !== undefined) {
                return values?.first_name + " " + values?.last_name
            }
        }
    }



    const onChange = async (value) => {
        let payload = {}

        const ids = {
            id: record?.id
        }
        const vehicle = {
            vehicle_id: value !== undefined ? value : null
        }
        const first_driver = {
            first_driver_id: value !== undefined ? value : null
        }
        const second_driver = {
            second_driver_id: value !== undefined ? value : null
        }
        const third_driver = {
            third_driver_id: value !== undefined ? value : null
        }
        const attendant = {
            attendant_id: value !== undefined ? value : null
        }

        if (nameColumn === 'vehicle') {
            payload = Object.assign(ids, vehicle);
        } else if (nameColumn === 'first_driver') {
            payload = Object.assign(ids, first_driver);
        }
        else if (nameColumn === 'second_driver') {
            payload = Object.assign(ids, second_driver);
        }
        else if (nameColumn === 'third_driver') {
            payload = Object.assign(ids, third_driver);
        }
        else if (nameColumn === 'attendant') {
            payload = Object.assign(ids, attendant);
        }
        else if (nameColumn === 'first_driver') {
            payload = Object.assign(ids, first_driver);
        }
        setLoadding(true)
        command.updateCommand(payload)
            .then(res => {
                if (res.status === 200) {
                    message.success('Thành công !')
                    onRefreshList()
                    setLoadding(false)
                    setItemSelected([])
                }
            })
            .catch(err => {
                message.error('Có lỗi xảy ra !')
            })

    };


    const renderPlaceHoder = (nameColumn) => {
        switch (nameColumn) {
            case 'vehicle':
                return "Xe"
            case 'first_driver':
                return "Lái xe 1"
            case 'second_driver':
                return "Lái xe 2"
            case 'third_driver':
                return "Lái xe 3"
            case 'attendant':
                return "Tiếp viên"
            default: return null;
        }
    }

    return (
        <Spin spinning={loadding}>
            <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                value={data.length === 0 ? valuedefault(nameColumn) : values?.id}
                className={className}
                data={data}
                bordered={false}
                placeholder={renderPlaceHoder(nameColumn)}
                filterOption={typeSearch === "local" ? localSearchFunc : false}
                onChange={(data) => {
                    onChange(data)
                }}
                notFoundContent={loading ? <Spin size="small" /> : "Không có dữ liệu"}
                optionLabelProp="label"
            >
                {
                    _.map(data, (i) => {
                        return (
                            <Select.Option value={i.value} label={i.label}>{i.label}</Select.Option>
                        )
                    })
                }
            </Select>
        </Spin>
    );
});
ItemRow.propTypes = {
    className: PropTypes.any,
};
export default styled(ItemRow)``;
