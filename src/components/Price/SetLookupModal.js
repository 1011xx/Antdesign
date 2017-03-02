import React, { PropTypes } from 'react';
import {  Table, Input,Modal,Col,Row} from 'antd';
import styles from './LookupModal.less';


const LookupModal = ({
	lookupvis,
	auditdetaildata,
	onOk,
	handleCancel,

}) => {


	const dataSource = [{
	  num: '1',
	  auditEmployeeName: '胡彦斌',
	  auditDate: '2016-10-06 12:09:23',
	  resultStateName: '审核通过',
		description:'同意'
	}, {
	  num: '2',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '3',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '4',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '5',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '6',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '7',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '8',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '9',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '10',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '11',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '12',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}, {
	  num: '13',
	  auditEmployeeName: '胡彦号',
	  auditDate: '2016-10-05 12:09:45',
	  resultStateName: '提交审核',
		description:'修改了价格'
	}]

	const columns = [{
	  title: '序号',
	  dataIndex: 'num',
	  key: 'num',
		width:'10%'
	}, {
	  title: '操作员',
	  dataIndex: 'auditEmployeeName',
	  key: 'auditEmployeeName',
		width:'15%'
	}, {
	  title: '操作时间',
	  dataIndex: 'auditDate',
	  key: 'auditDate',
		width:'29%'
	}, {
	  title: '状态',
	  dataIndex: 'resultState',
	  key: 'resultState',
		width:'16%',
    render:(text)=>{
			if(text==2){
				return '待审核';
			}else if(text==3){
				return '未通过';
			}else if(text==4){
				return '已审核';
			}
		}
	}, {
	  title: '说明',
	  dataIndex: 'description',
	  key: 'description',
		width:'30%'
	}]


	return(
         <Modal title="查看审核过程"
          visible={lookupvis}
          onOk={onOk}
          onCancel={handleCancel}
          closable={true}
          footer={null}
		  width={700}
		  maskClosable={false}
		  className={styles.modal}
        >
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={6}>
		        <div className="gutter-box">
							<span>单据号：</span>
							<span>{auditdetaildata.documentNumber}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={6}>
		        <div className="gutter-box">
							<span>调价日期：</span>
							<span>{auditdetaildata.createDate}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={6}>
					<div className="gutter-box">
						<span>调价人：</span>
						<span>{auditdetaildata.createEmployeeName}</span>
					</div>
		      </Col>
					<Col className="gutter-row" span={6}>
					<div className="gutter-box">
						<span>当前状态：</span>
						<span>{auditdetaildata.stateName}</span>
					</div>
		      </Col>
    	</Row>

		<Row className={styles.rowspace}>
		<Col span={24} >
		<div className="gutter-box">
			<span style={{letterSpacing:3}}>备 注：</span>
			<span>{auditdetaildata.remarks}</span>
		</div>
		</Col>
		</Row>
			</div>
			<Table bordered
			size="small"
			pagination={false}
			className={styles.table}
			dataSource={auditdetaildata.dataList}
			rowKey={record => record.num}
			scroll={{y: 285 }}
			columns={columns}
			title={() => '审核信息'}
			/>
			{/*dataSource={auditdetaildata.dataList}*/}
        </Modal>


		);
}

LookupModal.propTypes = {
	lookupvis: PropTypes.any,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default LookupModal;
