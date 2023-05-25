import { EyeOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Tooltip, Form, message, Input } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { category, command } from "configs";
import _ from 'lodash'
import moment from 'moment';
const { confirm } = Modal;
const { TextArea } = Input;
const TableList = memo(({ className, data, params, setParams, onRefreshList, itemSelected,showModal, total}) => {
  const [form] = Form.useForm();
  const [vehicle, setVehicle] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idSelect, setIdSelect] = useState(undefined);
  const showModals = (ids) => {
    setIsModalOpen(true);
    setIdSelect(ids)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIdSelect(undefined)
    form.setFieldsValue({
      reason: ""
    })
  };

  const getDataVehicle = useCallback(async () => {
    category.getVehicle()
      .then(res => {
        if (res.status === 200) {
          const dataSet = []
          _.map(res?.data?.data, (items) => {
            dataSet.push({
              id: items.id,
              name: items.license_plate,
            });
          })
          setVehicle(dataSet)
        }
      })
      .catch(err => {
      })
  }, []);


  useEffect(() => {
    getDataVehicle();
  }, [getDataVehicle]);


  const onFinish = async (values) => {
    const payload = {
      id: idSelect,
      reason: values?.reason
    }
    command.delCommand(payload)
      .then(res => {
        if (res.status === 200) {
          message.success('Huỷ lệnh thành công.')
          onRefreshList()
          setIsModalOpen(false);
        }
      })
      .catch(err => {
        message.error('Có lỗi xảy ra!')
      })
  };

  const columns = [
    {
      title: "Lệnh VC",
      dataIndex: "command_code",
      fixed: 'left',
      width: 100,
      render: (value) => {
        return (
          <div>{value}</div>
        )
      }
    },
    {
      title: "Ngày",
      dataIndex: "departure_date",
      width: 150,
      render: (value) => {
        return (
          <div>{value}</div>
        )
      }
    },
    {
      title: "Giờ XB",
      dataIndex: "departure_time",
      width: 100,
      render: (value) => {
        return (
          <div>{moment(value, 'HH:mm:ss').format('HH:mm')}</div>
        )
      }
    },
    {
      title: "Tuyến",
      dataIndex: "route",
      width: 180,
      render: (value) => {
        return (
          <div>{value?.name}</div>
        )
      }
    },
    {
      title: "Chiều",
      dataIndex: "direction",
      width: 80,
      render: (value) => {
        return (
          <div style={{ textAlign: 'center' }}>{value?.code}</div>
        )
      }
    },
    {
      title: "Xe",
      dataIndex: "vehicle",
      width: 150,
      render: (text, record, row) => {
        return (<div>{text?.license_plate}</div>)
      }
    },
    {
      title: "Lái xe 1",
      dataIndex: "first_driver",
      width: 170,
      render: (text, record, row) => {
        return (<div>{`${text?.first_name} ${text?.last_name}`}</div>)
      }
    },
    {
      title: "Lái xe 2",
      dataIndex: "second_driver",
      width: 170,
      render: (text, record, row) => {
        return (<div>{`${text?.first_name !== undefined ? text?.first_name : ''} ${text?.last_name !== undefined ? text?.last_name : ''}`}</div>)
      }
    },
    {
      title: "Lái xe 3",
      dataIndex: "code",
      width: 170,
      render: (text, record, row) => {
        return (<div>{`${text?.first_name !== undefined ? text?.first_name : ''} ${text?.last_name !== undefined ? text?.last_name : ''}`}</div>)
      }
    },
    {
      title: "Tiếp viên",
      dataIndex: "attendant",
      width: 170,
      render: (text, record, row) => {
        return (<div>{`${text?.first_name !== undefined ? text?.first_name : ''} ${text?.last_name !== undefined ? text?.last_name : ''}`}</div>)
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center', color: '#F4511E' }}>{text?.name}</div>
        )
      }
    },
    {
      title: "Thao tác",
      width: 80,
      dataIndex: "active",
      fixed: "right",
      render: (text, record, row) => {
        const ids = record.id
        const command_code = record.command_code
        
        return (
          <div style={{ textAlign: 'center' }}>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                icon={<CloseCircleOutlined style={{ color: 'red' }} />}
                onClick={() => showModals(ids)}
              />
            </Tooltip>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => showModal(command_code)}
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
        rowKey="id"
        columns={columns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 330px)" }}
        pagination={false}
      />
      {renderContent()}
      <Modal title={<div style={{ fontFamily: 'Nunito', fontSize: 18, fontWeight: 700 }}>Huỷ lệnh</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={false} footer={null} destroyOnClose className={className}>
        <Form
          className={className}
          onFinish={onFinish}
          name="control-hooks"
          initialValues={{
            reason: '',
          }}
          form={form}
        >
          <Form.Item
            name="reason"
            rules={[{ required: true, message: 'Vui lòng nhập lí do!' }]}
          >
            <TextArea style={{ height: 80, resize: 'none' }}
              placeholder="Nhập lý do huỷ . . ." />
          </Form.Item>
          <div
            className="action"
            style={{
              position: "absolute",
              right: 0,
              width: "100%",
              padding: "10px 9px",
              background: "#fff",
              textAlign: "left",
            }}
          >
            <Button type="danger" style={{ height: 35 }} onClick={handleCancel}>
              Thoát
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              style={{ height: 35, float: "right" }}
            >
              {itemSelected ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
.ant-modal-body {
  padding: 8px !important;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
}
.ant-form-item {
  margin-bottom: 0px !important;
}
.ant-modal-header {
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
  text-align: center;
}
`;
