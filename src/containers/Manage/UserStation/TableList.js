import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Switch, Tag, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import moment from "moment";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styled from "styled-components";
import { COLOR_GREEN, COLOR_RED } from "theme/colors";
import { Ui } from "utils/Ui";
import _ from "lodash";
import { manage } from "configs";


const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList, onChangeP,total }) => {

  const onChange = async (e, value, row) => {
    const payload = {
      is_active: e ? 1 : 0,
    };

    manage.changeStatusStationUser(row?.id, payload).then(res => {
      if (res.status === 200) {
        Ui.showSuccess({ message: "Thay đổi trạng thái thành công" });
        onRefreshList();
      }
    }).catch(err => {
      Ui.showError({ message: err?.response?.data?.message });
    })
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
        const stringIndex = `${((params.page - 1) * params.limit + index)}`;
        return (
          <h5 style={{ textAlign: 'center' }}>{params.page === 1 ? index + 1 : parseInt(stringIndex) + 1}</h5>
        );
      },
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      width: 150,
    },
    {
      title: "Tên hiển thị",
      dataIndex: "username",
      width: 150,
      render: (value) => <div>{value}</div>
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
      render: (value) => <div>{value}</div>
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 180,
    },
    {
      title: "CCCD",
      dataIndex: "citizen_identity",
      width: 150,
    },
    // {
    //   title: "Loại tài khoản",
    //   dataIndex: "roles",
    //   width: 250,
    //   render: (text, record) => (
    //     <>
    //       {_.map(text, (i) => {
    //         return (
    //           <Tag>{i.name}</Tag>
    //         )
    //       })}
    //     </>
    //   )
    // },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      width: 120,
      render: (text, record) => (
        <span>{moment(text).format("DD-MM-YYYY HH:mm")}</span>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      render: (value, row) => {

        return (
          <div style={{ textAlign: 'center' }}>
            <Switch
              onChange={(e) => onActive(e, value?.id, row)}
              checked={value?.id == 1 ? true : false}
              size='small'
            />
          </div>
        )
      },
      width: 120,
    },
    {
      title: "Thao tác",
      width: 100,
      dataIndex: "action",
      render: (record, value, row) => {
        const ids = value.id;
        const values = value.status;
        return (
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            {/* <Button
              type="link"
              onClick={() => onEdit(ids)}
            >
              <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
            </Button> */}
            <Tooltip placement="topLeft" title="Đổi mật khẩu">
              <Button
                type="link"
                onClick={() => onChangeP(ids)}
              >
                <i class="fas fa-key" style={{ color: '#01579B', fontSize: 20 }} />
              </Button>
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
