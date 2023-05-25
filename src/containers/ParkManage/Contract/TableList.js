import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Row, Tooltip, Empty } from "antd";
import _, { ceil } from "lodash";
import moment from 'moment';
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Loyalty = ({ className, pointReceive, stations, data, onEdit }) => {
  const navigate = useNavigate();
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
    return  <div>{checked!==0 ? <div style={{fontSize:18}}>✔</div> :""}</div>
  }

  const renderActive = (is_active) => {
    if (is_active === 1) {
      return <div style={{ color: '#00A991', fontWeight: 700, fontFamily: 'Nunito' }}>Đang hoạt động</div>
    } else if (is_active === 2) {
      return <div style={{ color: '#9B0101', fontWeight: 700, fontFamily: 'Nunito' }}>Kết thúc hợp đồng</div>
    }
    else return <div style={{ color: '#F57F17', fontWeight: 700, fontFamily: 'Nunito' }}>Hết hạn hợp đồng</div>
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
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 85 }}
                  >
                    <div>Mã hợp đồng</div>
                  </th>
                  <th
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 85 }}
                  >
                    <div>Số hợp đồng</div>
                  </th>
                  <th
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 150 }}
                  >
                    <div>Tên hợp đồng</div>
                  </th>
                  <th
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 150 }}
                  >
                    <div>Thời hạn</div>
                  </th>
                  <th
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 150 }}
                  >
                    <div>Tên khách hàng</div>
                  </th>

                  {_.map(stations, (item, index) => {
                    let resultScroll = stickyCss && scollX >= item.width
                    return (
                      <th
                        className={`tg-0pky header text-center`}
                        style={{
                          top: 0,
                          position: stickyCss && "relative",
                          border: resultScroll && 'none',
                          minWidth: 100
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
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 85 }}
                  >
                    <div>Active</div>
                  </th>
                  <th
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 150 }}
                  >
                    <div>Địa chỉ</div>
                  </th>
                  <th
                    className="header"
                    rowspan="2"
                    style={{ minWidth: 85 }}
                  >
                    <div>Thao tác</div>
                  </th>
                </tr>
              </thead>
              {data?.length !== 0 ? <tbody style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)' }} className={className}>
                {_.map(data, (item, index) => {
                  let _render = [];
                  let _renderTT = (
                    <>
                      <td
                        className={`tg-73oq border borderBottom`}
                        style={{
                          minWidth: "125px", color: 'rgba(0, 0, 0, 0.85)'
                        }}
                        rowSpan="1"
                        key={`${index}-1`}
                      >
                        <div className="d-flex">{item.contract_code}</div>
                      </td>
                      <td
                        className={`tg-73oq customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "125px", color: 'rgba(0, 0, 0, 0.85)'
                        }}
                        rowSpan="1"
                        key={`${index}-2`}
                      >
                        <div className="d-flex">{item.contract_number}</div>
                      </td>
                      <td
                        className={`tg-73oq customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "125px", color: 'rgba(0, 0, 0, 0.85)'
                        }}
                        rowSpan="1"
                        key={`${index}-3`}
                      >
                        <div className="d-flex">{item.name}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "180px", color: 'rgba(0, 0, 0, 0.85)'
                        }}
                        rowSpan="1"
                        key={`${index}-4`}
                      >
                        <div className="d-flex">{item?.start_date} - {item?.end_date}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft fixLeft borderBottom`}
                        style={{
                          minWidth: "125px", color: 'rgba(0, 0, 0, 0.85)'
                        }}
                        rowSpan="1"
                        key={`${index}-5`}
                      > <div className="d-flex">{item?.merchant?.name}</div>
                      </td>
                    </>
                  );
                  let _renderActive = (
                    <>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderBottom`}
                        style={{
                          minWidth: "85px",
                        }}
                        rowSpan="1"
                        key={`${index}-6`}
                      >
                        {renderActive(item?.status_contract?.value)}
                      </td>
                      <td
                        className={`tg-73oq customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "125px",
                        }}
                        rowSpan="1"
                        key={`${index}-7`}
                      >
                        <div>{item?.address}</div>
                      </td>
                      <td
                        className={`tg-73oq text-center customerBorderRight borderLeft borderBottom`}
                        style={{
                          minWidth: "85px",
                        }}
                        rowSpan="1"
                        key={`${index}-8`}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <Tooltip placement="topLeft">
                            <Button
                              type="link"
                              onClick={() => navigate(`/contract-detail?id=${item?.id}`, { replace: false })}
                            >
                              <i class="fa-regular fa-pen-to-square" style={{ color: '#01579B', fontSize: 20 }}></i>
                            </Button>
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
              </tbody> : <p><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></p>}

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
 	padding:0px 10px;
 	background:#fff;
 	white-space:nowrap;
}

td:first-child, th:first-child {
  position:sticky !important;
  left:0;
  z-index:1;
  border: 1px solid #e5e5e8 !important;
}
td:last-child, th:last-child {
  position:sticky;
  right:0;
  z-index:1;
  border-left:1px solid #e5e5e8;
}
.tg {
  border-color: #e5e5e8;
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
.fixTop {
  top: 0;
  z-index: 1;
}

`;










