import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Pagination, Row, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import { manage } from "configs";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import _ from "lodash"
const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList, total,models }) => {

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      width: 60,
      fixed: "left",
      align: 'center',
      render: (value, row, index) => {
        const stringIndex = `${((params.page - 1) * params.per_page + index)}`;
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
      render: (values) => {
        const check = values.find(item => item?.model_type == 'App\\Models\\Station') !== undefined ? 1 : 0;
        return <div style={{ textAlign: 'center' }}>
          <Checkbox
            checked={check}
            size='small' />
        </div>
      }
    },
    {
      title: "Vận hành tuyến",
      dataIndex: "models",
      width: 100,
      render: (values) => {
        const check = values.find(item => item?.model_type == 'App\\Models\\Merchant') !== undefined ? 1 : 0;
        return <div style={{ textAlign: 'center' }}>
          <Checkbox
            checked={check}
            size='small' />
        </div>
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      width: 100,
      render: (value, row,record) => {
        return <div style={{ textAlign: 'center' }}>
          <Checkbox
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
        const ids = record.id
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
