import { Button, Col, Row } from "antd";
import styled from "styled-components";

const FooterModal = ({
    onCloseModal,
    className,
    onCreted,
    onUpdate,
    modal
}) => {
    return (
        <Row justify="start" gutter={[8, 8]} className={className}>
            <Col span={5}>
              <Button type="danger" onClick={() => onCloseModal(false)}>Thoát</Button>
            </Col>
            <Col span={19}>
                <Row justify="end" gutter={[8, 8]}>
                    <Button style={{backgroundColor:'#01579B',color:'#fff'}} onClick={()=> {
                        if(modal.get('isEdit')){
                            onUpdate()
                        } else {
                            onCreted()
                        }
                        
                    }}>{modal.get('isEdit') ? 'Cập nhật' : 'Thêm mới' }</Button>
                </Row>
            </Col>
        </Row>
    )
}


export default styled(FooterModal)`

`;