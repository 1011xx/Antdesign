import React, { PropTypes } from 'react';
import { routerRedux,browserHistory,History    } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import Queryinfo from '../components/Storeinfo/Search';
import ShopList from '../components/Storeinfo/shopList';
//将字符串数组转换为数组
// function parseArray(arrStr) {
// 	var tempKey = 'arr23' + new Date().getTime();//arr231432350056527
// 	var arrayJsonStr = '{"' + tempKey + '":' + arrStr + '}';
// 	var arrayJson;
// 	if (JSON && JSON.parse) {
// 		arrayJson = JSON.parse(arrayJsonStr);
// 	} else {
// 		arrayJson = eval('(' + arrayJsonStr + ')');
// 	}
// 	return arrayJson[tempKey];
// };


function Shopinfo({dispatch,shopinfo}){
	const { options,region,status,types,dataSource,searchForm,loading,total,changePage}=shopinfo;
	const queryProps={
		options,
		region,
		status,
		types,
		passdata(data){
			// console.log(data);
			//获取文本框
			searchForm.fullName=data.shopname;
			//将searchForm查询条件对象的值转换为字符串
			let condit=JSON.stringify(searchForm); 
			 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit,
            });
			 
		},
		selectCategory(value){
			//获取类别
			// console.log(value);
			searchForm.shopType=value[0];
			// console.log(searchForm);
		},
		selectRegion(value){
			// 获取地区
			// console.log(value);
			searchForm.saleAreaCode=value[0];
		},
		selectCity(value){
			// 获取城市
 			// console.log(value);
 			searchForm.provinceCode=value[0];
 			searchForm.cityCode=value[1];
		},
		selectShopststus(value){
			// 获取店铺状态
			// console.log(value);
			searchForm.shopStatus=value[0];
			// console.log(searchForm)
		}
	};
	const listProps={
		dataSource,
		loading,
		total,
	//点击修改的时候
		onEditItem( record){
			console.log('record:');
			console.log(record.id);
			// console.log(text);
				let temp={};
				temp.id=record.id;
				let obj=JSON.stringify(temp);
			// console.log(parseArray(record.typeCode));

			 dispatch({
		        type: 'shopinfo/publicdate',
		        payload:{
		        	behavier:'update',
		        	currentItem:record,
		        }
		      });
			  dispatch({
		        type: 'shopinfo/queryinfo',
		        payload:obj
		        
		      });
		
		},
		//当跳转到详情的时候
		onEditDetail(record){
			console.log(record);
			 dispatch({
		        type: 'shopinfo/updateinfo',
		        payload:{
		        	detailItem:record,
		        }
		      });
		},
		onPageChange(pageNumber){
			// console.log('Page: ', pageNumber);
			changePage.page=pageNumber;
			//将查询条件对象的值转换为字符串
			let condit=JSON.stringify(changePage); 
			// console.log(condit);
			 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit,
            });
		},
		onShowSizeChange(current, pageSize){
			// console.log(current, pageSize);
			changePage.page=current;
			changePage.rows=pageSize;
			let condit=JSON.stringify(changePage); 
			// console.log(condit);
		 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit,
            });
		},
		gotoclick(){
			
			 dispatch({
		        type: 'shopinfo/updateinfo',
		        payload:{
		        	modalType:'create'
		        }
		      });
		}
	};
	return(
		<Wrap
		   last="店仓维护"
		   next="店仓信息"
		   >
		  <Queryinfo {...queryProps}/>
		  <ShopList {...listProps}></ShopList>
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