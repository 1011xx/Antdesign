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
    title: '尺寸组号',
    dataIndex: 'code',
    key: 'code',
      width:'10%'
  }, {
    title: '尺寸组名称',
    dataIndex: 'name',
    key: 'name',
      width:'35%'
  }, {
    title: '尺寸',
    dataIndex: 'sizes',
    key: 'sizes',
      width:'35%'
  }, {
    title: '操作',
    key: 'operation',
      width:'20%',
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
      id:'qwqwqwqwqw',
      code: '02',
      name: '马克张',
      sizes:'02 04 06 08 10 12 14 16 '
    }, {
      num: '2',
      id:'qwqwqwrqwqw',
      code: '04',
      name: 'RR',
      sizes:'XXS XS S M L XL XXL XXXL XXXL'
    },{
      num: '3',
      id:'qwqwqwqwtytyqw',
      code: '02',
      name: '马克张',
      sizes:'02 04 06 08 10 12 14 16 '
    },{
      num: '4',
      id:'qwqwqwqfgfgwqw',
      code: '03',
      name: 'RR',
      sizes:'XXS XS S M L XL XXL XXXL XXXL'
    }];


  return (




    <TablePlate title="维护尺寸组">
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
      {/*ajax加载的时候需要进行的loading={loading}*/}
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
