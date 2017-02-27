import React from 'react';
import { Table,Row,Col,Spin } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Pricedetails.less';


function SetPricedetails({price}) {
  const { detaildatasource,pending_spin }=price;
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
    <Spin spinning={pending_spin} size="large">
      <Wrap
       num="2"
       url="/set"
       last="价格审核"
       next="查看详情"
       >
     <Plate title="基础信息">
         <Row>
         <Col span={6} style={{marginLeft: 1}}>
           <span > 单据号：{detaildatasource.documentNumber}</span>
         </Col>
         <Col span={6}>
           <span >预计生效日期：{detaildatasource.expectEffectiveDate}</span>
         </Col>
         <Col span={6}>
           <span >状&nbsp;&nbsp;&nbsp;&nbsp;态：{detaildatasource.stateName}</span>
         </Col>
         <Col span={6}>

         </Col>
        </Row>
        <Row style={{paddingTop:5}}>
        <span >备&nbsp;&nbsp;&nbsp;&nbsp;注：{detaildatasource.remarks}</span>
        </Row>
     </Plate>

     <TablePlate title="价格信息">
      <Table size="small"
        className={styles.table}
         columns={columns}
         loading={false}
         dataSource={detaildatasource.dataList}
         pagination={false}
         showHeader={true}
         bordered
       />
     </TablePlate>

 </Wrap>
 </Spin>
  );
}


function mapStateToProps({ price }) {
  return { price };
}

export default connect(mapStateToProps)(SetPricedetails);
