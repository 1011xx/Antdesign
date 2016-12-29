import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import Queryinfo from '../components/Storeinfo/Search';
import ShopList from '../components/Storeinfo/shopList';

function Shopinfo({dispatch,shopinfo}){
	const { options,region,status,types,dataSource}=shopinfo;
	const queryProps={
		options,
		region,
		status,
		types,
		passdata(data){
			console.log(data);
			//获取文本框
		},
		selectCategory(value){
			//获取类别
			console.log(value);
		},
		selectRegion(value){
			// 获取地区
			console.log(value);
		},
		selectCity(value){
			// 获取城市
 			console.log(value);
		},
		selectShopststus(value){
			// 获取店铺状态
			console.log(value);
		}
	};
	const listProps={
		dataSource,
		onEditItem(record){
			console.log(record);
		},
		onPageChange(pageNumber){
			console.log('Page: ', pageNumber);
		},
		onShowSizeChange(current, pageSize){
			console.log(current, pageSize);
		}
	};
	return(
		<Wrap
		   last="店仓维护"
		   next="店仓信息"
		   >
		  <Queryinfo {...queryProps}/>
		  <ShopList {...listProps}></ShopList>
		  <p style={{color:'#333',fontSize:12,textAlign:'center'}}>
		  <span style={{paddingRight:14}}>Copyright</span>
		  <span style={{paddingRight:14}}>2016</span>
		  <span style={{paddingRight:14}}>版权所有</span>
		  <span style={{paddingRight:14}}>北京智慧境界科技发展有限公司</span>
		  <span style={{paddingRight:14}}>2016-12-13</span>
		  <span style={{paddingRight:14}}>12:30</span>
		  </p>
		   </Wrap>

		);
}



Shopinfo.propTypes = {
  shopinfo: PropTypes.object,
  listProps: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ shopinfo }) {
  return { shopinfo };
}

export default connect(mapStateToProps)(Shopinfo);