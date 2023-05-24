import {
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Modal,
  message,
  TimePicker
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
const Social = ({ className, data, allRoute,startDate, endDate }) => {

  function disableDateRanges(range = { startDate: false, endDate: false }) {
    const { startDate, endDate } = range;
    return function disabledDate(current) {

      let startCheck = true;
      let endCheck = true;
      if (startDate) {
        startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
      }
      if (endDate) {
        endCheck = current && moment(current).add(1, 'days') > moment(endDate, 'YYYY-MM-DD');
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
    if (nameColumn === 'service_price') {
      payload = { ...payload, service_price: e };
    }
    if (nameColumn === 'is_fixed_time') {
      payload = { ...payload, is_fixed_time: e.target.checked === true ? 1 : 0 };
    }
    if (nameColumn === 'fixed_time') {
      payload = { ...payload, fixed_time: moment(e).format("HH:mm") };
    }
    if (nameColumn === 'status') {
      payload = { ...payload, status: e.target.checked === true ? 2 : 1 };
    }
    if (nameColumn === 'start_date_stop') {
      let startDate = e && e.length > 0 ? moment(e[0].startOf("day")) : undefined;
      let endDate = e && e.length > 0 ? moment(e[1].endOf("day")) : undefined;
      payload = { ...payload, start_date_stop: moment(startDate).format("YYYY-MM-DD"), end_date_stop: moment(endDate).format("YYYY-MM-DD") };
    }
    if (nameColumn === 'is_associate_commerce') {
      payload = { ...payload, is_associate_commerce: e.target.checked === true ? 1 : 0};
    }
    if (nameColumn === 'note') {
      payload = { ...payload, note: e };
    }
    if (nameColumn === 'is_pay_later') {
      payload = { ...payload, is_pay_later: e.target.checked === true ? 1 : 0 };
    }
    if (inputTimer) {
      clearTimeout(inputTimer);
    }
    inputTimer = setTimeout(() => {
      station.updateCar(payload)
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
      width: 80,
      dataIndex: "route_id",
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
      title: "BKS",
      dataIndex: "vehicle",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.license_plate}</div>,
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
      title: "Số ghế",
      dataIndex: "vehicle",
      width: 100,
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'center' }}>{text?.number_seat}</div>
        )
      },
    },
    {
      title: "Loại ghế",
      dataIndex: "vehicle",
      width: 100,
      render: (text, record, index) => {
        return (<div style={{ textAlign: 'center' }}>{text?.seat_type?.name}</div>)
      },
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "service_price",
      width: 150,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "service_price"
        return (
          <InputNumber bordered={false}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(e) => onChange(id, nameColumn, e)}
            defaultValue={text}
            placeholder="Giá"
            style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }}
            addonAfter={<EditOutlined style={{ color: "#01579B" }} />} />
        )
      },
    },
    {
      title: "Giờ cố định",
      dataIndex: "is_fixed_time",
      width: 80,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "is_fixed_time"
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox defaultChecked={text?.value} onChange={(e) => { onChange(id, nameColumn, e) }} />
          </div>
        )
      },
    },
    {
      title: "Thời gian",
      dataIndex: "fixed_time",
      width: 130,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "fixed_time"
        return (
          <TimePicker
            allowClear={record?.is_fixed_time == 1 ? false : true}
            defaultValue={text !== null ? moment(text, format) : ''}
            format={format}
            bordered={false}
            style={{ width: '100%' }}
            onOk={(time) => {
              onChange(id, nameColumn, time)
            }}
          />
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
            <Checkbox defaultChecked={text?.value!==1?true:false} onChange={(e) => { onChange(id, nameColumn, e) }} />
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
      title: "Hiệp thương",
      dataIndex: "is_associate_commerce",
      width: 80,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "is_associate_commerce"
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox defaultChecked={text?.value} onChange={(e) => { onChange(id, nameColumn, e) }} />
          </div>
        )
      },
    },
    {
      title: "Mã hiệp thương",
      dataIndex: "associate_commerce_id",
      width: 80,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "associate_commerce_id"
        return (<div style={{ textAlign: 'center' }}>2</div>
          // <Input bordered={false}
          //   onChange={(e) => onChange(id, nameColumn, e)}
          //   defaultValue={text}
          //   placeholder="Hiệp thương"
          //   style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }}
          //   suffix={<EditOutlined />} />
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
            placeholder="Ghi chú"
            style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }}
            suffix={<EditOutlined />} />
        )
      },
    },
    {
      title: "Trả sau",
      dataIndex: "is_pay_later",
      width: 80,
      render: (text, record, index) => {
        const id = record.id
        const nameColumn = "is_pay_later"
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox defaultChecked={text?.value} onChange={(e) => { onChange(id, nameColumn, e) }} />
          </div>
        )
      },
    },
    // {
    //   title: "Thao tác",
    //   dataIndex: "otp",
    //   width: 110,
    //   fixed: 'right',
    //   render: () => {
    //     return <div style={{ textAlign: 'center', justifyContent: 'center', }}>
    //       <Dropdown overlay={menu} >
    //         <a>
    //           <i class="fa-solid fa-ellipsis"></i>
    //         </a>
    //       </Dropdown>
    //     </div>
    //   }
    // },
  ];
  return (
    <div className={className}>
      <DefineTable
        bordered
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
