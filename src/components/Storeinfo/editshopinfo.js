import React, { PropTypes } from 'react';
import { Spin,Form, Icon, Input, Button, Select,Cascader ,DatePicker, Row, Col,Upload, Modal } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import moment from 'moment';
import styles from './addshopinfo.less';
const FormItem = Form.Item;
const Option = Select.Option;



function parseArray(arrStr) {
  // console.log(arrStr);
  var tempKey = 'arr23' + new Date().getTime();//arr231432350056527
  var arrayJsonStr = '{"' + tempKey + '":' + arrStr + '}';
  var arrayJson;
  if (JSON && JSON.parse) {
    arrayJson = JSON.parse(arrayJsonStr);
  } else {
    arrayJson = eval('(' + arrayJsonStr + ')');
  }
  return arrayJson[tempKey];
};


const EditShopinfo = ({
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
    deleteImg,
    editloading,
    backurl,
    uploading,
}) =>{


function checkifundefined(a,b){
  if(a){
    if(b=='key'){
      return a.key;
    }else if(b=='label'){
      return a.label;
    }
  }else{
    if(b=='key'){
      return undefined;
    }else if(b=='label'){
      return undefined;
    }
  }
}

function handleSubmit(e){
 e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (!err) {
           console.log('fieldsValue:',fieldsValue);
       //如果city数组的值存在的话
         let tempobj=citychange(fieldsValue.cityCode);
          const values = {
         ...fieldsValue,
         ...tempobj,
         'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
         'provinceCode':fieldsValue.cityCode[0],
         'cityCode':fieldsValue.cityCode[1],
         'typeCode':checkifundefined(fieldsValue.typeCode,'key'),
         'saleAreaCode':checkifundefined(fieldsValue.saleAreaCode,'key'),
         'saleAreaName':checkifundefined(fieldsValue.saleAreaCode,'label'),
         'id':item.id,
         'status':item.status,
         'images':item.images,
         'deleteImages':deleteImg,
       };
        getadddata(values);

      }
    });
}

function citychange(citycode){
  // 遍历options获取citycode和cityname
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

if(editloading){
  return(
      <Spin spinning={editloading} tip="页面加载中，请稍后...">
        <div className={styles.loading}></div>
      </Spin>
    )
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
                   initialValue:{key:parseArray(item.typeCode)[0]}
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
                    initialValue:moment(item.establishDate, 'YYYY-MM-DD'),
                 rules: [{ required: true, message: 'Please select your gender!' }]
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
                    initialValue:{key:parseArray(item.saleAreaCode)[0]}
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
                    initialValue:parseArray(item.cityCode),
                    rules: [{ required: true, message: '请选择所在城市!' }]
              })(
                   <Cascader
                   size="small"
                  options={options}
                  onChange={citychange}
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
                required
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
                    <Input  type="textarea" rows={3} style={{width:550}}/>
                  )}
                </FormItem>

         </Plate>

          <div className={styles.btn_wrap}>

            <FormItem>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
             <Button type="ghost" size="large" onClick={backurl} className={styles.btn_margin}>取消</Button>
          </div>
           </Form>


  );
};

EditShopinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};


export default Form.create()(EditShopinfo);
