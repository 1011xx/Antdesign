import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import {Link} from 'dva/router';
import TablePlate from '../plate/tableplate';
import styles from './shopList.less';

function ShopList({
  total, current, loading,
  onPageChange,
  onDeleteItem,
  onEditItem,
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',

  }, {
    title: '店仓编号',
    dataIndex: 'shopcode',
    key: 'shopcode',
  }, {
    title: '店仓名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '店仓简称',
    dataIndex: 'shortname',
    key: 'shortname',
  }, {
    title: '类别',
    dataIndex: 'class',
    key: 'class',
  },{
    title: '销售区域',
    dataIndex: 'location',
    key: 'location',
  }, {
    title: '所在城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '仓店电话',
    dataIndex: 'phone',
    key: 'phone',
  },{
    title: '店长',
    dataIndex: 'shopkeeper',
    key: 'shopkeeper',
  },
  {
    title: '管店经理',
    dataIndex: 'manager',
    key: 'manager',
  },{
    title: '仓店状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>修改</a>
        &nbsp; &nbsp; &nbsp; 
        <a>查看详情</a>
         &nbsp; &nbsp; &nbsp; 
        <a>人员信息</a>
        
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

    <TablePlate title="店仓列表">
            <div className={styles.add_plate}>
             <Link to="/shopinfo/shopadd"><Icon type="plus-circle-o" />&nbsp;新增</Link>
              {/*<a className={styles.add_btn} ><Icon type="plus-circle-o" />&nbsp;新增</a>*/}
            </div>
				<Table
            size="small"
            className={styles.table}
		        columns={columns}
		        dataSource={data}
		        pagination={true}
		        bordered
		      />

    </TablePlate>

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
