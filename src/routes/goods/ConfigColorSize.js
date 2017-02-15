import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Configcolorsize from '../../components/ModelNumber/Configcolorsize';
import Modalchosecolor from '../../components/ModelNumber/Modalchosecolor';
var deleteimgdata=[];


function ConfigColorSize({dispatch,moudelnum}){

const {moveKey,chosecolorModal,exitcolor,transfordata,targetKeys,config,currentid,sizeoption,listarry,configlist }=moudelnum;
const configProps={
	config,
	sizeoption,
	listarry,
	configlist,

	getadddata(value,retback){
		console.log('retback:',retback);
		// console.log('configlist:',configlist);
		//给表格数据添加image对象
		if(retback.length>0){
			for(let j=0;j<configlist.length;j++){
				for(let k=0;k<retback.length;k++){
					if(configlist[j].colorCode==retback[k].colorCode){
						configlist[j].image=retback[k].reg[0];
					}
				}
			}
		}
// console.log('configlist1:',configlist);
/*******************数据格式****************************/
		// {
		//   styleId:"FF0CAE08FE8D4D70B61BCDD6524C5B14",
		//   styleCode:"Y0223911B0333",
		//   styleName:"ROYAL RAYE2002年初夏3911背心纯棉",
		//   configs:[{
		//     colorCode:"456",
		//     colorName:"亮蓝色",
		//     sizes:"010,012,013",
		//     image:{
		//       imageOriginalName:"S61231-11513314.jpg",
		//       imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg",
		//       imageDirectory:"/images/FF0CAE08FE8D4D70B61BCDD6524C5B14/456/ed852558d8f04a86bd46ffc5d8894228.jpg",
		//       imageType:"jpg"
		//     }，
		// 		deleteImage:[{
		// 		  colorCode:"456"
		// 		  imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg"
		// 		  StyleCode:"Y0223911B0333"
		// 		}]
		//   }]
		//
		// };
		/********************这儿为获取的sizes***************************/
		let temparr=[];
		for (let key in value) {
			if(value[key]){
				temparr.push(value[key].join(','));
			}
		}
		console.log(temparr);
/**********************组装deleteimage*************************/

		if(retback.length>0){
			for(let j=0;j<deleteimgdata.length;j++){
				for(let k=0;k<retback.length;k++){
					if(deleteimgdata[j].colorCode==retback[k].colorCode){
						deleteimgdata[j].imageName=retback[k].reg[0].imageName;
					}
				}
			}
		}
console.log('deleteimgdata:',deleteimgdata);
/************************组装configs***********************/
//这里组装configs
	let temparr2=[];
  for(let i=0;i<configlist.length;i++){
		let tempobj={};
		tempobj.colorCode=configlist[i].colorCode;
		tempobj.colorName=configlist[i].colorName;
		tempobj.sizes=temparr[i];
		tempobj.image=configlist[i].image;
		tempobj.deleteImage=deleteimgdata;
		temparr2.push(tempobj)
	}
	// console.log('temparr2:',temparr2);




/***********************************************/
//这里组装整个json
		let temp={};
		temp.styleId=currentid;
		temp.styleCode=config.code;
		temp.styleName=config.name;
		temp.configs=temparr2;

console.log(temp);
dispatch({type:'moudelnum/saveconfigs',
					payload:temp
				})
		// console.log(value,temp);
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
	//   要删除的数据格式
	// 		deleteImage:[{
	// 		  colorCode:"456"
	// 		  imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg"
	// 		  StyleCode:"Y0223911B0333"
	// 		}]
	console.log('configlist:',configlist);
	console.log(item);
	if(configlist){
		let tempdelobj={};
		//找到要删除的数据
		for(let j=0;j<configlist.length;j++){
			if(configlist[j].colorCode==item.colorCode){
				//首先组装要删除的json
				tempdelobj.colorCode=item.colorCode;
				tempdelobj.styleCode=item.styleCode;
				if(configlist[j].image){
					tempdelobj.imageName=configlist[j].image.imageName;
				}
				console.log('tempdelobj:',tempdelobj);
				deleteimgdata.push(tempdelobj);
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
				temp.styleCode=config.code;
				//新增的时候组装json
				tempjson.styleId=currentid;
				tempjson.colorCode=transfordata[j].colorCode;
				temp.json=JSON.stringify(tempjson);
				//将穿梭框选中的删除掉
				transfordata.splice(j,1);
			}
			}

			// console.log('temp:',temp);
			configlist.push(temp);
			console.log('configlist：',configlist);
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
