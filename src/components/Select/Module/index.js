/* eslint-disable react/prop-types */
import { Select, Spin, TreeSelect } from "antd";
import { users } from "configs";
import manage from "configs/manage";
import _ from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
const localSearchFunc = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
const Permission = memo(
    ({
        className,
        placeholder = "Chọn ",
        labelInValue = true,
        onChange,
        loadOnMount = true,
        typeSearch = "local",
        allowClear,
        ...props
    }) => {
        const [dataSource, setDataSource] = useState([]);
        const [fetching, setFetching] = useState(false);
        const [search, setSearch] = useState("");

        const _handleLoadData = useCallback(async () => {
            setFetching(true);
            const payload = {
                is_full : 1
            }
            manage.getModule(payload)
                .then(res => {
                    if (res.status === 200) {
                        const dataSet = []
                        _.map(res?.data?.data, (items) => {
                            dataSet.push({
                                value: items.id,
                                id: items.id,
                                title: items.name,
                                parent_id: items.parent_id,
                                children: _.map(items?.children, (item) => {
                                    return {
                                        value: item.id,
                                        id: item.id,
                                        title: item.name,
                                        parent_id: item.parent_id,
                                        // disabled: true,
                                        children: item.children.length !== 0 ? item.children : null
                                    }
                                })
                            });

                        })
                        setDataSource(dataSet);
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
            <TreeSelect
                {...props}
                // mode={mode}
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
                treeData={dataSource}
            >
            </TreeSelect>
        );
    }
);
export default styled(Permission)``;
