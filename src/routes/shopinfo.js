import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import Queryinfo from '../components/Storeinfo/Search';
import ShopList from '../components/Storeinfo/shopList';

function Shopinfo({dispatch}){

	const queryProps={
		passdata(data){
			console.log(data);
		}
	};

	return(
		<Wrap 
		   last="店仓维护"
		   next="店仓信息"
		   >
		  <Queryinfo {...queryProps}/>
		  <ShopList></ShopList>
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


Shopinfo.propTypes = {
  dispatch: PropTypes.func,
};

export default Shopinfo;