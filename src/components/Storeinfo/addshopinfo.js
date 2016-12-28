import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader ,DatePicker, Row, Col,Upload, Modal } from 'antd';
import Plate from '../plate/plate';
import PicturesWall from './uploadimg';
import styles from './addshopinfo.less';
const FormItem = Form.Item;
const Option = Select.Option;



const AddShopinfo = ({
 passdata,
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

function onChange(value){
	console.log(value);
}

return (
       
        <div>
        	
        <Plate title="基本信息">
       
            <Form 
            inline
            className={styles.ant_advanced_search_form}
            >
             <Row  className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                  <FormItem
                  label="仓店名称"
                  required
                  >
                  {getFieldDecorator('userName', {
                   
                  })(
                    <Input  placeholder="请输入电仓名称" />
                  )}
                  </FormItem>
                </Col>
              
               <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称"
                required
                >
                  <Select defaultValue="全部" style={{ width: 153 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>
               </Col>
              
              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
                required
                >
                  <Select defaultValue="全部" style={{ width: 153 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>
              </Col>
             
            </Row>

            <Row >
              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="&nbsp;&nbsp;&nbsp;开店日期"
                >
                  <DatePicker  />
                </FormItem>
              </Col>
               <Col span={8} className={styles.ant_col_center}>
              <FormItem
              label="销售区域"
              required
              >
                 <Select defaultValue="全部" style={{ width: 153 }} >
                  <Option value="010">北京</Option>
                  <Option value="012">上海</Option>
                  <Option value="011">天津</Option>
                  <Option value="013">河北</Option>
                </Select>

              </FormItem>
               </Col>
             
            </Row>
            
          </Form>
        </Plate>

        <Plate title="联系方式">
            <Form 
            inline
            className={styles.ant_advanced_search_form}
            >
            <Row className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="所在城市"
                required
                >
                  {getFieldDecorator('location', {
                   
                  })(
                    <Input size="large" placeholder="请输入所在城市" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="店仓电话"
                required
                >
                  {getFieldDecorator('phonenum', {
                   
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
                  {getFieldDecorator('person', {
                   
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
                  {getFieldDecorator('mobile', {
                   
                  })(
                    <Input size="large" placeholder="请输入手机号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="&nbsp;&nbsp;&nbsp;传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真"
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
                    <Input size="large" placeholder="请输入店仓地址" />
                  )}
                </FormItem>
                </Col>

           </Row>         
          </Form>
        </Plate>

         <Plate title="照片">
            <PicturesWall/>
         </Plate>
         <Plate title="其他信息">
         <div className={styles.textarea_title_style}>
           <p >备注：</p><Input type="textarea" autosize={false} rows={6} className={styles.textarea}/>
         </div>
         </Plate>
        
          <div className={styles.btn_wrap}>
          
            <Button type="primary" className={styles.padding}>保存</Button>
         
             <Button type="ghost">取消</Button>
         
          
          </div>
        </div>
       
  );
};

AddShopinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};


export default Form.create()(AddShopinfo);
