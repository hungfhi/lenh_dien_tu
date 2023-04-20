/* eslint-disable react/prop-types */
import { Select, Spin } from "antd";
import { users } from "configs";
import _ from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
const localSearchFunc = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
const Permission = memo(
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

        const _handleLoadData = useCallback(async () => {
            setFetching(true);
            users.getPermissions()
                .then(res => {
                    if (res.status === 200) {
                        // _.map(res.data.data, (items) => {
                        //         _.map(items?.permissions, (item) => {
                        //             data.push({
                        //                 id: item.slug,
                        //                 name: item?.name,
                        //             }) 
                        //         })
                        //     })

                        const dataSet = []
                        _.map(res?.data?.data, (items) => {
                            dataSet.push({
                                value: items.id,
                                id: items.id,
                                label: items.name,
                                options: _.map(items?.permissions, (item) => {
                                    return {
                                        value: item.slug,
                                        id: item.slug,
                                        label: item.name,
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
            <Select
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
                options={dataSource}
            > </Select>
        );
    }
);
export default styled(Permission)``;
