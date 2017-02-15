import React, { PropTypes } from 'react';
import { Form, Table, Input,Col,Row,DatePicker} from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import EditableCell from './Edittable';
import styles from './Modifyprice.less';
const FormItem = Form.Item;




const Modifyprice = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    },
    choosestyle,
    onDelete,
	  detaildatasource,

}) => {

  const columns = [{
     title: '序号',
     dataIndex: 'num',
     key: 'num',

   }, {
     title: '款号',
     dataIndex: 'styleNo',
     key: 'styleNo',

   }, {
     title: '当前吊牌价',
     dataIndex: 'currentTagprice',
     key: 'currentTagprice',

   }, {
     title: '设置吊牌价',
     dataIndex: 'configTagprice',
     key: 'configTagprice',

   }, {
     title: '备注',
     dataIndex: 'remarks',
     key: 'remarks',
   },{
     title: '操作',
     key: 'operation',
     render: (text, record) => (
       <p>
         <a onClick={()=>onDelete(record)}>删除</a>
       </p>
     ),
   }];

 // const data=[{
 //    num:'1',
 //
 // }]
   const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

	return(
    <div>
          <Plate title="查询信息">
          <Form
          inline
          >
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={8}>
		        <div className={styles.gutterbox}>
							<span>单据号：</span>
							<span>{detaildatasource.documentNumber}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
          <FormItem
          required
          label="预计生效日期："
          >
                {getFieldDecorator('expectEffectiveDate', {

                })(
                  <DatePicker size="small" />

                )}
              </FormItem>

		      </Col>
		      <Col className="gutter-row" span={8}>
					<div className={styles.gutterbox}>
						<span>状态：</span>
						<span>{detaildatasource.stateName}</span>
					</div>
		      </Col>
    	</Row>

			</div>
      <div className={styles.padtop}>

            <FormItem
                label="说明："
                >
                  {getFieldDecorator('description', {
                  initialValue:"initvalue",
                  })(
                    <Input type="textarea" rows={3} style={{width:650}} />
                  )}
                </FormItem>

        </div>
  </Form>
      </Plate>
      <TablePlate title="价格信息">
            <div className={styles.add_plate}>
              <a className={styles.add_btn} onClick={choosestyle}>选择款号</a>
              <a className={styles.add_btn} onClick={choosestyle}>批量设置价格</a>
              <a className={styles.add_btn} href=" http://192.168.10.146:5001/fmss/tagPriceController/tagPriceConfigController/tagPriceConfigTemplateDownload" target="_blank">下载模版</a>
              <a className={styles.add_btn} onClick={choosestyle}>批量导入款号</a>
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
</div>
		);
}

Modifyprice.propTypes = {
	lookupvis: PropTypes.any,
	makeSure: PropTypes.func,
	handleCancel: PropTypes.func,
  explain:PropTypes.func,
  choosestyle:PropTypes.func,
};

export default Form.create()(Modifyprice);
