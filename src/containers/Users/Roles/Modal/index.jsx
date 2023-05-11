import { Col, Form, Input, Row } from "antd";
import { DefineInput, DrawerBase } from "components";
import _ from "lodash";
import PropTypes from "prop-types";
import { useCallback } from "react";
import styled from "styled-components";
import FooterModal from "./footerModal";
import Permission from "./permission";
import TitleModal from "./titleModal";
const { TextArea } = Input;
const Roles = ({ 
    className, 
    profile,
    modal,
    onCloseModal,
    permissions,
    body,
    setbody,
    onCreted,
    onUpdate
}) => {

    console.log("permissions",permissions)
    const [form] = Form.useForm();
    form.setFieldsValue({})
    const addBody = useCallback(
        (value, name) => {
            setbody((props) => {
            let nextState = { ...props };
            let strName = name.split('.')
            if (strName.length === 1) {
              nextState[name] = value;
            } else {
              nextState[strName[0]][strName[1]] = value
            }
            return nextState;
          });
          
        },
        [setbody]
    );
    let per = [];
    _.forEach(permissions, (v, k) => per.push(v))


    console.log('per',per)
    return (
        <DrawerBase
            destroyOnClose
            onClose={()=> onCloseModal(false)}
            closable={false}
            placement="right"
            visible={modal.get("visible")}
            bodyStyle={{"padding" : "0px"}}
            title={<TitleModal />}
            width="85%"
            footer={<FooterModal onCloseModal={onCloseModal} onUpdate={onUpdate} onCreted={onCreted} modal={modal}/>}
            className={className}
        >
            <Row className={className} style={{marginTop: 10}}>
                <Col span="22" offset={1}>
                    <span>Tên <span style={{ color: '#dc2d2d' }}>(*)</span></span>
                    <DefineInput
                        value={body.name}
                        placeholder="Nhập tên"
                        change={(e) => {
                            let { value } = e.target;
                            addBody(value, 'name')
                        }}
                    />
                </Col>
                <Col span="22" offset={1}>
                    <span>Mô tả </span>
                    <TextArea
                        disabled={false}
                        placeholder={'Mô tả'}
                        autoSize={{
                            minRows: 3,
                            maxRows: 6
                        }}
                        value={body?.description}
                        onChange={(e) => {
                            let { value } = e.target;
                            addBody(value, 'description')
                        }
                        }
                    />
                </Col>
                <Col span="22" offset={1} style={{marginTop: 10}}><h3>Danh sách quyền</h3></Col>
                <Col span="22" offset={1}>
                    <Permission ListPermission={per} addBody={addBody} body={body}/>
                </Col>
            </Row>
        </DrawerBase>
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