import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import AddShopinfo from '../components/Storeinfo/addshopinfo';


function Shopadd({dispatch}){

	// const queryProps={
	// 	passdata(data){
	// 		console.log(data);
	// 	}
	// };

	return(
		<Wrap
		   last="店仓维护"
		   next="新增店仓"
		   >
		  
		  <AddShopinfo></AddShopinfo>
		  <p style={{color:'#333',fontSize:12,textAlign:'center'}}>
		  <span style={{paddingRight:14}}>Copyright</span>
		  <span style={{paddingRight:14}}>2016</span>
		  <span style={{paddingRight:14}}>版权所有</span>
		  <span style={{paddingRight:14}}>北京智慧境界科技发展有限公司</span>
		  <span style={{paddingRight:14}}>2016-12-13</span>
		  <span style={{paddingRight:14}}>12:30</span>
		  </p>
		   </Wrap>

		);
}


Shopadd.propTypes = {
  dispatch: PropTypes.func,
};

export default Shopadd;
