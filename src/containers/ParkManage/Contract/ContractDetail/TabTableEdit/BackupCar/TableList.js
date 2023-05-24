import { Checkbox, Dropdown, Pagination, Row, Space, Menu } from "antd";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import moment from 'moment';
import React, { memo, useState } from "react";
import styled from "styled-components";
import { DefinePagination, DefineTable } from "components";
const OTPList = memo(({ className, data, params, total, setParams, setTotal }) => {



  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{ color: '#01579B', textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 600 }}>
              Duyệt
            </a>
          ),
        },
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{ color: '#01579B', textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 600 }}>
              Xem hoá đơn
            </a>
          ),
        },
      ]}
    />
  );



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
      dataIndex: "phone",
      width: 200,
    },
    {
      title: "Tên tuyến",
      dataIndex: "content",
      width: 200,
    },
    {
      title: "Biển kiểm soát",
      dataIndex: "otp",
      width: 110,
    },
    {
      title: "Thời hạn",
      dataIndex: "otp",
      width: 110,
    },
    {
      title: "Số chuyến",
      dataIndex: "otp",
      width: 110,
    },
    {
      title: "Sô ghế",
      dataIndex: "otp",
      width: 110,
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "otp",
      width: 110,
    },
    {
      title: "Trạng thái",
      dataIndex: "otp",
      width: 110,
    },
    {
      title: "Trả sau",
      dataIndex: "otp",
      width: 110,
      render: () => {
        return <div style={{textAlign:'center' }}>
          <Checkbox></Checkbox>
        </div>
      }
    },
    {
      title: "Thao tác",
      dataIndex: "otp",
      width: 110,
      render: () => {
        return <div style={{ textAlign: 'center', justifyContent: 'center', }}>
          <Dropdown overlay={menu} >
            <a>
              <i class="fa-solid fa-ellipsis"></i>
            </a>
          </Dropdown>
        </div>
      }
    },
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
        rowKey="id"
        pagination={false}
        scroll={{ x: "calc(700px + 50%)", y: 400 }}
      />
      {/* {renderContent()} */}

    </div >
  );
});
OTPList.propTypes = {
  className: PropTypes.any,
};
export default styled(OTPList)`
// .ant-table-thead > tr > th {
//   background-color: rgba(233,195,43);
//   padding-top: 5px !important;
//   padding-bottom: 5px !important;
//   padding-left: 5px !important;
//   padding-right: 5px !important;
// }
  .ant-table-thead > tr > th {
    border-top: 1px solid rgb(130 126 126 / 12%) !important;
  }
  .ant-table-cell {
  border-left: 1px solid rgb(130 126 126 / 12%) !important;
  }
  .fix_drawer{
    padding-left : 100px
  }
  .ant-table-summary {
    font-weight: bold;
    text-align: right;
    .ant-table-cell {
        background-color: rgb(242,243,248);
        position: sticky;
        z-index: 10000;
        bottom: 0;
    }
  }
  
  
`;
