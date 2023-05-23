import {
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Modal,
  TimePicker
} from "antd";
import { DefineTable } from "components";
import _ from "lodash"
import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
const format = 'HH:mm';
let inputTimer = null;
const { RangePicker } = DatePicker;
const Social = ({ className, data, itemTime, setItemTime, allRoute, setData, setTime, startDate, endDate }) => {

  function disableDateRanges(range = { startDate: true, endDate: false }) {
    const { startDate, endDate } = range;
    return function disabledDate(current) {
      let startCheck = true;
      let endCheck = true;
      if (startDate) {
        startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
      }
      if (endDate) {
        endCheck = current && current > moment(endDate, 'YYYY-MM-DD');
      }
      return (startDate && startCheck) || (endDate && endCheck);
    };
  }


  const _handleSelectAll = async (selected, selectedRows, changeRows) => {
    if (!selected) {
      setItemTime([])
    } else {
      if (data.length === itemTime.length) { // Trường hợp click vào xóa tất cả khi chưa full item
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

  const onChange = useCallback((id, nameColumn, e) => {
    let dataClone = _.cloneDeep(data);
    if (inputTimer) {
      clearTimeout(inputTimer);
    }

    if (nameColumn === 'start_date') {
      let startDate = e && e.length > 0 ? moment(e[0].startOf("day")) : undefined;
      let endDate = e && e.length > 0 ? moment(e[1].endOf("day")) : undefined;
      dataClone.find(p => p.id === id && (p.start_date = moment(startDate).format("YYYY-MM-DD"), true));
      dataClone.find(p => p.id === id && (p.end_date = moment(endDate).format("YYYY-MM-DD"), true));
      setData(dataClone)
      setTime(dataClone)
    }
    if (nameColumn === 'end_date') {
      dataClone.find(p => p.id === id && (p.end_date = moment(e).format("YYYY-MM-DD"), true));
      setData(dataClone)
      setTime(dataClone)
    }
    if (nameColumn === 'trip_number') {
      inputTimer = setTimeout(() => {
        dataClone.find(p => p.id === id && (p.trip_number = e, true));
        setData(dataClone)
        setTime(dataClone)
      }, 400);
    }
    if (nameColumn === 'status') {
      dataClone.find(p => p.id === id && (p.status = e.target.checked === true ? 1 : 0, true));
      setData(dataClone)
      setTime(dataClone)
    }
    if (nameColumn === 'start_date_stop') {
      let startDate = e && e.length > 0 ? moment(e[0].startOf("day")) : undefined;
      let endDate = e && e.length > 0 ? moment(e[1].endOf("day")) : undefined;
      dataClone.find(p => p.id === id && (p.start_date_stop = moment(startDate).format("YYYY-MM-DD"), true));
      dataClone.find(p => p.id === id && (p.end_date_stop = moment(endDate).format("YYYY-MM-DD"), true));
      setData(dataClone)
      setTime(dataClone)
    }
    if (nameColumn === 'note') {
      inputTimer = setTimeout(() => {
        dataClone.find(p => p.id === id && (p.note = e, true));
        setData(dataClone)
        setTime(dataClone)
      }, 400);
    }
  }, [data]);



  let columns = [
    {
      title: "Mã tuyến",
      width: 80,
      dataIndex: "merchant_route_id",
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
      dataIndex: "merchant_route_id",
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
      dataIndex: "start_date",
      width: 245,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "start_date"
        return (
          <RangePicker
            bordered={false}
            placeholder={["Từ", "Đến"]}
            style={{ width: '100%' }}
            allowClear={false}
            format={'DD-MM-YYYY'}
            onChange={(dates) => {
              onChange(id, nameColumn, dates)
            }}
          />
        )
      },
    },
    {
      title: "Số chuyến",
      dataIndex: "trip_number",
      width: 120,
      align: "center",
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "trip_number"
        return (
          <InputNumber bordered={false}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(e) => onChange(id, nameColumn, e)}
            defaultValue={text}
            placeholder="Chuyến..."
            style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }}
            addonAfter={<EditOutlined style={{ color: "#01579B" }} />} />
        )
      },
    },
    {
      title: "Thời gian",
      dataIndex: "departure_time",
      width: 100,
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'center' }}>{moment(text, 'HH:mm:ss').format("HH:mm")}</div>
        )
      },
    },
    {
      title: "Dừng",
      dataIndex: "status",
      width: 80,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "status"
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox onChange={(e) => { onChange(id, nameColumn, e) }} />
          </div>
        )
      },
    },
    {
      title: "Thời gian",
      dataIndex: "start_date_stop",
      width: 245,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "start_date_stop"
        return (
          <RangePicker
            bordered={false}
            placeholder={["Từ", "Đến"]}
            style={{ width: '100%' }}
            allowClear={false}
            format={'DD-MM-YYYY'}
            onChange={(dates) => {
              onChange(id, nameColumn, dates)
            }}
          />
        )
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 180,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "note"
        return (
          <Input bordered={false}
            onChange={(e) => onChange(id, nameColumn, e.target.value)}
            defaultValue={text}
            placeholder="Ghi chú..."
            style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }}
            suffix={<EditOutlined />} />
        )
      },
    },
  ];
  return (
    <div className={className}>
      <DefineTable
        bordered
        rowSelection={{
          selectedRowKeys: itemTime,
          onSelect: _handleSelect,
          onSelectAll: _handleSelectAll,
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        scroll={{ x: 'calc(700px + 10%)', y: 240 }}
        pagination={false}

      />
    </div>
  );
};

export default styled(Social)`
.customer {
  .anticon-plus-circle {
    font-size: 26px !important;
    color: green;
  }
}
.customerClose {
  .anticon-close-circle {
    font-size: 26px !important;
    color: red;
  }
}
.ant-input-number-group-addon {
  position: relative;
  padding: 0 11px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  background-color: transparent !important;
  border: 0px !important;
  transition: all 0.3s;
  border-radius: 0px !important;
}
.ant-input-number-handler-wrap { 
visibility: hidden !important;
}
`;
