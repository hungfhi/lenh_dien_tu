import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Row, Tooltip, Empty } from "antd";
import _, { ceil } from "lodash";
import moment from 'moment';
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";


const Loyalty = ({ className, pointReceive, stations, data, onEdit }) => {
  const [stickyCss, setStickyCss] = useState(10);
  const [scollX, setScollX] = useState(10);


  const dataOption = [
    {
      name: "vehicle",
      adm_name: "xe_bien_kiem_soat",
      did_id: "did_id",
      did_xe_id: "did_xe_id",
      url: "/v1/vehicle",
      placeholder: "Chọn BKS",
      name_item: "Xe",
      number: 1,
      partner_approve: 1,
      message: "Gán xe thành công",
      dit_id: "dit_id",
    },
  ];

  const renderRatito = (checked) => {
    return <Checkbox checked={checked}></Checkbox>
  }


  return (
    <>
      <Row className={className} gutter={[16, 16]}>
        <div id="table-scroll" class="table-scroll">
          <div class="table-wrap">
            <table class="main-table">
              <thead className={` ${className} sticky`}>
                <tr>
                  <th
                    className="header fixTopOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 85, zIndex: 2, }}
                  >
                    <div>Mã hợp đồng</div>
                  </th>
                  <th
                    className="header fixTopOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 85, zIndex: 2, }}
                  >
                    <div>Số hợp đồng</div>
                  </th>
                  <th
                    className="header fixTopOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 150, zIndex: 2, }}
                  >
                    <div>Tên hợp đồng</div>
                  </th>
                  <th
                    className="header fixTopOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 150, zIndex: 2, }}
                  >
                    <div>Thời hạn</div>
                  </th>
                  <th
                    className="header fixTopOne  stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 150, zIndex: 2, }}
                  >
                    <div>Tên khách hàng</div>
                  </th>

                  {_.map(stations, (item, index) => {
                    let resultScroll = stickyCss && scollX >= item.width
                    return (
                      <th
                        className={`tg-0pky header text-center fixTopOne`}
                        style={{
                          top: 0,
                          position: stickyCss && "relative",
                          border: resultScroll && 'none',
                          minWidth: 100, zIndex: 2,
                        }}
                        key={index}
                      >
                        <div style={{ color: '#fff' }} >
                          {resultScroll ? "" : item.name}
                        </div>
                      </th>

                    );
                  })}
                  <th
                    className="header fixTopOne fixLeftOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 85, zIndex: 2, }}
                  >
                    <div>Active</div>
                  </th>
                  <th
                    className="header fixTopOne fixLeftOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 200, zIndex: 2, }}
                  >
                    <div>Địa chỉ</div>
                  </th>
                  <th
                    className="header fixTopOne fixLeftOne stickyLeft"
                    rowspan="2"
                    style={{ minWidth: 85, zIndex: 2, }}
                  >
                    <div>Thao tác</div>
                  </th>
                </tr>
              </thead>
              {data?.length !== 0 ?<tbody style={{ fontSize: 13 }} className={className}>
                {_.map(data, (item, index) => {
                  let _render = [];
                  let _renderTT = (
                    <>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft  borderBottom`}
                        style={{
                          minWidth: "125px", color: '#444'
                        }}
                        rowSpan="1"
                        key={`${index}-1`}
                      >
                        <div className="d-flex">{item.contract_code}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "125px", color: '#444'
                        }}
                        rowSpan="1"
                        key={`${index}-2`}
                      >
                        <div className="d-flex">{item.contract_number}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "125px", color: '#444'
                        }}
                        rowSpan="1"
                        key={`${index}-3`}
                      >
                        <div className="d-flex">{item.name}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "180px", color: '#444'
                        }}
                        rowSpan="1"
                        key={`${index}-3`}
                      >
                        <div className="d-flex">{moment(item?.start_date).format("DD/MM/YYYY")} - {moment(item?.end_date).format("DD/MM/YYYY")}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft fixLeft borderBottom`}
                        style={{
                          minWidth: "125px", color: '#444'
                        }}
                        rowSpan="1"
                        key={`${index}-3`}
                      >
                      </td>
                    </>
                  );
                  let _renderActive = (
                    <>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft fixLeft borderBottom`}
                        style={{
                          minWidth: "85px",
                        }}
                        rowSpan="1"
                        key={`${index}-1`}
                      >
                        <Checkbox checked={item?.is_active}></Checkbox>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft fixLeft borderBottom`}
                        style={{
                          minWidth: "125px",
                        }}
                        rowSpan="1"
                        key={`${index}-1`}
                      >
                        <div>{item?.address}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft fixLeft borderBottom`}
                        style={{
                          minWidth: "125px",
                        }}
                        rowSpan="1"
                        key={`${index}-1`}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <Tooltip placement="topLeft">
                            <Button
                              type="link"
                              icon={<EditOutlined />}
                              onClick={() => onEdit(item?.id)}
                            />
                          </Tooltip>
                        </div>
                      </td>
                    </>
                  );
                  // eslint-disable-next-line no-lone-blocks
                  {
                    _.map(dataOption, (label, key) => {
                      _render.push([
                        <tr key={`${index}-1`} className="">
                          {key == 0 && _renderTT}
                          {_.map(item.arrNew, (value, keyValue) => {
                            let checked = value?.ativeNew === 1 ? 1 : 0
                            return (
                              <td
                                className={`tg-73oq  text-center customerBorderRight  ${key ==
                                  4 && "borderBottom"}`}
                                style={{
                                  width: 100,
                                }}
                                key={`${keyValue}`}
                              >
                                {renderRatito(checked)}
                              </td>
                            );
                          })}
                          {_renderActive}
                        </tr>,
                      ]);
                    });
                  }
                  return _render;
                })}
              </tbody> : <p><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></p> }
              
            </table>
          </div>
        </div>
      </Row>
    </>
  )
};

Loyalty.propTypes = {
  className: PropTypes.any,
};
export default styled(Loyalty)`

table {
  display: inline-table;
}

.table-scroll {
 	position:relative;
 	max-width:100%;
  width: 100%;
 	border-left:1px solid #red;
}


.table-wrap {
 	width:100%;
 	overflow: scroll;
}
 .table-scroll table {
 	width:100%;
 	margin:auto;
 	border-collapse:collapse;
 	border-spacing:0;
}
 .table-scroll th, .table-scroll td {
 	padding:5px 10px;
 	background:#fff;
 	white-space:nowrap;
}

td:first-child, th:first-child {
  position:sticky;
  left:0;
  z-index:1;
}
td:last-child, th:last-child {
  position:sticky;
  right:0;
  z-index:1;
  border-left:1px solid #e5e5e8;
}
.tg {
  border-color: rgb(242, 243, 248);
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
  overflow-x: auto;
  overflow-y: auto;
}
.customerBorderRight {
  border-bottom: 1px solid #e5e5e8 !important;
  border-right: 1px solid #e5e5e8 !important;
}
.borderTop {
  border-top: 1px solid #e5e5e8 !important;
}
.borderLeft {
  border-left: 1px solid #e5e5e8 !important;
}

.border {
  border: 1px solid #e5e5e8 !important;
}
.tg td {
  background-color: #fff;
  color: #444;
}
.tg th {
  color: black;
}

::-webkit-scrollbar {
  width: 100px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 

::-webkit-scrollbar-thumb {
  background: yellow; 
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}

.header {
  background: #01579B !important;
  color: #fff;
  border: 1px solid #ccc !important;
  font-family: Nunito;
  font-style: normal;
  font-weight: 550;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.tg {
  border-color: rgb(242, 243, 248);
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
  overflow-x: auto;
  overflow-y: auto;
}

.tg .tg-iks7 {
  border-color: rgb(242, 243, 248);
}
.tg .tg-mois {
  background-color: #ffffff;
  border-color: #000000;
  text-align: left;
}

.hidden-item {
  background: #efeded !important;
}


.height100 {
  height: 100%;
}

.fixLeft {
  left: 0px;
  z-index: 1;
  position: sticky;
}
.fixLeftOne {
  left: 125px;
  z-index: 2;
  position: sticky;
}
.fixTop {
  top: 0;
  z-index: 1;
}

`;










