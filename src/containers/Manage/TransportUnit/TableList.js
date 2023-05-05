import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Pagination, Row, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";

const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList }) => {

  const onChange = async (e, value, row) => {
    const params = {
      active: value ? 0 : 1,
    };
  };

  const onActive = (e, value, row) => {
    let name = ''
    if (e == false) {
      name = 'Bạn muốn bỏ active không?'
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




  const columns = [
    {
      title: "#",
      dataIndex: "index",
      width: 60,
      fixed: "left",
      align: 'center',
      render: (value, row, index) => {
        const stringIndex = `${((params.page - 1) * params.size + index)}`;
        return (
          <h5 style={{ textAlign: 'center' }}>{params.page === 1 ? index + 1 : parseInt(stringIndex) + 1}</h5>
        );
      },
    },
    {
      title: "Tên đơn vị",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 300,
    },
    {
      title: "Mã số thuế",
      dataIndex: "tax_code",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
    },
    {
      title: "Quản lý bến",
      dataIndex: "models",
      width: 100,
      render: (value, row) => {
        return <div style={{ textAlign: 'center' }}>
          <Checkbox onChange={(e) => onActive(e, value, row)}
            checked={value}
            size='small' />
        </div>
      }
    },
    {
      title: "Vận hành tuyến",
      dataIndex: "models",
      width: 100,
      render: (value, row) => {
        return <div style={{ textAlign: 'center' }}>
          <Checkbox onChange={(e) => onActive(e, value, row)}
            checked={value}
            size='small' />
        </div>
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      width: 100,
      render: (value, row) => {
        return <div style={{ textAlign: 'center' }}>
          <Checkbox onChange={(e) => onActive(e, value, row)}
            checked={value}
            size='small' />
        </div>
      }
    },
    {
      title: "Thao tác",
      width: 80,
      dataIndex: "active",
      fixed: "right",
      render: (text, record, row) => {
        const ids = record.dmo_id
        return (
          <div style={{ textAlign: 'center' }}>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => onEdit(ids)}
              />
            </Tooltip>
          </div>
        )
      }
    }
  ];

  // const renderContent = () => {
  //   return (
  //     <Row justify="end" style={{ marginBottom: 5, marginTop: 5 }}>
  //       <Pagination
  //         onShowSizeChange={(current, size) => {
  //           setParams((prevState) => {
  //             let nextState = { ...prevState };
  //             nextState.page = 1;
  //             nextState.size = size;
  //             return nextState;
  //           });
  //         }}
  //         onChange={(page, pageSize) => {
  //           setParams((prevState) => {
  //             let nextState = { ...prevState };
  //             nextState.page = page;
  //             return nextState;
  //           });
  //         }}
  //         total={total}
  //         current={params.page}
  //         pageSize={params.size}
  //         showSizeChanger
  //       />
  //     </Row>
  //   );
  // };

  return (
    <div className={className}>
      <DefineTable
        columns={columns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 330px)" }}
        pagination={false}
      />
      {/* {renderContent()} */}

    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
  
`;
