import React from 'react';
import { Table,Row,Col,Spin } from 'antd';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Plate from '../../commonComponents/plate/plate';
import Paginations from '../../commonComponents/Pagination/Paginations';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Barcode.less';


function BarCode({dispatch,moudelnum}) {
   const {barcodeSource,barcodeTotal,barcodecurrent,barcodepagesize,spinflag}=moudelnum;
   const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width:'5%'
  }, {
    title: '条码',
    dataIndex: 'barcode',
    key: 'barcode',
    width:'25%'
  }, {
    title: '款号',
    dataIndex: 'styleCode',
    key: 'styleCode',
    width:'25%'
  },{
    title: '颜色名称',
    dataIndex: 'colorName',
    key: 'colorName',
    width:'20%'
  }, {
    title: '尺寸名称',
    dataIndex: 'sizeName',
    key: 'sizeName',
    width:'20%'
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

 //页码
  const pageProps={
    total:barcodeTotal,
    current:barcodecurrent,
    defaultPageSize:barcodepagesize,
    onShowSizeChange(currentpage,pagesize){
      // console.log(currentpage,pagesize);
       let tempobj={};
      tempobj.page=currentpage;
      tempobj.rows=pagesize;
      // console.log(currentpage,pagesize);
      dispatch({type:'moudelnum/tableLoading'});
      dispatch({
        type:'moudelnum/publicDate',
        payload:{
          barcodecurrent:currentpage,
          barcodepagesize:pagesize
        }
      });

       dispatch({
        type: 'moudelnum/querybarcode'
      });

    },
    onPageChange(currentpage){
      // console.log('currentpage:'+currentpage);
      // let tempobj={};
      // tempobj.page=currentpage;
      // tempobj.rows=defaultPageSize;
      console.log(currentpage);
      dispatch({type:'moudelnum/tableLoading'});

      dispatch({
        type:'moudelnum/publicDate',
        payload:{
          barcodecurrent:currentpage
        }
      });
      dispatch({type:'moudelnum/querybarcode'});
    }
  };



  return (
<Spin tip="请稍后..." spinning={spinflag}>
      <Wrap
       num="2"
       url="/modelnumber"
       last="款号维护"
       next="查看条码"
       >
     <Plate title="款号信息">
     <Row>
      <Col span={8}>款&nbsp;&nbsp;&nbsp;&nbsp;号：M160342K12322</Col>
      <Col span={8} >品&nbsp;&nbsp;&nbsp;&nbsp;名：Mark Cheng2016初夏0379连衣裙</Col>
    </Row>
     </Plate>
     <TablePlate title="条码列表">
     <Table size="small"
     className={styles.table}
		 columns={columns}
     loading={false}
		 dataSource={barcodeSource}
     rowKey={record => record.barcode}
		 pagination={false}
     scroll={{y: 'calc(100vh - 335px)' }}
		 bordered
		/>

    </TablePlate>
     <Paginations {...pageProps}/>
 </Wrap>
</Spin>
  );
}


function mapStateToProps({ moudelnum }) {
  return { moudelnum };
}

export default connect(mapStateToProps)(BarCode);
