import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import {Link} from 'dva/router';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './shopList.less';

function ShopList({
  total,
  current,
  loading,
  dataSource,
  defaultPageSize,
  onPageChange,
  onShowSizeChange,
  onDeleteItem,
  onEditItem,
  onEditDetail,
  gotoclick
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width:50
  }, {
    title: '店仓编号',
    dataIndex: 'code',
    key: 'code',
    width:100
  }, {
    title: '店仓名称',
    dataIndex: 'fullName',
    key: 'fullName',
    width:200
  }, {
    title: '店仓简称',
    dataIndex: 'shortName',
    key: 'shortName',
    width:100
  }, {
    title: '类别',
    dataIndex: 'typeName',
    key: 'typeName',
    width:100
  },{
    title: '销售区域',
    dataIndex: 'saleAreaName',
    key: 'saleAreaName',
    width:100

  }, {
    title: '所在城市',
    dataIndex: 'cityName',
    key: 'cityName',
    width:100
  },
  {
    title: '店仓电话',
    dataIndex: 'mobileNumber',
    key: 'mobileNumber',
    width:100
  },{
    title: '店长',
    dataIndex: 'shopkeeper',
    key: 'shopkeeper',
    width:100
  },
  {
    title: '管店经理',
    dataIndex: 'manager',
    key: 'manager',
    width:100
  },{
    title: '仓店状态',
    dataIndex: 'statusName',
    key: 'statusName',
      width:100
  },{
    title: '操作',
    key: 'operation',
      width:200,
    render: (text, record) => (
      <p>
         <Link to={`/shopinfo/shopedit/${record.id}`}><span onClick={() => onEditItem(record)}>修改</span></Link>
        &nbsp; &nbsp; &nbsp;
        <Link to={`/shopinfo/shopdetail/${record.id}`}><span onClick={() => onEditDetail(record)}>查看</span></Link>
         &nbsp; &nbsp; &nbsp;
        <a>人员</a>

      </p>
    ),
  }];
		//   const data = [{
		//   key: '1',
		//   name: 'John Brown',
		//   age: 32,
		//   address: 'New York No. 1 Lake Park',
		// }, {
		//   key: '2',
		//   name: 'Jim Green',
		//   age: 42,
		//   address: 'London No. 1 Lake Park',
		// },{
		//   key: '3',
		//   name: 'Joe Black',
		//   age: 32,
		//   address: 'Sidney No. 1 Lake Park',
		// },{
  //     key: '4',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   }, {
  //     key: '5',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   }, {
  //     key: '6',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },{
  //     key: '7',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },{
  //     key: '8',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   }, {
  //     key: '9',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   }, {
  //     key: '10',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },{
  //     key: '11',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },{
  //     key: '12',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   }, {
  //     key: '13',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },{ key: '14',"num":1,"address":"121212","cityCode":"130900","cityName":"沧州市","code":"0713","contracts":"王大催","fullName":"翠微绿","id":"01083F4AB4374CED8885010B6D970290","images":"[]","mobileNumber":"110","provinceCode":"130000","provinceName":"河北省","saleAreaCode":"102","saleAreaName":"华北地区","shortName":"715","status":"1","statusName":"启用","telephoneNumber":"1212","typeCode":"1","typeName":"正价店","num":2}];

  return (

    <TablePlate title="店仓列表">
            <div className={styles.add_plate}>
             <Link to="/shopinfo/shopadd"><b onClick={()=>gotoclick()}><Icon type="plus-circle-o" />&nbsp;新增</b></Link>
              {/*<a className={styles.add_btn} ><Icon type="plus-circle-o" />&nbsp;新增</a>*/}
            </div>
				<Table
            size="small"
            className={styles.table}
		        columns={columns}
		        dataSource={dataSource}
		        pagination={false}
            loading={loading}
            scroll={{ y: 'calc(100vh - 410px)' }}
		        bordered
		      />
          <div className={styles.Pagination_wrap}>
           <Pagination
             className={styles.pagination}
             size="small"
             total={total}
             current={current}
             defaultPageSize={defaultPageSize}
             onShowSizeChange={onShowSizeChange}
             onChange={onPageChange}
             showQuickJumper
             showSizeChanger
           />
           </div>
    </TablePlate>

  );
}

ShopList.propTypes = {
  onPageChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  onEditItem: PropTypes.func,
  onEditDetail: PropTypes.func,
  gotoclick:PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
  loading: PropTypes.any,
  defaultPageSize: PropTypes.any,
  editid: PropTypes.any,
  detailid: PropTypes.any
};

export default ShopList;
