import React from 'react';
import { Table,Row,Col } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './Barcode.less';

function Barcode({
	onDeleteItem,
  onEditItem,
  additem,
  dataSource,
  loading}) {
  	 const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  }, {
    title: '颜色',
    dataIndex: 'colorCode',
    key: 'colorCode',
  }, {
    title: '颜色名称',
    dataIndex: 'colorName',
    key: 'colorName',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>修改</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={() => onDeleteItem(record)}>删除</a>
      </p>
    ),
  }];
		  const data = [{
		  num: '1',
      id:'sddfdfdrtf',
		  colorCode: '011',
		  colorName: '黑色',
		}, {
		  num: '2',
      id:'sddfdfdsdff',
		  colorCode: '012',
		  colorName: '黄色',
		},{
		  num: '3',
      id:'sdsdfdfdfdf',
		  colorCode: '013',
		  colorName: '黑咖啡',
		},{
      num: '4',
      id:'sddfdsdffdf',
      colorCode: '014',
      colorName: '白色',
    }];
  return (
  <div>
     <Plate title="款号信息">
     	款号：M160342K12322
     </Plate>
     <TablePlate title="条码列表">
     <Table size="small"
         className={styles.table}
		 columns={columns}
         loading={loading}
		 dataSource={dataSource}
		 pagination={false}
		 bordered
		/>

    </TablePlate>
 
</div>
  );
}

export default Barcode;
