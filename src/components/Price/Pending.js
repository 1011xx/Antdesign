import React, { PropTypes } from 'react';
import { Form,Table,Row,Col,Input, Radio ,Button} from 'antd';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Pending.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Pending=({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    },
  detaildatasource,
  getdata,
  backurl,
 })=> {

  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  },{
    title: '款号',
    dataIndex: 'styleNo',
    key: 'styleNo',
  },{
    title: '当前吊牌价',
    dataIndex: 'currentTagprice',
    key: 'currentTagprice',
  }, {
    title: '设置吊牌价',
    dataIndex: 'configTagprice',
    key: 'configTagprice',
  },{
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  }];
		  const data = [{
		  num: '1',
      id:'344433443',
		  styleCode: '011',
		  currentprice: '2980.00',
      setprice: '5890.00',
      remark:'testtesttesttest'
		}];
    function checkexp(rule, value, callback){
      if(value){
        if(value.length>100){
          callback("说明太长");
        }else{
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

      //    const values = {
      //   ...fieldsValue,
      //   'establishDate': fieldsValue['establishDate'].format('YYYY-MM-DD'),
      //   'provinceCode':provinceCode,
      //   'cityCode':cityCode,
      //   'cityName':cityName,
      //   'provinceName':provinceName,
      //   'provinceCode':provinceCode,
      //   'typeCode':typeCode,
      //   'saleAreaCode':saleAreaCode,
      //   'saleAreaName':saleAreaName
      //
      // };
      console.log('fieldsValue:',fieldsValue);
      getdata(fieldsValue);

      }
    });
    }
  return (
      <Wrap
       num="2"
       url="/audit"
       last="价格维护"
       next="查看详情"
       >
     <Plate title="基础信息">
         <Row>
         <Col span={6} style={{marginLeft: 1}}>
           <span > 单据号：1</span>
         </Col>
         <Col span={6}>
           <span >预计生效日期：1</span>
         </Col>
         <Col span={6}>
           <span >状&nbsp;&nbsp;&nbsp;&nbsp;态：1</span>
         </Col>
         <Col span={6}>

         </Col>
        </Row>
        <Row style={{paddingTop:5}}>
        <span >备&nbsp;&nbsp;&nbsp;&nbsp;注：1</span>
        </Row>
     </Plate>

     <TablePlate title="价格信息">
      <Table size="small"
        className={styles.table}
         columns={columns}
         loading={false}
         dataSource={data}
         pagination={false}
         showHeader={true}
         bordered
       />
     </TablePlate>
     <div style={{marginTop:5}}/>
     <Form
           inline
           onSubmit={handleSubmit}
           >
      <Plate title="基础信息">

            <Row>
            <FormItem
                 label="审核"
                 >
                 {getFieldDecorator('pending', {
                  rules: [{required: true, message: '请选择!' }]
                 })(
                   <RadioGroup>
                      <Radio value="1">通过</Radio>
                      <Radio value="0">不通过</Radio>
                    </RadioGroup>
                 )}
            </FormItem>
            </Row>
            <Row>
            <FormItem
                 label="&nbsp;&nbsp;&nbsp;说明"
                 >
                 {getFieldDecorator('explain', {
                  rules: [{
                    validator:checkexp
                  }]
                 })(
                   <Input size="small" style={{width:650}} />
                 )}
            </FormItem>
            </Row>

      </Plate>
      <div className={styles.btn_wrap}>

          <FormItem >
              <Button type="primary" htmlType="submit" size="large">审核</Button>

          </FormItem>
          <Button type="ghost" size="large" onClick={backurl} className={styles.btn_margin}>取消</Button>

          </div>
</Form>
 </Wrap>
  );
}


Pending.propTypes = {
	form: PropTypes.object,
 getdata:PropTypes.func,
};

export default Form.create()(Pending);
