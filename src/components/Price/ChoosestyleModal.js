import React, { PropTypes } from 'react';
import {  Form,Button,Transfer,Table,Select, Input,Modal,Col,Row} from 'antd';
import BigModal from '../../commonComponents/BigModal/BigModal';
import styles from './ChoosestyleModal.less';
const FormItem = Form.Item;
const Option = Select.Option;

const StyleModal = ({
	visible,
  modalyear,
  modalseason,
  modalbrand,
  modalcategory,
	modalstyle,
	onOk,
	handleCancel,
	passdata,
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
		targetKeys,
		handleTransferChange,


}) => {
	// 使用map函数生成yearoption选项
  const selectyear=modalyear.map((item, key) => {
    return(
      <Option key={key} value={item.code}>{item.name}</Option>
      );
  });
	// 使用map函数生成yearoption选项
  const selectseason=modalseason.map((item, key) => {
    return(
      <Option key={key} value={item.code}>{item.name}</Option>
      );
  });
	// 使用map函数生成yearoption选项
	const selectbrand=modalbrand.map((item, key) => {
		return(
			<Option key={key} value={item.code}>{item.name}</Option>
			);
	});
	// 使用map函数生成yearoption选项
	const selectcategory=modalcategory.map((item, key) => {
		return(
			<Option key={key} value={item.code}>{item.name}</Option>
			);
	});
	// 使用map函数生成yearoption选项
	// const selectyear=modalyear.map((item, key) => {
	// 	return(
	// 		<Option key={key} value={item.code}>{item.name}</Option>
	// 		);
	// });
function handleSubmit(e){
	e.preventDefault();
		validateFields((err, fieldsValue) => {
				 if (!err) {
						 var datas = {
							 ...fieldsValue
						 };
					 }
					 passdata(datas);
			 });
}


	return(
         <BigModal
		  title="选择款号"
          visible={visible}
          handleOk={onOk}
          handleCancel={handleCancel}
          closable={false}
		  maskClosable={false}
        >
				<div className={styles.titletop}>
				<Form
            inline
            onSubmit={handleSubmit}
            >
				<Row gutter={16}>
		      <Col className="gutter-row" span={7} style={{textAlign: 'right'}}>
							<FormItem
									 label="款号"
									 >
									 {getFieldDecorator('styleNo')(
										 <Input size="small"  style={{ width: 120 }}/>
									 )}
							 </FormItem>
		      </Col>
		      <Col className="gutter-row" span={7} style={{textAlign: 'right'}}>
					<FormItem
							 label="年份"
							 >
							 {getFieldDecorator('yearCode',{
							 	initialValue:"undefined",
							 })(
								 <Select   style={{ width: 120 }} size="small">
								   <Option  value="undefined">全部</Option>
							      {selectyear}
							    </Select>
							 )}
					 </FormItem>
		      </Col>
		      <Col className="gutter-row" span={7} style={{textAlign: 'right'}}>
					<FormItem
							 label="季节"
							 >
							 {getFieldDecorator('seasonCode',{
							 	initialValue:"undefined",
							 })(
								 <Select   style={{ width: 120 }} size="small">
								 <Option  value="undefined">全部</Option>
									 {selectseason}
								 </Select>
							 )}
					 </FormItem>
		      </Col>
					<Col className="gutter-row" span={3} style={{textAlign: 'right'}}>

		      </Col>
    	</Row>
			<Row gutter={16} className={styles.rowspace} style={{paddingBottom: 8,
    borderBottom: '1px solid #e9e9e9'}}>
					<Col className="gutter-row" span={7} style={{textAlign: 'right'}}>
					<FormItem
							 label="品牌"
							 >
							 {getFieldDecorator('brandCode',{
							 	initialValue:"undefined",
							 })(
								 <Select   style={{ width: 120 }} size="small">
								 <Option  value="undefined">全部</Option>
									 {selectbrand}
								 </Select>
							 )}
					 </FormItem>
					</Col>
					<Col className="gutter-row" span={7} style={{textAlign: 'right'}}>
					<FormItem
							 label="批次"
							 >
							 {getFieldDecorator('pici',{
							 	initialValue:"",
							 })(
								 <Select   style={{ width: 120 }} size="small" >

								 </Select>
							 )}
					 </FormItem>
					</Col>
					<Col className="gutter-row" span={7} style={{textAlign: 'right'}}>
					<FormItem
							 label="类别"
							 >
							 {getFieldDecorator('categoryCode',{
							 	initialValue:"undefined",
							 })(
								 <Select   style={{ width: 120 }} size="small">
								 <Option  value="undefined">全部</Option>
									 {selectcategory}
								 </Select>
							 )}
					 </FormItem>
					</Col>
					<Col className="gutter-row" span={3} >
					<FormItem >
						<Button type="primary" htmlType="submit" size="default">查询</Button>
				  </FormItem>
					</Col>
		</Row>
		</Form>
			</div>
			<Transfer
				className={styles.transfer}
				dataSource={modalstyle}
				titles={['可选款号', '已选款号']}
        listStyle={{
          width: 300,
          height: 300,
        }}
				targetKeys={targetKeys}
        onChange={handleTransferChange}
				render={item=>item.code}

        />

        </BigModal>


		);
}

StyleModal.propTypes = {
	lookupvis: PropTypes.any,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default Form.create()(StyleModal);
