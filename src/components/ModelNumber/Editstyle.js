import React, { PropTypes } from 'react';
import { Table,Row,Col,Form,Input,Button,Select,Radio ,Cascader,Switch,Spin } from 'antd';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import styles from './Addstyle.less';
import {seLect} from "../../utils/common";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const Editstyle=({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
    item={},
    brand ,//品牌
    year ,//年份
    season ,//季节
    seriesnum ,//序号
    category ,//类别
    materials ,//面料
    series ,//"系列"
    bigCategory ,//"大类别"
    smallCategory ,//"小类别"
    saleType ,//"销售类型"
    sizeItem,//尺寸组
    styleUnit,//单位
    saveFlag,//保存状态

    passdata,
    styleNumbrules,
    styleNamerules,
    stylename,
    stylenum,
    onChange1,
    onChange2,
    onChange3,
    onChange4,
    onChange5,
    onChange6,
    onChange7,
    onChange8,
    onChange9,
    onChange10,
    cancel,
})=> {

  //获取styleName和styleCode
function getName(arr,source){
  // 遍历options获取citycode和cityname
  let temp;
  if(arr){
  for(let i=0;i<source.length;i++){
    if(source[i].value===arr[0]){
       temp=source[i].label;
    };
   }
   return temp;
  }else{
   return undefined;
  }

}

function getCode(arr){
  if(arr){
    return arr[0];
  }else{
    return undefined;
  }
}
//将switch值转换
function boolTovalue(isUniqueCodeManagement){
  if(isUniqueCodeManagement==true){
    return 1;
  }else{
    return 0;
  }
}
//对序号进行正则验证
function checkserialCode(rule, value, callback){
  if(value){
    if (/^\d{4}$/.test(value)!=true) {
        callback('请输入正确的序号!');
      } else {
        callback();
      }
  }else{
    callback();
  }
}

  function handleSubmit(e){
   e.preventDefault();
      validateFields((err, fieldsValue) => {
        if (!err) {
          //格式化上传数据
          console.log(fieldsValue);
           const values = {
          ...fieldsValue,
         brandCode:fieldsValue.brandCode.key,
         brandName:fieldsValue.brandCode.label,
         bigCategoryCode:fieldsValue.bigCategoryCode.key,
         bigCategoryName:fieldsValue.bigCategoryCode.label,
         categoryCode:fieldsValue.categoryCode.key,
         categoryName:fieldsValue.categoryCode.label,
         seriesCode:fieldsValue.seriesCode.key,
         saleTypeCode:fieldsValue.saleTypeCode.key,
         yearCode:fieldsValue.yearCode.key,
         categoryCode:fieldsValue.categoryCode.key,
         seasonCode:fieldsValue.seasonCode.key,
         materialsCode:fieldsValue.materialsCode.key,
         smallCategoryCode:fieldsValue.smallCategoryCode.key,
         sizeGroupCode:fieldsValue.sizeGroupCode.key,
         SizeGroupName:fieldsValue.sizeGroupCode.label,
         unitCode:fieldsValue.unitCode.key,
         SerialNoName:fieldsValue.serialNoCode,
         seriesName:fieldsValue.seriesCode.label,
         saleTypeName:fieldsValue.saleTypeCode.label,
         yearName:fieldsValue.yearCode.label,
         seasonName:fieldsValue.seasonCode.label,
         materialsName:fieldsValue.materialsCode.label,
         smallCategoryName:fieldsValue.smallCategoryCode.label,
         unitName:fieldsValue.unitCode.label,
         isUniqueCodeManagement:boolTovalue(fieldsValue.isUniqueCodeManagement),
        }
        console.log('values:',values);
            passdata(values);
        };




      });
  }

//map select


const brandOption=brand.map((item,key)=>{
      return(
       <Option key={key} value={item.value}>{item.label}</Option>
     );
  });
const yearOption=year.map((item,key)=>{
      return(
       <Option key={key} value={item.value}>{item.label}</Option>
     );
  });
const seasonOption=season.map((item,key)=>{
        return(
         <Option key={key} value={item.value}>{item.label}</Option>
       );
    });
const seriesnumOption=seriesnum.map((item,key)=>{
          return(
           <Option key={key} value={item.value}>{item.label}</Option>
         );
      });
      const categoryOption=category.map((item,key)=>{
              return(
               <Option key={key} value={item.value}>{item.label}</Option>
             );
          });

     const materialsOption=materials.map((item,key)=>{
                return(
                 <Option key={key} value={item.value}>{item.label}</Option>
               );
            });
     const seriesOption=series.map((item,key)=>{
                return(
                 <Option key={key} value={item.value}>{item.label}</Option>
               );
            });
      const bigCategoryOption=bigCategory.map((item,key)=>{
                  return(
                   <Option key={key} value={item.value}>{item.label}</Option>
                 );
              });
      const smallCategoryOption=smallCategory.map((item,key)=>{
                    return(
                     <Option key={key} value={item.value}>{item.label}</Option>
                   );
                });
      const saleTypeOption=saleType.map((item,key)=>{
                        return(
                         <Option key={key} value={item.value}>{item.label}</Option>
                       );
                    });
      const sizeItemOption=sizeItem.map((item,key)=>{
                          return(
                           <Option key={key} value={item.value}>{item.label}</Option>
                         );
                      });
      const styleUnitOption=styleUnit.map((item,key)=>{
                          return(
                           <Option key={key} value={item.value}>{item.label}</Option>
                         );
                      });










  return (


<Spin tip="保存中,请稍后..." spinning={saveFlag}>
     <Form
     inline
     onSubmit={handleSubmit}
     className={styles.ant_advanced_search_form}
     >

     <Plate title="基本信息">

       <Row>

            <FormItem
            label="款&nbsp;&nbsp;&nbsp;&nbsp;号"
            required
            >
            {getFieldDecorator('code', {
               initialValue:stylenum
            })(
              <Input disabled size="small" style={{width:230}}/>
            )}
            </FormItem>

            <FormItem
            label="品&nbsp;&nbsp;&nbsp;&nbsp;名"
            style={{marginLeft:100}}
            required
            >
            {getFieldDecorator('name', {
               initialValue:stylename
            })(
              <Input disabled size="small" style={{width:240}}/>
            )}
            </FormItem>

       </Row>
     </Plate>

     <Plate title="商品属性">
       <Row type="flex" justify="space-between">
      {/*<Col span={4}>*/}
          <FormItem
            label="品&nbsp;&nbsp;&nbsp;&nbsp;牌"

            >
             {getFieldDecorator('brandCode', {

               rules: [{required: true, message: '请选择品牌!' }]
          })(
          <Select placeholder="请选择品牌" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange1}>
          {brandOption}
          </Select>

          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="年&nbsp;&nbsp;&nbsp;&nbsp;份"
            >
             {getFieldDecorator('yearCode', {

               rules: [{required: true, message: '请选择年份!' }]
          })(

            <Select placeholder="请选择年份" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange2}>
            {yearOption}
            </Select>

          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="季&nbsp;&nbsp;&nbsp;&nbsp;节"
            >
             {getFieldDecorator('seasonCode', {

               rules: [{required: true, message: '请选择季节!' }]
          })(

            <Select placeholder="请选择季节" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange3}>
            {seasonOption}
            </Select>
          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="序&nbsp;&nbsp;&nbsp;&nbsp;号"
            >
             {getFieldDecorator('serialNoCode', {

               rules: [{required: true, message: '请输入序号!'},{
                 validator: checkserialCode,
               }]
          })(
            <Input size="small" placeholder="请输入序号" className={styles.inputwidth} onChange={onChange4}/>

          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
            >
             {getFieldDecorator('categoryCode', {

               rules: [{required: true, message: '请选择类别!' }]
          })(
            <Select placeholder="请选择类别" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange5}>
            {categoryOption}
            </Select>
          )}
          </FormItem>
          {/*  </Col>*/}
       </Row>
       <Row type="flex" justify="space-between" className={styles.paddingtop}>
        {/*  <Col span={4} >*/}
          <FormItem
            label="面&nbsp;&nbsp;&nbsp;&nbsp;料"
            >
             {getFieldDecorator('materialsCode', {

               rules: [{required: true, message: '请选择面料!' }]
          })(
            <Select placeholder="请选择面料" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange6}>
            {materialsOption}
            </Select>
          )}
          </FormItem>
        {/*  </Col>
        <Col span={4} >*/}
          <FormItem
            label="&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;列"
            >
             {getFieldDecorator('seriesCode', {

          })(
            <Select placeholder="请选择面料" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange7}>
            {seriesOption}
            </Select>
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;大&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('bigCategoryCode', {

          })(
            <Select placeholder="请选择大类别" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange8}>
            {bigCategoryOption}
            </Select>
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;小&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('smallCategoryCode', {

          })(
            <Select placeholder="请选择小类别" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange9}>
            {smallCategoryOption}
            </Select>
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;&nbsp;销售类型"
            >
             {getFieldDecorator('saleTypeCode', {

          })(
            <Select placeholder="请选择销售类型" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange10}>
            {saleTypeOption}
            </Select>

          )}
          </FormItem>
      {/*    </Col>*/}
       </Row>
     </Plate>

     <Plate title="其他信息">
       <Row>

        <FormItem
          label="尺寸组"
          >
           {getFieldDecorator('sizeGroupCode', {

             rules: [{required: true, message: '请选择尺寸组!' }]
        })(
          <Select placeholder="请选择尺寸组" className={styles.inputwidth} size="small" labelInValue={true} >
          {sizeItemOption}
          </Select>
        )}
        </FormItem>

        <FormItem
          label="单&nbsp;&nbsp;&nbsp;&nbsp;位"
          style={{marginLeft:30}}
          >
           {getFieldDecorator('unitCode', {

             rules: [{required: true, message: '请选择单位!' }]
        })(
          <Select placeholder="请选择单位" className={styles.inputwidth} size="small" labelInValue={true} >
          {styleUnitOption}
          </Select>
        )}
        </FormItem>

        <FormItem
          label="是否唯一码管理"
          style={{marginLeft:30}}
          className={styles.switchradio}
          required
          >
           {getFieldDecorator('isUniqueCodeManagement', {
            initialValue:false,

        })(
        <Switch checkedChildren={'是'} unCheckedChildren={'否'} />


        )}
        </FormItem>
        {/*<RadioGroup  size="small">
         <Radio value={'1'}>是</Radio>
         <Radio value={'0'}>否</Radio>
       </RadioGroup>*/}
       </Row>
       <Row className={styles.paddingtop}>
       <FormItem
         label="&nbsp;&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;注"
         >
          {getFieldDecorator('remark', {
       })(
       <Input  type="textarea" rows={4} style={{width:500}}/>
       )}
       </FormItem>
       </Row>
     </Plate>
     <div className={styles.btn_wrap}>
       <FormItem >
           <Button type="primary" htmlType="submit" size="large">保存</Button>
           <Button type="ghost" size="large" className={styles.btn_margin} onClick={cancel}>取消</Button>
       </FormItem>
     </div>
     <div style={{height:1}}/>
  </Form>
</Spin>

  );
}

Editstyle.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  cancel:PropTypes.func,
  brand: PropTypes.array ,//品牌
  year: PropTypes.array ,//年份
  season: PropTypes.array ,//季节
  seriesnum : PropTypes.array,//序号
  category: PropTypes.array ,//类别
  materials: PropTypes.array ,//面料
  series : PropTypes.array,//"系列"
  bigCategory: PropTypes.array ,//"大类别"
  smallCategory: PropTypes.array ,//"小类别"
  saleType: PropTypes.array ,//"销售类型"
  sizeItem: PropTypes.array ,//尺寸组
  styleUnit: PropTypes.array ,//单位
  //手动维护
  brandManualMaintain: PropTypes.any ,//品牌
  yearManualMaintain: PropTypes.any ,//年份
  seasonManualMaintain: PropTypes.any ,//季节
  seriesnumManualMaintain: PropTypes.any ,//序号
  categoryManualMaintain: PropTypes.any ,//类别
  materialsManualMaintain: PropTypes.any ,//面料
  seriesManualMaintain: PropTypes.any ,//"系列"
  bigCategoryManualMaintain: PropTypes.any ,//"大类别"
  smallCategoryManualMaintain: PropTypes.any ,//"小类别"
  saleTypeManualMaintain: PropTypes.any ,//"销售类型"
};

export default Form.create()(Editstyle);
