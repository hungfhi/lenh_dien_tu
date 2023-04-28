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

const Social = ({ profile, className, idTabs, showModal,data, user_id }) => {
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


  const onFinish = (value) => {
    let param = {
      ...value,
      date: value.date && moment(value.date).format("YYYY-MM-DD"),
      start_date: value.start_date && moment(value.start_date).format("YYYY-MM-DD"),
      end_date: value.end_date && moment(value.end_date).format("YYYY-MM-DD"),
      user_id: isEdit == false ? user_id : undefined,
      id: isEdit ? form.getFieldValue()?.id : undefined,
    };
 
    if (isEdit) {
      updateRote(param);
    } else {
      createRote(param);
    }
  };

  let columns = [
    {
      title: () => (
        <>
          <div style={{ textAlign: "center" }}>#</div>
        </>
      ),
      width: 50,
      dataIndex: "node_code",
      fixed: "left",
      render: (text, record, index) => (
        <>
          <div>{index + 1}</div>
        </>
      ),
    },

    {
      title: () => (
        <>
          <div style={{ textAlign: "center" }}>Mã tuyến</div>
        </>
      ),
      width: 100,
      dataIndex: "status",
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
      title: "Thời hạn",
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
      title: "Trạng thái",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Trả sau",
      dataIndex: "command",
      width: 100,
      render: (text, record, index) => {
        return {
          children: <div>{text?.date}</div>,
        };
      },
    },
    {
      title: "Thao tác",
      dataIndex: "otp",
      width: 110,
      fixed:'right',
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
  const onEdit = (record, index) => {
    form.setFieldsValue({
      ...record,
      date: record?.date && moment(record?.date, "YYYY-MM-DD"),
      start_date:
        record?.start_date && moment(record?.start_date, "YYYY-MM-DD"),
      end_date: record?.end_date && moment(record?.end_date, "YYYY-MM-DD"),
    });
    setIsEdit(true);
  };
  const onRemove = (record) => {
    confirm({
      title: "Bạn có muốn xóa chế độ BHXH này không?",
      icon: <ExclamationCircleOutlined />,
      // content:
      //   "Lệnh điều động sẽ được gửi đến tất cả các nhân viên bạn đã chọn",
      okText: "Đồng ý",
      okType: "primary",
      onOk() {
        onApi(record);
      },
      onCancel() {},
    });
  };
  const onApi = async (row) => {
  };
  return (
    <div className={className}>
        <DefineTable
          bordered
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
