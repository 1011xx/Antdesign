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
    title: '尺寸组号',
    dataIndex: 'color',
    key: 'color',
  }, {
    title: '尺寸组名称',
    dataIndex: 'colorname',
    key: 'colorname',
  }, {
    title: '尺寸',
    dataIndex: 'size',
    key: 'size',
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
      color: '02',
      colorname: '马克张',
      size:'02 04 06 08 10 12 14 16 '
    }, {
      num: '2',
      color: '04',
      colorname: 'RR',
      size:'XXS XS S M L XL XXL XXXL XXXL'
    },{
      num: '3',
      color: '02',
      colorname: '马克张',
      size:'02 04 06 08 10 12 14 16 '
    },{
      num: '4',
      color: '03',
      colorname: 'RR',
      size:'XXS XS S M L XL XXL XXXL XXXL'
    }];


  return (


    
   
    <TablePlate title="维护尺寸组">
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
