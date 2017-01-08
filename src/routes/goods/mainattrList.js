import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../components/wrap/wrap';
import AttrEtcList from '../../components/AttrList/attretclist';

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

