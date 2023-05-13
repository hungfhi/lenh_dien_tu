import { Modal, message, Popconfirm, Switch, TimePicker } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import { category } from "configs";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import _ from "lodash"
import moment from "moment";
import styled from "styled-components";
const format = 'HH:mm';
const { confirm } = Modal;
const RouterStart = memo(({ className, data, setData, params, total, itemSelected }) => {


  const onAdd = async () => {
    let dataClone = _.cloneDeep(data);
    const idCheck = dataClone.find(item => item.id === 'h71012');
    if(idCheck){
      message.error('Vui lòng chọn giờ xuất bến !')
    }
    else {
      dataClone.push({
        id: 'h71012',
        direction_id: 1,
        departure_time: '',
        is_active: 1,
      });
    }
    
    setData(dataClone);
  }
  const onPush = async (time) => {
    const payload = {
      direction_id: 1,
      departure_time: moment(time).format("HH:mm"),
      is_active: 1,
      id: itemSelected?.id
    }
    category.updateTime(payload)
      .then(res => {
        if (res.status === 200) {
          let dataClone = _.cloneDeep(data);
          dataClone.find(item => item.id === 'h71012' && (item.departure_time = res?.data?.data?.departure_time, item.id = res?.data?.data?.id));
          setData(dataClone)
        }
      })
      .catch(err => {
        if (err.response?.data) {
          message.error(err.response?.data?.message)
        }
      })
  };

  const cancel = (e) => {
  };

  const onUpdateTime = useCallback(async (row, time) => {
    const payload = {
      id: itemSelected?.id,
      direction_id: 1,
      departure_time: moment(time).format("HH:mm"),
      is_active: row?.is_active,
      merchant_route_node_id: row?.id
    }
    category.updateTime(payload)
      .then(res => {
        let dataClone = _.cloneDeep(data);
        dataClone.find(item => item.id === res?.data?.data?.id && (item.departure_time = res?.data?.data?.departure_time, true));
        setData(dataClone)
      })
      .catch(err => {
        if (err.response?.data) {
          message.error(err.response?.data?.message)
        }
      })
  }, [data]);

  const onConfirm = (ids) => {
    onDelRow(ids)
  };



  const onDelRow = async (ids) => {
    const payload = {
      id: ids,
      direction_id: 1,
      merchant_route_id: itemSelected?.id
    }
    category.delTime(payload)
      .then(res => {
        if (res.status === 200) {
          let dataClone = _.cloneDeep(data);
          setData(dataClone.filter(item => item.id !== ids));
        }
      })
      .catch(err => {
        if (err.response?.status === 422 && err.response?.data?.errors) {
          message.error('Error!')
        }
      })
  };


  const onActive = (e, value, row) => {

    let name = ''
    if (e == false) {
      name = 'Bạn muốn bỏ không?'
    } else {
      name = 'Bạn muốn active không?'
    }
    confirm({
      title: `Thông báo`,
      icon: <ExclamationCircleOutlined />,
      content: `${name}`,
      okText: "Có",
      cancelText: "Không",
      onOk() {
        onChange(e, value, row);
      },
      onCancel() { },
    });
  };

  const onChange = async (e, value, row) => {
    const payload = {
      id: itemSelected?.id,
      direction_id: 1,
      departure_time: moment(row?.departure_time,'HH:mm:ss').format("HH:mm"),
      is_active: row?.is_active === 1 ? 0 : 1,
      merchant_route_node_id: row?.id
    }
    category.updateTime(payload)
      .then(res => {
        let dataClone = _.cloneDeep(data);
        dataClone.find(item => item.id === res?.data?.data?.id && (item.is_active = res?.data?.data?.is_active, true));
        setData(dataClone)
      })
      .catch(err => {
        if (err.response?.data) {
          message.error(err.response?.data?.message)
        }
      })
  };



  const columns = [
    {
      title: "Danh sách giờ xuất bến",
      dataIndex: "departure_time",
      render: (value, row) => {
        return <TimePicker
          allowClear={false}
          value={value != "" ? moment(value, format) : ""}
          format={format}
          bordered={false}
          style={{ width: '100%' }}
          onOk={(time) => {
            if (row?.id === 'h71012') {
              onPush(time)
            } else {
              onUpdateTime(row, time)
            }
          }}
        />
      }
    },
    {
      title: "Active",
      dataIndex: "is_active",
      width: 120,
      render: (value, row) => {
        return <div style={{ textAlign: 'center' }}><Switch size="small" disabled={row?.id === 'h71012' ? true : false} checked={value} onChange={(e) => onActive(e, value, row)}></Switch></div>
      }
    },
    {
      title: () => (
        <>
          <i class="fa-solid fa-circle-plus" style={{ fontSize: 20, marginTop: 5, cursor: 'pointer' }} onClick={onAdd}></i>
        </>
      ),
      dataIndex: "otp",
      width: 100,
      render: (value, row) => {
        const ids = row?.id
        return (
          <Popconfirm
            title="Chắc chắn xoá ?"
            onConfirm={() => onConfirm(ids)}
            onCancel={cancel}
            okText="Xoá"
            placement="topLeft"
            cancelText="Huỷ"
          >
            <a>
              <i class="fa-solid fa-trash-can" style={{ fontSize: 18, color: 'red', cursor: 'pointer', marginTop: 11 }} ></i>
            </a>
          </Popconfirm>
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
});
RouterStart.propTypes = {
  className: PropTypes.any,
};
export default styled(RouterStart)`
  .ant-table-thead > tr > th {
    background: #fff !important;
    color: #01579B !important;
    font-family: 'Nunito' !important;
    font-weight: 700 !important;
    font-size: 16px !important;
}
.ant-table-thead > tr > th {
   border-bottom: 1px solid #f0f0f0 !important; 
   border-right: 1px solid #f0f0f0 !important; 
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td {
  line-height: 35px !important;
  color: #01579B !important;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Nunito' !important;
  text-align: center !important;
}
.ant-picker-input > input {
  color: #01579B !important;
  font-weight: 700;
  font-family: 'Nunito' !important;
}
.ant-picker-suffix > * {
  vertical-align: top;
  color: #01579B !important;
}
`;
