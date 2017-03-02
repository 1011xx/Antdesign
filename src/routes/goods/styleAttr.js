import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
// import Queryinfo from '../components/Storeinfo/Search';
import AttrList from '../../components/AttrList/attrlist';
import AttrModel from '../../components/AttrList/attrmodel';
import SureModel from '../../commonComponents/SureModal/SureModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
//服装属性/款号属性维护/品牌
var locationid=null;
var deleteid=null;
function StyleAttr({dispatch,attributeClass}){

	const {
		name,
		spinloading,
		total,
		current,
		defaultPageSize,
		visibleSure,
		details,
		title,
		dataSources,
		loadings,
		modalVisible,
		modalType,
		currentItem,
		confirmLoading,
		backMsg,
		backvalidateStatus,
		Modalkey
	}=attributeClass;

	const attrListProps = {
		modalVisible,
		dataSources,
		loadings,
		details,
		spinloading,
		onDeleteItem(item) {
			//点击删除要执行的操作
			dispatch({type:'attributeClass/sureModalshow'});

			console.log(item);
			deleteid=item.id;
		},
		onEditItem(item) {
			console.log('修改条目');
			//获取Id数据,为了修改数据用
			console.log(item);
			locationid=item.id;//修改要用到的Id
			let timestamps=Date.parse(new Date());
			dispatch({
				type: 'attributeClass/showEditModal',
				payload:{
					modalType:'update',
					Modalkey:timestamps,
					currentItem:item
				}
			});
			console.log('modalType:',modalType);
		},
		additem(){
			console.log('增加条目');
			//显示增加条目模态框
			let timestamps=Date.parse(new Date());
			dispatch({
				type: 'attributeClass/showAddModal',
				payload:{
					  Modalkey:timestamps,
						modalType:'create'

				}
			});
			console.log('modalType:',modalType);
		}
	};



	const attrModalProps = {

	item:modalType==='create'?{}:currentItem,
    title,
		key:Modalkey,
    details,
    confirmLoading,
    backMsg,
    backvalidateStatus,
    modalVisible,
    onOk(data) {
      //当点击修改的时候我们可以获取clsId，但是如果，直接点击新增
      // 就会出现获取不到的状况，那么在创建的时候，直接从地址栏获取，
      // 为了保持统一，直接从地址栏获取。
      dispatch({
          type:'attributeClass/publicDate',
          payload:{
            confirmLoading:true
          }
        });


    //让表格显示加载状态
      // dispatch({
      //     type:'attributeClass/tableLoadings'
      //   });
    //当在点击确定的时候判断是修改还是新增
    if(modalType==='create'){
        //如果是创建
        console.log('创建');
        //这里与后台数据交流
        dispatch({
          type: 'attributeClass/create',
          payload: data,
         });

      }else{
         //如果是修改
        console.log('修改');
         data.Id=locationid;//此条赋值为了修改用
         console.log(data);
         //这里与后台数据交流
        dispatch({
        type: 'attributeClass/edit',
        payload: data,
        });

      }

    },
    handleCancel() {
      dispatch({
        type: 'attributeClass/hideModal',
      });
    },
  checkAttrcode(rule, value, callback){
  /*
  details.name--属性类名称
  details.codeLength--代码长度
  */
  if(details.name=="年份"){
    //如果是年份
    // console.log(details);
    // console.log(typeof(details.codeLength));

    if(value){
      //年份只能存在两位数字的形式01-99
      if (/^[0][1-9]$|^[1-9][0-9]$/.test(value)!=true) {
         //  dispatch({
         //    type:'attributeClass/publicDate',
         //    payload:{
         //      backvalidateStatus:'error',
         //      backMsg:'输入的属性代码有误!'
         //    }
         // });
          callback('输入的属性代码有误!');
        } else {
          callback();
        }
    }else{
      callback();
    }

  }else{
    //如果不是年份
    if(value){
      //\w特殊字符校验
      if(/^[A-Za-z0-9]$/.test(value)!=true){
        if(value.length>details.codeLength){
          callback('属性代码长度过长!');
        }else{
          callback();
        }
      }else{
        callback();
      }
    }else{
      callback();
    }

  }

},

 explain(rule, value, callback){
  //属性描述正则校验
  if(value){
    if (value.length>50) {
        callback('属性描述过长!');
      } else {
        callback();
      }
  }else{
    callback();
  }
}
  };





  const sureModalProps = {
    visibleSure,
    makeSure(){
      //点击确认删除后
       //让表格显示加载状态
      dispatch({
          type:'attributeClass/tableLoadings'
        });
      //显示删除提示
      dispatch({type:'attributeClass/sureModalhide'});
      //执行删除操作
      dispatch({
        type: 'attributeClass/delete',
        payload: deleteid,
        });
    },
    handleCancel(){
      //点击取消删除后
      dispatch({type:'attributeClass/sureModalhide'});
    }
  };
    //页码的改变
    const pageProps={
    total,
    current,
    defaultPageSize,
    onShowSizeChange(currentpage,pagesize){
      // console.log(currentpage,pagesize);
       let tempobj={};
      tempobj.page=currentpage;
      tempobj.rows=pagesize;
      dispatch({type:'attributeClass/tableLoadings'});
      dispatch({
        type:'attributeClass/publicDate',
        payload:{
          current:currentpage,
          defaultPageSize:pagesize
        }
      });

       dispatch({
        type: 'attributeClass/querypage',
        payload:tempobj
      });

    },
    onPageChange(currentpage){
      // console.log(currentpage);
      let tempobj={};
      tempobj.page=currentpage;
      tempobj.rows=defaultPageSize;
      // console.log(tempobj);
       dispatch({type:'attributeClass/tableLoading'});
      dispatch({
        type:'attributeClass/publicDate',
        payload:{
          current:currentpage
        }
      });
      dispatch({
        type: 'attributeClass/querypage',
        payload:tempobj
      });
    }
  };




	return(
		<Wrap
       num="2"
       url="/mainattrlist"
       last="属性维护"
		   next={`编辑${name}`}
		   >

		  <AttrList {...attrListProps}/>
      <Paginations {...pageProps}/>
		  <AttrModel {...attrModalProps} />
      <SureModel {...sureModalProps}/>
	  </Wrap>

		);
}


StyleAttr.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attributeClass }) {
  return { attributeClass };
}

export default connect(mapStateToProps)(StyleAttr);
