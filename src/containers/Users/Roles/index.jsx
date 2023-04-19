import { Col, Row } from "antd";
import { users } from "configs";
import { Map } from "immutable";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Ui } from "utils/Ui";
import Filter from "./Filter";
import Modal from "./Modal";
import Table from "./Table";
import { formatBody, formatParams } from "./constants";

const Roles = ({ className, profile }) => {

    const [modal, setModal] = useState(Map({ visible: false, isEdit: false, uuid: "" }));
    const [body, setBody] = useState({
        name: "",
        description: "",
        permissions: [],
    });

    const [initValue, setInitValue] = useState();
    const [params, setParams] = useState({
        per_page: 10,
        page: 1
    })
    const [sumRole, setSumrole] = useState(0)
    const [role, setRoles] = useState([])
    const [permissions, setPermission] = useState([])
    const _handleShowModal = useCallback((visible, isEdit, uuid) => {
        setModal((prev) => {
          let next = prev;
          next = next.set("visible", visible);
          next = next.set("isEdit", isEdit ? isEdit : false);
          next = next.set("uuid", uuid ? uuid : "");
          return next;
        });
        setBody({
            name: "",
            description: "",
            permissions: [],
        })
    }, []);
    const onLoad = useCallback(async () => {
        let newParam = formatParams(params)
          users.getRoles(newParam)
            .then(res => {
              if (res.status === 200) {
                setRoles(res?.data?.data)
                setSumrole(res?.data?.meta?.total)
              }
            })
            .catch(err => {
              Ui.showError({ message: err?.response?.data?.message });
            })
    }, [params]);

    const onCreted = useCallback(async () => {
        let payload = {
            name:body?.name,
            description:body?.description,
            permissions: body?.permissions
        }
        users.createRoles(payload)
        .then(res => {
          if (res.status === 200) {
            Ui.showSuccess('Tạo mới thành công')
            _handleShowModal(false)
            onLoad()
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
        })
    }, [body]);

    const onUpdate = useCallback(async () => {
        let newBody = formatBody(body)
        let payload = {
            uuid : modal.get('uuid'),
            name:newBody?.name,
            description:newBody?.description,
            permissions: newBody?.permissions
        }
        users.updateInfoRoles(payload)
        .then(res => {
          if (res.status === 200) {
            Ui.showSuccess('Update thành công')
            _handleShowModal(false)
            onLoad()
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
        })


        // const result = await ServiceBase.requestJson({
        //   method: "PUT",
        //   url: `update-role/${modal.get('uuid')}`,
        //   data: payload
        // });
        // if (result.hasErrors) {
        //   Ui.showErrors(result.errors);
        // } else {
        //     Ui.showSuccess('Update thành công')
        //     _handleShowModal(false)
        //     onLoad()
        // }
    }, [body]);

    const onLoadPermission = useCallback(async () => {
        let newParam = formatParams(params)
        users.getPermissions(newParam)
        .then(res => {
          if (res.status === 200) {
            setPermission(res?.data?.data)
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
        })

    }, [params]);

    const onGetRole = useCallback(async () => {
        let payload = {
            uuid:  modal.get('uuid')
        }
        users.getDetailRoles(payload)
        .then(res => {
          if (res.status === 200) {
            setBody(res?.data?.data)
            setInitValue(res?.data?.data)
          }
        })
        .catch(err => {
          Ui.showError({ message: err?.response?.data?.message });
        })
    }, [modal]);
    useEffect(() => {
    
        onLoad()
    }, [params])
    useEffect(() => {
        if(modal.get('isEdit') == true && modal.get('uuid') != ""){
            onGetRole()
        }
        onLoadPermission()
    }, [modal])
    return (
        <Row className={className} gutter={[16, 16]}>
            <Col xs={24}>
                <Filter onCloseModal={_handleShowModal} setParams={setParams} params={params}/>
            </Col>
            <Col xs={24}>
                <Table _dataBin={role} _handleShowModal={_handleShowModal} setParams={setParams} total={sumRole}/>
            </Col>
            <Modal
                modal={modal}
                onCloseModal={_handleShowModal}
                permissions={permissions}
                body={body}
                setbody={setBody}
                onCreted={onCreted}
                onUpdate={onUpdate}
            />
        </Row>
    )
};

Roles.propTypes = {
    className: PropTypes.any,
};
export default styled(Roles)`
.order-content {
}
.filter-tab1 {
    margin-top: 20px;
}
`;