import React from 'react';
import { Table,Row,Col,Spin } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Pricedetails.less';


function SetPricedetails({price}) {
  const { detaildatasource,pending_spin }=price;
   const ret=function(){
      if(detaildatasource.remarks){
          return detaildatasource.remarks.replace(/\n/g, '<br/>');
        }else{
          return '';
        }
  };
  function detailstatus(a){
    if(a==2){
      return '待审核'
    }else if(a==3){
      return '未通过'
    }else if(a==4){
      return '已通过'
    }
  };
  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
     width:'5%'
  },{
    title: '款号',
    dataIndex: 'styleNo',
    key: 'styleNo',
    width:'20%'
  },{
    title: '当前吊牌价',
    dataIndex: 'currentTagprice',
    key: 'currentTagprice',
    width:'12%'
  }, {
    title: '设置吊牌价',
    dataIndex: 'configTagprice',
    key: 'configTagprice',
    width:'12%'
  },{
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width:'51%'
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
    <Spin spinning={pending_spin} >
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
           <span >状&nbsp;&nbsp;&nbsp;&nbsp;态：{detailstatus(detaildatasource.state)}</span>
         </Col>
         <Col span={6}>

         </Col>
        </Row>
        <Row style={{paddingTop:5}}>
        <Col>
           <div style={{position:'relative',paddingLeft:50,minHeight:20}}>
          <span style={{position:'absolute',left:0,top:0,}}>备&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
          <span dangerouslySetInnerHTML={{__html: ret()}}></span>
          </div>
           </Col>

        </Row>
     </Plate>

     <TablePlate title="价格信息">
      <Table size="small"
        className={styles.setpricetable}
         columns={columns}
         loading={false}
         dataSource={detaildatasource.dataList}
         rowKey={record => record.styleNo}
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
