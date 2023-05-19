import { EditOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Tooltip, Input, Form, message, Spin } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ItemRow from "./ItemRow";
import { category, command } from "configs";
import _ from 'lodash'
import moment from 'moment';
const { confirm } = Modal;
const { TextArea } = Input;

const TableList = memo(({ className, data, params, setParams, onRefreshList, itemSelected, setItemSelected, total }) => {
  const [allMerchant, setAllMerchant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allDriver, setAllDriver] = useState([]);
  const [idSelect, setIdSelect] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (ids) => {
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

  const [form] = Form.useForm();



  const onGetData = useCallback(async (ids) => {
    const payload = {
      id: ids
    };
    setAllMerchant([])
    setAllDriver([])
    setLoading(true)
    command.getCommandVehicles(payload).then(res => {
      if (res.status === 200) {
        const allMerchant = []
        res?.data?.data.vehicles?.map(item => {
          allMerchant.push({
            ...item,
            value: item?.id,
            label: item?.license_plate,
          })
        })
        const allDriver = []
        res?.data?.data.drivers?.map(item => {
          allDriver.push({
            ...item,
            value: item?.id,
            label: item?.first_name + " " + item?.last_name,
          })
        })
        setAllMerchant(allMerchant)
        setAllDriver(allDriver)
        setLoading(false)
      }
    }).catch(err => {

    })
  }, []);



  const _handleSelectAll = async (selected, selectedRows, changeRows) => {
    if (!selected) {
      setItemSelected([])
    } else {
      if (itemSelected.length !==0) { // Trường hợp click vào xóa tất cả khi chưa full item
        setItemSelected([])
      } else {
        let selectKeyNew = [];
        const someArray = selectedRows.filter(item => item?.first_driver !== null && item?.vehicle !== null);
        await someArray.map((item) => {
          selectKeyNew.push(item.id)
        })
        await setItemSelected(selectKeyNew);
      }
    }
  }

  const _handleSelect = (record, status) => {
    if (!itemSelected.includes(record?.id)) {
      const selectKeyNew = [...itemSelected]
      selectKeyNew.push(record?.id)
      setItemSelected(selectKeyNew)
    } else {
      const selectKeyNew = [...itemSelected]
      const index = selectKeyNew.indexOf(record.id);
      selectKeyNew.splice(index, 1);
      setItemSelected(selectKeyNew)
    }
  };

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
      title: "Ngày",
      dataIndex: "departure_date",
      width: 150,
      fixed: 'left',
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
        const ids = record?.id
        return (
          <div onClick={() => onGetData(ids)}>
            <ItemRow
              nameColumn={"vehicle"}
              values={text}
              record={record}
              data={allMerchant}
              datas={allDriver}
              params={params}
              onRefreshList={onRefreshList}
              loading={loading}
              setItemSelected={setItemSelected}
            />
          </div>
        )
      }
    },
    {
      title: "Lái xe 1",
      dataIndex: "first_driver",
      width: 200,
      render: (text, record, row) => {
        const ids = record?.id
        return (
          <div onClick={() => onGetData(ids)}>
            <ItemRow
              nameColumn={"first_driver"}
              values={text}
              record={record}
              data={allDriver}
              datas={allMerchant}
              params={params}
              onRefreshList={onRefreshList}
              loading={loading}
              setItemSelected={setItemSelected}
            />
          </div>

        )
      }
    },
    {
      title: "Lái xe 2",
      dataIndex: "second_driver",
      width: 200,
      render: (text, record, row) => {
        const ids = record?.id
        return (<div onClick={() => onGetData(ids)}>
          <ItemRow
            nameColumn={"second_driver"}
            values={text}
            record={record}
            data={allDriver}
            datas={allMerchant}
            params={params}
            onRefreshList={onRefreshList}
            loading={loading}
            setItemSelected={setItemSelected}
          />
        </div>
        )
      }
    },
    {
      title: "Lái xe 3",
      dataIndex: "third_driver",
      width: 200,
      render: (text, record, row) => {
        const ids = record?.id
        return (<div onClick={() => onGetData(ids)}>
          <ItemRow
            nameColumn={"third_driver"}
            values={text}
            record={record}
            data={allDriver}
            datas={allMerchant}
            params={params}
            onRefreshList={onRefreshList}
            loading={loading}
            setItemSelected={setItemSelected}
          />
        </div>
        )
      }
    },
    {
      title: "Tiếp viên",
      dataIndex: "attendant",
      width: 200,
      render: (text, record, row) => {
        const ids = record.id
        return (
          <div onClick={() => onGetData(ids)}>
            <ItemRow
              nameColumn={"attendant"}
              values={text}
              record={record}
              data={allDriver}
              params={params}
              onRefreshList={onRefreshList}
              loading={loading}
              setItemSelected={setItemSelected}
            />
          </div>

        )
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
        return (
          <div style={{ textAlign: 'center' }}>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                icon={<CloseCircleOutlined style={{ color: 'red' }} />}
                onClick={() => showModal(ids)}
              />
            </Tooltip>
            <Tooltip placement="topLeft">
              <Button
                type="link"
                icon={<EditOutlined />}
              // onClick={() => onEdit(ids)}
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
        rowSelection={{
          selectedRowKeys: itemSelected,
          onSelect: _handleSelect,
          onSelectAll: _handleSelectAll,
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 330px)" }}
        pagination={false}
      />
      {renderContent()}
      <div style={{marginTop:-38,fontFamily:'Nunito', fontWeight: 600,color:'red'}}>Điều kiện để ký 1 lệnh: Có điều độ BKS + Lái xe 1</div>
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
