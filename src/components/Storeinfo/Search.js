import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col } from 'antd';
import Plate from '../plate/plate';
import styles from './Search.less';
const FormItem = Form.Item;
const Option = Select.Option;


const Queryinfo = ({
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

function test(){


 var emails = region.map(function (item) { return item.label; });

 console.log(emails.join(", ")); // zhang@email.com, jiang@email.com, li@email.com
}

return (
        <div>

        <Plate title="查询信息">
            <Form 
            inline
            className={styles.ant_advanced_search_form}
            >
            <Row className={styles.ant_row_style}>
            <Col  span={8} className={styles.ant_col_center}>
            <FormItem
            label="仓店名称"
            >
              {getFieldDecorator('shopname', {
               
              })(
                <Input size="large" placeholder="请输入" />
              )}
            </FormItem>
            </Col>
            <Col  span={8} className={styles.ant_col_center}>
            <FormItem
            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
            >
             <Cascader 
              options={types} 
              onChange={selectCategory} 
              placeholder="请选择类别" 
              />

                          {/*<Select
                            placeholder="请选择类别"
                            style={{ width: 153 }} 
                            onSelect={selectCategory}
                            >
                              <Option value="1">全部</Option>
                              <Option value="2">正价</Option>
                              <Option value="3">折扣</Option>
                            </Select>*/}
            </FormItem>
           </Col>
           <Col  span={8} className={styles.ant_col_center}>
            {/*1、华东地区（包括山东、江苏、安徽、浙江、福建、上海）； 
            2、华南地区（包括广东、广西、海南）； 
            3、华中地区（包括湖北、湖南、河南、江西）； 
            4、华北地区（包括北京、天津、河北、山西、内蒙古）； 
            5、西北地区（包括宁夏、新疆、青海、陕西、甘肃）； 
            6、西南地区（包括四川、云南、贵州、西藏、重庆）； 
            7、东北地区（包括辽宁、吉林、黑龙江）； 
            8、台港澳地区（包括台湾、香港、澳门）。*/}
             <FormItem
            label="销售区域"
            >
            <Cascader 
              options={region} 
              onChange={selectRegion} 
              placeholder="请选择销售区域" 
              />

              


              {/*<Select 
              placeholder="请选择销售区域"
              style={{ width: 153 }}
              onSelect={selectRegion}
               >
                <Option value="1">全部</Option>
                <Option value="2">华东地区</Option>
                <Option value="3">华南地区</Option>
                <Option value="4">华中地区</Option>
                <Option value="5">华北地区</Option>
                <Option value="6">西北地区</Option>
                <Option value="7">西南地区</Option>
                <Option value="8">东北地区</Option>
                <Option value="9">港澳台地区</Option>
              </Select>*/}
            </FormItem>
            </Col>
            </Row>
            <Row>
            <Col  span={8} className={styles.ant_col_center}>
            <FormItem
            label="所在城市"
            >
              <Cascader 
              options={options} 
              onChange={selectCity} 
              placeholder="请选择所在城市" 
              />

            </FormItem>
          </Col>
          <Col  span={8} className={styles.ant_col_center}>
             <FormItem
            label="店仓状态"
            >
            <Cascader 
              options={status} 
              onChange={selectShopststus} 
              placeholder="请选择店仓状态" 
              />
              {/*<Select 
              placeholder="请选择店仓状态"
              style={{ width: 153 }} 
              onSelect={selectShopststus}
              >
                <Option value="open">开启</Option>
                <Option value="close">关闭</Option>
              </Select>*/}
            </FormItem>
            </Col>
            <Col  span={8} className={styles.ant_col_center}>
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
