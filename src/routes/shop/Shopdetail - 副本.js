import React from 'react';
import { connect } from 'dva';
import {  Icon, Button, Row, Col } from 'antd';
import Plate from '../../components/plate/plate';
import styles from './Shopdetail.less';
import Wrap from '../../components/wrap/wrap';

function Shopdetail({shopinfo}) {
  const { detailItem }=shopinfo;
  const image=function(){
    let imgsource=JSON.parse(detailItem.images);
    if(imgsource.length>0){
      let source='';
     for(let i=0;i<imgsource.length;i++){
      source+='<img style="width: 180px;height: 180px;display: block;margin-right: 15px; float: left;" src="http://192.168.10.146:5001/fmss'+imgsource[i].imageDirectory+'"></img>'
     }
      return source;
     
    }else{
      return false;
    }
  }
  return (
    <Wrap
       last="店仓维护"
       next="查看详情"
       >

        <Plate title="基本信息">
       
           
             <Row  className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                  <span>店仓名称：{detailItem.fullName}</span>
                </Col>
              
               <Col span={8} className={styles.ant_col_center}>
                 <span>简称：{detailItem.shortName}</span>
               </Col>
              
              <Col span={8} className={styles.ant_col_center}>
               <span>类别：{detailItem.typeName}</span>
              </Col>
            </Row>
            
            <Row >
              <Col span={8} className={styles.ant_col_center}>
                <span>开店日期：{detailItem.establishDate}</span>
              </Col>
               <Col span={8} className={styles.ant_col_center}>
             <span>销售区域：{detailItem.saleAreaName}</span>
               </Col>
             
            </Row>
            
         
        </Plate>

        <Plate title="联系方式">
           
            <Row className={styles.ant_row_style}>
                <Col span={8} className={styles.ant_col_center}>
                <span>所在城市：{detailItem.provinceName+'-'+detailItem.cityName}</span>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
               <span>地址：{detailItem.address}</span>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <span>店仓电话：{detailItem.telephoneNumber}</span>
                </Col>

          </Row>     
          <Row>     

                <Col span={8} className={styles.ant_col_center}>
                <span>联系人：{detailItem.contracts}</span>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
               <span>手机：{detailItem.mobileNumber}</span>
                </Col>
                <Col span={8} className={styles.ant_col_center}>
                <span>传真：{'保留'}</span>
                </Col>
             </Row>
         
        </Plate>

         <Plate title="照片">
         {image()==false?<p>暂无图片数据</p>
         :<div className={styles.clear} dangerouslySetInnerHTML={{__html: image()}} />
         }
         </Plate>
         <Plate title="其他信息">
         <span>备注：{'保留'}</span>
         
         </Plate>

     
       </Wrap>
  );
}

function mapStateToProps({ shopinfo }) {
  return { shopinfo };
}

export default connect(mapStateToProps)(Shopdetail);

