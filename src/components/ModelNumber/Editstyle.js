import React, { PropTypes } from 'react';
import { Table,Row,Col,Form,Input,Button,Select,Radio ,Cascader } from 'antd';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import styles from './Addstyle.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

  function handleSubmit(e){
   e.preventDefault();
      validateFields((err, fieldsValue) => {
        if (!err) {
          //格式化上传数据
          console.log(fieldsValue);
           const values = {
          ...fieldsValue,
         brandCode:getCode(fieldsValue.brandCode),

         seriesCode:getCode(fieldsValue.seriesCode),
         saleTypeCode:getCode(fieldsValue.saleTypeCode),
         yearCode:getCode(fieldsValue.yearCode),
         categoryCode:getCode(fieldsValue.categoryCode),
         bigCategoryCode:getCode(fieldsValue.bigCategoryCode),
         seasonCode:getCode(fieldsValue.seasonCode),
         materialsCode:getCode(fieldsValue.materialsCode),
         smallCategoryCode:getCode(fieldsValue.smallCategoryCode),
         sizeGroupCode:getCode(fieldsValue.sizeGroupCode),
         unitCode:getCode(fieldsValue.unitCode),
         brandName:getName(fieldsValue.brandCode,brand),
         SerialNoName:fieldsValue.serialNoCode,
         seriesName:getName(fieldsValue.seriesCode,series),
         saleTypeName:getName(fieldsValue.saleTypeCode,saleType),
         yearName:getName(fieldsValue.yearCode,year),
         categoryName:getName(fieldsValue.categoryCode,category),
         bigCategoryName:getName(fieldsValue.bigCategoryCode,bigCategory),
         seasonName:getName(fieldsValue.seasonCode,season),
         materialsName:getName(fieldsValue.materialsCode,materials),
         smallCategoryName:getName(fieldsValue.smallCategoryCode,smallCategory),
         SizeGroupName:getName(fieldsValue.sizeGroupCode,sizeItem),
         unitName:getName(fieldsValue.unitCode,styleUnit),

        }
        console.log('values:',values);
            passdata(values);
        };




      });
  }
  return (

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
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange1}
          options={brand}
          placeholder="请选择品牌"
          />
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
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange2}
          options={year}
          placeholder="请选择年份"
          />
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
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange3}
          options={season}
          placeholder="请选择季节"
          />
          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="序&nbsp;&nbsp;&nbsp;&nbsp;号"
            >
             {getFieldDecorator('serialNoCode', {

               rules: [{required: true, message: '请选择序号!' }]
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
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange5}
          options={category}
          placeholder="请选择类别"
          />
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
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange6}
          options={materials}
          placeholder="请选择面料"
          />
          )}
          </FormItem>
        {/*  </Col>
        <Col span={4} >*/}
          <FormItem
            label="&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;列"
            >
             {getFieldDecorator('seriesCode', {

          })(
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange7}
          options={series}
          placeholder="请选择系列"
          />
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;大&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('bigCategoryCode', {

          })(
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange8}
          options={bigCategory}
          placeholder="请选择大类别"
          />
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;小&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('smallCategoryCode', {

          })(
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange9}
          options={smallCategory}
          placeholder="请选择小类别"
          />
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;&nbsp;销售类型"
            >
             {getFieldDecorator('saleTypeCode', {

          })(
          <Cascader
          size="small"
          className={styles.inputwidth}
          onChange={onChange10}
          options={saleType}
          placeholder="请选择销售类型"
          />
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
        <Cascader
        size="small"
        className={styles.inputwidth}
        options={sizeItem}
        placeholder="请选择尺寸组"
        />
        )}
        </FormItem>

        <FormItem
          label="单&nbsp;&nbsp;&nbsp;&nbsp;位"
          style={{marginLeft:30}}
          >
           {getFieldDecorator('unitCode', {

             rules: [{required: true, message: '请选择单位!' }]
        })(
        <Cascader
        size="small"
        className={styles.inputwidth}
        options={styleUnit}
        placeholder="请选择单位"
        />
        )}
        </FormItem>

        <FormItem
          label="是否唯一码管理"
          style={{marginLeft:30}}
          >
           {getFieldDecorator('isUniqueCodeManagement', {

             rules: [{required: true, message: '请选择!' }]
        })(
        <RadioGroup  size="small">
         <Radio value={'1'}>是</Radio>
         <Radio value={'0'}>否</Radio>
       </RadioGroup>
        )}
        </FormItem>

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
