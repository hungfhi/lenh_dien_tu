import { EditTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { DefineTable } from "components";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableRoles = ({
  className,
  profile,
  scroll_Y,
  _dataBin,
  _handleShowModal,
  setParams,
  total,
}) => {
  let columns = [
    {
      title: "#",
      width: 50,
      dataIndex: "code",
      align: "center",
      render: (text, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên hiển thị",
      width: 200,
      dataIndex: "name",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Thao tác",
      width: 80,
      dataIndex: "code",
      render: (text, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              _handleShowModal(true, true, record.id);
            }}
          >
            <i
              class="fa-regular fa-pen-to-square"
              style={{ color: "#01579B", fontSize: 20 }}
            ></i>
          </Button>
          {/* <Button
                        size="small"
                        type="link"
                        onClick={() => {
                        }}
                    >
                        <DeleteTwoTone twoToneColor="#fb0000"/>
                    </Button> */}
        </>
      ),
    },
  ];
  return (
    <div>
      <DefineTable
        bordered
        columns={columns}
        dataSource={_dataBin}
        scroll={{ x: "100%" }}
        rowKey="tableRole"
        pagination={false}
      />
    </div>
  );
};

TableRoles.propTypes = {
  className: PropTypes.any,
};
export default styled(TableRoles)``;
