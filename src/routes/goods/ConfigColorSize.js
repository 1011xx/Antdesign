import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {styleConfigDeleteImage} from '../../services/attribute';
import Wrap from '../../commonComponents/wrap/wrap';
import Configcolorsize from '../../components/ModelNumber/Configcolorsize';
import Modalchosecolor from '../../components/ModelNumber/Modalchosecolor';
import Savesuccess from '../../commonComponents/Savesuccess/Savesuccess';
var deleteimgdata=[];


function ConfigColorSize({dispatch,moudelnum}){

const {
	moveKey,
	chosecolorModal,
	exitcolor,
	saveSpin,
	savevisibleSave,
	transfordata,
	targetKeys,
	config,
	currentid,
	sizeoption,
	listarry,
	configlist,
	styleCode,
	categoryCode,
	yearCode
 }=moudelnum;
const configProps={
	config,
	sizeoption,
	listarry,
	configlist,
	saveSpin,
	selectonChange(value,index,key){
		console.log(configlist);
		console.log('value,index,key:',value,index,key);
		configlist[index][key]=value;
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				configlist:configlist
			}
		});
		console.log(configlist);
	},
	picturnchange(index,key){
		// console.log(index,key);
		return (value)=>{
			// console.info('value:',value);
		}
	},
	getadddata(value){
		// console.log(retback);
		dispatch({
			type:'moudelnum/publicDate',
			payload:{
				saveSpin:true
			}
		});
		// console.log('retback:',retback);
		// console.log('configlist:',configlist);




		//给表格数据添加image对象
		// if(retback.length>0){
		// 	for(let j=0;j<configlist.length;j++){
		// 		for(let k=0;k<retback.length;k++){
		// 			if(configlist[j].colorCode==retback[k].colorCode){
		// 				configlist[j].image=retback[k].reg[0];
		// 			}
		// 		}
		// 	}
		// }





// console.log('configlist1:',configlist);
/*******************数据格式****************************/
	// 	{
	// 	  styleId:"FF0CAE08FE8D4D70B61BCDD6524C5B14",
	// 	  styleCode:"Y0223911B0333",
	// 	  styleName:"ROYAL RAYE2002年初夏3911背心纯棉",
	// 	  configs:[
	// 	  {
	// 	    colorCode:"456",
	// 	    colorName:"亮蓝色",
	// 	    sizes:"010,012,013",
	// 	    image:{
	// 	      imageOriginalName:"S61231-11513314.jpg",
	// 	      imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg",
	// 	      imageDirectory:"/images/FF0CAE08FE8D4D70B61BCDD6524C5B14/456/ed852558d8f04a86bd46ffc5d8894228.jpg",
	// 	      imageType:"jpg"
	// 	    }
	// 	  },
	// 		{
	// 	    colorCode:"456",
	// 	    colorName:"亮蓝色",
	// 	    sizes:"010,012,013",
	// 	    image:{
	// 	      imageOriginalName:"S61231-11513314.jpg",
	// 	      imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg",
	// 	      imageDirectory:"/images/FF0CAE08FE8D4D70B61BCDD6524C5B14/456/ed852558d8f04a86bd46ffc5d8894228.jpg",
	// 	      imageType:"jpg"
	// 	    }
	// 	  }
	// ],
	// deleteImage:[{
	// 	colorCode:"456"
	// 	imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg"
	// 	StyleCode:"Y0223911B0333"
	// }]
	//
	// 	};
		/********************这儿为获取的sizes***************************/
		// let temparr=[];
		// for (let key in value) {
		// 	if(value[key]){
		// 		temparr.push(value[key].join(','));
		// 	}
		// }
		// console.log(temparr);
/**********************组装deleteimage*************************/

// 		if(retback.length>0){
// 			for(let j=0;j<deleteimgdata.length;j++){
// 				for(let k=0;k<retback.length;k++){
// 					if(deleteimgdata[j].colorCode==retback[k].colorCode){
// 						deleteimgdata[j].imageName=retback[k].reg[0].imageName;
// 					}
// 				}
// 			}
// 		}
// console.log('deleteimgdata:',deleteimgdata);
/************************组装configs***********************/
//这里组装configs
	let temparr2=[];
  for(let i=0;i<configlist.length;i++){
		let tempobj={};
		tempobj.colorCode=configlist[i].colorCode;
		tempobj.colorName=configlist[i].colorName;
		//在提交的时候，这里将sizes数组转换成字符串形式发送给后端
		tempobj.sizes=configlist[i].sizes.join(',');
		// tempobj.image=configlist[i].image;
		// tempobj.image={};
		// tempobj.deleteImage=deleteimgdata;
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
 onDelete(text,item,index){

 //这里点击删除后还需要执行删除图片操作
	if(item.id){
		//当有id的时候，不能删除图片，因为都是远程数据，可能用户还需要
	}else{
		console.log('hasnotid');
		//当没有id的时候，我们删除图片，说明是在本地添加的零时数据
		//还需要判断下是否上传了图片，有图片再删除，没有图片就不用删除
		let tempobj={};
		tempobj.styleId=item.styleId;
		tempobj.colorCode=item.colorCode;
		console.error(tempobj);
		// let result=styleConfigDeleteImage({jsonparam:JSON.stringify(temdelobj)});
		// console.log(result);

	}



	//   要删除的数据格式
	// 		deleteImage:[{
	// 		  colorCode:"456"
	// 		  imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg"
	// 		  StyleCode:"Y0223911B0333"
	// 		}]


//这里是组装要删除的图片json，保留
		// let tempdelobj={};
		// //找到要删除的数据
		// for(let j=0;j<configlist.length;j++){
		// 	if(configlist[j].colorCode==item.colorCode){
		// 		//首先组装要删除的json
		// 		tempdelobj.colorCode=item.colorCode;
		// 		tempdelobj.styleCode=item.styleCode;
		// 		if(configlist[j].image){
		// 			tempdelobj.imageName=configlist[j].image.imageName;
		// 		}
		//
		// 		deleteimgdata.push(tempdelobj);
		// 		//通过index来删除相应的列表条目
		// 			configlist.splice(index,1);
		// 	}
		// }

//删除点击按钮的表格的一行
configlist.splice(index,1);

//当删除条目后，这里来把删除的颜色数据给穿梭匡
		 var temparr=transfordata.concat();
	 for(let i=0;i<exitcolor.length;i++){
		 if(exitcolor[i].colorCode==item.colorCode){
			 //找到要删除的colorCode对象,将要删除的对象push到复制的穿梭匡数据
			 temparr.push(exitcolor[i]);
			 //通过key值的大小来给穿梭匡数据排序
			var itsnewarr=temparr.sort(function(a,b){
				return a.key-b.key;
			})
		 }
	 }
	 //将删除后的颜色发送给transfordata
	 dispatch({
		 type:'moudelnum/publicDate',
		 payload:{
			 transfordata:itsnewarr
		 }
	 });

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
				targetKeys:targetKey
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
		for(let i=0;i<targetKeys.length;i++){
			let temp={};
			let tempjson={};
			for(let j=0;j<transfordata.length;j++){
				if(transfordata[j].key==targetKeys[i]){
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
};
const saveProps={
	content:'保存成功！',
	visibleSave:savevisibleSave,
	handleOk(){
		dispatch(routerRedux.push('/modelnumber'));
		dispatch({type:'moudelnum/publicDate',
		payload:{
			savevisibleSave:false,
			saveSpin:false
		}
	});
	//当颜色，尺寸配置成功后，需要刷新页面，重新请求数据
	let queryobj={styleCode,categoryCode,yearCode};
	queryobj=setProps(queryobj);
	// console.error(queryobj);
	dispatch({
		type:'moudelnum/querypage',
		payload:queryobj
	});

	}
};

	return(
		<Wrap
        num="2"
		last="款号维护"
        next="配置颜色尺寸图片"
		>
		<Configcolorsize {...configProps}/>
		<Modalchosecolor {...modalProps}/>
		<Savesuccess {...saveProps}/>
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
