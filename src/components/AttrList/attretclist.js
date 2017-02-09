import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination,Icon } from 'antd';
import {Link} from 'dva/router';
import Nobtlplate from '../../commonComponents/plate/nobtlplate';
import styles from './attrlist.less';
//服装属性/款号属性维护/品牌

function AttrEtcList({
  onEditItem,
  dataSource,
  loading
  }) {


  const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',

  }, {
    title: '属性类名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '代码长度',
    dataIndex: 'codeLength',
    key: 'codeLength',
  }, {
    title: '顺序号',
    dataIndex: 'seqno',
    key: 'seqno',

  }, {
    title: '手工维护',
    dataIndex: 'isManualMaintenceName',
    key: 'isManualMaintenceName',
  }, {
    title: '是否必输',
    dataIndex: 'isMustInputName',
    key: 'isMustInputName',
  },{
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      if(record.isManualMaintenceName==="否"){
        return (
          <p>
          <Link to={`/mainattrlist/styleattr/${record.id}`}><span onClick={() => onEditItem(record)}>修改</span></Link>
          </p>
        );
      }
    },
  }];
		//   const data = [{
		//   num: 1,
		//   code: '品牌',
		//   length: 1,
  //     rulesnum:1,
  //     hand :'否',
  //     output:'是'
		// }, {
		//   num: 2,
		//   code: '年份',
		//   length: 2,
  //     rulesnum:2,
  //     hand :'否',
  //     output:'是'
		// },{
		//   num: 3,
		//   code: '季节',
		//   length: 4,
  //     rulesnum:3,
  //     hand :'是',
  //     output:'是'
		// }];

  return (
   <div>
    <Nobtlplate title="属性列表类">
				<Table
            className={styles.table}
            size="small"
		        columns={columns}
		        dataSource={dataSource}
		        pagination={false}
            loading={loading}
		        bordered
		      />

    </Nobtlplate>
    <div style={{'height':1}}></div>
  </div>
  );
}

AttrEtcList.propTypes = {

  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading:PropTypes.bool

};

export default AttrEtcList;
