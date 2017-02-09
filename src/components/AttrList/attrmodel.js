import React, { PropTypes } from 'react';
import {  Form, Input,Modal,Col,Row} from 'antd';
import styles from './attrmodel.less';
const FormItem = Form.Item;

const AttrModel = ({
	title,
	visible,
	onOk,
	handleCancel,
	details,
	item={},
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },

}) => {

function checkAttrcode(rule, value, callback){
	/*
	details.name--属性类名称
	details.codeLength--代码长度
	*/
	if(details.name=="年份"){
		//如果是年份
		// console.log(details);
		// console.log(typeof(details.codeLength));

		if(value){
			//年份只能存在两位数字的形式01-99
  		if (/^[0][1-9]$|^[1-9][0-9]$/.test(value)!=true) {
  				callback('输入的属性代码有误!');
  			} else {
  				callback();
  			}
  	}else{
  		callback();
  	}

	}else{
		//如果不是年份
		if(value){
			//\w特殊字符校验
			if(/^[A-Za-z0-9]$/.test(value)!=true){
				if(value.length>details.codeLength){
					callback('属性代码长度过长!');
				}else{
					callback();
				}
			}else{
				callback();
			}
		}else{
			callback();
		}

	}

}






function explain(rule, value, callback){
	if(value){
		if (value.length>50) {
				callback('属性描述过长!');
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
              { required: true, message: '属性代码未填写' },{
								validator:checkAttrcode
							}
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
              { required: true, message: '属性描述未填写' },{
								validator:explain
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
