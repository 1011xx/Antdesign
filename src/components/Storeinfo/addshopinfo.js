import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader ,DatePicker, Row, Col,Upload, Modal } from 'antd';
import Plate from '../plate/plate';

import styles from './addshopinfo.less';
const FormItem = Form.Item;
const Option = Select.Option;



const AddShopinfo = ({
  getadddata,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
    children,
}) =>{


function handleSubmit(e){
 e.preventDefault();
    validateFields((err, fieldsValue) => {

      if (!err) {
         const values = {
        ...fieldsValue,
        'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD')
      };
       // values.toString()
       getadddata(values);
      
      }
    });
}

return (
       
        <div>
        	 <Form 
            inline
            className={styles.ant_advanced_search_form}
            onSubmit={handleSubmit}
            >
        <Plate title="基本信息">
       
           
             <Row  className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                  <FormItem
                  label="仓店名称"
                  >
                  {getFieldDecorator('fullName', {
                   rules: [{required: true, message: '店仓名称不能为空!' }]
                  })(
                    <Input  placeholder="请输入电仓名称" />
                  )}
                  </FormItem>
                </Col>
              
               <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称"
                >
                {getFieldDecorator('shortName', {
                rules: [{ required: true, message: 'Please select your gender!' }]
                
              })(
                 <Input  placeholder="请输入电仓简称" />
                  )}
                </FormItem>
               </Col>
              
              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
               
                >
                {getFieldDecorator('typeCode', {
                rules: [{ required: true, message: 'Please select your gender!' }]
               
              })(
                  <Select  style={{ width: 153 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                )}
                </FormItem>
              </Col>
            </Row>
            
            <Row >
              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="开店日期"
                >
                 {getFieldDecorator('establishDate', {
                 rules: [{ required: true, message: 'Please select your gender!' }]
              })(
                  <DatePicker  />
                  )}
                </FormItem>
              </Col>
               <Col span={8} className={styles.ant_col_center}>
              <FormItem
              label="销售区域"
             
              >
               {getFieldDecorator('provinceCode', {
                rules: [{ required: true, message: 'Please select your gender!' }]
               
              })(
                 <Select  style={{ width: 153 }} >
                  <Option value="010">北京</Option>
                  <Option value="012">上海</Option>
                  <Option value="011">天津</Option>
                  <Option value="013">河北</Option>
                </Select>
                )}

              </FormItem>
               </Col>
             
            </Row>
            
         
        </Plate>

        <Plate title="联系方式">
           
            <Row className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="所在城市"
                >
                  {getFieldDecorator('cityCode', {
                    rules: [{ required: true, message: 'Please select your gender!' }]
                   
                  })(
                    <Input size="large" placeholder="请输入所在城市" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="店仓电话"
                >
                  {getFieldDecorator('telephoneNumber', {
                  
                  })(
                    <Input size="large" placeholder="请输入店仓电话" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="联系人"
                required
                >
                  {getFieldDecorator('contracts', {
                   
                  })(
                    <Input size="large" placeholder="请输入联系人名" />
                  )}
                </FormItem>
                </Col>

          </Row>     
          <Row>     

                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="&nbsp;&nbsp;&nbsp;手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机"
                >
                  {getFieldDecorator('mobileNumber', {
                  
                  })(
                    <Input size="large" placeholder="请输入手机号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真"
                >
                  {getFieldDecorator('fax', {
                  
                  })(
                    <Input size="large" placeholder="请输入传真号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="&nbsp;&nbsp;&nbsp;地&nbsp;&nbsp;&nbsp;&nbsp;址"
                >
                  {getFieldDecorator('address', {
                  
                  })(
                    <Input size="large" placeholder="请输入店仓地址" style={{width:220}}/>
                  )}
                </FormItem>
                </Col>
             </Row>
         
        </Plate>

         <Plate title="照片(最多上传5张)">
         {children}
            {/*<PicturesWall/>*/}
         </Plate>
         <Plate title="其他信息">
         <FormItem
                label="备注："
                >
                  {getFieldDecorator('beizhu', {
                  
                  })(
                    <Input type="textarea" rows={6} style={{width:420}}/>
                  )}
                </FormItem>
         
         </Plate>
        
          <div className={styles.btn_wrap}>
          
            <FormItem>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
         
             <Button type="ghost">取消</Button>
         
          
          </div>
           </Form>
        </div>
       
  );
};

AddShopinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};


export default Form.create()(AddShopinfo);
