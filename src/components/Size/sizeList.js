import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './sizeList.less';
//服装属性/尺寸维护

function SizeList({
  onDeleteItem,
  onEditItem,
  additem,
  dataSource,
  loading
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width:'10%'
  }, {
    title: '尺寸',
    dataIndex: 'sizeCode',
    key: 'sizeCode',
    width:'30%'
  }, {
    title: '尺寸名称',
    dataIndex: 'sizeName',
    key: 'sizeName',
    width:'30%'
  }, {
    title: '操作',
    key: 'operation',
    width:'30%',
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
      id:'rwdferwerfwerfwer',
		  sizeCode: '011',
		  sizeName: '黑色',
		}, {
		  num: '2',
      id:'rwerwdferfwerfwer',
		  sizeCode: '012',
		  sizeName: '黄色',
		},{
		  num: '3',
      id:'rwerwerfdfwerfwer',
		  sizeCode: '013',
		  sizeName: '黑咖啡',
		},{
      num: '4',
      id:'rwerwerfwedfrfwer',
      sizeCode: '014',
      sizeName: '白色',
    }];

  return (




    <TablePlate title="维护尺寸">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => additem()}><Icon type="plus-circle-o" />&nbsp;新增</a>
      </div>
				<Table size="small"
         className={styles.table}
		        columns={columns}
		        dataSource={dataSource}
		        pagination={false}
            loading={loading}
            scroll={{y: 'calc(100vh - 290px)' }}
		        bordered
		      />

    </TablePlate>

  );
}

SizeList.propTypes = {
    additem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.bool
};

export default SizeList;
