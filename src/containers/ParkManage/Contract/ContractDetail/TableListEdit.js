import { Button, Col, Form, Input, Row, InputNumber, Switch, DatePicker, Checkbox, message, Select, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect, memo } from "react";
import styled from "styled-components";
import TabTable from "./TabTable";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import TabTableEdit from "./TabTableEdit";
import { station } from "configs";
const { Option } = Select;
const { TextArea } = Input;
let inputTimer = null;
const TableList = memo(({ className, onSave, isEdit, stations, transport, startDate, endDate, stationConvert,  setStartDate, setEndDate,onRefreshList }) => {
  const navigate = useNavigate();
  const [itemCar, setItemCar] = useState(isEdit?.contract_merchant_route_vehicles);
  const [itemTime, setItemTime] = useState(isEdit?.contract_merchant_route_nodes);
  const [car, setCar] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [time, setTime] = useState([]);
  const [merchant, setMerchant] = useState(undefined);
  const [stati, setStati] = useState([]);



useEffect(() => {
  if (isEdit) {
      setCar(isEdit?.contract_merchant_route_vehicles)
      setTime(isEdit?.contract_merchant_route_nodes)
  }
}, [merchant, stati,isEdit]);

  const [form] = Form.useForm();
  const date = (value) => {
    const d = value.substr(0, 11).split("-")
    return d[2] + "-" + d[1] + "-" + d[0];
  }
  const station_id = []
  _.map(isEdit?.stations, (item) => {
    return station_id.push(item?.id)
  })


  const _changeQuery = useCallback(
    (value) => {
      if (inputTimer) {
        clearTimeout(inputTimer);
      }
      inputTimer = setTimeout(() => {
        setStati(value)
      }, 900);
    },
    [setStati]
  );

  function disableDateRanges(range = { startDate: false, endDate: false }) {
    const { startDate, endDate } = range;
    return function disabledDate(current) {
      let startCheck = true;
      let endCheck = true;
      if (startDate) {
        startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
      }
      if (endDate) {
        endCheck = current && current > moment(endDate, 'YYYY-MM-DD');
      }
      return (startDate && startCheck) || (endDate && endCheck);
    };
  }



  const onFinish = async (values) => {
    const update_car_contract = []
    let update_node_contract = []
    let car_data = car.filter(function (item) {
        return itemCar.indexOf(item.id) != -1;
    });
    _.map(car_data, (items) => {
        update_car_contract.push({
            merchant_route_vehicle_id: items.id,
            start_date: items.start_date || null,
            end_date: items.end_date || null,
            trip_number: items.trip_number || null,
            service_price: items.service_price || null,
            is_fixed_time: items.is_fixed_time || null,
            fixed_time: items.fixed_time || null,
            status: items.status || null,
            start_date_stop: items.start_date_stop || null,
            end_date_stop: items.end_date_stop || null,
            is_associate_commerce: items.is_associate_commerce || null,
            associate_commerce_id: 2,
            note: items.note || null,
            is_pay_later: items.is_pay_later || null,
        });
    })

    let time_data = time.filter(function (item) {
        return itemTime.indexOf(item.id) != -1;
    });
    _.map(time_data, (items) => {
        update_node_contract.push({
            merchant_route_node_id: items.id,
            start_date: items.start_date || null,
            end_date: items.end_date || null,
            trip_number: items.trip_number || null,
            status: items.status || null,
            start_date_stop: items.start_date_stop || null,
            end_date_stop: items.end_date_stop || null,
            note: items.note || null,
        });
    })
    onSave(values, update_car_contract, update_node_contract)
  };

  const onFinishFailed = () => {
  };

  const is_full_package = isEdit?.is_full_package?.value === 1 ? true : false


  return (
    <div className={className}>
      <Form
        onFinishFailed={onFinishFailed}
        className={className}
        onFinish={onFinish}
        name="control-hooks"
        initialValues={{
          name: isEdit && isEdit.name || '',
          contract_number: isEdit && isEdit.contract_number || '',
          contract_code: isEdit && isEdit.contract_code || '',
          address: isEdit && isEdit.address || '',
          tax_code: isEdit && isEdit.tax_code || '',
          merchant_id: isEdit && isEdit.merchant_id || undefined,
          email: isEdit && isEdit.email || '',
          start_date: isEdit && moment((date(isEdit?.start_date))) || moment(),
          end_date: isEdit && moment((date(isEdit?.end_date))) || moment(new Date()).endOf('year'),
          stations: station_id,
          is_full_package: is_full_package === 1 ? true : false || true,
          status: 1,
          overnight_price: isEdit && isEdit.overnight_price || '',
        }}
        form={form}
      >
        <Row gutter={[8, 0]}>
          <Col span={8}>
            <div>Số hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="contract_number"
              rules={[
                { required: true, message: "Vui lòng nhập số hợp đồng" },
                {
                  pattern: new RegExp(/^[0-9]+$/i),
                  message: "Chỉ được nhập số",
                },
              ]}
            >
              <Input placeholder={"Số hợp đồng"} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div>Mã hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="contract_code"
              rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
            >
              <Input placeholder={"Mã hợp đồng"} />
            </Form.Item>

          </Col>
          <Col span={8}>
            <div>Tên hợp đồng<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
            >
              <Input placeholder={"Tên hợp đồng"} />
            </Form.Item>

          </Col>
          <Col span={8}>
            <div>Đơn vị vận tải<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="merchant_id"
              rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
            >
              <Select
                disabled={isEdit ? true : false}
                allowClear={false}
                placeholder={"Đơn vị vận tải"}
                showSearch
                style={{ width: '100%' }}
                filterOption={(input, option) =>
                  option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                }
                onSelect={(e, value) => {
                  setMerchant(value?.value)
                  form.setFieldsValue({
                    email: value.email,
                    address: value?.address,
                    tax_code: value?.tax_code
                  })
                }}
              >
                {
                  _.map(transport, (item) => {
                    return (<Option key={item.id} value={item.id} email={item.email} address={item.address} tax_code={item.tax_code}>{item.name}</Option>)
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <div>Bến xe<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="stations"
              rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
            >
              <Select
                disabled={isEdit ? true : false}
                allowClear={false}
                mode="multiple"
                placeholder={"Bến xe"}
                showSearch
                style={{ width: '100%' }}
                filterOption={(input, option) =>
                  option.children.toString().toLowerCase().indexOf(input.toLowerCase()) > 0
                }
                onChange={(e, value) => {
                  _changeQuery(value)
                }}
              >
                {
                  _.map(stations, (item) => {
                    return (<Option key={item.value} value={item.value}>{item.label}</Option>)
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <div>Địa chỉ</div>
            <Form.Item name="address">
              <Input placeholder={"Nhập địa chỉ"} disabled />
            </Form.Item>

          </Col>
          <Col span={8}>
            <div>Mã số thuế<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="tax_code"
              rules={[
                { required: true, message: "Vui lòng nhập mã số thuế" },
                {
                  pattern: new RegExp(/^[0-9]+$/i),
                  message: "Chỉ được nhập số",
                },
              ]}
            >
              <Input placeholder="Nhập mã số thuế" style={{ width: '100%' }} disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div>Email<span style={{ color: '#dc2d2d' }}>*</span></div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Vui lòng nhập đúng định dạng E-mail!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập E-mail!',
                },
              ]}
            >
              <Input placeholder={"Nhập E-mail!"} disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Row>
              <span style={{ fontWeight: 600 }}>Giá lưu đêm được ký thu trọn gói &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span style={{ marginTop: -4 }}>
                <Form.Item name="is_full_package" valuePropName="checked">
                  <Checkbox style={{ color: '#01579B' }} size="large" />
                </Form.Item>
              </span>
            </Row>
            <div style={{ marginTop: -30 }}>
              <Form.Item
                name="overnight_price"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền từ 1000 trở lên' },]}
              >
                <InputNumber min={1000} put placeholder={"Nhập giá trị tiền lưu đêm trọn gói"} style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </div>
          </Col>
          <Col span={8}>
            <div>Ngày bắt đầu<span style={{ color: '#dc2d2d' }}>(*)</span></div>
            <Form.Item
              name="start_date"
              rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
            >
              <DatePicker
                disabled={isEdit ? true : false}
                disabledDate={disableDateRanges({ startDate: moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"), endDate: moment(endDate).format("YYYY-MM-DD") })}
                allowClear={false}
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={(date) => {
                  setStartDate(date)
                }}
              />
            </Form.Item>

          </Col>
          <Col span={8}>
            <div>Ngày kết thúc<span style={{ color: '#dc2d2d' }}>(*)</span></div>
            <Form.Item
              name="end_date"
              rules={[{ required: true, message: 'Vui lòng nhập dữ liệu' }]}
            >
              <DatePicker
                allowClear={false}
                disabled={isEdit ? true : false}
                style={{ width: '100%' }}
                format={'DD-MM-YYYY'}
                disabledDate={disableDateRanges({ startDate: moment(startDate).format("YYYY-MM-DD") })}
                onChange={(date) => {
                  setEndDate(date)
                }}
              />
            </Form.Item>
          </Col>
          <br />
          <br />
          {
            isEdit ? <Col span={24}>
              <Spin spinning={isLoad}>
                <TabTableEdit
                  car={car}
                  setCar={setCar}
                  setTime={setTime}
                  setItemCar={setItemCar}
                  itemCar={itemCar}
                  time={time}
                  setItemTime={setItemTime}
                  itemTime={itemTime}
                  startDate={startDate}
                  endDate={endDate}
                  isLoad={isLoad}
                  setIsLoad={setIsLoad}
                  isEdit={isEdit}
                  onRefreshList={onRefreshList}
                />
              </Spin>
            </Col> : <Col span={24}></Col>}

          {(car.length !== 0 || time.length !== 0) && !isEdit ? <Col span={24}>
            <Spin spinning={isLoad}>
              <TabTable
                car={car}
                setCar={setCar}
                setTime={setTime}
                setItemCar={setItemCar}
                itemCar={itemCar}
                time={time}
                setItemTime={setItemTime}
                itemTime={itemTime}
                startDate={startDate}
                endDate={endDate} 
                isEdit={isEdit}
                
                />
            </Spin>
          </Col> : <Col span={24}></Col>}
        </Row>
        <div
          className="action"
          style={{
            right: 0,
            bottom: 0,
            width: "100%",
            padding: "10px 0px",
            background: "#fff",
            textAlign: "left",
          }}
        >
          <Button style={{ backgroundColor: '#9B0101', color: '#fff', borderRadius: 6, height: 35, width: 120 }} onClick={() => navigate(`/contract`, { replace: true })}>
            Thoát
          </Button>
          {
            !isEdit ? <Button
              htmlType="submit"
              disabled={isEdit ? true : false}
              style={{ borderRadius: 6, height: 35, width: 120, backgroundColor: isEdit ? '#8c8c8c' : '#01579B', color: isEdit ? '' : '#fff', marginLeft: 20 }}
            >
              Thêm mới
            </Button> : <Button
              disabled={isEdit ? true : false}
              style={{ borderRadius: 6, height: 35, width: 150, backgroundColor: '#FEA032', color: '#fff', marginLeft: 20 }}
            >
              Kết thúc hợp đồng
            </Button>
          }
          {isEdit ?
            <Button
              style={{ borderRadius: 6, height: 35, width: 120, backgroundColor: '#F57F17', color: '#fff', marginLeft: 20 }}
            >
              In
            </Button>
            : ''}
          {isEdit ?
            <Button
              style={{ borderRadius: 6, height: 35, width: 120, backgroundColor: '#00A991', color: '#fff', marginLeft: 20 }}
            >
              Lịch sử
            </Button>
            : ''}


        </div>
      </Form>

    </div>
  );
});
TableList.propTypes = {
  className: PropTypes.any,
};
export default styled(TableList)`
  
`;
