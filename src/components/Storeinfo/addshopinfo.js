import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader ,DatePicker, Row, Col,Upload, Modal } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import moment from 'moment';
import styles from './addshopinfo.less';
const FormItem = Form.Item;
const Option = Select.Option;
let provinceName='';
let cityName='';
let provinceCode='';
let cityCode='';
let saleAreaCode='';
let saleAreaName='';
let typeCode='';


const AddShopinfo = ({
  getadddata,
  behavier,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
    children,
    region,
    types,
    options,
    item={},


}) =>{


function handleSubmit(e){
 e.preventDefault();
 // console.log(12121212);
 // console.log(provinceName,cityName);
    validateFields((err, fieldsValue) => {
      console.log('fieldsValue1');
      if (!err) {

         const values = {
        ...fieldsValue,
        'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
        'provinceCode':provinceCode,
        'cityCode':cityCode,
        'cityName':cityName,
        'provinceName':provinceName,
        'provinceCode':provinceCode,
        'typeCode':typeCode,
        'saleAreaCode':saleAreaCode,
        'saleAreaName':saleAreaName

      };
      console.log('fieldsValue:');
      //  console.log(fieldsValue);
      //  console.log('values');
       // console.log(values);
       getadddata(values);
        // xhr.abort();

      }
    });
}
function citychange(citycode){
  // 遍历options获取citycode和cityname
  for(let i=0;i<options.length;i++){
    if(options[i].value==citycode[0]){
       provinceName=options[i].label;
       for(let j=0;j<options[i].children.length;j++){
      if(options[i].children[j].value==citycode[1])
       cityName=options[i].children[j].label;
      }
    };

  }
  provinceCode=citycode[0];
  cityCode=citycode[1];

}

function getSalesarea(area){
// console.log(area[0]);
for(let k=0;k<region.length;k++){
  if(region[k].value==area[0]){
     saleAreaName=region[k].label;
  }
}
  saleAreaCode=area[0];

}

function typecode(code){
 typeCode=code[0];
}

function checkForm(rule, value, callback){
//手机号码正则验证
  if(!(/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(value))){
    callback('不是正确的手机号码！');
  }
}
//
//  function checkfax(rule, value, callback){
// //手机号码正则验证3
//   if(!(/^(\d{3,4}-)?\d{7,8}$/.test(value))){
//     callback('不是正确的传真号码！');
//   }
// }
//  function checkname(rule, value, callback){
// //联系人长度
//   if(value.length>100){
//     callback('联系人姓名太长！');
//   }
// }
//
//  function checktel(rule, value, callback){
// //店仓电话长度
//   if(value.length>100){
//     callback('店仓电话太长！');
//   }
// }
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
                     initialValue:item.fullName,
                   rules: [{required: true, message: '请输入店仓名称!' }]
                  })(
                    <Input size="small" placeholder="请输入电仓名称" />
                  )}
                  </FormItem>
                </Col>

               <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称"
                >
                {getFieldDecorator('shortName', {
                   initialValue:item.shortName,
                rules: [{ required: true, message: '请输入店仓简称!' }]

              })(
                 <Input size="small" placeholder="请输入电仓简称" />
                  )}
                </FormItem>
               </Col>

              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
                >

                 <Cascader
                 size="small"
              options={types}
              onChange={typecode}
              placeholder="请选择类别"
              />

                </FormItem>
              </Col>
            </Row>

            <Row >
              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="开店日期"
                >
                {getFieldDecorator('establishDate', {
                rules: [{ required: true, message: '请选择开店时间!' }]

              })(
                  <DatePicker  size="small"/>
              )}
                </FormItem>
              </Col>
               <Col span={8} className={styles.ant_col_center}>
              <FormItem
              label="&nbsp;&nbsp;销售区域"
              >

              <Cascader
              size="small"
              options={region}
              onChange={getSalesarea}
              placeholder="请选择销售区域"
              />


              </FormItem>
               </Col>

            </Row>


        </Plate>

        <Plate title="联系方式">

            <Row className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="&nbsp;&nbsp;所在城市"
                >

                   <Cascader
                   size="small"
                  options={options}
                  onChange={citychange}
                  placeholder="请选择所在城市"
                  />

                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="店仓电话"
                >
                  {getFieldDecorator('telephoneNumber', {
                    initialValue:item.telephoneNumber,
                  })(
                    <Input size="small" placeholder="请输入店仓电话" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="联系人"
                >
                  {getFieldDecorator('contracts', {
                   initialValue:item.contracts,
                  })(
                    <Input size="small" placeholder="请输入联系人名" />
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
                    rules: [{validator:checkForm}],
                    initialValue:item.mobileNumber
                  })(
                    <Input size="small" placeholder="请输入手机号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真"
                >
                  {getFieldDecorator('faxNumber', {
                  initialValue:item.faxNumber
                  })(
                    <Input size="small" placeholder="请输入传真号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="&nbsp;&nbsp;&nbsp;地&nbsp;&nbsp;&nbsp;&nbsp;址"
                >
                  {getFieldDecorator('address', {
                  initialValue:item.address,
                  })(
                    <Input size="small" placeholder="请输入店仓地址" style={{width:220}}/>
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
                  {getFieldDecorator('remarks', {
                  initialValue:item.remarks,
                  })(
                    <Input type="textarea" rows={6} style={{width:420}}/>
                  )}
                </FormItem>

         </Plate>

          <div className={styles.btn_wrap}>

          <FormItem >
              <Button type="primary" htmlType="submit" size="large">保存</Button>

          </FormItem>
          <Button type="ghost" size="large"  className={styles.btn_margin}>取消</Button>

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
