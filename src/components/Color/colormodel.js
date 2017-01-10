import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row} from 'antd';
import styles from './colormodel.less';
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
    }
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
          label="颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色："
          hasFeedback
          className={styles.formitem}
        >
          {getFieldDecorator('colorCode', {
           initialValue:item.colorCode,
            rules: [
              { required: true, message: '颜色未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        </Row>

        <Row style={{'textAlign':'right'}}>
        <FormItem
          label="颜色名称："
          hasFeedback
        >
          {getFieldDecorator('colorName', {
   			   initialValue:item.colorName,
            rules: [
              { required: true, message: '颜色名称未填写' },
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