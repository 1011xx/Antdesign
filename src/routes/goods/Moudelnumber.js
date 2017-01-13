import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Searchinfo from '../../components/ModelNumber/Searchinfo';
import Stylelist from '../../components/ModelNumber/Stylelist';

function Moudelnumber({dispatch,moudelnum}) {
	const {dataSource,styleCategory,styleYear,loading}=moudelnum;
	const searchProps={
		styleCategory,
		styleYear,
		passdata(data){
			//创建查询数据newarr
			let newarr={...data,
				'categoryCode':data.categoryCode[0],
				'yearCode':data.yearCode[0]
			};
			console.log(newarr);
		}
	};
	const listProps={
		dataSource,
		loading,
		onConfig(item){

		},
	  onEditItem(item){

		},
	  onDeleteItem(item){

		},
	  onDetails(item){

		},
	  onBarcode(item){

		},
	  additem(item){

		}
	}
  return (
    <Wrap
     num="1"
	 last="款号维护"
	 >
		  <Searchinfo {...searchProps}/>
		  <Stylelist {...listProps}/>
	</Wrap>

  );
}

function mapStateToProps({moudelnum}) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Moudelnumber);
