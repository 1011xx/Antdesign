import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon, Spin } from 'antd';
import {Link} from 'dva/router';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import styles from './attrlist.less';
//服装属性/属性维护/品牌等

function AttrList({
  onDeleteItem,
  onEditItem,
  additem,
  dataSources,
  loadings,
  details,
  spinloading,
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
    dataIndex: 'name',
    key: 'name',
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
		//   const data = [{
		//   key: '1',
		//   num: '1',
		//   code: 'M',
		//   name: '马克张',
		// }, {
		//   key: '2',
		//   num: '2',
		//   code: 'O',
		//   name: '奥特莱斯',
		// },{
		//   key: '3',
		//   num: '3',
		//   code: 'R',
		//   name: 'ROYALRAYE',
		// },{
  //     key: '4',
  //     num: '4',
  //     code: 'Y',
  //     name: 'YUANLONG',
  //   }];

  return (


    <div>
    <Spin spinning={spinloading}  >
    <Plate title="属性类">
      <p className={styles.p_padding}>
      <span className={styles.attrpadding}>属性类名称：{details.name}</span>
      <span className={styles.attrpadding}>代码长度：{details.codeLength}</span>
      <span className={styles.attrpadding}>顺序号：{details.seqno}</span>
      </p>
    </Plate>
    </Spin>
    <TablePlate title="属性">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => additem()}><Icon type="plus-circle-o" />&nbsp;新增</a>
      </div>
				<Table size="small"
        className={styles.table}
		        columns={columns}
		        dataSource={dataSources}
		        pagination={false}
            loading={loadings}
		        bordered
		      />

    </TablePlate>
    </div>
  );
}

AttrList.propTypes = {
  additem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSources: PropTypes.array,
  details: PropTypes.object,
  loadings: PropTypes.bool,
  spinloading:PropTypes.bool,
};

export default AttrList;
