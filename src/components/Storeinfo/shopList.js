import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import Plate from '../plate/plate';
import styles from './shopList.less';

function ShopList({
  total, current, loading,
  onPageChange,
  onDeleteItem,
  onEditItem,
  }) {


  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',

  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];
		  const data = [{
		  key: '1',
		  name: 'John Brown',
		  age: 32,
		  address: 'New York No. 1 Lake Park',
		}, {
		  key: '2',
		  name: 'Jim Green',
		  age: 42,
		  address: 'London No. 1 Lake Park',
		},{
		  key: '3',
		  name: 'Joe Black',
		  age: 32,
		  address: 'Sidney No. 1 Lake Park',
		},{
      key: '4',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '5',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }];

  return (

    <Plate title="店仓列表">
            <div className={styles.add_plate}>
              <a className={styles.add_btn} ><Icon type="plus-circle-o" />&nbsp;新增</a>
            </div>
				<Table
		        columns={columns}
		        dataSource={data}
		        pagination={true}
		        bordered
		      />

    </Plate>

  );
}

ShopList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default ShopList;
