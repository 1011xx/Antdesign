import React from 'react';
import { Table,Row,Col } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Pricedetails.less';


function Pricedetails({price}) {
  const { detaildatasource }=price;
  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  },{
    title: '款号',
    dataIndex: 'styleNo',
    key: 'styleNo',
  },{
    title: '当前吊牌价',
    dataIndex: 'currentTagprice',
    key: 'currentTagprice',
  }, {
    title: '设置吊牌价',
    dataIndex: 'configTagprice',
    key: 'configTagprice',
  },{
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  }];
		  const data = [{
		  num: '1',
      id:'344433443',
		  styleCode: '011',
		  currentprice: '2980.00',
      setprice: '5890.00',
      remark:'testtesttesttest'
		}];
  return (
      <Wrap
       num="2"
       url="/audit"
       last="价格维护"
       next="查看详情"
       >
     <Plate title="基础信息">
         <Row>
          <div className={styles.inlineblock}>单据号：{detaildatasource.documentNumber}</div>
          <div className={styles.margin}>预计生效日期：{detaildatasource.expectEffectiveDate}</div>
          <div className={styles.margin}>状态：{detaildatasource.stateName}</div>
          <div className={styles.margin}>备注：{detaildatasource.remarks}</div>
        </Row>
     </Plate>

     <TablePlate title="价格信息">
      <Table size="small"
        className={styles.table}
         columns={columns}
         loading={false}
         dataSource={detaildatasource.tagpriceConfigDetailDto}
         pagination={false}
         showHeader={true}
         bordered
       />
     </TablePlate>

 </Wrap>
  );
}


function mapStateToProps({ price }) {
  return { price };
}

export default connect(mapStateToProps)(Pricedetails);
