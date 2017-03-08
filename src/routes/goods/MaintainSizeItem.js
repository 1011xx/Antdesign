import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import SizeList from '../../components/Sizeitem/sizeList';
import ItemModel from '../../components/Sizeitem/sizeItemmodel';
import SureModel from '../../commonComponents/SureModal/SureModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
import {trim} from '../../utils/common';
//服装属性/维护尺寸组
var deleteid=null;//转存删除ID号码
function MaintainSizeItem({dispatch,attrsizeItem}){

	const {confirmLoading,Modalkey,total,current,defaultPageSize,loading,visibleSure,dataSource,selectSource,title,modalVisible,modalType,currentItem}=attrsizeItem;

	const itemModalProps = {
	 item:modalType==='create'?{}:currentItem,
    title,
    visible:modalVisible,
    key:Modalkey,
    confirmLoading,
    selectSource,
    onOk(data) {
			data.sizeGroupCode=trim(data.sizeGroupCode);
			data.sizeGroupName=trim(data.sizeGroupName);
      dispatch({
        type:'attrsizeItem/publicDate',
        payload:{
         confirmLoading:true
        }
      });

      let tempstr=data.sizes.join(",");
      let newarr={...data,'sizes':tempstr};

      if(modalType==='create'){
        //如果是创建
        console.log('创建');

        //这里与后台数据交流
        dispatch({
        type: 'attrsizeItem/create',
        payload: newarr,
      });
        // dispatch({type:'attrsizeItem/hideModal'});
      }else{
        //如果是修改
        console.log('修改');

        //这里与后台数据交流
        dispatch({
        type: 'attrsizeItem/edit',
        payload: newarr,
      });
        // dispatch({
        //   type:'attrsizeItem/hideModal'
        // });
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
    console.log(item.sizes);
    //以空格分割，转换成需要的数据格式
    var str=item.sizes.split(" ");
    item.sizearrs=str;
    console.log(item);

    dispatch({
        type: 'attrsizeItem/showEditModal',
        payload:{
          modalType:'update',
          Modalkey:Date.parse(new Date()),
          currentItem:item,
        }
      });

    },
    additem(){
      dispatch({
        type: 'attrsizeItem/showAddModal',
        payload:{
            modalType: 'create',
            Modalkey:Date.parse(new Date())
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
      tempobj.page=currentpage;
      tempobj.rows=pagesize;
      dispatch({
        type:'attrsizeItem/publicDate',
        payload:{
          loading:true,
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
      tempobj.page=currentpage;
      tempobj.rows=defaultPageSize;
      console.log(tempobj);
      dispatch({
        type:'attrsizeItem/publicDate',
        payload:{
          loading:true,
          current:currentpage
        }
      });
      dispatch({
        type: 'attrsizeItem/querypage',
        payload:tempobj
      });
    }
  };

  //使用函数会导致页面重新渲染
  // const UserModalGen = () =>
  //   <ItemModel {...itemModalProps} />;


	return(
		<Wrap
      num="1"
      last="尺寸组维护"
		   >

		  <SizeList {...itemListProps}/>
		  <Paginations {...pageProps}/>
      <ItemModel {...itemModalProps} />
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
