import {
  Dropdown,
  Form,
  Modal,
  Menu
} from "antd";
import { DefineTable } from "components";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import {
  ExclamationCircleOutlined
} from "@ant-design/icons";
const { confirm } = Modal;

let time;
let format = "DD-MM-YYYY";

const Social = ({ profile, className, idTabs, showModal, data, user_id, itemSelected, setItemSelected }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const loadApi = useCallback(async () => {
    setLoading(true);
  }, []);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(loadApi, 800);
  }, [idTabs]);
  // create
  const createRote = useCallback(async (param) => {

  }, []);
  // update
  const updateRote = useCallback(async (param) => {
  }, []);


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


  const _handleSelectAll = async (selected, selectedRows, changeRows) => {
    if (!selected) {
      setItemSelected([])
    } else {
      if (data.length === itemSelected.length) { // Trường hợp click vào xóa tất cả khi chưa full item
        setItemSelected([])
      } else {
        let selectKeyNew = [];
        // await selectedRows.map((item) => {
        //   selectKeyNew.push(item.id)
        // })
        await setItemSelected(selectKeyNew);
      }
    }
  }

  const _handleSelect = (record, status) => {
    if (!itemSelected.includes(record.id)) {
      const selectKeyNew = [...itemSelected]
      selectKeyNew.push(record.id)
      setItemSelected(selectKeyNew)
    } else {
      const selectKeyNew = [...itemSelected]
      const index = selectKeyNew.indexOf(record.id);
      selectKeyNew.splice(index, 1);
      setItemSelected(selectKeyNew)
    }
  };


  const clickHandler = (event) => {
		if(event.detail == 2){
			console.log("Double Clicked")
		}
	}


  let columns = [
    {
      title: () => (
        <>
          <div style={{ textAlign: "center" }}>Mã tuyến</div>
        </>
      ),
      width: 100,
      dataIndex: "status",
      fixed:'left',
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: () => (
        <>
          <div style={{ textAlign: "center" }}>Tên tuyến</div>
        </>
      ),
      dataIndex: "date",
      width: 200,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },

    {
      title: "BKS",
      dataIndex: "start_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Từ ngày",
      dataIndex: "end_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Đến ngày",
      dataIndex: "end_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Số chuyến",
      dataIndex: "subsidy_form",
      width: 100,
      align: "center",
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Số ghế",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Loại ghế",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Giờ cố định",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Thời gian",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Dừng",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Từ ngày",
      dataIndex: "end_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Đến ngày",
      dataIndex: "end_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "end_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Trả sau",
      dataIndex: "end_date",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Thao tác",
      dataIndex: "otp",
      width: 110,
      fixed: 'right',
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
  return (
    <div className={className}>
      <DefineTable
        bordered
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: event => {console.log("hehehehheheh")}, // double click row
          };
        }}
        rowSelection={{
          selectedRowKeys: itemSelected,
          onSelect: _handleSelect,
          onSelectAll: _handleSelectAll,
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        scroll={{ x: 'calc(700px + 10%)', y: 240 }}
        pagination={false}
        
      />
    </div>
  );
};

export default styled(Social)`
  .customer {
    .anticon-plus-circle {
      font-size: 26px !important;
      color: green;
    }
  }
  .customerClose {
    .anticon-close-circle {
      font-size: 26px !important;
      color: red;
    }
  }
`;
