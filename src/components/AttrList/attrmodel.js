import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row} from 'antd';
import styles from './attrmodel.less';
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
        <Form  inline style={{ width: 244 ,margin:'0 auto'}}>
        <Row style={{padding:'0 0 20px 0','textAlign':'right'}}>
        <FormItem
          label="属性代码："
          hasFeedback
          className={styles.formitem}
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
        </Row>

        <Row style={{'textAlign':'right'}}>
        <FormItem
          label="属性描述："
          hasFeedback
        >
          {getFieldDecorator('name', {
           initialValue:item.name,
            rules: [
              { required: true, message: '属性描述未填写' },
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