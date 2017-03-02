import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row} from 'antd';
import styles from './sizemodel.less';
const FormItem = Form.Item;

const SizeModel = ({
	title,
	modalVisible,
	onOk,
	handleCancel,
  key,
  confirmLoading,
	item={},
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
}) => {
//正则验证尺寸编号
	function checkSize(rule, value, callback){
		if(value){
    if (/^[A-Za-z0-9]{1,3}$/.test(value)!=true) {
        callback('请输入正确的尺寸代码,支持大写，小写和数字！');
      } else {
        callback();
      }
  }else{
    callback();
  }
	}
	//验证尺寸名称长度
	function checksizeName(rule, value, callback){
		if(value){
		if (value.length>30) {
				callback('输入的尺寸名称过长!');
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
          maskClosable={false}
          closable={false}
          confirmLoading={confirmLoading}
          key={key}
        >
        <Form  inline style={{ width: 264 ,margin:'0 auto'}}>
        <Row style={{padding:'0 0 20px 0','textAlign':'left'}}>
        <FormItem
          label="尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;寸："
          hasFeedback
          className={styles.formitem}
        >
          {getFieldDecorator('sizeCode', {
           initialValue:item.sizeCode,
            rules: [
              { required: true, message: '尺寸未填写' },{
								validator:checkSize
							}
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        </Row>

        <Row style={{'textAlign':'left'}}>
        <FormItem
          label="尺寸名称："
          hasFeedback
        >
          {getFieldDecorator('sizeName', {
           initialValue:item.sizeName,
            rules: [
              { required: true, message: '尺寸名称未填写' },{
								validator:checksizeName
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

SizeModel.propTypes = {
  title: PropTypes.any,
	modalVisible: PropTypes.any,
	form: PropTypes.object,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Form.create()(SizeModel);
