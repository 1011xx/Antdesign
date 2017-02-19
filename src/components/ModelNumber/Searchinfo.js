import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import styles from './Searchinfo.less';
const FormItem = Form.Item;
const Option = Select.Option;

const Searchinfo = ({
  styleCategory,
  styleYear,
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

  
  const categoryOption=styleCategory.map((item,key)=>{
      return(
       <Option key={key} value={item.value}>{item.label}</Option>
     );
  });

   const yearOption=styleYear.map((item,key)=>{
      return(
       <Option key={key} value={item.value}>{item.label}</Option>
     );
  });

function handleSearch(){
	validateFields((errors) => {
          if (errors) {
            return;
          }
          const data = { ...getFieldsValue() };
          passdata(data);
        });
}


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
              {getFieldDecorator('styleCode', {

              })(
                <Input size="small" placeholder="请输入" />
              )}
            </FormItem>
            </Col>
            <Col  span={6} className={styles.ant_col_center}>
            <FormItem
            label="类别"
            >
            {getFieldDecorator('categoryCode', {

            })(
             <Select size="small" placeholder="请选择类别" style={{ width: 150,height:22,textAlign:'left' }} >
                {categoryOption}
             </Select>
            )}
            </FormItem>
           </Col>
           <Col  span={6} className={styles.ant_col_center}>

             <FormItem
            label="年份"
            >
            {getFieldDecorator('yearCode', {
              
            })(
             <Select size="small" placeholder="请选择年份" style={{ width: 150,height:22,textAlign:'left' }} >
                  {yearOption}
             </Select>
            )}
            </FormItem>
            </Col>
             <Col  span={6} className={styles.ant_col_center}>
            <FormItem>
              <Button type="primary" size="default" onClick={handleSearch}>查询</Button>
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
  styleCategory:PropTypes.array,
  styleYear:PropTypes.array,

};


export default Form.create()(Searchinfo);
