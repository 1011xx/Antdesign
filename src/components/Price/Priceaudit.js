import React, { PropTypes } from 'react';
import {Link} from 'dva/router';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table,DatePicker } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Priceaudit.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const Priceaudit=({
passdata,
statedata,
form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue
},
setPrice,
onCommit,
onDelete,
onLook,
dataSource,

})=> {
  // 使用map函数生成option选项
 const selectopt=statedata.map((item, key) => {

   return(
     <Option key={key} value={item.value}>{item.label}</Option>
     );
 });

  const columns=[{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  }, {
    title: '单据号',
    dataIndex: 'documentNumber',
    key: 'documentNumber',
  },{
    title: '预计生效日期',
    dataIndex: 'expectEffectiveDate',
    key: 'expectEffectiveDate',
  }, {
    title: '创建人',
    dataIndex: 'createEmployeeName',
    key: 'createEmployeeName',
  },{
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
  }, {
    title: '状态',
    dataIndex: 'stateName',
    key: 'stateName',
  },{
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render:(text, record) => {
      if(record.state==1){
        return (
        <p>
          <a  onClick={() => onCommit(record)}>提交</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={`/audit/modify/${record.id}`}>修改</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <a  onClick={() => onDelete(record)}>删除</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={`/audit/pricedetails/${record.id}`}>查看</Link>
        </p>
      );
    }else if(record.state==2||record.state==4){
      return (
      <p>
      <Link to={`/audit/pricedetails/${record.id}`}>查看</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a  onClick={() => onLook(record)}>详情</a>
      </p>
    );
    }else if(record.state==3){
      return (
      <p>
        <a  onClick={() => onCommit(record)}>提交</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/audit/modify/${record.id}`}>修改</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <a  onClick={() => onDelete(record)}>删除</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/audit/pricedetails/${record.id}`}>查看</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onLook(record)}>详情</a>
      </p>
    );
    }

    },
  }];
  const data=[{
    num:1,
    id:1,
    documentNumber:'P201610020001',
    ExpectEffectiveDate:'2016-10-12',
    CreateEmployeeName:'林明',
    CreateDate:'2016-10-12 13:00:35',
    StateName:'审核不通过',
    status:0
  },{
    num:2,
    id:2,
    documentNumber:'P201610020011',
    ExpectEffectiveDate:'2016-10-15',
    CreateEmployeeName:'安媛媛',
    CreateDate:'2016-10-15 13:00:55',
    StateName:'审核通过',
    status:1
  },{
    num:3,
    id:3,
    documentNumber:'P201611210011',
    ExpectEffectiveDate:'2016-11-15',
    CreateEmployeeName:'黎明',
    CreateDate:'2016-11-15 13:00:00',
    StateName:'审核不通过',
    status:0
  }];

   function transform(a){
     if(a){
       return a.format('YYYY-MM-DD');
     }
   }

  function handleSubmit(e){
     e.preventDefault();
     validateFields((err, fieldsValue) => {
          if (!err) {
            if(fieldsValue.date){
              var datas = {
                ...fieldsValue,
                date:'',//给date赋值为空，因为没有实际
                start:transform(fieldsValue.date[0]),
                end:transform(fieldsValue.date[1])
              };

            }else{
              var datas = {
                ...fieldsValue
              };
            }
            // console.log(datas);
            passdata(datas);

           }
        });
  }
  return (
    <div>
    <Plate title="查询信息">
    <Form
    inline
    onSubmit={handleSubmit}
    className={styles.ant_advanced_search_form}
    >
    <Row type="flex" justify="space-between">
    <FormItem
    label="款号"
    >
    {getFieldDecorator('styleCode', {
    })(
      <Input size="small" placeholder="请输入款号"/>
    )}
    </FormItem>

    <FormItem
    label="预计生效日期"
    className={styles.marginLeft}
    >
    {getFieldDecorator('date', {
    })(
       <RangePicker size="small" />
    )}
    </FormItem>

    <FormItem
    label="状态"
      className={styles.marginLeft}
    >
    {getFieldDecorator('status', {
    })(
      <Select  style={{ width: 150,height:22 }} className={styles.selectstyle}>
      {selectopt}
      </Select>
    )}
    </FormItem>
    <FormItem className={styles.marginLeft}>
        <Button type="primary" htmlType="submit" size="default">查询</Button>
    </FormItem>
    </Row>
    </Form>
    </Plate>
    <TablePlate title="价格单列表">
    <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => setPrice()}><Icon type="pay-circle-o" />&nbsp;设置吊牌价</a>
      </div>
        <Table size="small"
            className={styles.table}
            columns={columns}
            loading={false}
            dataSource={dataSource}
            pagination={false}
            bordered
          />

    </TablePlate>
    </div>
  );
}
Priceaudit.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  setPrice: PropTypes.func,
  onCommit: PropTypes.func,
  onDelete: PropTypes.func,
  onLook: PropTypes.func,
  dataSource: PropTypes.array,
  statedata:PropTypes.array
};
export default Form.create()(Priceaudit);
