import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row} from 'antd';
import styles from './sizemodel.less';
const FormItem = Form.Item;

const SizeModel = ({
	title,
	visible,
	onOk,
	handleCancel,
	item={},
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
}) => {
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
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
        >
        <Form  inline style={{ width: 264 ,margin:'0 auto'}}>
        <Row style={{padding:'0 0 20px 0','textAlign':'right'}}>
        <FormItem
          label="尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;寸："
          hasFeedback
          className={styles.formitem}
        >
          {getFieldDecorator('sizeCode', {
           initialValue:item.sizeCode,
            rules: [
              { required: true, message: '尺寸未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        </Row>

        <Row style={{'textAlign':'right'}}>
        <FormItem
          label="尺寸名称："
          hasFeedback
        >
          {getFieldDecorator('sizeName', {
           initialValue:item.sizeName,
            rules: [
              { required: true, message: '尺寸名称未填写' },
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
	visible: PropTypes.any,
	form: PropTypes.object,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Form.create()(SizeModel);