import React from 'react';
import { Table,Row,Col } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Styledetails.less';


function Styledetails({moudelnum}) {
   const {  dataSource,loading }=moudelnum;

  return (

      <Wrap
       num="2"
       url="/modelnumber"
       last="款号维护"
       next="查看详情"
       >
     <Plate title="基本信息">
         <Row>
          <div className={styles.inlineblock}>款号：M160342K12322</div>
          <div className={styles.margin}>品名：Mark Cheng2016初夏0379连衣裙</div>
        </Row>
     </Plate>
     <Plate title="商品属性">
     <Row className={styles.divstyle}>
      <div >品牌：Mark Cheng</div>
      <div >年份：2016年</div>
      <div >季节：春夏</div>
      <div >序号：0134</div>
      <div >类别：K</div>
    </Row>
    <Row className={styles.divstyle}>
     <div >面料：1453</div>
     <div >系列：未知</div>
     <div >大类别：春夏</div>
     <div >小类别：羊绒</div>
     <div >销售类型：自产</div>
   </Row>
     </Plate>
     <Plate title="颜色,尺寸和图片">
         <Row>
          <p>尺寸组：01 马克张</p>
        </Row>

     </Plate>
     <Plate title="其他信息">
         <Row>
          <div className={styles.danwei}>单位：件</div>
          <div className={styles.weiyi}>是否唯一码管理：是</div>

        </Row>
         <Row className={styles.margintop}>
           <Col>备注：该款号于2017年上市</Col>
        </Row>
     </Plate>

 </Wrap>

  );
}


function mapStateToProps({ moudelnum }) {
  return { moudelnum };
}

export default connect(mapStateToProps)(Styledetails);
