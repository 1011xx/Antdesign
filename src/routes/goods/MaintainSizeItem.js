import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../components/wrap/wrap';
import SizeList from '../../components/Sizeitem/sizeList';
import ItemModel from '../../components/Sizeitem/sizeItemmodel';
import SureModel from '../../commonComponents/SureModal/SureModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
//服装属性/维护尺寸组
var deleteid=null;//转存删除ID号码
function MaintainSizeItem({dispatch,attrsizeItem}){

	const {total,current,defaultPageSize,loading,visibleSure,dataSource,title,modalVisible,modalType,currentItem}=attrsizeItem;
	
	const itemModalProps = {

	item:modalType==='create'?{}:currentItem,
    title,
    visible:modalVisible,
    onOk(data) {
    dispatch({
          type:'attrsizeItem/tableLoading'
        });
      if(modalType==='create'){
        //如果是创建
        console.log('创建');
       
        //这里与后台数据交流
        dispatch({
        type: 'attrsizeItem/create',
        payload: data,
      });
        dispatch({type:'attrsizeItem/hideModal'});
      }else{
        //如果是修改
        console.log('修改');

        //这里与后台数据交流
        dispatch({
        type: 'attrsizeItem/edit',
        payload: data,
      });
        dispatch({
          type:'attrsizeItem/hideModal'
        });
      }

    },
    handleCancel() {
      dispatch({
        type: 'attrsizeItem/hideModal',
      });
    },
  };



  const itemListProps = {
   dataSource,
    loading,
    onDeleteItem(item) {
     dispatch({type:'attrsizeItem/sureModalshow'});
     console.log(item);
     deleteid=item.id;
    },
    onEditItem(item) {
    dispatch({
        type: 'attrsizeItem/showEditModal',
        payload:{
          modalType:'update',
          currentItem:item,
        }
      });

    },
    additem(){
      dispatch({
        type: 'attrsizeItem/showAddModal',
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
      dispatch({type:'attrsizeItem/tableLoading'});
      //显示删除提示
      dispatch({type:'attrsizeItem/sureModalhide'});
      //执行删除操作
      dispatch({
        type:'attrsizeItem/delete',
        payload:deleteid
      });
    },
    handleCancel(){
      //点击取消删除后
      dispatch({type:'attrsizeItem/sureModalhide'});
    }
  };


  const pageProps={
    total,
    current,
    defaultPageSize,
    onShowSizeChange(currentpage,pagesize){
      // console.log(currentpage,pagesize);
       let tempobj={};
      tempobj.start=currentpage;
      tempobj.rows=pagesize;
      dispatch({
        type:'attrsizeItem/publicDate',
        payload:{
          current:currentpage,
          defaultPageSize:pagesize
        }
      });

       dispatch({
        type: 'attrsizeItem/querypage',
        payload:tempobj
      });

    },
    onPageChange(currentpage){
      // console.log(currentpage);
      let tempobj={};
      tempobj.start=currentpage;
      tempobj.rows=defaultPageSize;
      console.log(tempobj);
      dispatch({
        type:'attrsizeItem/publicDate',
        payload:{
          current:currentpage
        }
      });
      dispatch({
        type: 'attrsizeItem/querypage',
        payload:tempobj
      });
    }
  };

  const UserModalGen = () =>
    <ItemModel {...itemModalProps} />;


	return(
		<Wrap
		   last="服装属性"
		   next="维护尺寸组"
		   >
		  
		  <SizeList {...itemListProps}/>
		  <Paginations {...pageProps}/>
      <UserModalGen />
      <SureModel {...sureModalProps}/>
		   </Wrap>

		);
}


MaintainSizeItem.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attrsizeItem }) {
  return { attrsizeItem };
}

export default connect(mapStateToProps)(MaintainSizeItem);
