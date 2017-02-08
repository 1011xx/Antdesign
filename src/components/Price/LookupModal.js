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
	  name: '胡彦斌',
	  time: '2016-10-06 12:09:23',
	  status: '审核通过',
		exp:'同意'
	}, {
	  num: '2',
	  name: '胡彦号',
	  time: '2016-10-05 12:09:45',
	  status: '提交审核',
		exp:'修改了价格'
	}]

	const columns = [{
	  title: '序号',
	  dataIndex: 'num',
	  key: 'num',
	}, {
	  title: '操作员',
	  dataIndex: 'auditEmployeeName',
	  key: 'auditEmployeeName',
	}, {
	  title: '操作时间',
	  dataIndex: 'auditDate',
	  key: 'auditDate',
	}, {
	  title: '状态',
	  dataIndex: 'resultStateName',
	  key: 'resultStateName',
	}, {
	  title: '说明',
	  dataIndex: 'description',
	  key: 'description',
	}]


	return(
         <Modal title="查看审核过程"
          visible={lookupvis}
          onOk={onOk}
          onCancel={handleCancel}
          closable={false}
        >
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>单据号：</span>
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
				<Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>当前状态：</span>
						<span>{auditdetaildata.stateName}</span>
					</div>
				</Col>
				<Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>备注：</span>
						<span>{auditdetaildata.remarks}</span>
					</div>
				</Col>
				<Col className="gutter-row" span={8}>
				<div className="gutter-box">

				</div>
				</Col>
		</Row>
			</div>
			<Table bordered
			size="small"
			pagination={false}
			className={styles.table}
			dataSource={auditdetaildata.tagpriceConfigAuditDtoList}
			columns={columns}
			title={() => '审核信息'}
			/>
        </Modal>


		);
}

LookupModal.propTypes = {
	lookupvis: PropTypes.any,
	onOk: PropTypes.func,
	handleCancel: PropTypes.func,
};

export default LookupModal;
