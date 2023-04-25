import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Switch, Tooltip } from "antd";
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

  const datas = [
    {
      key: "1",
      date: "2020-10-04T22:00:00.000Z",
      period: "period 1",
      section: "A",
      subject: "english"
    },
    {
      key: "2",
      date: "2020-10-04T21:00:00.000Z",
      period: "period 2",
      section: "B",
      subject: "Science"
    }
  ];



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
      title: "Tên bến",
      dataIndex: "dmo_id",
      width: 200,
    },
    {
      title: "Mã bến",
      dataIndex: "dmo_name",
      width: 100,
    },
    {
      title: "Tỉnh thành",
      dataIndex: "dmo_name",
      width: 200,
    },
    {
      title: "Địa chỉ",
      dataIndex: "dmo_name",
      width: 300,
    },
    {
      title: "Trạng thái",
      dataIndex: "dmo_name",
      width: 100,
    },
    // {
    //   title: "Thao tác",
    //   width: 80,
    //   dataIndex: "active",
    //   fixed: "right",
    //   render: (text, record, row) => {
    //     const ids = record.dmo_id
    //     return (
    //       <div style={{ textAlign: 'center' }}>
    //         <Tooltip placement="topLeft">
    //           <Button
    //             type="link"
    //             icon={<EditOutlined />}
    //             onClick={() => onEdit(ids)}
    //           />
    //         </Tooltip>
    //       </div>
    //     )
    //   }
    // }
  ];



  const generateRender = (row) => {
    return (row) => <div style={{ textAlign: 'center' }}><Switch
      onChange={(e) => onActive(row)}
      checked={row}
      size='small'
    /></div>
  };
  datas.map((row) => {
    let period = {};
    period["title"] = row.period;
    period["width"] = 80;
    period["key"] = row.period;
    period["render"] = generateRender(row);
    columns.push(period);
  });

  const action = {
    title: "Thao tác",
    dataIndex: "action",
    width: 80,
    render: (record) => {
      return (
        <div style={{textAlign:'center'}}>
          <Tooltip placement="topLeft">
            <Button
              type="link"
              onClick={() => onEdit(record)}
            >
              <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
            </Button>
          </Tooltip>
        </div>

      )
    },
  };
  columns.push(action);


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
        dataSource={datas}
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
