import React, { PropTypes } from 'react';
import { Form, Table, Input,Col,Row,DatePicker,Button,Spin} from 'antd';
import Upload from 'rc-upload';
import moment from 'moment';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import EditableCell from './Edittable';
import styles from './Editprice.less';
const FormItem = Form.Item;




const Addprice = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    },
    choosestyle,
    setprice,
    onDelete,
	  detaildatasource,
    onSuccess,
    onErrors,
    setType,
    getdata,
    backurl,
    Submitted,
    temporaryStorage,
    selecteonChange,
    datechanger,
    remarkschange,
    tagPrice,
    tagremarks,
    addeditloading


}) => {


  const columns = [{
     title: '序号',
     dataIndex: 'key',
     key: 'key',
     width:'5%'
   }, {
     title: '款号',
     dataIndex: 'styleNo',
     key: 'styleNo',
     width:'30%'
   }, {
     title: '当前吊牌价',
     dataIndex: 'currentTagprice',
     key: 'currentTagprice',
     width:'20%'
   }, {
     title: '设置吊牌价',
     dataIndex: 'configTagprice',
     key: 'configTagprice',
     width:'20%',
     render:(text,record,index) => (
       <FormItem>
                 {getFieldDecorator(`configTagprice${record.key}`, {
                     initialValue:record.configTagprice,
                     rules: [{ required: true, message: '设置吊牌价必须填写!' }]
                   })(
                   <Input size="small"  style={{ width: 186}}  onBlur={tagPrice}/>
                 )}
        </FormItem>
     )
   }, {
     title: '备注',
     dataIndex: 'remarks',
     key: 'remarks',
     width:'20%',
     render:(text,record) => (
       <FormItem>
                 {getFieldDecorator(`remarks${record.key}`, {
                     initialValue:record.remarks
                   })(
                    <Input size="small" style={{ width: 186}} onBlur={tagremarks}/>
                 )}
        </FormItem>
     )
   },{
     title: '操作',
     key: 'operation',
      width:'5%',
     render: (text, record) => (
       <p>
         <a onClick={()=>onDelete(record)}>删除</a>
       </p>
     ),
   }];


   const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log('onChange:', 'selectedRows: ', selectedRows);
    selecteonChange(selectedRows);
  }
};



function handleSubmit(e){
    e.preventDefault();
       validateFields((err, fieldsValue) => {
         if (!err) {
           if(fieldsValue.expectEffectiveDate){
             const data={
               ...fieldsValue,
               'expectEffectiveDate':fieldsValue['expectEffectiveDate'].format('YYYY-MM-DD')
             }
            getdata(data);
          }else{
            getdata(fieldsValue);
          }

         }
       });
   }


	return(
    <Spin tip="保存中,请稍后..." spinning={addeditloading}>
      <Form inline  onSubmit={handleSubmit}>
          <Plate title="基础信息">
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={6}>
		        <div className={styles.gutterbox}>
							<span>单据号：</span>
							<span>{detaildatasource.documentNumber}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
            <FormItem
            label="预计生效日期："
            >
              {getFieldDecorator('expectEffectiveDate', {
                rules: [{ required: true, message: '请选择预计生效日期!' }]
              })(
                <DatePicker size="small"  onChange={datechanger}/>
              )}
            </FormItem>

		      </Col>
		      <Col className="gutter-row" span={6}>
					<div className={styles.gutterbox}>
						<span>状态：</span>
						<span>{detaildatasource.stateName}</span>
					</div>
		      </Col>
          <Col className="gutter-row" span={4}>
		      </Col>
    	</Row>

			</div>
      <div className={styles.padtop}>
            <FormItem
                label="备注："
                >
                  {getFieldDecorator('remarks', {
                  })(
                    <Input type="textarea" rows={3} style={{width:650}} onBlur={remarkschange}/>
                  )}
                </FormItem>
        </div>

      </Plate>
      <TablePlate title="价格信息">
            <div className={styles.add_plate}>
              <a className={styles.add_btn} onClick={choosestyle}>选择款号</a>
              <a className={styles.add_btn} onClick={setprice}>批量设置价格</a>
              <a className={styles.add_btn} href="http://192.168.10.178:9081/fmss/tagPriceController/tagPriceConfigTemplateDownload" target="_blank">下载模版</a>
              <Upload
                action="/fmss/tagPriceController/tagPriceConfigBatchImportStyles"
                onSuccess={onSuccess}
                onError={onErrors}
              >
                <a className={styles.add_btn} >批量导入款号</a>
               </Upload>

            </div>
			    <Table
            size="small"
            className={styles.table}
		        columns={columns}
            rowSelection={rowSelection}
            dataSource={detaildatasource.dataList}
		        pagination={false}
            loading={false}
		        bordered
		      />

    </TablePlate>
    <div className={styles.formbtn}>
    <FormItem>
       <Button type="primary" htmlType="submit" className={styles.marginbtn} size="large" onClick={temporaryStorage}>暂存</Button>
       <Button type="primary" htmlType="submit" className={styles.marginbtn} size="large" onClick={Submitted }>提交审核</Button>
       <Button type="ghost" size="large"  onClick={backurl}>取消</Button>
     </FormItem>
     </div>
    </Form>
</Spin>
		);
}

Addprice.propTypes = {
	lookupvis: PropTypes.any,
	makeSure: PropTypes.func,
	handleCancel: PropTypes.func,
  explain:PropTypes.func,
  choosestyle:PropTypes.func,
};

export default Form.create()(Addprice);
