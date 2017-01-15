import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Configcolorsize.less';
const FormItem = Form.Item;
const Option = Select.Option;

const Configcolorsize=({
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue
    },
    handleSubmit,
    chooseColor,
    dataSource,
    handleChange
  })=> {
    const columns = [{
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    }, {
      title: '颜色名称',
      dataIndex: 'colorName',
      key: 'colorName',
    }, {
      title: '尺寸',
      dataIndex: 'size',
      key: 'size',
      render:(text, record) => (
        <Select
        multiple
        style={{ width: 300 }}
        placeholder="点击输入框选择尺寸"
        onChange={handleChange}
      >
  <Option value="a10">a10</Option>
  <Option value="a15">a15</Option>
  <Option value="c12">c12</Option>

  </Select>
      ),
    }, {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      render:(text,record)=>(
        <div style={{height:100,width:100,background:'#f0f'}}/>
      ),
    }];
    const data=[{
      color:'101',
      colorName:'黑色'

    }];
  return (
    <Form
    inline
    onSubmit={handleSubmit}
    className={styles.ant_advanced_search_form}
    >
    <Plate title="款号信息">
    <FormItem
    label="款号"
    >
    {getFieldDecorator('styleCode', {
     rules: [{required: true, message: '请输入款号!' }]
    })(
      <Input  placeholder="请输入款号"/>
    )}
    </FormItem>

    <FormItem
    label="品名"
    style={{marginLeft:100}}
    >
    {getFieldDecorator('styleName', {
     rules: [{required: true, message: '请输入品名!' }]
    })(
      <Input  placeholder="请输入品名" />
    )}
    </FormItem>
    </Plate>

    <TablePlate title="配置颜色尺寸图片">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => chooseColor()}><Icon type="check-square-o" />&nbsp;选择颜色</a>
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
Configcolorsize.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};
export default Form.create()(Configcolorsize);
