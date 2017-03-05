import React, { PropTypes } from 'react';
import { routerRedux,browserHistory,History    } from 'dva/router';
import { connect } from 'dva';
import {setProps} from '../../utils/common';
import Wrap from '../../commonComponents/wrap/wrap';
import Queryinfo from '../../components/Storeinfo/Search';
import ShopList from '../../components/Storeinfo/shopList';

// var shopType='';
// var saleAreaCode='';
// var provinceCode='';
// var cityCode='';
// var shopStatus='';
// var fullName='';

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
	const {behavier,
		current,
		updateFileList,
		defaultPageSize,
		options,
		provincecityoptions,
		region,
		status,
		types,
		dataSource,
		searchForm,
		loading,
		total,
		changePage,
		shopType,
		saleAreaCode,
		provinceCode,
		cityCode,
		shopStatus,
		fullName
	}=shopinfo;

	const queryProps={
		options:provincecityoptions,
		region,
		status,
		types,
		shopType,
		saleAreaCode,
		provinceCode,
		cityCode,
		shopStatus,
		fullName,
		passdata(value){
			console.log('value:',value);



			//获取文本框
			dispatch({
				type:'shopinfo/publicdate',
				payload:{
					current:1,
					fullName:value.shopname,
					shopType:value.shopType,
					saleAreaCode:value.saleAreaCode,
					shopStatus:value.shopStatus,
					provinceCode:value.provinceCode,
					cityCode:value.cityCode,
					loading:true
				}
			});

			let tempdata=Object.assign({},value);
			let data=setProps(tempdata);
			console.log('data:',data);
			searchForm.fullName=data.shopname;
			searchForm.shopType=data.shopType;
			searchForm.saleAreaCode=data.saleAreaCode;
			searchForm.shopStatus=data.shopStatus;
			searchForm.cityCode=data.cityCode;
			searchForm.provinceCode=data.provinceCode;

			console.info('searchForm:',searchForm);
			console.info(changePage);
			//将searchForm查询条件对象的值转换为字符串,当点击搜索的时候，页码和页数都为初始值
			let condit=JSON.stringify({...changePage,...searchForm});
			console.info(condit);
			 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit,
            });

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
			// console.info('当点击修改的时候-behavier：',behavier);
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
			// if(shopType!==""){

				changePage.shopType=shopType;
			// }
			// if(saleAreaCode!==""){
				changePage.saleAreaCode=saleAreaCode;
			// }
			// if(provinceCode!==""){
				changePage.provinceCode=provinceCode;
			// }
			// if(cityCode!==""){
				changePage.cityCode=cityCode;
			// }
			// if(shopStatus!==""){
				changePage.shopStatus=shopStatus;
			// }
			// if(fullName!==""){
				changePage.fullName=fullName;
			// }
			console.log(changePage);
			// console.log(typeof(shopType));
			changePage.page=pageNumber;
			console.log('pageNumber:',pageNumber);
			//将查询条件对象的值转换为字符串
			let condit=JSON.stringify(setProps(changePage));
			console.log(condit);

			 dispatch({
              type: 'shopinfo/publicdate',
              payload: {
              	current:pageNumber,
				loading:true
              }
            });

			 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit
            });
		},
		onShowSizeChange(current, pageSize){
			// 保留上次修改后的每页显示数量
			console.log('pageSize:',pageSize);
			dispatch({
              type: 'shopinfo/publicdate',
              payload: {
              	defaultPageSize:pageSize,
								current:current,
								loading:true
              }
            });

			changePage.page=current;
			searchForm.page=current;
			searchForm.rows=pageSize;
			changePage.rows=pageSize;
			console.info()
			let condit=JSON.stringify({...changePage,...searchForm});
			console.log('combine:',{...changePage,...searchForm});

		 dispatch({
              type: 'shopinfo/queryShop',
              payload: condit,
            });
		},
		gotoclick(){
			//点击新增后的事件
			// console.info('当点击新增的时候-behavier：',behavier);
			 dispatch({
		        type: 'shopinfo/updateinfo',
		        payload:{
		        	behavier:'create'
		        }
		      });
		}
	};
	return(
		<Wrap
		   num="1"
		   last="店仓维护"

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
