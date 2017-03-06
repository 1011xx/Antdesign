import React, { PropTypes } from 'react';
import { Form,Input,Modal} from 'antd';

const FormItem = Form.Item;

const Setallprice = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    },
	visible,
  getdata,
  handleCancel

}) => {
  //当点击取消的时候执行的函数，并清空textarea数据
function Cancel(e) {
e.preventDefault();
resetFields();
handleCancel();
  }
  //当点击确定的时候执行的函数，并清空textarea数据
function handOk(){

  validateFields((err, fieldsValue) => {
     if (!err) {
       getdata(fieldsValue);
     }
   });
   //清楚表单域的值
  resetFields();
}

//对输入的价格正则验证
function pricerules(rule, value, callback){
   if(value){
     if (/^[1-9][0-9]{0,5}$|^0\.[0-9][1-9]$|^0\.[1-9][0-9]$|^[1-9]\.[0-9][0-9]$|^[1-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9][0-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9][0-9][0-9][0-9]\.[0-9][0-9]$|^0\.[0-9]$|^0\.[0-9]$|^[1-9]\.[0-9]$|^[1-9][0-9]\.[0-9]$|^[1-9][0-9][0-9]\.[0-9]$|^[1-9][0-9][0-9][0-9]\.[0-9]$|^[1-9][0-9][0-9][0-9][0-9]\.[0-9]$|^[1-9][0-9][0-9][0-9][0-9][0-9]\.[0-9]$/.test(value)!=true) {
         callback('请输入正确的价格!');
      } else {
        callback();
      }
  }else{
    callback();
  }
}

	return(
         <Modal title="批量设置价格"
          visible={visible}
          onOk={handOk}
          onCancel={Cancel}
          closable={false}
          maskClosable={false}
        >
        <div style={{padding: '30px 0',textAlign:'center'}}>
      <Form
      inline
      >

            <FormItem
                label="调整后的吊牌价："
                >
                  {getFieldDecorator('ALLprice', {
                    rules: [{ validator:pricerules}]
                  })(
                    <Input style={{width:200}} />
                  )}
                </FormItem>
      </Form>
      </div>
        </Modal>


		);
}

Setallprice.propTypes = {
	lookupvis: PropTypes.any,
	getdata: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Form.create()(Setallprice);
