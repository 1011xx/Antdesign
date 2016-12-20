import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Header from '../components/MainLayout/mainlayout';

function System({children,location,dispatch}){
	return(
			<Header location={location}  children={children}>
				
			</Header>
		);
}

export default System;