import {
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Modal,
  TimePicker,
  message
} from "antd";
import { DefineTable } from "components";
import _ from "lodash"
import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import { station } from "configs";
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


  const onChange = useCallback((id, nameColumn, e) => {
    let payload = {
      id: id
    }
    if (nameColumn === 'start_date') {
      let startDate = e && e.length > 0 ? moment(e[0].startOf("day")) : undefined;
      let endDate = e && e.length > 0 ? moment(e[1].endOf("day")) : undefined;
      payload = { ...payload, start_date: moment(startDate).format("YYYY-MM-DD"), end_date: moment(endDate).format("YYYY-MM-DD") };
    }
    if (nameColumn === 'trip_number') {
      payload = { ...payload, trip_number: e };
    }
    if (nameColumn === 'status') {
      payload = { ...payload, status: e.target.checked === true ? 2 : 1 };
    }
    if (nameColumn === 'start_date_stop') {
      let startDate = e && e.length > 0 ? moment(e[0].startOf("day")) : undefined;
      let endDate = e && e.length > 0 ? moment(e[1].endOf("day")) : undefined;
      payload = { ...payload, start_date_stop: moment(startDate).format("YYYY-MM-DD"), end_date_stop: moment(endDate).format("YYYY-MM-DD") };
    }
    if (nameColumn === 'note') {
      payload = { ...payload, note: e };
    }
    if (inputTimer) {
      clearTimeout(inputTimer);
    }
    inputTimer = setTimeout(() => {
      station.updateTime(payload)
        .then(res => {
          if (res.status === 200) {
          }
        })
        .catch(err => {
          message.error("Có lỗi xảy ra !")
        })
    }, 500);

  }, [data]);



  let columns = [
    {
      title: "STT",
      width: 60,
      dataIndex: "id",
      fixed: 'left',
      render: (text, record, index) => {
        return {
          children: <div style={{textAlign:'center'}}>{index + 1}</div>,
        };
      },
    },
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
      dataIndex: "start_date",
      width: 245,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "start_date"
        return (
          <RangePicker
            bordered={false}
            placeholder={["Từ", "Đến"]}
            defaultValue={record.start_date !== null ? [moment(record.start_date), moment(record.end_date)] : ''}
            style={{ width: '100%' }}
            allowClear={false}
            format={'DD-MM-YYYY'}
            disabledDate={disableDateRanges({ startDate: moment(startDate).format("YYYY-MM-DD"), endDate: moment(endDate).format("YYYY-MM-DD") })}
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
            placeholder="Chuyến"
            style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }}
            addonAfter={<EditOutlined style={{ color: "#01579B" }} />} />
        )
      },
    },
    {
      title: "Thời gian",
      dataIndex: "node",
      width: 130,
      render: (text, record, index) => {
        const time = (text?.departure_time).substring(0, 5);
        return (
          <div style={{ textAlign: 'center' }}>{time}</div>
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
            <Checkbox defaultChecked={text?.value !== 1 ? true : false} onChange={(e) => { onChange(id, nameColumn, e) }} />
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
            allowClear={record?.status == 1 ? false : true}
            placeholder={["Từ", "Đến"]}
            defaultValue={record.start_date_stop !== null ? [moment(record.start_date_stop), moment(record.end_date_stop)] : ''}
            bordered={false}
            style={{ width: '100%' }}
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
