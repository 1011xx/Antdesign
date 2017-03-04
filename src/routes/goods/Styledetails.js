import React from 'react';
import { Table,Row,Col,Spin } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Styledetails.less';


function Styledetails({moudelnum}) {
  const { detaildata,configlist,spinflag }=moudelnum;
  const columns=[{
    title:'颜色和尺寸',
    dataIndex:'colorSize',
    key:'colorSize',
    width:'60%'
  },{
    title:'产品图片',
    dataIndex:'proimage',
    key:'proimage',
    width:'40%',
    render:(text,record,index)=>(
      <div>

      <div className={styles.text}>产品图片：</div>
      <div style={{display:'inline-block'}}>
      <img src={record.proimage} className={styles.showimg}/>
      </div>
      </div>
    )
  }];
  return (
    <Spin tip="请稍后..." spinning={spinflag}>
      <Wrap
       num="2"
       url="/modelnumber"
       last="款号维护"
       next="查看详情"
       >
     <Plate title="基本信息">
         <Row>
          <div className={styles.inlineblock}>款&nbsp;&nbsp;&nbsp;&nbsp;号：{detaildata.code}</div>
          <div className={styles.margin}>品&nbsp;&nbsp;&nbsp;&nbsp;名：{detaildata.name}</div>
        </Row>
     </Plate>
     <Plate title="商品属性">
     <Row className={styles.divstyle} type="flex" justify="space-between">
     <Col span={4} >品&nbsp;&nbsp;&nbsp;&nbsp;牌：{detaildata.brandName}</Col>
     <Col span={4} >年&nbsp;&nbsp;&nbsp;&nbsp;份：{detaildata.yearName}</Col>
     <Col span={4} >季&nbsp;&nbsp;&nbsp;&nbsp;节：{detaildata.seasonName}</Col>
     <Col span={4} >序&nbsp;&nbsp;&nbsp;&nbsp;号：{detaildata.serialnoName}</Col>
     <Col span={4} >类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{detaildata.categoryName}</Col>

    </Row>
    <Row className={styles.divstyle} type="flex" justify="space-between" style={{marginTop:8}}>
    <Col span={4} >面&nbsp;&nbsp;&nbsp;&nbsp;料：{detaildata.materialsName}</Col>
    <Col span={4} >系&nbsp;&nbsp;&nbsp;&nbsp;列：{detaildata.seriesName}</Col>
    <Col span={4} >大类别：{detaildata.bigcategoryName}</Col>
    <Col span={4} >小类别：{detaildata.smallcategoryName}</Col>
    <Col span={4} >销售类型：{detaildata.saletypeName}</Col>
   </Row>
     </Plate>

     <TablePlate title="颜色,尺寸和图片">
      <div className={styles.add_plate}>
        <p className={styles.add_btn}>尺寸组：{`${detaildata.sizegroupName}`}</p>
      </div>
      {console.log(configlist)}
      <Table size="small"
        className={styles.table}
         columns={columns}
         loading={false}
         dataSource={configlist}
         rowKey={record => record.colorCode}
         pagination={false}
         showHeader={false}
         bordered
       />
     </TablePlate>
     <div style={{marginTop:5}}></div>
     <Plate title="其他信息" >
         <Row>
          <div className={styles.danwei}>单&nbsp;&nbsp;&nbsp;&nbsp;位：{detaildata.unitName}</div>
          <div className={styles.weiyi}>是否唯一码管理：{detaildata.isUniqCodemanagementName}</div>

        </Row>
         <Row className={styles.margintop}>
           <Col>
           <div style={{position:'relative',paddingLeft:50,minHeight:20}}>
          <span style={{position:'absolute',left:0,top:0,}}>备&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
          <span dangerouslySetInnerHTML={{__html: detaildata.remarks}}></span>
          </div>
           </Col>
        </Row>
     </Plate>
 </Wrap>
 </Spin>
  );
}


function mapStateToProps({ moudelnum }) {
  return { moudelnum };
}

export default connect(mapStateToProps)(Styledetails);
