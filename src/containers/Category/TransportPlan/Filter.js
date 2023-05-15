import React, { useCallback } from 'react';
import PropTypes from "prop-types";
import _ from "lodash"
import styled from "styled-components";
import { Col, Row, Select } from 'antd';

let inputTimer = null;

const Filter = ({ className, allRoute, setParams, params, stations }) => {

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

    const onChangeRoute = (value) => {
        if (value !== undefined)
            _changeQuery({ name: "route_id", value: value });
        else
            _changeQuery({ name: "route_id", value: '' });
    }

    const onChangeStartStation = (value) => {
        if (value !== undefined)
            _changeQuery({ name: "start_station_id", value: value });
        else
            _changeQuery({ name: "start_station_id", value: '' });
    }


    const onChangeEndStation = (value) => {
        if (value !== undefined)
            _changeQuery({ name: "end_station_id", value: value });
        else
            _changeQuery({ name: "end_station_id", value: '' });
    }


    return (
        <div className={className}>
            <Row gutter={[8, 8]}>
                <Col span={4}>
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
                <Col span={4}>
                    <div>Bến đi</div>
                    <Select
                        showSearch
                        placeholder="Bến đi"
                        optionFilterProp="children"
                        allowClear
                        style={{ width: '100%' }}
                        onChange={onChangeStartStation}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={stations}
                    />
                </Col>
                <Col span={4}>
                    <div>Bến đến</div>
                    <Select
                        showSearch
                        placeholder="Bến đến"
                        optionFilterProp="children"
                        allowClear
                        style={{ width: '100%' }}
                        onChange={onChangeEndStation}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={stations}
                    />
                </Col>
            </Row>
        </div>
    );
};

Filter.propTypes = {
    className: PropTypes.any,
};
export default styled(Filter)`
    .btn-add {
      background-color: #01579B;
      color: #fff;
      border-radius: 3px;
      border-color: #01579B;
    }
  `;