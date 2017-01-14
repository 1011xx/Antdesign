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
    brandName,
})=> {
  function handleSubmit(e){
   e.preventDefault();
      validateFields((err, fieldsValue) => {
        if (!err) {
          //格式转换
          // getcpCodeName(fieldsValue.cityCode);
          // getgetSalesarea(fieldsValue.saleAreaCode);
          // gettypecode(fieldsValue.typeCode);
          //  const values = {
          // ...fieldsValue,
          // 'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
          // 'cityCode':cityCode,
          // 'cityName':cityName,
          // 'provinceName':provinceName,
          // 'provinceCode':provinceCode,
          // 'typeCode':typeCode,
          // 'saleAreaCode':saleAreaCode,
          // 'saleAreaName':saleAreaName,
          // 'id':item.id,
          // 'code':item.code,
          // 'status':item.status,
          // 'images':item.images,
          // 'deleteImages':deleteImg,
  console.log(fieldsValue);
        };

        //  getadddata(values);


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
            >
            {getFieldDecorator('styleCode', {
               initialValue:item.styleCode,
             rules: [{required: true, message: '请输入款号!' }]
            })(
              <Input  placeholder="请输入款号"/>
            )}
            </FormItem>

            <FormItem
            label="品&nbsp;&nbsp;&nbsp;&nbsp;名"
            style={{marginLeft:100}}
            >
            {getFieldDecorator('styleName', {
               initialValue:item.styleName,
             rules: [{required: true, message: '请输入品名!' }]
            })(
              <Input  placeholder="请输入品名" />
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
             {getFieldDecorator('brandName', {
               initialValue:item.brandName,
               rules: [{required: true, message: '请选择品牌!' }]
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择品牌"
          />
          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="年&nbsp;&nbsp;&nbsp;&nbsp;份"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName,
               rules: [{required: true, message: '请选择年份!' }]
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择年份"
          />
          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="季&nbsp;&nbsp;&nbsp;&nbsp;节"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName,
               rules: [{required: true, message: '请选择季节!' }]
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择季节"
          />
          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="序&nbsp;&nbsp;&nbsp;&nbsp;号"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName,
               rules: [{required: true, message: '请选择序号!' }]
          })(
          <Input  placeholder="请输入序号" className={styles.inputwidth}/>
          )}
          </FormItem>
          {/*  </Col>
          <Col span={4}>*/}
          <FormItem
            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName,
               rules: [{required: true, message: '请选择类别!' }]
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
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
             {getFieldDecorator('brandName', {
               initialValue:item.brandName,
               rules: [{required: true, message: '请选择面料!' }]
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择面料"
          />
          )}
          </FormItem>
        {/*  </Col>
        <Col span={4} >*/}
          <FormItem
            label="&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;列"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择系列"
          />
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;大&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择大类别"
          />
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;小&nbsp;类&nbsp;别"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
          placeholder="请选择小类别"
          />
          )}
          </FormItem>
        {/*  </Col><Col span={4} >*/}
          <FormItem
            label="&nbsp;&nbsp;销售类型"
            >
             {getFieldDecorator('brandName', {
               initialValue:item.brandName
          })(
          <Cascader
          className={styles.inputwidth}
          options={brandName}
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
           {getFieldDecorator('brandName', {
             initialValue:item.brandName,
             rules: [{required: true, message: '请选择尺寸组!' }]
        })(
        <Cascader
        className={styles.inputwidth}
        options={brandName}
        placeholder="请选择尺寸组"
        />
        )}
        </FormItem>

        <FormItem
          label="单&nbsp;&nbsp;&nbsp;&nbsp;位"
          style={{marginLeft:30}}
          >
           {getFieldDecorator('brandName', {
             initialValue:item.brandName,
             rules: [{required: true, message: '请选择单位!' }]
        })(
        <Cascader
        className={styles.inputwidth}
        options={brandName}
        placeholder="请选择单位"
        />
        )}
        </FormItem>

        <FormItem
          label="是否唯一码管理"
          style={{marginLeft:30}}
          >
           {getFieldDecorator('isUniqCodeManagement', {
             initialValue:item.isUniqCodeManagement,
             rules: [{required: true, message: '请选择!' }]
        })(
        <RadioGroup  >
         <Radio value={0}>是</Radio>
         <Radio value={1}>否</Radio>
       </RadioGroup>
        )}
        </FormItem>

       </Row>
       <Row className={styles.paddingtop}>
       <FormItem
         label="&nbsp;&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;注"
         >
          {getFieldDecorator('remark', {
            initialValue:item.remark
       })(
       <Input type="textarea" rows={4} style={{width:500}}/>
       )}
       </FormItem>
       </Row>
     </Plate>
     <div className={styles.btn_wrap}>
       <FormItem>
           <Button type="primary" htmlType="submit" size="large">保存</Button>
       </FormItem>
           <Button type="ghost" size="large">取消</Button>
     </div>
     <div style={{height:1}}/>
  </Form>


  );
}

Editstyle.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};

export default Form.create()(Editstyle);
