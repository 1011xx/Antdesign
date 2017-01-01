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

function System({children,location,dispatch,main}){

const {currentopenkey,currentselectkey}=main;

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
		console.log('currentselectkey:'+currentselectkey);
		console.log(e.key);
		 dispatch({
				type: 'main/ChangeSelectkey',
				payload: e.key,
				});
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

function mapStateToProps({ main }) {
  return { main };
}


export default connect(mapStateToProps)(System);
