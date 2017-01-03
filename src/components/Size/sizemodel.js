import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col} from 'antd';
// import styles from './plate.less';
const FormItem = Form.Item;

const AttrModel = ({
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
        <Form  horizontal style={{ width: 240 ,margin:'0 auto'}}>
        <FormItem
          label="属性代码："
          hasFeedback

        >
          {getFieldDecorator('code', {
           initialValue:item.code,
            rules: [
              { required: true, message: '属性代码未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="属性描述："
          hasFeedback
         
        >
          {getFieldDecorator('exp', {
   			initialValue:item.expattr,
            rules: [
              { required: true, message: '属性描述未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        
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