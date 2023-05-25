//   const [expected, setExpected] = useState([]);       //dự kiến
//   const [licensing, setLicensing] = useState([]);     //đã cấp
//   const [processing, setProcessing] = useState([]);   //đang thực hiện
//   const [success, setSuccess] = useState([]);         //thành công
//   const [refuse , setRefuse ] = useState([]);         //từ chối


import { Tabs, message, Col, Button, Drawer, Spin, Modal } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import styled from "styled-components";
import Expected from './Expected';
import Processing from './Processing';
import Refuse from './Refuse';
import moment from "moment";
import TabTable from './TabTable';
import Filter from './Filter';
import { command } from 'configs';

const SignCommand = ({
    className,
}) => {
    const [isShowModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const [allData, setAllData] = useState([]);
    const [allRoute, setAllRoute] = useState([]);



    const [params, setParams] = useState({
        date_from: moment(),
        date_to: moment(),
        route: undefined,
        direction: undefined,
        status: 1,
        page: 1,
        size: 20,
    });
    const onHiddenModal = useCallback(() => {
        setShowModal(false);
    });

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getAllData = useCallback(async () => {
        setAllData([])
        const payload = {
            route: params.route,
            direction: params.direction,
            status: params.status,
            page: params.page,
            size: params.size,
            date_from: moment(params.date_from).format("YYYY-MM-DD"),
            date_to: moment(params.date_to).format("YYYY-MM-DD"),
        }
        setLoading(true)
        command.getCommand(payload)
            .then(res => {
                if (res.status === 200) {
                    setAllData(res?.data?.data)
                    setItemSelected([])
                    setLoading(false)
                }
            })
            .catch(err => {
                message.error("Có lỗi xảy ra !")
            })
    }, [params]);



    const getAllRoutes = useCallback(async () => {
        command.getCommandRoutes()
            .then(res => {
                if (res.status === 200) {
                    const allRoute = []
                    res?.data?.data.map(item => {
                        allRoute.push({
                            ...item,
                            value: item?.id,
                            label: item?.name,
                        })
                    })
                    setAllRoute(allRoute)
                }
            })
            .catch(err => {
                message.error("Có lỗi xảy ra !")
            })
    }, []);




    const onChange = (key) => {
        setParams((prevState) => {
            let nextState = { ...prevState };
            nextState.status = key;
            return nextState;
        });
    };

    const onSignAll = useCallback(async () => {
        const payload = {
            ids: itemSelected
        }
        if (itemSelected.length > 0) {
            command.signCommand(payload).then(res => {
                if (res.status === 200) {
                    onRefreshList()
                    handleCancel()
                }
            }).catch(err => {
                message.error("Có lỗi xảy ra !")
            })
            message.success("Kí lệnh thành công.");
        } else {
            message.warning("Vui lòng chọn 1 bản ghi!")
        }
    }, [itemSelected]);



    const onSign = useCallback(async (ids) => {
        var arr = [];
        arr.push(ids);
        const payload = {
            ids: arr
        }
        command.signCommand(payload).then(res => {
            if (res.status === 200) {
                onRefreshList()
                message.success("Kí lệnh thành công.");
            }
        }).catch(err => {
            message.error("Có lỗi xảy ra !")
        })
    }, []);


    const onRefreshList = () => {
        getAllData();
    }

    useEffect(() => {
        getAllRoutes();
        getAllData();
    }, [getAllRoutes, getAllData]);


    return (
        <div className={className}>
            <div style={{ zIndex: 1, float: 'right', top: 90, right: 33, position: 'absolute', }}>
                <Button onClick={() => setShowModal(true)} style={{ backgroundColor: '#00A991', color: '#fff', borderRadius: 6, height: 35, width: 120 }}>Tạo lệnh</Button>
            </div>
            <Tabs defaultActiveKey={params?.status} style={{ width: '100%' }} onChange={onChange}>
                <Tabs.TabPane tab="Dự kiến" key="1">
                    <Filter params={params} setParams={setParams} allRoute={allRoute} showModal={showModal} />
                    <Expected
                        data={allData}
                        params={params}
                        setParams={setParams}
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
                        onRefreshList={onRefreshList}
                        loading={loading}
                        onSign={onSign}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đang thực hiện" key="2">
                    <Filter params={params} setParams={setParams} allRoute={allRoute} />
                    <Processing
                        data={allData}
                        params={params}
                        setParams={setParams}
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
                        loading={loading}
                        onRefreshList={onRefreshList}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Từ chối" key="3">
                    <Filter params={params} setParams={setParams} allRoute={allRoute} />
                    <Refuse
                        data={allData}
                        params={params}
                        setParams={setParams}
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
                        loading={loading}
                    />
                </Tabs.TabPane>
            </Tabs>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Nunito', fontWeight: 600 }}>Bạn có chắc chắn muốn ký những lệnh này không ?</div>
                <div
                    className="action"
                    style={{
                        width: "100%",
                        background: "#fff",
                        textAlign: "center",
                        marginTop:20
                    }}
                >
                    <Button type="danger" style={{ color: '#fff', borderRadius: 6, height: 35, width: 120 }} onClick={handleCancel}>
                        Thoát
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        onClick={onSignAll}
                        type="primary"
                        style={{ color: '#fff', borderRadius: 6, height: 35, width: 120 }}
                    >
                        Ký lệnh
                    </Button>
                </div>
            </Modal>
            <Drawer
                destroyOnClose
                width={"80%"}
                title={<div style={{ fontFamily: 'Nunito', fontSize: 16, fontWeight: 700, color: '#01579B' }}>Tạo lệnh vận chuyển</div>}
                placement="right"
                closable={false}
                onClose={onHiddenModal}
                visible={isShowModal}
            >
                {
                    allRoute.length !== 0 ? <TabTable
                        onHiddenModal={onHiddenModal}
                        allRoute={allRoute}
                        onRefreshList={onRefreshList}
                    /> : <Spin></Spin>

                }

            </Drawer>
        </div>
    )

};
export default styled(SignCommand)`
.ant-tabs-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 12px 0;
    font-size: 16px;
    background: transparent;
    border: 1px solid white !important;
    outline: none;
    cursor: pointer;
    width: 150px !important;
    font-weight: 500 !important;
    font-family: Nunito;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-weight: 400 !important;
    font-family: Nunito !important;
    color:#01579B !important;
}

`;