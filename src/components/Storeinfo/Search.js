import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import styles from './Search.less';
const FormItem = Form.Item;
const Option = Select.Option;


const Queryinfo = ({
  options,
  region,
  status,
  types,
  passdata,
  shopType,
  saleAreaCode,
  provinceCode,
  cityCode,
  shopStatus,
  fullName,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
}) =>{

function handleSearch(e){
  e.preventDefault();
	validateFields((errors,fieldsValue) => {
          if (!errors) {
            if(fieldsValue.provincecitys){
              const data = {
                 ...fieldsValue,
                 provinceCode:fieldsValue.provincecitys[0],
                 cityCode:fieldsValue.provincecitys[1],
               };
              //  console.log(data);
               passdata(data);
            }else{
              // console.log(fieldsValue);
              passdata(fieldsValue);
            }

          }


        });
}

const typesOption=types.map((item,key)=>{
    return(
     <Option key={key} value={item.value}>{item.label}</Option>
   );
});

const regionOption=region.map((item,key)=>{
    return(
     <Option key={key} value={item.value}>{item.label}</Option>
   );
});

const statusOption=status.map((item,key)=>{
    return(
     <Option key={key} value={item.value}>{item.label}</Option>
   );
});


return (
        <div>

        <Plate title="查询信息">
            <Form
            inline
            className={styles.ant_advanced_search_form}
            >
            <Row className={styles.ant_row_style}>
            <Col  span={7} className={styles.ant_col_center}>
            <FormItem
            label="仓店名称"
            >
              {getFieldDecorator('shopname', {
                initialValue:fullName
              })(
                <Input size="small" placeholder="请输入" />
              )}
            </FormItem>
            </Col>
            <Col  span={7} className={styles.ant_col_center}>
            <FormItem
            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
            >
            {getFieldDecorator('shopType', {
              initialValue:shopType
            })(
              <Select size="small" placeholder="请选择类别" style={{ width: 153,textAlign:'left' }} >
                 <Option  value="">全部</Option>
                 {typesOption}
              </Select>
            )}
            </FormItem>
           </Col>
           <Col  span={7} className={styles.ant_col_center}>
             <FormItem
            label="销售区域"
            >
            {getFieldDecorator('saleAreaCode', {
                initialValue:saleAreaCode
            })(
              <Select size="small" placeholder="请选择销售区域" style={{ width: 153,textAlign:'left' }} >
                <Option  value="">全部</Option>
                 {regionOption}
              </Select>
            )}
            </FormItem>
            </Col>

              <Col  span={3} className={styles.ant_col_center}>
              </Col>
            </Row>
            <Row>
            <Col  span={7} className={styles.ant_col_center}>
            <FormItem
            label="所在城市"
            >
            {getFieldDecorator('provincecitys', {
                initialValue:[provinceCode,cityCode]
            })(
              <Cascader
              size="small"
              options={options}
              placeholder="请选择所在城市"
              changeOnSelect 
              />
            )}


            </FormItem>
          </Col>
          <Col  span={7} className={styles.ant_col_center}>
             <FormItem
            label="店仓状态"
            >
            {getFieldDecorator('shopStatus', {
                initialValue:shopStatus
            })(
              <Select size="small" placeholder="请选择销售区域" style={{ width: 153,textAlign:'left' }} >
                <Option  value="">全部</Option>
                 {statusOption}
              </Select>
            )}
            </FormItem>
            </Col>
            <Col  span={7} className={styles.ant_col_center}>

            </Col>
            <Col  span={3} className={styles.ant_col_center}>
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

Queryinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  selectCategory: PropTypes.func,
  selectRegion: PropTypes.func,
  selectCity: PropTypes.func,
  selectShopststus: PropTypes.func,
  options:PropTypes.array,
  region:PropTypes.array,

};


export default Form.create()(Queryinfo);
