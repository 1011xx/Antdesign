import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import TablePlate from '../plate/tableplate';
import styles from './colorList.less';
//服装属性/颜色维护

function ColorList({
  onDeleteItem,
  onEditItem,
  additem,
  dataSource,
  }) {


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
        <Popconfirm title="删除后将不可恢复，确定要删除吗？" onConfirm={() => onDeleteItem(record.key)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];
		//   const data = [{
		//   num: '1',
		//   colorCode: '011',
		//   colorName: '黑色',
		// }, {
		//   num: '2',
		//   colorCode: '012',
		//   colorName: '黄色',
		// },{
		//   num: '3',
		//   colorCode: '013',
		//   colorName: '黑咖啡',
		// },{
  //     num: '4',
  //     colorCode: '014',
  //     colorName: '白色',
  //   }];

  return (


    
   
    <TablePlate title="维护颜色">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => additem()}><Icon type="plus-circle-o" />&nbsp;新增</a>
      </div>
				<Table size="small"
         className={styles.table}
		        columns={columns}
		        dataSource={dataSource}
		        pagination={true}
		        bordered
		      />

    </TablePlate>
   
  );
}

ColorList.propTypes = {
  additem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  
};

export default ColorList;
