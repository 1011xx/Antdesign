import React, { PropTypes } from 'react';
import { routerRedux,browserHistory,History    } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../components/wrap/wrap';
import Queryinfo from '../../components/Storeinfo/Search';
import ShopList from '../../components/Storeinfo/shopList';

var shopType='';
var saleAreaCode='';
var provinceCode='';
var cityCode='';
var shopStatus='';
var fullName='';

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
	const {current,updateFileList,defaultPageSize,options,region,status,types,dataSource,searchForm,loading,total,changePage}=shopinfo;
	const queryProps={
		options,
		region,
		status,
		types,
		passdata(data){
			// console.log(data);
			//获取文本框
			searchForm.fullName=data.shopname;
			fullName=data.shopname;
			//将searchForm查询条件对象的值转换为字符串
			console.log(searchForm);
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
			shopType=value[0];

			// console.log(searchForm);
		},
		selectRegion(value){
			// 获取地区
			// console.log(value);
			searchForm.saleAreaCode=value[0];
			saleAreaCode=value[0];
		},
		selectCity(value){
			// 获取城市
 			// console.log(value);
 			searchForm.provinceCode=value[0];
 			searchForm.cityCode=value[1];
 			provinceCode=value[0];
 			cityCode=value[1];
		},
		selectShopststus(value){
			// 获取店铺状态
			// console.log(value);
			searchForm.shopStatus=value[0];
			shopStatus=value[0];
			// console.log(searchForm)
		}
	};
	const listProps={
		dataSource,
		loading,
		total,
		changePage,
		current,
		defaultPageSize,
		
	//点击修改的时候
		onEditItem( record){
			
			//如果需要进入修改页面或者详情页面你点击刷新的话，需要吧ID存到cookies，点击刷新后通过读取cookie。
			// console.log(record.id);
			if(record.images){
				console.log('record.images',record.images);
				let imagearr=JSON.parse(record.images);
				// console.log('imageobj',imagearr);
				// images=[{"imageDirectory":"\\images\\shop\\d17446cb5afe45f692def5ebfdcb7473.png","imageName":"12ebb50ce49a485882b316351c75ca01.png","imageOrginalName":"i6pg.png","imageType":"png"}]
				for(let i=0;i<imagearr.length;i++){
					imagearr[i].uid=-i;
					imagearr[i].url='/proxyDir/fmss'+imagearr[i].imageDirectory;
				}
				// console.log('imagearr',imagearr);
				//将组装后的json赋值给updateFileList；
				 dispatch({
		        type: 'shopinfo/publicdate',
		        payload:{
		        	fileList:imagearr,
		        	fileListlength:imagearr.length,
		        	editid:record.id
		        }
		      });
			}
			
				// console.log('record.id:'+record.id);


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
			
			 dispatch({
		        type: 'shopinfo/updateinfo',
		        payload:{
		        	detailItem:record,
		        }
		      });
			 
		},
		onPageChange(pageNumber){
			// console.log('Page: ', pageNumber);
			if(shopType!==""){

				changePage.shopType=shopType;
			}
			if(saleAreaCode!==""){
				changePage.saleAreaCode=saleAreaCode;
			}
			if(provinceCode!==""){
				changePage.provinceCode=provinceCode;
			}
			if(cityCode!==""){
				changePage.cityCode=cityCode;
			}
			if(shopStatus!==""){
				changePage.shopStatus=shopStatus;
			}
			if(fullName!==""){
				changePage.fullName=fullName;
			}
			console.log(changePage);
			// console.log(typeof(shopType));
			changePage.page=pageNumber;
			console.log('pageNumber:',pageNumber);
			//将查询条件对象的值转换为字符串
			let condit=JSON.stringify(changePage); 
			// console.log(condit);
			
			 dispatch({
              type: 'shopinfo/publicdate',
              payload: {
              	current:pageNumber
              }
            });

			 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit
            });
		},
		onShowSizeChange(current, pageSize){
			// 保留上次修改后的每页显示数量
			dispatch({
              type: 'shopinfo/publicdate',
              payload: {
              	defaultPageSize:pageSize
              }
            });
			
			changePage.page=current;
			changePage.rows=pageSize;
			let condit=JSON.stringify(changePage); 
			// console.log(condit);
			 dispatch({
              type: 'shopinfo/publicdate',
              payload: {
              	current:current
              }
            });
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