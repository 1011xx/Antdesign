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
    temporaryStorage,
    selecteonChange,
    datechanger,
    remarkschange,
    tagPrice,
    tagremarks,
    addeditloading


}) => {


 function remarksrules(rule, value, callback){
   if(value){
    if(value.length>1000){
      callback("备注太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
 }

  function itemremarksrules(rule, value, callback){
   if(value){
    if(value.length>200){
      callback("备注太长");
    }else{
      callback();
    }
  }else{
    callback();
  }
 }

function pricerules(rule, value, callback){
  // console.log('value:',value);
  // console.log(typeof(value));
  // if(value==""){
  //   console.log(1231);
  // }
   if(value){
    if (/^[1-9][0-9]{0,5}$|^0\.[0-9][1-9]$|^0\.[1-9][0-9]$|^[1-9]\.[0-9][0-9]$|^[1-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9][0-9][0-9]\.[0-9][0-9]$|^[1-9][0-9][0-9][0-9][0-9][0-9]\.[0-9][0-9]$|^0\.[0-9]$|^0\.[0-9]$|^[1-9]\.[0-9]$|^[1-9][0-9]\.[0-9]$|^[1-9][0-9][0-9]\.[0-9]$|^[1-9][0-9][0-9][0-9]\.[0-9]$|^[1-9][0-9][0-9][0-9][0-9]\.[0-9]$|^[1-9][0-9][0-9][0-9][0-9][0-9]\.[0-9]$/.test(value)!=true) {
        callback('请输入正确的价格!');
      } else {
        callback();
      }
  }else{
    callback();
  }
}

  const columns = [{
     title: '序号',
     dataIndex: 'num',
     key: 'num',
     width:'5%'
   }, {
     title: '款号',
     dataIndex: 'styleNo',
     key: 'styleNo',
     width:'20%'
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
                   {getFieldDecorator(`configTagprice${record.num}`, {
                       initialValue:text,
                       rules: [{ required: true, message: '设置吊牌价必须填写!' },{ validator:pricerules}]
                     })(
                     <Input size="small"  style={{ width: 186}}   onBlur={(e)=>{tagPrice(e.target.value,index,'configTagprice')}}/>
                   )}
         </FormItem>
     )


   }, {
     title: '备注',
     dataIndex: 'remarks',
     key: 'remarks',
     width:'30%',
     render:(text,record,index) => (

         <FormItem>
                   {getFieldDecorator(`remarks${record.num}`, {
                       initialValue:text,
                        rules: [{ validator:itemremarksrules}]
                     })(
                      <Input size="small" style={{ width: 300}} onBlur={(e)=>{tagremarks(e.target.value,index,'remarks')}}/>
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
    <Spin tip="请稍后..." spinning={addeditloading}>
      <Form inline  onSubmit={handleSubmit}>
          <Plate title="基础信息">
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={8}>
		         <FormItem
            label="预计生效日期："
            >
              {getFieldDecorator('expectEffectiveDate', {
                rules: [{ required: true, message: '请选择预计生效日期!' }]
              })(
                <DatePicker size="small"  onChange={(value)=>{datechanger(value,'expectEffectiveDate')}}/>
              )}
            </FormItem>
		      </Col>
		      <Col className="gutter-row" span={6}>


		      </Col>
		      <Col className="gutter-row" span={6}>

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
                    rules: [{
                  validator:remarksrules
                }]
                  })(
                    <Input type="textarea" rows={3} style={{width:550}} onBlur={(e)=>{remarkschange(e.target.value,'remarks')}}/>
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
            rowKey={record => record.styleNo}
		        pagination={false}
            loading={false}
		        bordered
		      />

    </TablePlate>
    <div className={styles.formbtn}>
    <FormItem>
       <Button type="primary"  className={styles.marginbtn} size="large" onClick={temporaryStorage} ghost>暂存</Button>
       <Button type="primary" htmlType="submit" className={styles.marginbtn} size="large" >提交审核</Button>
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
