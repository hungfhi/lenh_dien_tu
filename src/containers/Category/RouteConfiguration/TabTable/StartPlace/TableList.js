




import { Modal, message, Popconfirm, Input, TimePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
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
let inputTimer = null;
const RouterStart = memo(({ className, data, setData, params, total, itemSelected }) => {


  const onAdd = () => {
    let dataClone = _.cloneDeep(data);
    const idCheck = dataClone.find(item => item.id === 'h71012');
    if(idCheck){
      message.error('Vui lòng nhập điểm trả !')
    }else {
      dataClone.push({
        id: 'h71012',
        direction_id: 1,
        name: '',
      });
      setData(dataClone);
    }
  }
  const onPush = useCallback((name) => {
    const payload = {
      direction_id: 1,
      name: name,
      id: itemSelected?.id
    }
    if (inputTimer) {
      clearTimeout(inputTimer);
    }
    inputTimer = setTimeout(() => {
      category.updatePlace(payload)
        .then(res => {
          if (res.status === 200) {
            let dataClone = _.cloneDeep(data);
            dataClone.find(item => item.id === 'h71012' && (item.name = res?.data?.data?.name, item.id = res?.data?.data?.id));
            setData(dataClone)
          }
        })
        .catch(err => {
          if (err.response?.data) {
            message.error(err.response?.data?.message)
          }
        })
    }, 2000);
  },
    [data]
  );

  const cancel = (e) => {
  };

  const onUpdate = useCallback(async (row, time) => {
    const payload = {
      id: 'h71012',
      direction_id: 1,
      name: '',
      merchant_route_node_id: row?.id
    }
    category.updatePlace(payload)
      .then(res => {
        let dataClone = _.cloneDeep(data);
        dataClone.find(item => item.id === res?.data?.data?.id && (item.name = res?.data?.data?.name, true));
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
    }
    category.delPlace(payload)
      .then(res => {
        if (res.status === 200) {
          let dataClone = _.cloneDeep(data);
          setData(dataClone.filter(item => item.id !== ids));
        }
      })
      .catch(err => {
        if (err.response?.data) {
          message.error('Error!')
        }
      })
  };




  const columns = [
    {
      title: "Điểm trả khách theo chiều đi",
      dataIndex: "name",
      render: (value, row) => {
        return <Input bordered={false} defaultValue={value} style={{ width: '100%', color: '#01579B', fontWeight: 700, fontFamily: 'Nunito' }} suffix={<EditOutlined />} onChange={(e) => { row?.id === 'h71012' ? onPush(e.target.value, row) : onUpdate(e.target.value, row) }} />
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
.ant-input-affix-wrapper > .ant-input {
font-size: inherit;
border: none;
outline: none;
color: #01579B !important;
font-size: 14px;
font-weight: 700;
font-family: 'Nunito' !important;
}
.anticon svg {
display: inline-block;
color: #01579B !important;
}
`;
