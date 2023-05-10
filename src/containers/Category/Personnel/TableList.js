import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import moment from "moment";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styled from "styled-components";
import { COLOR_GREEN, COLOR_RED } from "theme/colors";
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
      title: "Họ tên",
      dataIndex: "name",
      width: 200,
      render: (text, record) => {
        return <div>{record?.first_name} {record?.last_name}</div>;
      }
    },
    {
      title: "Căn cước công dân",
      dataIndex: "citizen_identity",
      width: 150,
    },
    {
      title: "Chức vụ",
      dataIndex: "dmo_name",
      width: 150,
      render: (text, record) => {
        return record?.position?.name;
      }
    },
    {
      title: "Số GPLX",
      dataIndex: "driving_license",
      width: 100,
    },
    {
      title: "Hạng GPLX",
      dataIndex: "dmo_name",
      width: 80,
      render: (text, record) => {
        return record?.driving_license_rank_id?.name;
      }
    },
    {
      title: "Hạn GPLX",
      dataIndex: "driving_license_expire_date",
      width: 100,
      render: (text, record) => {
        return moment(text).format('DD/MM/YYYY');
      }
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 100,
    },
    {
      title: "Trạng thái",
      dataIndex: "dmo_name",
      align: 'center',
      width: 120,
      render: (text, record) => {
        return <span style={{ color: record?.status?.id == 1 ? COLOR_GREEN : COLOR_RED }}>{record?.status?.name}</span>;
      }
    },
    {
      title: "Thao tác",
      width: 80,
      dataIndex: "active",
      fixed: "right",
      render: (text, record, row) => {
        const ids = record?.id
        return (
          <div style={{ textAlign: 'center' }}>
            <Tooltip placement="topLeft">
              <Button
                style={{ width: '100%' }}
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
