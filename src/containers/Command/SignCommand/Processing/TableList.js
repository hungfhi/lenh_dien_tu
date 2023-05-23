import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { category } from "configs";
import _ from 'lodash'
import moment from 'moment';
const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, allDriver, onRefreshList, setIdRow, itemSelected, setItemSelected, total, allMerchant }) => {
  const [vehicle, setVehicle] = useState([]);


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

  const onRow = (id) => {
    setIdRow(id)
  }


  const _handleSelectAll = async (selected, selectedRows, changeRows) => {
    if (!selected) {
      setItemSelected([])
    } else {
      if (data.length === itemSelected.length) { // Trường hợp click vào xóa tất cả khi chưa full item
        setItemSelected([])
      } else {
        let selectKeyNew = [];
        await selectedRows.map((item) => {
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
          <div style={{textAlign:'center'}}>{value?.code}</div>
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
        return (<div>{`${text?.first_name} ${text?.last_name}`}</div>)
      }
    },
    {
      title: "Lái xe 3",
      dataIndex: "code",
      width: 170,
      render: (text, record, row) => {
        return (<div>{`${text?.first_name} ${text?.last_name}`}</div>)
      }
    },
    {
      title: "Tiếp viên",
      dataIndex: "attendant",
      width: 170,
      render: (text, record, row) => {
        return (<div>{`${text?.first_name} ${text?.last_name}`}</div>)
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "code",
      width: 150,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center', color: '#F4511E' }}>Chưa ký</div>
        )
      }
    },
    {
      title: "Lý do",
      dataIndex: "reason_canceled",
      width: 200,
      render: (text, record, row) => {
        return (
          <div>{text}</div>
        )
      }
    },

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

    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
  
`;
