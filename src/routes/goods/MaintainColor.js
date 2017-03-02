import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import ColorList from '../../components/Color/colorList';
import AttrModel from '../../components/Color/colormodel';
import SureModel from '../../commonComponents/SureModal/SureModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
//服装属性/维护颜色
var deleteid=null;//转存删除ID号码

function MaintainColor({dispatch,attrlist}){
    let conform=false;
	const {total,current,confirmLoading,defaultPageSize,loading,visibleSure,dataSource,title,modalVisible,modalType,currentItem}=attrlist;

	const colorModalProps = {
	  item:modalType==='create'?{}:currentItem,
    title,
    modalVisible,
    confirmLoading,
    onOk(data) {
      // dispatch({
      //     type:'attrlist/tableLoading'
      //   });
      if(modalType==='create'){
        //如果是创建
        console.log('创建');
        //使按钮呈不能点击加载状态
        dispatch({
        type: 'attrlist/publicDate',
        payload: {
          confirmLoading:true
        },
      });



        //这里与后台数据交流
        dispatch({
        type: 'attrlist/create',
        payload: data,
      });

      }else{
        //如果是修改
        console.log('修改');

         //使按钮呈不能点击加载状态
        dispatch({
        type: 'attrlist/publicDate',
        payload: {
          confirmLoading:true
        },
      });


        //这里与后台数据交流
        dispatch({
        type: 'attrlist/edit',
        payload: data,
      });

      }

    },
    handleCancel() {
      dispatch({
        type: 'attrlist/hideModal',
      });
    },
  };

  const sureModalProps = {
    visibleSure,
    makeSure(){
      //点击确认删除后
      dispatch({type:'attrlist/tableLoading'});
      //显示删除提示
      dispatch({type:'attrlist/sureModalhide'});
      //执行删除操作
      dispatch({
        type:'attrlist/delete',
        payload:deleteid
      });
    },
    handleCancel(){
      //点击取消删除后
      dispatch({type:'attrlist/sureModalhide'});
    }
  };

  const colorListProps = {
    dataSource,
    loading,
    onDeleteItem(item) {
     dispatch({type:'attrlist/sureModalshow'});
     console.log(item.id);
     deleteid=item.id;
    },
    onEditItem(item) {
    dispatch({
        type: 'attrlist/showEditModal',
        payload:{
          modalType:'update',
          currentItem:item,
        }
      });

    },
    additem(){
    	dispatch({
        type: 'attrlist/showAddModal',
        payload:{
        	  modalType: 'create',
        }
      });
    }
  };

  const pageProps={
    total,
    current,
    defaultPageSize,
    onShowSizeChange(currentpage,pagesize){
      // console.log(currentpage,pagesize);
       let tempobj={};
      tempobj.page=currentpage;
      tempobj.rows=pagesize;
      dispatch({type:'attrlist/tableLoading'});
      dispatch({
        type:'attrlist/publicDate',
        payload:{
          current:currentpage,
          defaultPageSize:pagesize
        }
      });

       dispatch({
        type: 'attrlist/querypage',
        payload:tempobj
      });

    },
    onPageChange(currentpage){
      // console.log(currentpage);
      let tempobj={};
      tempobj.page=currentpage;
      tempobj.rows=defaultPageSize;
      // console.log(tempobj);
       dispatch({type:'attrlist/tableLoading'});
      dispatch({
        type:'attrlist/publicDate',
        payload:{
          current:currentpage
        }
      });
      dispatch({
        type: 'attrlist/querypage',
        payload:tempobj
      });
    }
  };

	return(
		<Wrap
       num="1"
		   last="颜色维护"
		   >

		  <ColorList {...colorListProps}/>
      <Paginations {...pageProps}/>
		  <AttrModel {...colorModalProps} />
      <SureModel {...sureModalProps}/>
		   </Wrap>

		);
}


MaintainColor.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attrlist }) {
  return { attrlist };
}

export default connect(mapStateToProps)(MaintainColor);
