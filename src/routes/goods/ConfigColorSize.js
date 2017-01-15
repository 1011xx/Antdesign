import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Configcolorsize from '../../components/ModelNumber/Configcolorsize';


//服装属性/维护颜色
var deleteid=null;//转存删除ID号码

function ConfigColorSize({dispatch,moudelnum}){

	const { }=moudelnum;




	return(
		<Wrap
       num="2"
		   last="款号维护"
       next="配置颜色尺寸图片"
		   >
		  <Configcolorsize />

		   </Wrap>

		);
}


ConfigColorSize.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ moudelnum }) {
  return { moudelnum };
}

export default connect(mapStateToProps)(ConfigColorSize);
