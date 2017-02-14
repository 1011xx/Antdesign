import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Configcolorsize from '../../components/ModelNumber/Configcolorsize';
import Modalchosecolor from '../../components/ModelNumber/Modalchosecolor';



function ConfigColorSize({dispatch,moudelnum}){

const {moveKey,chosecolorModal,exitcolor,transfordata,targetKeys,config,currentid,sizeoption,listarry,configlist }=moudelnum;
const configProps={
	config,
	sizeoption,
	listarry,
	configlist,

	handleChange(index,key){
		// console.log(index,key);
		  return (value) => {
		  	console.log('value',value);
      // const dataSource = [...this.state.dataSource];
      // dataSource[index][key] = value;
      // this.setState({ dataSource });
    };
	},
	chooseColor(){
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				chosecolorModal:true
			}
		});
	},
	onUpload(item){
		console.log(item);
		//在上传图片获取colorcode
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				colorcode:item.color
			}
		});

	},
 onDelete(text,item){
	//  console.log('exitcolor',exitcolor);
	//  console.log('transfordata',transfordata);
	//   console.log(item.colorCode);
	console.log(configlist);
	if(configlist){
		for(let j=0;j<configlist.length;j++){
			if(configlist[j].colorCode==item.colorCode){
				//删除相应的列表条目
					configlist.splice(j,1);
			}
		}
	}




		 var temparr=transfordata.concat();
	 for(let i=0;i<exitcolor.length;i++){
		 if(exitcolor[i].colorCode==item.colorCode){
			 //找到要删除的colorCode对象
			//  console.log('exitcolor[i]',exitcolor[i]);
			 temparr.push(exitcolor[i]);
		 }
	 }
	 //将删除后的颜色发送给transfordata
	 dispatch({
		 type:'moudelnum/publicDate',
		 payload:{
			 transfordata:temparr
		 }
	 });
	 console.log('transfordata',transfordata);
 },
 backurl(){
	 dispatch(routerRedux.push('/modelnumber'));
 }
}

//颜色选择模态框
const modalProps={
	chosecolorModal,
	transfordata,
	targetKeys,
	handleChange(targetKey, direction, moveKeys){
		console.log('targetKey:',targetKey,direction,moveKeys);

		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				targetKeys:targetKey,
				moveKey:moveKeys
			}
		});
	},
	filterOption(inputValue, option){
//过滤选项
    return option.colorCode.indexOf(inputValue) > -1;
	},
	handleOk(){
//点击弹框确定按钮后,在这里通过targetKey去生成表格数组

		//从颜色数据源中找出colorCode和colorName
		for(let i=0;i<moveKey.length;i++){
			let temp={};
			let tempjson={};
			for(let j=0;j<transfordata.length;j++){
				if(transfordata[j].key==moveKey[i]){
				temp.colorCode=transfordata[j].colorCode;
				temp.colorName=transfordata[j].colorName;
				//新增的时候组装json
				tempjson.styleId=currentid;
				tempjson.colorCode=transfordata[j].colorCode;
				temp.json=JSON.stringify(tempjson);
				//将穿梭框选中的删除掉
				transfordata.splice(j,1);
			}
			}

			console.log('temp:',temp);
			configlist.push(temp);
		}
		

//完成操作后关闭弹框
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				chosecolorModal:false,
				targetKeys:[]
			}
		});


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
