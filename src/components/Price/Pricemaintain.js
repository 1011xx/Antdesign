import React, { PropTypes } from 'react';
import {Link} from 'dva/router';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table,DatePicker } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Priceaudit.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const Pricemaintain=({
passdata,
statedata,
form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue
},
onLook,
dataSource,
loading

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
    width:'5%'
  }, {
    title: '单据号',
    dataIndex: 'documentNumber',
    key: 'documentNumber',
    width:'30%'
  },{
    title: '预计生效日期',
    dataIndex: 'expectEffectiveDate',
    key: 'expectEffectiveDate',
    width:'8%'
  }, {
    title: '创建人',
    dataIndex: 'createEmployeeName',
    key: 'createEmployeeName',
    width:'8%'
  },{
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
      width:'10%'
  }, {
    title: '状态',
    dataIndex: 'stateName',
    key: 'stateName',
      width:'10%'
  },{
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
      width:'15%',
    render:(text, record) => {
      if(record.state==2){
        return (
                <p>
                  <Link to={`/set/pending/${record.id}`}>审核</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`/set/setpricedetails/${record.id}`}>查看</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <a  onClick={() => onLook(record)}>详情</a>
                </p>
          );
      }else{
        return (
            <p>
              <Link to={`/set/setpricedetails/${record.id}`}>查看</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <a  onClick={() => onLook(record)}>详情</a>
            </p>
          );

      }
    }


   
  }];
  const data=[{
    num:1,
    documentNumber:'P201610020001',
    ExpectEffectiveDate:'2016-10-12',
    CreateEmployeeName:'林明',
    CreateDate:'2016-10-12 13:00:35',
    StateName:'审核不通过'
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
      initialValue:"",
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

        <Table size="small"
            className={styles.table}
            columns={columns}
            loading={loading}
            dataSource={dataSource}
            pagination={false}
            scroll={{y: 'calc(100vh - 350px)' }}
            bordered
          />

    </TablePlate>
    </div>
  );
}
Pricemaintain.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  onCommit: PropTypes.func,
  onDelete: PropTypes.func,
  onLook: PropTypes.func,
  dataSource: PropTypes.array
};
export default Form.create()(Pricemaintain);
