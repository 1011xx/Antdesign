import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import styles from './Searchinfo.less';
const FormItem = Form.Item;


const Searchinfo = ({
  options,
  region,
  status,
  types,
  passdata,
  selectCategory,
  selectRegion,
  selectCity,
  selectShopststus,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
}) =>{

function handleSearch(){
	validateFields((errors) => {
          if (errors) {
            return;
          }
          const data = { ...getFieldsValue() };
          passdata(data);
        });
}

// function test(){

//  var emails = region.map(function (item) { return item.label; });

//  console.log(emails.join(", ")); // zhang@email.com, jiang@email.com, li@email.com
// }

return (
        <div>

        <Plate title="查询信息">
            <Form 
            inline
            className={styles.ant_advanced_search_form}
            >
            <Row className={styles.ant_row_style}>
            <Col  span={6} className={styles.ant_col_center}>
            <FormItem
            label="款号"
            >
              {getFieldDecorator('shopname', {
               
              })(
                <Input size="large" placeholder="请输入" />
              )}
            </FormItem>
            </Col>
            <Col  span={6} className={styles.ant_col_center}>
            <FormItem
            label="类别"
            >
             <Cascader 
              options={types} 
              onChange={selectCategory} 
              placeholder="请选择类别" 
              />

            </FormItem>
           </Col>
           <Col  span={6} className={styles.ant_col_center}>

             <FormItem
            label="年份"
            >
            <Cascader 
              options={region} 
              onChange={selectRegion} 
              placeholder="请选择销售区域" 
              />
            </FormItem>
            </Col>
             <Col  span={6} className={styles.ant_col_center}>
            <FormItem>
              <Button type="primary" onClick={handleSearch}>查询</Button>
            </FormItem>
            </Col>
            </Row>
       
                    
          </Form>
        </Plate>

        

 
        </div>
       
  );
};

Searchinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  selectCategory: PropTypes.func,
  selectRegion: PropTypes.func,
  selectCity: PropTypes.func,
  selectShopststus: PropTypes.func,
  options:PropTypes.array,
  region:PropTypes.array,

};


export default Form.create()(Searchinfo);