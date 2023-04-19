import { EditOutlined, ExclamationCircleOutlined, CheckOutlined, CloseOutlined, CaretDownOutlined, CaretUpOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Tooltip, Switch } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import manage from "configs/manage";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";

const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList, onDel }) => {
  const [expended, setExpended] = useState()
  const onChange = async (e, value, row) => {
    const payload = {
      uuid: row?.id,
      is_active: row?.is_active === 1 ? 0 : 1,
    }
    manage.updateModule(payload)
      .then(res => {
        if (res.status === 200) {
          Ui.showSuccess({ message: "Thay đổi trạng thái thành công" });
          onRefreshList()
        }
      })
      .catch(err => {
        Ui.showError({ message: err?.response?.data?.message });
      })
  };

  const cancel = (e) => {
    console.log("cancel")
  };

  const onConfirm = (ids) => {
    onDel(ids)
  };


  const onActive = (e, value, row) => {
    let name = ''
    if (e == false) {
      name = 'Bạn muốn bỏ active module không?'
    } else {
      name = 'Bạn muốn active module này không?'
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




  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   width: 30,
    //   fixed: "left",
    //   align: 'center',
    //   render: (text, record, index) => {
    //     return (
    //       <div>{record?.parent_id === 0 ? <HolderOutlined /> : ""}</div>
    //     )
    //   }
    // },
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   width: 30,
    //   fixed: "left",
    //   align: 'center',
    //   render: (text, record, index) => {
    //     return (
    //       <div>{record?.parent_id !== 0 ? <HolderOutlined /> : ""}</div>
    //     )
    //   }
    // },
    {
      title: "Tên module",
      dataIndex: "name",
      width: 180,
      render: (text, record, index) => {
        return (
          <div>{record?.parent_id === 0 ? <div style={{ fontWeight: 600 }}>{record?.name}</div> : <div style={{ marginLeft: 10 }}>{record?.name}</div>}</div>
        )
      }
    },
    {
      title: "Thư mục",
      dataIndex: "path",
      width: 180,
      render: (text, record, index) => {
        return (
          <div>{record?.parent_id === 0 ? <div style={{ fontWeight: 600 }}>{record?.path}</div> : <div style={{ marginLeft: 10 }}>{record?.path}</div>}</div>
        )
      }
    },
    {
      title: "Icon",
      dataIndex: "icon",
      width: 150,
      render: (text, record, index) => {
        return (
          <div>{record?.parent_id === 0 ? <div style={{ fontWeight: 600 }}>{record?.icon}</div> : <div style={{ marginLeft: 10 }}>{record?.icon}</div>}</div>
        )
      }
    },
    {
      title: "Thứ tự",
      dataIndex: "order_number",
      width: 80,
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      width: 80,
      render: (value, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => onActive(e, value, row)}
              checked={value}
            />
          </div>
        )
      },
    },
    {
      title: "Thao tác",
      width: 80,
      dataIndex: "active",
      render: (text, record, row) => {
        const ids = record?.id
        return (
          <div style={{ textAlign: 'center' }}>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                onClick={() => onEdit(record)}
              >
                <i class="fa-regular fa-pen-to-square" style={{color:'#01579B',fontSize:20}}></i>
              </Button>
            </Tooltip>
            &nbsp;&nbsp;
            <Popconfirm
              title="Chắc chắn xoá module này?"
              onConfirm={() => onConfirm(ids)}
              onCancel={cancel}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <a>
                <i class="fa-solid fa-trash-can" style={{ color: 'red',fontSize:20 }}></i>
              </a>
            </Popconfirm>
          </div>
        )
      }
    }
  ];

  return (
    <div className={className}>
      <DefineTable
        columns={columns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 330px)" }}
        pagination={false}
        expandedRowKeys={[expended]}
        expandable={{
          expandedRowRender: (record) => record.key === 2,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded && record?.parent_id === 0 ? (
              <CaretUpOutlined onClick={e => onExpand(record, e)} />
            ) : (record?.parent_id === 0 ? <CaretDownOutlined onClick={e => onExpand(record, e)} /> : null)
        }}
      />
    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
.ant-table-row-expand-icon-cell {
  position: relative;
  .ant-table-row-collapsed:after {
    content : "\E61D";
    font-family: "anticon" !important;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: auto;

    right: 16px;
    top: 0;
    display: inline-block;
    transform: scale(0.66666667) rotate(0deg);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    zoom: 1;
  }

  .ant-table-row-expanded:after {
    content : "\E61D";
    font-family: "anticon" !important;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: auto;

    right: 16px;
    top: 0;
    display: inline-block;
    transform: rotate(180deg) scale(0.75);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    zoom: 1;
  }
  
`;
