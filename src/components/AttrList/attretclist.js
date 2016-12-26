import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import Plate from '../plate/plate';
import styles from './attrlist.less';
//服装属性/款号属性维护/品牌

function AttrEtcList({
  onEditItem
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',

  }, {
    title: '属性类名称',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '代码长度',
    dataIndex: 'length',
    key: 'length',
  }, {
    title: '顺序号',
    dataIndex: 'rulesnum',
    key: 'rulesnum',

  }, {
    title: '手工维护',
    dataIndex: 'hand',
    key: 'hand',
  }, {
    title: '是否必输',
    dataIndex: 'output',
    key: 'output',
  },{
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>编辑属性</a>
      </p>
    ),
  }];
		  const data = [{
		  num: 1,
		  code: 'M',
		  length: 1,
      rulesnum:1,
      hand :'否',
      output:'是'
		}, {
		  num: 2,
		  code: 'O',
		  length: 2,
      rulesnum:2,
      hand :'否',
      output:'是'
		},{
		  num: 3,
		  code: 'R',
		  length: 4,
      rulesnum:3,
      hand :'是',
      output:'是'
		}];

  return (
   
    <Plate title="属性类列表">
				<Table
		        columns={columns}
		        dataSource={data}
		        pagination={false}
		        bordered
		      />

    </Plate>
  
  );
}

AttrEtcList.propTypes = {
  
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  
};

export default AttrEtcList;
