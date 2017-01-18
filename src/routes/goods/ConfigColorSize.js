import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Configcolorsize from '../../components/ModelNumber/Configcolorsize';
import Modalchosecolor from '../../components/ModelNumber/Modalchosecolor';



function ConfigColorSize({dispatch,moudelnum}){

const {chosecolorModal,transfordata,targetKeys,config }=moudelnum;
const configProps={
	config,
	chooseColor(){
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				chosecolorModal:true
			}
		});
	}
}

//颜色选择模态框
const modalProps={
	chosecolorModal,
	transfordata,
	targetKeys,
	handleChange(targetKey){
		console.log('targetKey:',targetKey);
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				targetKeys:targetKey
			}
		});
	},
	filterOption(inputValue, option){
//过滤选项
    return option.colorCode.indexOf(inputValue) > -1;
	},
	handleOk(){
//点击弹框确定按钮后

	},
	handleCancel(){
//点击弹框取消按钮后
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				chosecolorModal:false
			}
		});
	},
}

	return(
		<Wrap
       num="2"
		   last="款号维护"
       next="配置颜色尺寸图片"
		   >
		  <Configcolorsize {...configProps}/>
			<Modalchosecolor {...modalProps}/>
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
