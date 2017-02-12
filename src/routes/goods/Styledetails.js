import React from 'react';
import { Table,Row,Col } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Styledetails.less';


function Styledetails({moudelnum}) {
  const { detaildata,configlist }=moudelnum;
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
      <Wrap
       num="2"
       url="/modelnumber"
       last="款号维护"
       next="查看详情"
       >
     <Plate title="基本信息">
         <Row>
          <div className={styles.inlineblock}>款号：{detaildata.code}</div>
          <div className={styles.margin}>品名：{detaildata.name}</div>
        </Row>
     </Plate>
     <Plate title="商品属性">
     <Row className={styles.divstyle} type="flex" justify="space-between">
     <Col span={4} >品牌：{detaildata.brandName}</Col>
     <Col span={4} >年份：{detaildata.yearName}</Col>
     <Col span={4} >&nbsp;&nbsp;&nbsp;&nbsp;季节：{detaildata.seasonName}</Col>
     <Col span={4} >&nbsp;&nbsp;&nbsp;&nbsp;序号：{detaildata.serialnoName}</Col>
     <Col span={4} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类别：{detaildata.categoryName}</Col>

    </Row>
    <Row className={styles.divstyle} type="flex" justify="space-between" style={{marginTop:8}}>
    <Col span={4} >面料：{detaildata.materialsName}</Col>
    <Col span={4} >系列：{detaildata.seriesName}</Col>
    <Col span={4} >大类别：{detaildata.bigcategoryName}</Col>
    <Col span={4} >小类别：{detaildata.smallcategoryName}</Col>
    <Col span={4} >销售类型：{detaildata.saletypeName}</Col>
   </Row>
     </Plate>

     <TablePlate title="颜色,尺寸和图片">
      <div className={styles.add_plate}>
        <p className={styles.add_btn}>尺寸组：{`${detaildata.sizegroupName} ${detaildata.brandName}`}</p>
      </div>
      <Table size="small"
        className={styles.table}
         columns={columns}
        loading={false}
         dataSource={configlist}
         pagination={false}
         showHeader={false}
         bordered
       />
     </TablePlate>
     <div style={{marginTop:5}}></div>
     <Plate title="其他信息" >
         <Row>
          <div className={styles.danwei}>单位：{detaildata.unitName}</div>
          <div className={styles.weiyi}>是否唯一码管理：{detaildata.isUniqCodemanagementName}</div>

        </Row>
         <Row className={styles.margintop}>
           <Col>备注：{detaildata.remarks}</Col>
        </Row>
     </Plate>
 </Wrap>
  );
}


function mapStateToProps({ moudelnum }) {
  return { moudelnum };
}

export default connect(mapStateToProps)(Styledetails);
