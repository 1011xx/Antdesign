import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../components/wrap/wrap';
import SizeList from '../../components/Size/sizeList';
import SizeModel from '../../components/Size/sizemodel';
import SureModel from '../../commonComponents/SureModal/SureModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
//服装属性/维护尺寸
var deleteid=null;//转存删除ID号码
function MaintainSize({dispatch,attrsize}){

	const {total,current,defaultPageSize,loading,visibleSure,dataSource,title,modalVisible,modalType,currentItem}=attrsize;
	
	const sizeModalProps = {
	  item:modalType==='create'?{}:currentItem,
    title,
    visible:modalVisible,
    onOk(data) {
    dispatch({
              type:'attrsize/tableLoading'
            });
          if(modalType==='create'){
            //如果是创建
            console.log('创建');
           
            //这里与后台数据交流
            dispatch({
            type: 'attrsize/create',
            payload: data,
          });
            dispatch({type:'attrsize/hideModal'});
          }else{
            //如果是修改
            console.log('修改');

            //这里与后台数据交流
            dispatch({
            type: 'attrsize/edit',
            payload: data,
          });
            dispatch({
              type:'attrsize/hideModal'
            });
          }

    },
    handleCancel() {
      dispatch({
        type: 'attrsize/hideModal',
      });
    },
  };

const sureModalProps = {
    visibleSure,
    makeSure(){
      //点击确认删除后
      dispatch({type:'attrsize/tableLoading'});
      //显示删除提示
      dispatch({type:'attrsize/sureModalhide'});
      //执行删除操作
      dispatch({
        type:'attrsize/delete',
        payload:deleteid
      });
    },
    handleCancel(){
      //点击取消删除后
      dispatch({type:'attrsize/sureModalhide'});
    }
  };

  const sizeListProps = {
     dataSource,
    loading,
    onDeleteItem(item) {
     dispatch({type:'attrsize/sureModalshow'});
     console.log(item.id);
     deleteid=item.id;
    },
    onEditItem(item) {
    dispatch({
        type: 'attrsize/showEditModal',
        payload:{
          modalType:'update',
          currentItem:item,
        }
      });

    },
    additem(){
      dispatch({
        type: 'attrsize/showAddModal',
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
      tempobj.start=currentpage;
      tempobj.rows=pagesize;
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
      tempobj.start=currentpage;
      tempobj.rows=defaultPageSize;
      console.log(tempobj);
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

  const UserModalGen = () =>
    <SizeModel {...sizeModalProps} />;


	return(
		<Wrap
		   last="服装属性"
		   next="维护尺寸"
		   >
		  
		  <SizeList {...sizeListProps}/>
      <Paginations {...pageProps}/>
		  <UserModalGen />
      <SureModel {...sureModalProps}/>
		   </Wrap>

		);
}


MaintainSize.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attrsize }) {
  return { attrsize };
}

export default connect(mapStateToProps)(MaintainSize);
