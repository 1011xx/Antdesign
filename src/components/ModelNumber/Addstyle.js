import React from 'react';
import { Table,Row,ColForm,Button,Select,Radio ,Cascader } from 'antd';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import styles from './Addstyle.less';
const FormItem = Form.Item;

const Addstyle=({})=> {
  return (

    <Wrap
     num="2"
    url="/modelnumber"
     last="款号维护"
     next="新增款号"
     >
   <Plate title="基本信息">
     <Row>
      <Col span={8}>款号：M160342K12322</Col>
      <Col span={8} >品名：Mark Cheng2016初夏0379连衣裙</Col>
     </Row>
   </Plate>


</Wrap>

  );
}

export default Addstyle;
