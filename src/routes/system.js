import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Header from '../components/MainLayout/mainlayout';
//获得要打开菜单的key
const getAncestorKeys=(key)=> {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

function System({children,location,dispatch,main,price,shopinfo,moudelnum}){

const {currentopenkey,currentselectkey}=main;
const {setStatus}=price;
const {}=shopinfo;
const {}=moudelnum;











const mainlayProps={
	location,
	children,
	currentopenkey,
	currentselectkey,
	onOpenChange(openKeys){
	//更改左侧导航菜单的状态
	const latestOpenKey = openKeys.find(key => !(currentopenkey.indexOf(key) > -1));
    const latestCloseKey = currentopenkey.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    //立即修改左侧导航菜单状态
    dispatch({
			type: 'main/ChangeOpenkey',
			payload: nextOpenKeys,
			});
  },
  handleClick(e){
		// console.log(e.key);
		 dispatch({
				type: 'main/ChangeSelectkey',
				payload: e.key,
				});
        //在这里执行 点击后的操作,由于其他的页面已经执行了进入后刷新，剩余的就是
        if(e.key==1){
          //shopinfo
          dispatch({type: 'shopinfo/publicdate',
                   payload:{
                  current:1,
                  defaultPageSize:10,
                  shopType:'',
                  saleAreaCode:'',
                  provinceCode:'',
                  cityCode:'',
                  shopStatus:'',
                  fullName:'',
                  loading:true
                 }
               });
          dispatch({type: 'shopinfo/enter'});
        }else if(e.key==6){
          //modelnumber
          dispatch({type: 'moudelnum/publicDate',
                   payload:{
                  current:1,
                  defaultPageSize:10,
                  loading:true,
                  styleCode:'',
                  categoryCode:'',
                  yearCode:''
                 }
               });
               dispatch({type: 'moudelnum/enter'});
        }else if (e.key==7){
          //audit
          dispatch({type: 'price/publicDate',
                   payload:{
                  current:1,
                  defaultPageSize:10,
                  loading:true,
                  styleCode:'',
                  start:undefined,
                  end:undefined,
                  state:''
                 }
               });
               dispatch({type: 'price/enter'});
        }else if (e.key==8) {
          //set
          dispatch({type: 'price/publicDate',
                   payload:{
                  setpagecurrent:1,
                  setpagedefaultPageSize:10,
                  loading:true,
                  set_styleCode:'',
                  set_start:undefined,
                  set_end:undefined,
                  set_state:''
                 }
               });
               dispatch({type: 'price/enterset'});
        }
	}
}


	return(

			<Header {...mainlayProps}>
			</Header>

		);
}

System.propTypes = {
  main: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ main,price,shopinfo,moudelnum }) {
  return { main,price,shopinfo,moudelnum };
}


export default connect(mapStateToProps)(System);
