import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import styles from './Searchinfo.css';
const FormItem = Form.Item;

const Searchinfo=({
	
	 
}) =>{
  return (

   <Plate title="查询信息">
    	    <Form 
            inline
            className={styles.ant_advanced_search_form}
            >
            <Row className={styles.ant_row_style}>
            <Col  span={8} className={styles.ant_col_center}>
            <FormItem
            label="款号"
            >
              {getFieldDecorator('shopname', {
               
              })(
                <Input size="large" placeholder="请输入款号" />
              )}
            </FormItem>
            </Col>
            <Col  span={8} className={styles.ant_col_center}>
            <FormItem
            label="类别"
            >
             {getFieldDecorator('shopname', {
               
              })(
                <Input size="large" placeholder="请输入款号" />
              )}
            </FormItem>
           </Col>
           <Col  span={8} className={styles.ant_col_center}>
             <FormItem
            label="年份"
            >
            {getFieldDecorator('shopname', {
               
              })(
                <Input size="large" placeholder="请输入款号" />
              )}
            </FormItem>
            </Col>
           {/* <Col  span={8} className={styles.ant_col_center}>
                       <FormItem
                       label="仓店名称"
                       >
                         {getFieldDecorator('shopname', {
                          
                         })(
                           <Input size="large" placeholder="请输入" />
                         )}
                       </FormItem>
                       </Col>*/}
            </Row>
   </Form>
    </Plate>
 
  );
}


Searchinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  selectCategory: PropTypes.func,
  selectRegion: PropTypes.func,
  selectCity: PropTypes.func,
  selectShopststus: PropTypes.func,
  class:PropTypes.array,
  years:PropTypes.array,

};
export default Form.create()(Searchinfo);
