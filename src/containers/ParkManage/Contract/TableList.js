import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Checkbox, Tooltip,  } from "antd";
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
    // const result = await ServiceBase.requestJson({
    //   method: "PUT",
    //   url: `/v1/route-group/${row.id}`,
    //   data: params,
    // });
    // if (result.hasErrors) {
    //   Ui.showErrors(result.errors);
    // } else {
    //   Ui.showSuccess({ message: "Cập nhật trạng thái thành công." });
    //   onRefreshList()
    // }
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
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   width: 60,
    //   fixed: "left",
    //   align: 'center',
    //   render: (value, row, index) => {
    //     const stringIndex = `${((params.page - 1) * params.size + index)}`;
    //     return (
    //       <h5 style={{ textAlign: 'center' }}>{params.page === 1 ? index + 1 : parseInt(stringIndex) + 1}</h5>
    //     );
    //   },
    // },
    {
      title: "Mã HĐ",
      dataIndex: "dmo_id",
      width: 100,
    },
    {
      title: "Số HĐ",
      dataIndex: "dmo_name",
      width: 100,
    },
    {
      title: "Tên hợp đồng",
      dataIndex: "dmo_name",
      width: 200,
    },
    {
      title: "Thời hạn",
      dataIndex: "dmo_name",
      width: 200,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "dmo_name",
      width: 150,
    },
    {
      title: "Bến MĐ",
      dataIndex: "is_active",
      width: 80,
      render: (value, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox
              onChange={(e) => onActive(e, value, row)}
              checked={value}
              size='small'
            />
          </div>
        )
      },
    },
    {
      title: "Bến GL",
      dataIndex: "is_active",
      width: 80,
      render: (value, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox
              onChange={(e) => onActive(e, value, row)}
              checked={value}
              size='small'
            />
          </div>
        )
      },
    },
    {
      title: "Bến GB",
      dataIndex: "is_active",
      width: 80,
      render: (value, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox
              onChange={(e) => onActive(e, value, row)}
              checked={value}
              size='small'
            />
          </div>
        )
      },
    },
    {
      title: "Lưu đêm",
      dataIndex: "is_active",
      width: 80,
      render: (value, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox
              onChange={(e) => onActive(e, value, row)}
              checked={value}
              size='small'
            />
          </div>
        )
      },
    },
    {
      title: "Active",
      dataIndex: "is_active",
      width: 80,
      render: (value, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Checkbox
              onChange={(e) => onActive(e, value, row)}
              checked={value}
              size='small'
            />
          </div>
        )
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "dmo_name",
      width: 250,
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
