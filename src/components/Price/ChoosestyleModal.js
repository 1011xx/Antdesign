import React, { PropTypes } from 'react';
import {  Table, Input,Modal,Col,Row} from 'antd';
import styles from './ChoosestyleModal.less';


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
	  dataIndex: 'resultStateName',
	  key: 'resultStateName',
		width:'16%'
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
          closable={false}
					maskClosable={false}
        >
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>单&nbsp;&nbsp;据&nbsp;&nbsp;号：</span>
							<span>{auditdetaildata.documentNumber}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>调价日期：</span>
							<span>{auditdetaildata.createDate}</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>调价人：</span>
						<span>{auditdetaildata.createEmployeeName}</span>
					</div>
		      </Col>
    	</Row>
			<Row gutter={16} className={styles.rowspace}>
				<Col className="gutter-row" span={8} style={{marginLeft:1}}>
					<div className="gutter-box">
						<span>当前状态：</span>
						<span>{auditdetaildata.stateName}</span>
					</div>
				</Col>
				<Col className="gutter-row" span={8}>
				</Col>
				<Col className="gutter-row" span={8}>
				</Col>
		</Row>
		<Row className={styles.rowspace}>
		<Col span={24} style={{marginLeft:2}}>
		<div className="gutter-box">
			<span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
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
			scroll={{y: 200 }}
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
