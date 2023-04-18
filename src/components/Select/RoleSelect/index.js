/* eslint-disable react/prop-types */
import React, { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Select, Spin } from "antd";
import ServiceBase from "utils/ServiceBase";
import _ from "lodash";
import { Ui } from "utils/Ui";
import axios from 'axios';
import roles from "configs/roles";
const localSearchFunc = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
const AgencyRoleSelect = memo(
    ({
        className,
        placeholder = "Chọn quyền đại lý",
        labelInValue = true,
        onChange,
        loadOnMount = true,
        typeSearch = "local",
        allowClear,
        mode = "multiple",
        ...props
    }) => {
        const [dataSource, setDataSource] = useState([]);
        const [fetching, setFetching] = useState(false);
        const [search, setSearch] = useState("");

        // Handlers

        /**
         * Handler Lấy dữ liệu
         */
        const _handleLoadData = useCallback(async () => {
            setFetching(true);
            roles.getRoles()
            .then(res => {
              if (res.status === 200) {
                setDataSource(res?.data?.data);
              }
            })
            .catch(err => {
              Ui.showError({ message: err?.response?.data?.message });
            })
            setFetching(false);
        }, [setDataSource, search]);
       
        const _handleOnChange = useCallback(
            (data) => {
                onChange(data);
            },
            [onChange]
        );

       
        const _handleSearch = useCallback((input) => {
            setTimeout(() => {
                setSearch(input || "");
            }, 666000)
        }, []);
        
        useEffect(() => {
            if (loadOnMount) {
                _handleLoadData(search);
            }
        }, [_handleLoadData, loadOnMount, search]);
        return (
            <Select
                {...props}
                mode={mode}
                allowClear={allowClear}
                style={{ width: "100%" }}
                showSearch
                placeholder={placeholder}
                labelInValue={labelInValue}
                className={className}
                filterOption={typeSearch === "local" ? localSearchFunc : false}
                loading={fetching}
                notFoundContent={fetching ? <Spin size="small" /> : "Không có dữ liệu"}
                onChange={_handleOnChange}
                onSearch={_handleSearch}
                onFocus={typeSearch === "local" ? null : _handleSearch}
            >
                {_.map(dataSource, (item, itemId) => (
                    <Select.Option key={itemId} value={item.id}>
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        );
    }
);
export default styled(AgencyRoleSelect)``;
