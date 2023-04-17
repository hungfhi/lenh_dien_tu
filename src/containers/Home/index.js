import { Row } from 'antd';
import styled from "styled-components";



const Home = ({ className }) => {

  return (
    <Row className={className} gutter={[16, 16]} style={{ justifyContent: 'center', marginBottom: -12 }}>
      <h2> LỆNH ĐIỆN TỬ </h2>
    </Row>
  )
};
export default styled(Home)`
  .item {
    background: #fff !important;
    padding: 10px;
    box-shadow: 0px 4px 6px rgba(231, 219, 210, 0.24);
    border-radius: 5px;
  }
`


