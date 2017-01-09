import React from 'react';
import { connect } from 'dva';
import {  Icon, Button, Row, Col } from 'antd';
import Plate from '../../components/plate/plate';
import styles from './Shopdetail.less';
import Wrap from '../../components/wrap/wrap';

function Shopdetail({shopinfo}) {
  const { detailItem }=shopinfo;

  const image=function(){
    // console.log(location.host);
    // let imgurl='http://'+location.host+'/fmss';
    // let imgurl='http://192.168.10.146:5001/fmss';
    let imgurl='/proxyDir/fmss';
    console.log(imgurl);
    if(detailItem.images){
        let imgsource=JSON.parse(detailItem.images);
      if(imgsource.length>0){
        let source='';
       for(let i=0;i<imgsource.length;i++){
        source+='<img style="width: 180px;height: 180px;display: block;margin-right: 15px; float: left;" src="'+imgurl+imgsource[i].imageDirectory+'"></img>';
       }
        return source;
      }else{
        return false;
      }
    }
    
  };
  return (
    <Wrap
       last="店仓维护"
       next="查看详情"
       >

        <Plate title="基本信息">
       
             <Row  className={styles.ant_row_style}>
                  <Col span={4} className={styles.ant_col_right}>
                    <span>店仓名称：</span>
                  </Col>
                  <Col span={4} className={styles.ant_col_left}>
                    <span>{detailItem.fullName}</span>
                  </Col>
              
                 <Col span={4} className={styles.ant_col_right}>
                   <span>简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                 </Col>
                 <Col span={4} className={styles.ant_col_left}>
                   <span>{detailItem.shortName}</span>
                 </Col>
              
                  <Col span={4} className={styles.ant_col_right}>
                   <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                  </Col>
                  <Col span={4} className={styles.ant_col_left}>
                   <span>{detailItem.typeName}</span>
                  </Col>
            </Row>
            
            <Row >
              <Col span={4} className={styles.ant_col_right}>
                <span>开店日期：</span>
              </Col>
               <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.establishDate}</span>
              </Col>
               <Col span={4} className={styles.ant_col_right}>
             <span>销售区域：</span>
               </Col>
                <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.saleAreaName}</span>
              </Col>
            </Row>
            
         
        </Plate>

        <Plate title="联系方式">
           
            <Row className={styles.ant_row_style}>
                <Col span={4} className={styles.ant_col_right}>
                <span>所在城市：</span>
                </Col>
                 <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.provinceName}{'-'}{detailItem.cityName}</span>
                </Col>
                <Col span={4} className={styles.ant_col_right}>
               <span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
                </Col>
                 <Col span={4} className={styles.ant_col_rleft}>
                <span>{detailItem.address}</span>
                </Col>
                <Col span={4} className={styles.ant_col_right}>
                <span>店仓电话：</span>
                </Col>
                 <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.telephoneNumber}</span>
                </Col>
          </Row>     
          <Row>     
                <Col span={4} className={styles.ant_col_right}>
                <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span>
                </Col>
                 <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.contracts}</span>
                </Col>
                <Col span={4} className={styles.ant_col_right}>
               <span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span>
                </Col>
                 <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.mobileNumber}</span>
                </Col>
                <Col span={4} className={styles.ant_col_right}>
                <span>传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真：</span>
                </Col>
                 <Col span={4} className={styles.ant_col_left}>
                <span>{detailItem.faxNumber}</span>
                </Col>
             </Row>
         
        </Plate>

         <Plate title="照片">
        {image()==false?<p>暂无图片数据</p>
         :<div className={styles.clear} dangerouslySetInnerHTML={{__html: image()}} />
         }
         </Plate>
          <Plate title="其他信息" style={{'margin-bottom':0}}>
         <span>备注：{detailItem.remarks}</span>
         
         </Plate>
         <div style={{'clear':'both','height':1}}></div>
   
       </Wrap>
  );
}

function mapStateToProps({ shopinfo }) {
  return { shopinfo };
}

export default connect(mapStateToProps)(Shopdetail);

