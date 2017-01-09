import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import TablePlate from '../plate/tableplate';
import styles from './sizeList.less';
//服装属性/尺寸维护

function SizeList({
  onDeleteItem,
  onEditItem,
  additem,
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
  }, {
    title: '尺寸',
    dataIndex: 'color',
    key: 'color',
  }, {
    title: '尺寸名称',
    dataIndex: 'colorname',
    key: 'colorname',
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
		  const data = [{
		  num: '1',
		  color: '011',
		  colorname: '黑色',
		}, {
		  num: '2',
		  color: '012',
		  colorname: '黄色',
		},{
		  num: '3',
		  color: '013',
		  colorname: '黑咖啡',
		},{
      num: '4',
      color: '014',
      colorname: '白色',
    }];

  return (


    
   
    <TablePlate title="维护尺寸">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => additem()}><Icon type="plus-circle-o" />&nbsp;新增</a>
      </div>
				<Table size="small"
         className={styles.table}
		        columns={columns}
		        dataSource={data}
		        pagination={true}
		        bordered
		      />

    </TablePlate>
   
  );
}

SizeList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default SizeList;
