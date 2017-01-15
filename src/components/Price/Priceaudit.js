import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table,DatePicker } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Priceaudit.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const Priceaudit=({
handleSubmit,
form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue
},
chooseColor,
onAudit,
onLook,
onDetail

})=> {
  const columns=[{
    title: '序号',
    dataIndex: 'color',
    key: 'color',
  }, {
    title: '单据号',
    dataIndex: 'colorName',
    key: 'colorName',
  },{
    title: '预计生效日期',
    dataIndex: 'color1',
    key: 'color1',
  }, {
    title: '创建人',
    dataIndex: 'colorName1',
    key: 'colorName1',
  },{
    title: '创建时间',
    dataIndex: 'color2',
    key: 'color2',
  }, {
    title: '状态',
    dataIndex: 'colorName2',
    key: 'colorName2',
  },{
    title: '操作',
    dataIndex: 'size',
    key: 'size',
    render:(text, record) => (
      <p>
        <a  onClick={() => onAudit(record)}>审核</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onLook(record)}>查看</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onDetail(record)}>详情</a>



      </p>
    ),
  }];
  const data=[{}];
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
      <Input  placeholder="请输入款号"/>
    )}
    </FormItem>

    <FormItem
    label="预计生效日期"
    className={styles.marginLeft}
    >
    {getFieldDecorator('date', {
    })(
       <RangePicker size="default" />
    )}
    </FormItem>

    <FormItem
    label="状态"
      className={styles.marginLeft}
    >
    {getFieldDecorator('styleCode', {
    })(
      <Select  style={{ width: 120 }} >
     <Option value="jack">Jack</Option>
     <Option value="lucy">Lucy</Option>
     <Option value="disabled" >Disabled</Option>
     <Option value="Yiminghe">yiminghe</Option>
   </Select>
    )}
    </FormItem>
    <FormItem className={styles.marginLeft}>
        <Button type="primary" htmlType="submit" size="large">保存</Button>
    </FormItem>
    </Row>
    </Form>
    </Plate>
    <TablePlate title="价格单列表">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => chooseColor()}><Icon type="pay-circle-o" />&nbsp;设置吊牌价</a>
      </div>
        <Table size="small"
            className={styles.table}
            columns={columns}
            loading={false}
            dataSource={data}
            pagination={false}
            bordered
          />

    </TablePlate>
    </div>
  );
}
Priceaudit.propTypes = {
  form: PropTypes.object,
};
export default Form.create()(Priceaudit);
