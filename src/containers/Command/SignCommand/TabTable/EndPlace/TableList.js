import { Pagination, Row, Switch } from "antd";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import moment from 'moment';
import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import { DefinePagination, DefineTable } from "components";
const TableList = memo(({ className, data, params, total, setItems, items, setParams, setItemSelected, itemSelected }) => {

  const removeItems = (array, itemToRemove) => {
    return array.filter(v => {
      return !itemToRemove.includes(v);
    });
  }

  const _handleSelectAll = useCallback((selected, selectedRows, changeRows) => {
    if (!selected) {
      setItemSelected(removeItems(itemSelected, items))
      setItems([])
    } else {
      if (data.length === items.length) {
        setItemSelected(removeItems(itemSelected, items))
        setItems([])
      } else {
        let selectKeyNew = [];
        selectedRows.map((item) => {
          selectKeyNew.push(item.id)
        })
        setItems(selectKeyNew);
        const arr = selectKeyNew.concat(itemSelected);
        var uniq = arr.reduce(function (a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, []);
        setItemSelected(uniq)
      }
    }
  }, [itemSelected, items]
  );


  console.log('itemSelected', itemSelected)



  const _handleSelect = useCallback((record, status) => {
    if (!items.includes(record.id)) {
      const selectKeyNew = [...items]
      selectKeyNew.push(record.id)
      setItems(selectKeyNew)
      const arr = selectKeyNew.concat(itemSelected);
      var uniq = arr.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);
      setItemSelected(uniq)
    } else {
      const selectKeyNew = [...items]
      const index = selectKeyNew.indexOf(record.id);
      const indexs = itemSelected.indexOf(record.id);
      const arr = [...itemSelected]
      selectKeyNew.splice(index, 1);
      arr.splice(indexs, 1);
      setItems(selectKeyNew)
      setItemSelected(arr)
    }
  }, [itemSelected, items]
  );



  const columns = [
    {
      title: "Nốt",
      dataIndex: "time",
      width: 200,
      fixed: "left",
    },
    {
      title: "Kế hoạch",
      dataIndex: "name",
    },
  ];


  return (
    <div className={className}>
      <DefineTable
        rowSelection={{
          selectedRowKeys: items,
          onSelect: _handleSelect,
          onSelectAll: _handleSelectAll,
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div >
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
.ant-table-thead > tr > th {
  background: #fff !important;
  color: #000 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  font-family: Nunito !important;
}
`;
