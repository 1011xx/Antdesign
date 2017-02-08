import React, { PropTypes } from 'react';
import { Form, Table, Input,Modal,Col,Row} from 'antd';
import styles from './CommitModal.less';
const FormItem = Form.Item;

const CommitModal = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    },
	commitvis,
  commitdata,
  makeSure,
  handleCancel,
  explain,
  initvalue,

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
       makeSure(fieldsValue);
     }
   });
   //清楚表单域的值
  resetFields();
}


	return(
         <Modal title="提交"
          visible={commitvis}
          onOk={handOk}
          onCancel={Cancel}
          closable={false}
        >
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>单据号：</span>
							<span>{commitdata.documentNumber}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>调价日期：</span>
							<span>{commitdata.createDate}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>调价人：</span>
						<span>{commitdata.createEmployeeName}</span>
					</div>
		      </Col>
    	</Row>
			<Row gutter={16} className={styles.rowspace}>
				<Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>当前状态：</span>
						<span>{commitdata.stateName}</span>
					</div>
				</Col>
				<Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>备注：</span>
						<span>{commitdata.documentNumber}</span>
					</div>
				</Col>
				<Col className="gutter-row" span={8}>
				<div className="gutter-box">
				</div>
				</Col>
		</Row>
			</div>
      <div className={styles.padtop}>
      <Form
      inline
      >
            <FormItem
                label="说明："
                >
                  {getFieldDecorator('description', {
                  initialValue:initvalue,
                  })(
                    <Input type="textarea" rows={3} style={{width:380}} />
                  )}
                </FormItem>
      </Form>

        </div>

        </Modal>


		);
}

CommitModal.propTypes = {
	lookupvis: PropTypes.any,
	makeSure: PropTypes.func,
	handleCancel: PropTypes.func,
  explain:PropTypes.func,
};

export default Form.create()(CommitModal);
