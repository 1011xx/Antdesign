import React, { PropTypes } from 'react';
import { Table,Icon } from 'antd';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Stylelist.less';

function Stylelist({
  onConfig,
  onEditItem,
  onDeleteItem,
  onDetails,
  onBarcode,
  additem,
  dataSource,
  loading
	}) {

  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  }, {
    title: '款号',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '品名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '品牌',
    dataIndex: 'brandName',
    key: 'brandName',
  }, {
    title: '年份',
    dataIndex: 'yearName',
    key: 'yearName',
  }, {
    title: '季节',
    dataIndex: 'seasonName',
    key: 'seasonName',
  }, {
    title: '序号',
    dataIndex: 'seriesName',
    key: 'seriesName',
  }, {
    title: '类别',
    dataIndex: 'categoryName',
    key: 'categoryName',
  }, {
    title: '是否唯一码管理',
    dataIndex: 'isUniqCodemanagementName',
    key: 'isUniqCodemanagementName',
  },{
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a  onClick={() => onEditItem(record)}>修改</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onConfig(record)}>配置</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onDeleteItem(record)}>删除</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a onClick={() => onDetails(record)}>查看</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a  onClick={() => onBarcode(record)}>条码</a>


      </p>
    ),
  }];
		//   const data = [{
		//   num: '1',
    //   id:'sddfdfdrtf',
		//   colorCode: '011',
		//   colorName: '黑色',
		// }, {
		//   num: '2',
    //   id:'sddfdfdsdff',
		//   colorCode: '012',
		//   colorName: '黄色',
		// },{
		//   num: '3',
    //   id:'sdsdfdfdfdf',
		//   colorCode: '013',
		//   colorName: '黑咖啡',
		// },{
    //   num: '4',
    //   id:'sddfdsdffdf',
    //   colorCode: '014',
    //   colorName: '白色',
    // }];

  return (

    <TablePlate title="维护颜色">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => additem()}><Icon type="plus-circle-o" />&nbsp;新增</a>
      </div>
				<Table size="small"
         		className={styles.table}
		        columns={columns}
            loading={false}
		        dataSource={dataSource}
		        pagination={false}
		        bordered
		      />

    </TablePlate>

  );
}

export default Stylelist;
