import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Header from '../components/MainLayout/mainlayout';


function System({}){
	return(
			<Header />
		);
}

export default System;