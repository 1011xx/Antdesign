import React, { PropTypes } from 'react';
import {  Table, Input,Modal,Col,Row} from 'antd';
import styles from './LookupModal.less';


const LookupModal = ({
	lookupvis,
	onOk,
	handleCancel,
	item={},

}) => {
function handleOk() {


  }
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
	  dataIndex: 'name',
	  key: 'name',
	}, {
	  title: '操作时间',
	  dataIndex: 'time',
	  key: 'time',
	}, {
	  title: '状态',
	  dataIndex: 'status',
	  key: 'status',
	}, {
	  title: '说明',
	  dataIndex: 'exp',
	  key: 'exp',
	}]


	return(
         <Modal title="查看审核过程"
          visible={lookupvis}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
        >
				<div className={styles.titletop}>
				<Row gutter={16}>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>单据号：</span>
							<span>P201603120004</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
		        <div className="gutter-box">
							<span>调价日期：</span>
							<span>2016-10-25</span>
						</div>
		      </Col>
		      <Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>调价人：</span>
						<span>林明</span>
					</div>
		      </Col>
    	</Row>
			<Row gutter={16} className={styles.rowspace}>
				<Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>当前状态：</span>
						<span>审核通过</span>
					</div>
				</Col>
				<Col className="gutter-row" span={8}>
					<div className="gutter-box">
						<span>备注：</span>
						<span>为2017款调价</span>
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
			dataSource={dataSource}
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
