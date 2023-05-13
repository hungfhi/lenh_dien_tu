/**
 * Input (Styled Component)
 */
import React, { useCallback } from "react";
import styled from "styled-components";
import { Table } from "antd";
import PropTypes from "prop-types";

const StyledInput = ({
  className,
  columns,
  dataSource,
  summary,
  scroll_Y,
  expandable,
  rowSelection,
  sticky,
  scroll,
  onRow
}) => {
  let maxHeight = window.innerHeight;
  maxHeight = (maxHeight * 62) / 100;
  let objScroll = { x: "100%" };
  if (maxHeight) {
    objScroll = { ...objScroll, ...{ y: scroll_Y ? scroll_Y : maxHeight } };
  }
  return (
    <div className={className}>
      <Table
        bordered
        columns={columns}
        onRow={onRow}
        dataSource={dataSource}
        rowSelection={rowSelection}
        expandable={expandable}
        // scroll={scroll == false ? false : objScroll}
        scroll={scroll}
        sticky={true}
        // rowKey={() => {
        //   return new Date().getTime()
        // }}
        summary={summary}
        pagination={false}
      />
    </div>
  );
};

StyledInput.propTypes = {
  className: PropTypes.any,
  placeholder: PropTypes.any,
};
export default styled(StyledInput)`
  .ant-row-end {
    display: none
  }
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .ant-table-thead > tr > th {
    // background: #F0F2F5;
    color: #605e5c;
    font-family: Nunito;
    font-style: normal;
    font-weight: 550;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    // text-transform: uppercase;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .ant-table-expanded-row-fixed {
    height: 100px;
    .ant-empty-normal {
      margin: auto 0;
      .ant-empty-normal .ant-empty-image {
        height: 30px;
      }
    }
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
  .ant-table-expanded-row-level-1{
    display: none !important;
  }
`;
