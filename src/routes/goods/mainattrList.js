import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import AttrEtcList from '../../components/AttrList/attretclist';

//服装属性/款号属性维护

function MainAttrList({dispatch,attributeClass}){

	const {name,spinloading,title,dataSource,loading}=attributeClass;
	
  const attrListProps = {
    title,
    dataSource,
    loading,
    onEditItem(item) {
      console.log(title);
      console.log(item);
     

      dispatch({
        type: 'attributeClass/publicDate',
        payload:{
          spinloading:true,
          name:item.name
        }
      });
      // console.log(modalVisible);
    },
    
  };

 


	return(
		<Wrap
       num="1"
		   last="属性维护"
		   >
		  
		  <AttrEtcList {...attrListProps}/>
		   </Wrap>

		);
}


MainAttrList.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attributeClass }) {
  return { attributeClass };
}

export default connect(mapStateToProps)(MainAttrList);

