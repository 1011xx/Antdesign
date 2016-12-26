import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Header from '../components/MainLayout/mainlayout';

function System({children,location,dispatch,main}){

const {currentopenkey,currentselectkey}=main;

const mainlayProps={
	location,
	children,
	currentopenkey,
	currentselectkey,
	onOpenChange(openKeys){
		console.log('currentopenkey:'+currentopenkey);
		console.log('openKeys:'+openKeys);
		console.log(openKeys.indexOf(currentopenkey));

	//  dispatch({
	// 				type: 'main/ChangeOpenkey',
	// 				payload: nextOpenKeys,
	// 			});
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
