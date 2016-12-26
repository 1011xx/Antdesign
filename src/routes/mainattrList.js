import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import AttrEtcList from '../components/AttrList/attretclist';

//服装属性/款号属性维护

function MainAttrList({dispatch,attrlist}){

	const {title}=attrlist;
	
  const attrListProps = {
    title,
   
    onEditItem(item) {
      console.log(title);
      console.log(item);
     
 
      // dispatch({
      //   type: 'attrlist/showEditModal',
      // });
      // console.log(modalVisible);
    },
    
  };

 


	return(
		<Wrap
		   last="服装属性"
		   next="款号属性维护"
		   >
		  
		  <AttrEtcList {...attrListProps}/>
		 
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


MainAttrList.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attrlist }) {
  return { attrlist };
}

export default connect(mapStateToProps)(MainAttrList);

