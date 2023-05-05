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

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList, models }) => {
  const [payload, setPayload] = useState([]);

  const onChange = async (check, values, items) => {
    // console.log('check', check)
    // console.log('values', values)
    // console.log('item', items)
    if (check !== 0) {
      console.log('values',values.filter(item => item.id !== items?.id))
      setPayload(values.filter(item => item.id !== items?.id));

    }
    else {
      let newModels = _.clone(values);
      newModels.push({
        ...items,
        id: items?.id,
        name: items?.name,
        model_type: items?.model_type,
      });

      console.log('newModels',newModels)
      setPayload(newModels)
    }



    // const payload = {
    //   // uuid: row?.id,
    //   // is_active: row?.is_active === 1 ? 0 : 1,
    // }
    // manage.updateTransport(payload)
    //   .then(res => {
    //     if (res.status === 200) {
    //       Ui.showSuccess({ message: "Thay đổi trạng thái thành công" });
    //       onRefreshList()
    //     }
    //   })
    //   .catch(err => {
    //     Ui.showError({ message: err?.response?.data?.message });
    //   })
  };

  const onActive = (check, values, items) => {
    let name = ''
    if (check == true) {
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
        onChange(check, values, items);
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
