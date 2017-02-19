import React, { PropTypes } from 'react';
import { Table,Icon } from 'antd';
import {Link} from 'dva/router';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Stylelist.less';

function Stylelist({
  onConfig,
  onEditItem,
  onDeleteItem,
  onDetails,
  onBarcode,
  dataSource,
  loading
	}) {

  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width:'5%',
  }, {
    title: '款号',
    dataIndex: 'code',
    key: 'code',
     width:'10%',
  }, {
    title: '品名',
    dataIndex: 'name',
    key: 'name',
     width:'22%',
  }, {
    title: '品牌',
    dataIndex: 'brandName',
    key: 'brandName',
     width:'8%',
  }, {
    title: '年份',
    dataIndex: 'yearName',
    key: 'yearName',
     width:'5%',
  }, {
    title: '季节',
    dataIndex: 'seasonName',
    key: 'seasonName',
     width:'5%',
  }, {
    title: '序号',
    dataIndex: 'seriesName',
    key: 'seriesName',
     width:'5%',
  }, {
    title: '类别',
    dataIndex: 'categoryName',
    key: 'categoryName',
     width:'5%',
  }, {
    title: '是否唯一码管理',
    dataIndex: 'isUniqCodemanagementName',
    key: 'isUniqCodemanagementName',
     width:'9%',
  },{
    title: '操作',
    key: 'operation',
     width:'20%',
    render: (text, record) => (
      <p>
        <Link to={`/modelnumber/addstyle/${record.id}`}><span onClick={() => onEditItem(record)}>修改</span></Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/modelnumber/configcolorsize/${record.id}:${record.sizegroupCode}`}><span onClick={() => onConfig(record)}>配置</span></Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onDeleteItem(record)}>删除</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/modelnumber/styledetails/${record.id}`}><span onClick={() => onDetails(record)}>查看</span></Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/modelnumber/barcode/${record.id}`}><span  onClick={() => onBarcode(record)}>条码</span></Link>


      </p>
    ),
  }];
		//   const data = [{
		//   num: '1',
  //     id:'sddfdfdrtf',
		//   colorCode: '011',
		//   colorName: '黑色',
		// }, {
		//   num: '2',
  //     id:'sddfdfdsdff',
		//   colorCode: '012',
		//   colorName: '黄色',
		// },{
		//   num: '3',
  //     id:'sdsdfdfdfdf',
		//   colorCode: '013',
		//   colorName: '黑咖啡',
		// },{
  //     num: '4',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //   },
  //   {
  //     num: '5',
  //     id:'sddfdfdrtf',
  //     colorCode: '011',
  //     colorName: '黑色',
  //   }, {
  //     num: '6',
  //     id:'sddfdfdsdff',
  //     colorCode: '012',
  //     colorName: '黄色',
  //   },{
  //     num: '7',
  //     id:'sdsdfdfdfdf',
  //     colorCode: '013',
  //     colorName: '黑咖啡',
  //   },{
  //     num: '8',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //   },
  //   {
  //     num: '9',
  //     id:'sddfdfdrtf',
  //     colorCode: '011',
  //     colorName: '黑色',
  //   }, {
  //     num: '10',
  //     id:'sddfdfdsdff',
  //     colorCode: '012',
  //     colorName: '黄色',
  //   },{
  //     num: '11',
  //     id:'sdsdfdfdfdf',
  //     colorCode: '013',
  //     colorName: '黑咖啡',
  //   },{
  //     num: '12',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //   },
  //   {
  //     num: '13',
  //     id:'sddfdfdrtf',
  //     colorCode: '011',
  //     colorName: '黑色',
  //   }, {
  //     num: '14',
  //     id:'sddfdfdsdff',
  //     colorCode: '012',
  //     colorName: '黄色',
  //   },{
  //     num: '15',
  //     id:'sdsdfdfdfdf',
  //     colorCode: '013',
  //     colorName: '黑咖啡',
  //   },{
  //     num: '16',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //   },
  //   {
  //     num: '17',
  //     id:'sddfdfdrtf',
  //     colorCode: '011',
  //     colorName: '黑色',
  //   }, {
  //     num: '18',
  //     id:'sddfdfdsdff',
  //     colorCode: '012',
  //     colorName: '黄色',
  //   },{
  //     num: '19',
  //     id:'sdsdfdfdfdf',
  //     colorCode: '013',
  //     colorName: '黑咖啡',
  //   },{
  //     num: '20',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //   },
  //   {
  //     num: '21',
  //     id:'sddfdfdrtf',
  //     colorCode: '011',
  //     colorName: '黑色',
  //   }, {
  //     num: '22',
  //     id:'sddfdfdsdff',
  //     colorCode: '012',
  //     colorName: '黄色',
  //   },{
  //     num: '23',
  //     id:'sdsdfdfdfdf',
  //     colorCode: '013',
  //     colorName: '黑咖啡',
  //   },{
  //     num: '24',
  //     id:'sddfdsdffdf',
  //     colorCode: '014',
  //     colorName: '白色',
  //   }];

  return (

    <TablePlate title="维护颜色">
     <div className={styles.add_plate}>
       <Link to="/modelnumber/editstyle"> <div className={styles.add_btn} ><Icon type="plus-circle-o" />&nbsp;新增</div></Link>
      </div>
				<Table size="small"
         		className={styles.table}
		        columns={columns}
            loading={loading}
		        dataSource={dataSource}
		        pagination={false}
            scroll={{y: 'calc(100vh - 380px)' }}
		        bordered
		      />

    </TablePlate>

  );
}

export default Stylelist;
