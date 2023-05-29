import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styled from "styled-components";
import { COLOR_GREEN, COLOR_RED } from 'theme/colors';
import { Ui } from "utils/Ui";

const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList, setTotal, total }) => {

  const onChange = async (e, value, row) => {
    const params = {
      active: value ? 0 : 1,
    };
  };

  const onActive = (e, value, row) => {
    let name = ''
    if (e == false) {
      name = 'Bạn muốn bỏ active nhóm tuyến này không?'
    } else {
      name = 'Bạn muốn active nhóm tuyến này không?'
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
      title: "Mã tuyến",
      dataIndex: "route_code",
      width: 100,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            {text}
          </div>
        )
      }
    },
    {
      title: "Tên tuyến",
      dataIndex: "name",
      width: 300,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            {text}
          </div>
        )
      }
    },
    {
      title: "Bến đi",
      dataIndex: "start_station",
      width: 150,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            {text?.name}
          </div>
        )
      }
    },
    {
      title: "Bến đến",
      dataIndex: "end_station",
      width: 150,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            {text?.name}
          </div>
        )
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      width: 150,
      render: (text, record) => {
        return (
          <div style={{ textAlign: 'center', color: record?.is_active === 1 ? COLOR_GREEN : COLOR_RED }}>
            {record?.is_active === 1 ? 'Active' : 'In Active'}
          </div>
        )
      }
    },

    {
      title: "Thao tác",
      width: 80,
      dataIndex: "active",
      fixed: "right",
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
              />
            </Tooltip>
          </div>
        )
      }
    }
  ];

  const renderContent = () => {
    return (
      <Row justify="end" style={{ marginBottom: 5, marginTop: 5 }}>
        <Pagination
          onShowSizeChange={(current, size) => {
            setParams((prevState) => {
              let nextState = { ...prevState };
              nextState.page = 1;
              nextState.size = size;
              return nextState;
            });
          }}
          onChange={(page, pageSize) => {
            setParams((prevState) => {
              let nextState = { ...prevState };
              nextState.page = page;
              return nextState;
            });
          }}
          total={total}
          current={params.page}
          pageSize={params.size}
          showSizeChanger
        />
      </Row>
    );
  };

  return (
    <div className={className}>
      <DefineTable
        columns={columns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 330px)" }}
        pagination={false}
      />
      {renderContent()}

    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
  
`;
