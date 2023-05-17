import { Checkbox, Spin, Select } from "antd";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import _ from "lodash";
import { AgencyGroupNameCode } from "components";
const localSearchFunc = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const ItemRegionSelect = memo(({ className, nameColumn, values, record, data, onRefreshList, groupA, typeSearch = "local" }) => {

    // const [valueRegion, setValueRegion] = useState({
    //     key: values && values?.id,
    //     label: values && values?.name
    // });
    const valuedefault = values?.id;
    const [valueRegion, setValueRegion] = useState(valuedefault)

    const [loadding, setLoadding] = useState(false);
    const onChange = async (value) => {
        const params = {
            ids: record.id,
            rank_id: value
        };
        setLoadding(true);

    };


    const renderPlaceHoder = (nameColumn) => {
        switch (nameColumn) {
            case 'xe':
                return "Xe"
            case 'lx1':
                return "Lái xe 1"
            case 'lx2':
                return "Lái xe 2"
            case 'lx3':
                return "Lái xe 3"
            case 'tv':
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
                value={valueRegion} 
                className={className}
                data={data}
                bordered={false}
                placeholder={renderPlaceHoder(nameColumn)}
                filterOption={typeSearch === "local" ? localSearchFunc : false}
                onChange={(data) => {
                    onChange(data)
                }}
                optionLabelProp="label"
            >
                {
                    _.map(data, (i) => {
                        return (
                            <Select.Option value={i.id || i.key} label={i.name || i.label}>{i.name || `${i.first_name} ${i.last_name}`}</Select.Option>
                        )
                    })
                }
            </Select>
        </Spin>
    );
});
ItemRegionSelect.propTypes = {
    className: PropTypes.any,
};
export default styled(ItemRegionSelect)``;
