import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Searchinfo from '../../components/ModelNumber/Searchinfo';
import Stylelist from '../../components/ModelNumber/Stylelist';
import Paginations from '../../commonComponents/Pagination/Paginations';
var styleCode='';
var categoryCode='';
var yearCode='';

function Moudelnumber({dispatch,moudelnum}) {
	const {total,current,defaultPageSize,dataSource,styleCategory,styleYear,loading}=moudelnum;
	//搜索框相应的
	const searchProps={
		styleCategory,
		styleYear,
		passdata(data){
			console.log(data);
			//分别赋值，保存状态
			//创建查询数据newarr
			styleCode=data.styleCode;
			if((data.categoryCode) && (data.yearCode)){
				var newarr={...data,
						'yearCode':data.yearCode[0],
						'categoryCode':data.categoryCode[0]
				};
			}else
			if(data.categoryCode){
				categoryCode=data.categoryCode[0];
				var newarr={...data,
						'categoryCode':data.categoryCode[0]
				};
			}else
			if(data.yearCode){
				yearCode=data.yearCode[0];
					var newarr={...data,
							'yearCode':data.yearCode[0]
					};
			}else
			{
				var newarr=data;
			}
			dispatch({type:'moudelnum/gettablelist',payload:newarr});
		}
	};
	//表格列表相应的操作
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
//页码
	const pageProps={
		total,
		current,
		defaultPageSize,
		onShowSizeChange(currentpage,pagesize){
			// console.log(currentpage,pagesize);
			 let tempobj={};
			tempobj.page=currentpage;
			tempobj.rows=pagesize;
			dispatch({type:'moudelnum/tableLoading'});
			dispatch({
				type:'moudelnum/publicDate',
				payload:{
					current:currentpage,
					defaultPageSize:pagesize
				}
			});

			 dispatch({
				type: 'moudelnum/querypage',
				payload:tempobj
			});

		},
		onPageChange(currentpage){
			// console.log('currentpage:'+currentpage);
			let tempobj={};
			tempobj.page=currentpage;
			tempobj.rows=defaultPageSize;
			dispatch({type:'moudelnum/tableLoading'});
			console.log(tempobj);
			dispatch({
				type:'moudelnum/publicDate',
				payload:{
					current:currentpage
				}
			});
			dispatch({
				type: 'moudelnum/querypage',
				payload:tempobj
			});
		}
	};
  return (
    <Wrap
     num="1"
	 last="款号维护"
	 >
		  <Searchinfo {...searchProps}/>
		  <Stylelist {...listProps}/>
			<Paginations {...pageProps}/>
	</Wrap>

  );
}

function mapStateToProps({moudelnum}) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Moudelnumber);
