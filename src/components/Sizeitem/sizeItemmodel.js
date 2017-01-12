import React, { PropTypes } from 'react';
import { Select,Form,Input,Modal,Col,Row} from 'antd';
import styles from './sizeItemmodel.less';
const FormItem = Form.Item;
const Option = Select.Option;



const ItemModel = ({
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
 function genoption(){
  console.log(111111111111111);
 }


	return(

        <Modal title={title}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}

        >
        <Form  inline style={{ width: 340 ,marginLeft:100}}>
        <Row style={{padding:'0 0 20px 0','textAlign':'left'}}>
        <FormItem
          label="尺&nbsp;寸&nbsp;组&nbsp;号&nbsp;："
          hasFeedback
          className={styles.formitem}
        >
          {getFieldDecorator('code', {
           initialValue:item.code,
            rules: [
              { required: true, message: '尺寸未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        </Row>

        <Row style={{padding:'0 0 20px 0','textAlign':'left'}}>
        <FormItem
          label="尺寸组名称："
          hasFeedback
        >
          {getFieldDecorator('name', {
           initialValue:item.name,
            rules: [
              { required: true, message: '尺寸组名称未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
         </Row>

         <Row style={{'textAlign':'left'}}>
        <FormItem
          label="选&nbsp;择&nbsp;尺&nbsp;寸&nbsp;："
          
          className={styles.feedback}
        >
          {getFieldDecorator('sizes', {
           initialValue:item.sizes,
            rules: [
              { required: true, message: '点击输入框选择尺寸' },
            ],
          })(
            
             <Select tags style={{ width: 240 }}
                tokenSeparators={[',']}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="jack1">Jack1</Option>
                <Option value="lucy1">Lucy1</Option>
                <Option value="jack2">Jack2</Option>
                <Option value="lucy2">Lucy2</Option>
                {genoption()}
              </Select>
          )}
        </FormItem>
         </Row>
      </Form>
        </Modal>
     
			
		);
}

ItemModel.propTypes = {
    title: PropTypes.any,
	visible: PropTypes.any,
	form: PropTypes.object,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Form.create()(ItemModel);