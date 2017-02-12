import React, { PropTypes } from 'react';
import { Spin,Form, Icon, Input, Button, Select,Cascader ,DatePicker, Row, Col,Upload, Modal } from 'antd';
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
}) =>{

//获取citycode和cityname
function getcpCodeName(arr){
  // 遍历options获取citycode和cityname
  for(let i=0;i<options.length;i++){
    if(options[i].value==arr[0]){
       provinceName=options[i].label;
       for(let j=0;j<options[i].children.length;j++){
      if(options[i].children[j].value==arr[1])
       cityName=options[i].children[j].label;
      }
    };
  }
  provinceCode=arr[0];
  cityCode=arr[1];
}
//获取saleAreaName和saleAreaCode
function getgetSalesarea(arr){
  for(let k=0;k<region.length;k++){
  if(region[k].value==arr[0]){
     saleAreaName=region[k].label;
  }
}
  saleAreaCode=arr[0];
}
//获取typeCode
function gettypecode(arr){
  typeCode=arr[0];
}


function handleSubmit(e){
 e.preventDefault();
 // console.log(item);
 // console.log(provinceName,cityName);
    validateFields((err, fieldsValue) => {
      if (!err) {
        //格式转换
        getcpCodeName(fieldsValue.cityCode);
        getgetSalesarea(fieldsValue.saleAreaCode);
        gettypecode(fieldsValue.typeCode);
         const values = {
        ...fieldsValue,
        'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
        'cityCode':cityCode,
        'cityName':cityName,
        'provinceName':provinceName,
        'provinceCode':provinceCode,
        'typeCode':typeCode,
        'saleAreaCode':saleAreaCode,
        'saleAreaName':saleAreaName,
        'id':item.id,
        'code':item.code,
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
  getcpCodeName(citycode);

}

function getSalesarea(area){
  getgetSalesarea(area);

}

function typecode(code){
  gettypecode(code);
}

if(editloading){
  return(
      <Spin spinning={editloading} tip="页面加载中，请稍后...">
        <div className={styles.loading}></div>
      </Spin>
    )
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
                 {getFieldDecorator('typeCode', {
                   initialValue:parseArray(item.typeCode)

              })(
                 <Cascader
                 size="small"
              options={types}
              onChange={typecode}
              placeholder="请选择类别"
              />
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
                    initialValue:parseArray(item.saleAreaCode)
              })(
                  <Cascader
                  size="small"
              options={region}
              onChange={getSalesarea}
              placeholder="请选择销售区域"
              />
               )}

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
                  {getFieldDecorator('cityCode', {
                    initialValue:parseArray(item.cityCode)
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
                  })(
                    <Input size="small" placeholder="请输入店仓电话" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                 <FormItem
                label="&nbsp;联&nbsp;系&nbsp;人"
                required
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
                  initialValue:item.mobileNumber,
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
                  initialValue:item.faxNumber,
                  })(
                    <Input size="small" placeholder="请输入传真号码" />
                  )}
                </FormItem>
                </Col>
                <Col span={8} className={styles.ant_col_center} style={{paddingLeft: 55}}>
                 <FormItem
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址"
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
                    <Input  type="textarea" rows={6} style={{width:420}}/>
                  )}
                </FormItem>

         </Plate>

          <div className={styles.btn_wrap}>

            <FormItem>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
             <Button type="ghost" size="large" onClick={backurl}>取消</Button>
          </div>
           </Form>
        </div>

  );
};

EditShopinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};


export default Form.create()(EditShopinfo);
