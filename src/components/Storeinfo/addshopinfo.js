import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader ,DatePicker, Row, Col,Upload, Modal,Spin } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import moment from 'moment';
import styles from './addshopinfo.less';
const FormItem = Form.Item;
const Option = Select.Option;
// let provinceName=undefined;
// let cityName=undefined;
// let provinceCode=undefined;
// let cityCode=undefined;
// let saleAreaCode=undefined;
// let saleAreaName=undefined;
// let typeCode=undefined;


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
    backurl,


}) =>{


function handleSubmit(e){
 e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (!err) {
           console.log('fieldsValue:',fieldsValue);
     if(fieldsValue.cityCode){
       //如果city数组的值存在的话
       if(fieldsValue.saleAreaCode){
         let tempobj=citychange(fieldsValue.cityCode);
          const values = {
         ...fieldsValue,
         ...tempobj,
         'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
         'provinceCode':fieldsValue.cityCode[0],
         'cityCode':fieldsValue.cityCode[1],
         'typeCode':fieldsValue.typeCode.key,
         'saleAreaCode':fieldsValue.saleAreaCode.key,
         'saleAreaName':fieldsValue.saleAreaCode.label,

       };
      //  console.log('values:',values);
        getadddata(values);
       }else{
         let tempobj=citychange(fieldsValue.cityCode);
          const values = {
         ...fieldsValue,
         ...tempobj,
         'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
         'provinceCode':fieldsValue.cityCode[0],
         'cityCode':fieldsValue.cityCode[1],
         'typeCode':fieldsValue.typeCode.key,
         'saleAreaCode':undefined,
         'saleAreaName':undefined,

       };
      //  console.log('values:',values);
        getadddata(values);
       }

     }else{
       //如果city数组的值不存在
       if(fieldsValue.saleAreaCode){
         const values = {
         ...fieldsValue,
         'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
         'provinceCode':undefined,
         'cityCode':undefined,
         'cityName':undefined,
         'provinceName':undefined,
         'typeCode':fieldsValue.typeCode.key,
         'saleAreaCode':fieldsValue.saleAreaCode.key,
         'saleAreaName':fieldsValue.saleAreaCode.label
       };
      //  console.log('values:',values);
        getadddata(values);
       }else{
         const values = {
         ...fieldsValue,
         'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
         'provinceCode':undefined,
         'cityCode':undefined,
         'cityName':undefined,
         'provinceName':undefined,
         'typeCode':fieldsValue.typeCode.key,
         'saleAreaCode':undefined,
         'saleAreaName':undefined
       };
      //  console.log('values:',values);
        getadddata(values);
       }

     }
      }
    });
}
function citychange(citycode){
  // 遍历options获取citycode和cityname
  // console.log('cityCode:',cityCode);
  for(let i=0;i<options.length;i++){
    if(options[i].value==citycode[0]){
       var provinceName=options[i].label;
       for(let j=0;j<options[i].children.length;j++){
      if(options[i].children[j].value==citycode[1])
      var  cityName=options[i].children[j].label;
      }
    };
  }
  return {provinceName,cityName}


}

// function getSalesarea(area){
// // console.log(area[0]);
// for(let k=0;k<region.length;k++){
//   if(region[k].value==area[0]){
//      saleAreaName=region[k].label;
//   }
// }
//   saleAreaCode=area[0];
//
// }
//
// function typecode(code){
//  typeCode=code[0];
// }

function shopname(rule, value, callback){
  if(value){
    if(value.length>100){
      callback("店仓名称太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function shopshortname(rule, value, callback){
  if(value){
    if(value.length>100){
      callback("店仓简称太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function address(rule, value, callback){
  if(value){
    if(value.length>200){
      callback("地址太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function contect(rule, value, callback){
  if(value){
    if(value.length>50){
      callback("姓名太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function fax(rule, value, callback){
  if(value){
    if(value.length>50){
      callback("传真太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function mobile(rule, value, callback){
  if(value){
    if(value.length>50){
      callback("手机号码太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function shopphone(rule, value, callback){
  if(value){
    if(value.length>50){
      callback("店仓电话太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
}

function remark(rule, value, callback){
  if(value){
    if(value.length>1000){
      callback("备注太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
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
return (


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
                   rules: [{required: true, message: '请输入店仓名称!' },{
                     validator:shopname
                   }]
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
                rules: [{ required: true, message: '请输入店仓简称!' },{
                  validator:shopshortname
                }]

              })(
                 <Input size="small" placeholder="请输入电仓简称" />
                  )}
                </FormItem>
               </Col>

              <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
                >
                {getFieldDecorator('typeCode', {

              })(
                <Select size="small" labelInValue={true} placeholder="请选择类别" style={{ width: 153,textAlign:'left' }} >
                   {typesOption}
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
              {getFieldDecorator('saleAreaCode', {

            })(
              <Select size="small" labelInValue={true} placeholder="请选择销售区域" style={{ width: 153,textAlign:'left' }} >
                 {regionOption}
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
                  rules: [{ required: true, message: '请选择所在城市!' }]
                })(
                  <Cascader
                  size="small"
                 options={options}

                 placeholder="请选择所在城市"
                 />
                )}


                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="店仓电话"
                >
                  {getFieldDecorator('telephoneNumber', {
                    initialValue:item.telephoneNumber,
                    rules: [{ required: true, message: '请输入店仓电话!' },{validator:shopphone}]
                  })(
                    <Input size="small" placeholder="请输入店仓电话" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="联&nbsp;系&nbsp;人"
                >
                  {getFieldDecorator('contracts', {
                   initialValue:item.contracts,
                   rules: [{ required: true, message: '请输入联系人名!' },{validator:contect}]
                  })(
                    <Input size="small" placeholder="请输入联系人名" />
                  )}
                </FormItem>
                </Col>

          </Row>
          <Row>

                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机"
                >
                  {getFieldDecorator('mobileNumber', {
                    rules: [{ required: true, message: '请输入手机号码!' },{validator:mobile}],
                    initialValue:item.mobileNumber
                  })(
                    <Input size="small" placeholder="请输入手机号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <FormItem
                label="&nbsp;&nbsp;&nbsp;传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真"
                >
                  {getFieldDecorator('faxNumber', {
                  initialValue:item.faxNumber,
                  rules: [{validator:fax}]
                  })(
                    <Input size="small" placeholder="请输入传真号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center} style={{paddingLeft: 55}}>
                 <FormItem
                 label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址"
                >
                  {getFieldDecorator('address', {
                  initialValue:item.address,
                  rules: [{validator:address}]
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
                  rules: [{validator:remark}]
                  })(
                    <Input type="textarea" rows={6} style={{width:420}}/>
                  )}
                </FormItem>

         </Plate>

          <div className={styles.btn_wrap}>

          <FormItem >
              <Button type="primary" htmlType="submit" size="large">保存</Button>

          </FormItem>
          <Button type="ghost" size="large" onClick={backurl} className={styles.btn_margin}>取消</Button>

          </div>
           </Form>


  );
};

AddShopinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};


export default Form.create()(AddShopinfo);
