import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row} from 'antd';
import styles from './colormodel.less';
const FormItem = Form.Item;

const AttrModel = ({
	title,
	modalVisible,
  key,
  confirmLoading,
	onOk,
	handleCancel,
	item={},
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    }
}) => {
	//正则验证颜色编号
	function checkColor(rule, value, callback){
		if(value){
    if (/^[0-9]{1,3}$/.test(value)!=true) {
        callback('请输入正确的颜色代码!');
      } else {
        callback();
      }
  }else{
    callback();
  }
	}
	//验证颜色名称长度
	function checkcolorName(rule, value, callback){
  		if(value){
  		if (value.length>30) {
  				callback('输入的颜色名称过长!');
  			} else {
  				callback();
  			}
  	}else{
  		callback();
  	}
	}
	function handleOk() {
	    validateFields((errors) => {
	      if (errors) {
	        return;
	      }
	      const data = { ...getFieldsValue() };
	      onOk(data);
	    });

	  }



	return(



        <Modal title={title}
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
          maskClosable={false}
          confirmLoading={confirmLoading}
          key={key}
        >
        <Form  inline style={{ width: 264 ,margin:'0 auto'}}>
        <Row style={{padding:'0 0 20px 0','textAlign':'left'}}>
        <FormItem
          label="颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色："
          hasFeedback
          className={styles.formitem}
        >
          {getFieldDecorator('colorCode', {
           initialValue:item.colorCode,
            rules: [
              { required: true, message: '颜色未填写' },{
								validator:checkColor
							}
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        </Row>

        <Row style={{'textAlign':'left'}}>
        <FormItem
          label="颜色名称："
          hasFeedback
        >
          {getFieldDecorator('colorName', {
   			   initialValue:item.colorName,
            rules: [
              { required: true, message: '颜色名称未填写' },{
								validator:checkcolorName
							}
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
         </Row>
      </Form>
        </Modal>
		);
}

AttrModel.propTypes = {
  title: PropTypes.any,
	visible: PropTypes.any,
	form: PropTypes.object,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Form.create()(AttrModel);
