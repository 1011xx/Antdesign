import React, { PropTypes } from 'react';
import { Table,Row,Col,Form,Input,Button,Select,Radio ,Cascader,Switch,Spin } from 'antd';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import styles from './Addstyle.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
var statethere;
function strtoarr(str1){
  let arr=[];
  arr[0]=str1;
  return arr;
}

const Addstyle=({
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
    stylename,//品名
    stylenum,//款号
    currentItem,//根据id获取到的数据
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
    passdata,
    cancel,
    statustest,
    switchstatus,
    saveFlag,


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
// function valueTobool(isUniqueCodeManagement){
//   console.log('isUniqueCodeManagement',isUniqueCodeManagement);
//   if(isUniqueCodeManagement==1){
//     console.log('isUniqueCodeManagement',true);
//     return true;
//   }else {
//       console.log('isUniqueCodeManagement',false);
//     return false;
//   }
// }
// function statustest(){
//   currentItem.isUniqCodemanagementCode=!currentItem.isUniqCodemanagementCode;
// }
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
//当switch发生改变的时候，读取switch的值
function switchchange(checked){
  // console.log('checked',checked,boolTovalue(checked));
  statethere=checked;
}
//获取switch的值，这个超级麻烦
function test(){
  console.log('statethere',statethere);
  if(statethere!='undefine'){
    return boolTovalue(statethere);
  }else{
    return boolTovalue(currentItem.isUniqCodemanagementCode);
  }
}
//函数，如果不是必填选框，则需要校验是否是undefined

function isundefinedbkey(a){
  if(a){
    return a.key;
  }else{
    return "";
  }
}
function isundefinedblabel(a){
  if(a){
    return a.label
  }else{
    return "";
  }
}
//当提交的时候
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
          bigCategoryCode:isundefinedbkey(fieldsValue.bigCategoryCode),
          bigCategoryName:isundefinedblabel(fieldsValue.bigCategoryCode),
          categoryCode:fieldsValue.categoryCode.key,
          categoryName:fieldsValue.categoryCode.label,
          seriesCode:isundefinedbkey(fieldsValue.seriesCode),
          saleTypeCode:isundefinedbkey(fieldsValue.saleTypeCode),
          yearCode:fieldsValue.yearCode.key,
          categoryCode:fieldsValue.categoryCode.key,
          seasonCode:fieldsValue.seasonCode.key,
          materialsCode:fieldsValue.materialsCode.key,
          smallCategoryCode:isundefinedbkey(fieldsValue.smallCategoryCode),
          sizeGroupCode:fieldsValue.sizeGroupCode.key,
          SizeGroupName:fieldsValue.sizeGroupCode.label,
          unitCode:fieldsValue.unitCode.key,
          SerialNoName:fieldsValue.serialNoCode,
          seriesName:isundefinedblabel(fieldsValue.seriesCode),
          saleTypeName:isundefinedblabel(fieldsValue.saleTypeCode),
          yearName:fieldsValue.yearCode.label,
          seasonName:fieldsValue.seasonCode.label,
          materialsName:fieldsValue.materialsCode.label,
          smallCategoryName:isundefinedblabel(fieldsValue.smallCategoryCode),
          unitName:fieldsValue.unitCode.label,
         isUniqueCodeManagement:test(),
        }
        console.log('values:',values);
            passdata(values);
        };

      });
  }




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

<Spin tip="请稍后..." spinning={saveFlag}>

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
              <Input size="small" disabled style={{width:230}}/>
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
              <Input size="small" disabled style={{width:240}}/>
            )}
            </FormItem>
       </Row>
     </Plate>

     <Plate title="商品属性">
       <Row type="flex" justify="space-between">

          <FormItem
            label="品&nbsp;&nbsp;&nbsp;&nbsp;牌"

            >
             {getFieldDecorator('brandCode', {
               initialValue:{key:currentItem.brandCode},
               rules: [{required: true, message: '请选择品牌!' }]
          })(
            <Select placeholder="请选择品牌" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange1}>
            {brandOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="年&nbsp;&nbsp;&nbsp;&nbsp;份"
            >
             {getFieldDecorator('yearCode', {
               initialValue:{key:currentItem.yearCode},
               rules: [{required: true, message: '请选择年份!' }]
          })(
            <Select placeholder="请选择年份" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange2}>
            {yearOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="季&nbsp;&nbsp;&nbsp;&nbsp;节"
            >
             {getFieldDecorator('seasonCode', {
               initialValue:{key:currentItem.seasonCode},
               rules: [{required: true, message: '请选择季节!' }]
          })(
            <Select placeholder="请选择季节" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange3}>
            {seasonOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="序&nbsp;&nbsp;&nbsp;&nbsp;号"
            >
             {getFieldDecorator('serialNoCode', {
               initialValue:currentItem.serialnoCode,
               rules: [{required: true, message: '请选择序号!' },{
                 validator:checkserialCode
               }]
          })(
            <Input size="small" placeholder="请输入序号" className={styles.inputwidth} onChange={onChange4}/>
          )}
          </FormItem>

          <FormItem
            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
            >
             {getFieldDecorator('categoryCode', {
               initialValue:{key:currentItem.categoryCode},
               rules: [{required: true, message: '请选择类别!' }]
          })(
            <Select placeholder="请选择类别" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange5}>
            {categoryOption}
            </Select>
          )}
          </FormItem>

       </Row>
       <Row type="flex" justify="space-between" className={styles.paddingtop}>

          <FormItem
            label="面&nbsp;&nbsp;&nbsp;&nbsp;料"
            >
             {getFieldDecorator('materialsCode', {
               initialValue:{key:currentItem.materialsCode},
               rules: [{required: true, message: '请选择面料!' }]
          })(
            <Select placeholder="请选择面料" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange6}>
            {materialsOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;列"
            >
             {getFieldDecorator('seriesCode', {
               initialValue:{key:currentItem.seriesCode}
          })(
            <Select placeholder="请选择面料" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange7}>
            {seriesOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="&nbsp;大&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('bigCategoryCode', {
               initialValue:{key:currentItem.bigcategoryCode}
          })(
            <Select placeholder="请选择大类别" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange8}>
            {bigCategoryOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="&nbsp;小&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('smallCategoryCode', {
               initialValue:{key:currentItem.smallcategoryCode}
          })(
            <Select placeholder="请选择小类别" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange9}>
            {smallCategoryOption}
            </Select>
          )}
          </FormItem>

          <FormItem
            label="&nbsp;&nbsp;销售类型"
            >
             {getFieldDecorator('saleTypeCode', {
               initialValue:{key:currentItem.saletypeCode}
          })(
            <Select placeholder="请选择销售类型" className={styles.inputwidth} size="small" labelInValue={true} onSelect={onChange10}>
            {saleTypeOption}
            </Select>
          )}
          </FormItem>
       </Row>
     </Plate>

     <Plate title="其他信息">
       <Row>
        <FormItem
          label="尺寸组"
          >
           {getFieldDecorator('sizeGroupCode', {
              initialValue:{key:currentItem.sizegroupCode},
             rules: [{required: true, message: '请选择尺寸组!' }]
        })(
          <Select placeholder="请选择尺寸组" className={styles.inputwidth} size="small" labelInValue={true} >
          {sizeItemOption}
          </Select>
        )}
        </FormItem>
        <span className={styles.lineheight}>注意：一旦修改尺寸组，所有的颜色和尺寸都会被清空，需要重新配置颜色尺寸和图片</span>
    </Row>
    <Row className={styles.paddingtop}>

        <FormItem
          label="单&nbsp;&nbsp;&nbsp;&nbsp;位"
          >
           {getFieldDecorator('unitCode', {
              initialValue:{key:currentItem.unitCode},
             rules: [{required: true, message: '请选择单位!' }]
        })(
          <Select placeholder="请选择单位" className={styles.inputwidth} size="small" labelInValue={true} >
          {styleUnitOption}
          </Select>
        )}
        </FormItem>

        <FormItem
          label="是否唯一码管理"
          style={{marginLeft:50}}
          required
          >
           {getFieldDecorator('isUniqueCodeManagement', {

        })(
          <div onClick={statustest}>
           <Switch checked={switchstatus} onChange={switchchange} checkedChildren={'是'} unCheckedChildren={'否'} className={styles.switchradio}/>
          </div>
        )}
        </FormItem>

       </Row>
       <Row className={styles.paddingtop}>
       <FormItem
         label="&nbsp;&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;注"
         >
          {getFieldDecorator('remarks', {
            initialValue:currentItem.remarks
       })(
       <Input  type="textarea" rows={3} style={{width:550}}/>
       )}
       </FormItem>
       </Row>
     </Plate>
     <div className={styles.btn_wrap}>
       <FormItem >
           <Button type="primary" htmlType="submit" size="large">保存</Button>
           <Button type="ghost" size="large" onClick={cancel} className={styles.btn_margin}>取消</Button>
       </FormItem>

     </div>
     <div style={{height:1}}/>
  </Form>
</Spin>

  );
}

Addstyle.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  cancel:PropTypes.func,
};

export default Form.create()(Addstyle);
