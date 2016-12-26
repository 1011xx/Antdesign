import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import Plate from '../plate/plate';
import styles from './attrlist.less';
//服装属性/款号属性维护/品牌

function AttrList({
  onDeleteItem,
  onEditItem,
  additem,
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',

  }, {
    title: '属性代码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '属性描述',
    dataIndex: 'expattr',
    key: 'expattr',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>修改</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.key)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];
		  const data = [{
		  key: '1',
		  num: '1',
		  code: 'M',
		  expattr: '马克张',
		}, {
		  key: '2',
		  num: '2',
		  code: 'O',
		  expattr: '奥特莱斯',
		},{
		  key: '3',
		  num: '3',
		  code: 'R',
		  expattr: 'ROYALRAYE',
		},{
      key: '4',
      num: '4',
      code: 'Y',
      expattr: 'YUANLONG',
    }];

  return (


    <div>
    <Plate title="属性类">
      <p className={styles.p_padding}>
      <span className={styles.attrpadding}>属性类名称：品牌</span>
      <span className={styles.attrpadding}>代码长度：1</span>
      <span className={styles.attrpadding}>顺序号：1</span>
      </p>
    </Plate>
    <Plate title="属性">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => additem()}><Icon type="plus-circle-o" />&nbsp;新增</a>
      </div>
				<Table
		        columns={columns}
		        dataSource={data}
		        pagination={true}
		        bordered
		      />

    </Plate>
    </div>
  );
}

AttrList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default AttrList;
