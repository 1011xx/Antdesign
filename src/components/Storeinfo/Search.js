import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader } from 'antd';
import Plate from '../plate/plate';
import styles from './Search.less';
const FormItem = Form.Item;
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const Queryinfo = ({
 passdata,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
}) =>{

function handleSearch(){
	validateFields((errors) => {
          if (errors) {
            return;
          }
          const data = { ...getFieldsValue() };
          passdata(data);
        });
}

function onChange(value){
	console.log(value);
}

return (
       
        <div>
        	
        <Plate title="查询信息">
            <Form 
            inline
            className={styles.ant_advanced_search_form}
            >
            
            <FormItem
            label="仓店名称"
            >
              {getFieldDecorator('userName', {
               
              })(
                <Input  placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
            label="类别"
            >
              <Select defaultValue="lucy" style={{ width: 153 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>

             <FormItem
            label="销售区域"
            >
              <Select defaultValue="lucy" style={{ width: 153 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>

            <FormItem
            label="所在城市"
            >
              <Cascader options={options} onChange={onChange} placeholder="Please select" />

            </FormItem>

             <FormItem
            label="店仓状态"
            >
              <Select defaultValue="lucy" style={{ width: 153 }} >
                <Option value="jack">开启</Option>
                <Option value="lucy">关闭</Option>
              </Select>
            </FormItem>

            <FormItem>
              <Button type="primary" onClick={handleSearch}>查询</Button>
            </FormItem>

            
          </Form>
        </Plate>

        

 
        </div>
       
  );
};

Queryinfo.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func
};


export default Form.create()(Queryinfo);
