import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Row, Tooltip } from "antd";
import "antd/dist/antd.css";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ItemGroup from "./ItemGroup";
import { category } from "configs";
import _ from 'lodash'
const { confirm } = Modal;

const TableList = memo(({ className, data, params, setParams, onEdit, onRefreshList, itemSelected, setItemSelected, total }) => {
  const [vehicle, setVehicle] = useState([]);
  const [staffs, setStaffs] = useState([]);


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


  const getDataStaffs = useCallback(async () => {
    category.getPersons()
      .then(res => {
        if (res.status === 200) {
          setStaffs(res?.data?.data)
        }
      })
      .catch(err => {
      })
  }, []);

  useEffect(() => {
    getDataVehicle();
    getDataStaffs();
  }, [getDataVehicle, getDataStaffs]);


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
      title: "Ngày",
      dataIndex: "code",
      width: 150,
      fixed: 'left'
    },
    {
      title: "Giờ XB",
      dataIndex: "code",
      width: 100,
    },
    {
      title: "Tuyến",
      dataIndex: "slug",
      width: 180,
    },
    {
      title: "Chiều",
      dataIndex: "code",
      width: 80,
    },
    {
      title: "Xe",
      dataIndex: "slug",
      width: 150,
      render: (text, record, row) => {
        return (<div> {vehicle?.length !== 0 ? <ItemGroup nameColumn={"xe"} values={text} record={record} data={vehicle} params={params} onRefreshList={onRefreshList} /> : ""}
        </div>
        )
      }
    },
    {
      title: "Lái xe 1",
      dataIndex: "code",
      width: 170,
      render: (text, record, row) => {
        return (<div>
          <ItemGroup nameColumn={"lx1"} values={text} record={record} data={staffs} params={params} onRefreshList={onRefreshList} />
        </div>
        )
      }
    },
    {
      title: "Lái xe 2",
      dataIndex: "code",
      width: 170,
      render: (text, record, row) => {
        return (
          <ItemGroup nameColumn={"lx2"} values={text} record={record} data={staffs} params={params} onRefreshList={onRefreshList} />
        )
      }
    },
    {
      title: "Lái xe 3",
      dataIndex: "code",
      width: 170,
      render: (text, record, row) => {
        return (
          <ItemGroup nameColumn={"lx3"} values={text} record={record} data={staffs} params={params} onRefreshList={onRefreshList} />
        )
      }
    },
    {
      title: "Tiếp viên",
      dataIndex: "code",
      width: 170,
      render: (text, record, row) => {
        return (
          <ItemGroup nameColumn={"tv"} values={text} record={record} data={staffs} params={params} onRefreshList={onRefreshList} />
        )
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "code",
      width: 150,
      render: (text, record, row) => {
        return (
          <div style={{ textAlign: 'center' }}>Chưa ký</div>
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

    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
  
`;
