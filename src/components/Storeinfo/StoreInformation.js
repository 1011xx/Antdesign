import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../wrap/wrap';
import Queryinfo from './query';

function StoreInformation({children}){
	return(
		   <Wrap 
		   last="店仓维护"
		   next="店仓信息"
		   >
		   {children}
		   </Wrap>
		);
}

export default StoreInformation;