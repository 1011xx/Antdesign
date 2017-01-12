import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrapthree from '../../components/wrap/wrapthree';
// import Queryinfo from '../components/Storeinfo/Search';
import AttrList from '../../components/AttrList/attrlist';
import AttrModel from '../../components/AttrList/attrmodel';
import SureModel from '../../commonComponents/SureModal/SureModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
//服装属性/款号属性维护/品牌
var locationid=null;
var deleteid=null;
function StyleAttr({dispatch,attributeClass}){

	const {spinloading,total,current,defaultPageSize,visibleSure,details,title,dataSources,loadings,modalVisible,modalType,currentItem}=attributeClass;
	
	const attrModalProps = {

	item:modalType==='create'?{}:currentItem,
    title,
    visible:modalVisible,
    onOk(data) {
      //当点击修改的时候我们可以获取clsId，但是如果，直接点击新增
      // 就会出现获取不到的状况，那么在创建的时候，直接从地址栏获取，
      // 为了保持统一，直接从地址栏获取。

      

    //让表格显示加载状态
      dispatch({
          type:'attributeClass/tableLoadings'
        });
    //当在点击确定的时候判断是修改还是新增
    if(modalType==='create'){
        //如果是创建
        console.log('创建');
        //这里与后台数据交流
        dispatch({
          type: 'attributeClass/create',
          payload: data,
         });
        dispatch({type:'attributeClass/hideModal'});
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
        dispatch({
          type:'attributeClass/hideModal'
        });
      }
   
    },
    handleCancel() {
      dispatch({
        type: 'attributeClass/hideModal',
      });
    },
  };



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
      //获取Id数据,为了修改数据用
      console.log(item);
      locationid=item.id;//修改要用到的Id
      dispatch({
        type: 'attributeClass/showEditModal',
        payload:{
        	modalType:'update',
        	currentItem:item,
        }
      });
      console.log(modalType);
    },
    additem(){
    	console.log('增加条目');
      //显示增加条目模态框
    	dispatch({
        type: 'attributeClass/showAddModal',
        payload:{
        	  modalType: 'create',
        }
      });
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



  const UserModalGen = () =>
    <AttrModel {...attrModalProps} />;


	return(
		<Wrapthree
		   last="服装属性"
		   next="款号属性维护"
		   afternext="品牌"
		   >
		  
		  <AttrList {...attrListProps}/>
      <Paginations {...pageProps}/>
		  <UserModalGen />
      <SureModel {...sureModalProps}/>
	  </Wrapthree>

		);
}


StyleAttr.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attributeClass }) {
  return { attributeClass };
}

export default connect(mapStateToProps)(StyleAttr);
