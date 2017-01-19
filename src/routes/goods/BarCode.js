import React from 'react';
import { Table,Row,Col } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Barcode.less';


function BarCode({moudelnum}) {
   const {  barcodeSource}=moudelnum;
   const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  }, {
    title: '条码',
    dataIndex: 'barcode',
    key: 'barcode',
  }, {
    title: '款号',
    dataIndex: 'styleCode',
    key: 'styleCode',
  },{
    title: '颜色',
    dataIndex: 'colorCode',
    key: 'colorCode',
  }, {
    title: '尺寸',
    dataIndex: 'size',
    key: 'size',
  }];
		//   const data = [{
		//   num: '1',
  //     id:'sddfdfdrtf',
		//   colorCode: '011',
		//   colorName: '黑色',
  //     operation: '黑色',
		// }, {
		//   num: '2',
  //     id:'sddfdfdsdff',
		//   colorCode: '012',
		//   colorName: '黄色',
  //     operation: '黑色',
		// },{
		//   num: '3',
  //     id:'sdsdfdfdfdf',
		//   colorCode: '013',
		//   colorName: '黑咖啡',
  //     operation: '黑色',
		// },{
  //     num: '4',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //     operation: '黑色',
  //   }];




  return (

      <Wrap
       num="2"
       url="/modelnumber"
       last="款号维护"
       next="查看条码"
       >
     <Plate title="款号信息">
     <Row>
      <Col span={8}>款号：M160342K12322</Col>
      <Col span={8} >品名：Mark Cheng2016初夏0379连衣裙</Col>
    </Row>
     </Plate>
     <TablePlate title="条码列表">
     <Table size="small"
     className={styles.table}
		 columns={columns}
     loading={false}
		 dataSource={barcodeSource}
		 pagination={false}
		 bordered
		/>

    </TablePlate>

 </Wrap>

  );
}


function mapStateToProps({ moudelnum }) {
  return { moudelnum };
}

export default connect(mapStateToProps)(BarCode);
