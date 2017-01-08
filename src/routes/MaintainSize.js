import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import SizeList from '../components/Size/sizeList';
import AttrModel from '../components/Size/sizemodel';
//服装属性/款号属性维护/品牌

function MaintainSize({dispatch,attrlist}){

	const {title,modalVisible,modalType,currentItem}=attrlist;
	
	const attrModalProps = {

	item:modalType==='create'?{}:currentItem,
    title,
    visible:modalVisible,
    onOk(data) {

    // 这里对数据做更新，更新远端服务器
    //   dispatch({
    //     type: `users/${modalType}`,
    //     payload: data,
    //   });
    // },
    // onCancel() {
    //   dispatch({
    //     type: 'users/hideModal',
    //   });
    console.log(data);
    },
    handleCancel() {
      dispatch({
        type: 'attrlist/hideModal',
      });
    },
  };



  const attrListProps = {
    modalVisible,
    onDeleteItem(id) {
      // dispatch({
      //   type: 'users/delete',
      //   payload: id,
      // });
      console.log(id);
    },
    onEditItem(item) {
      // dispatch({
      //   type: 'users/showModal',
      //   payload: {
      //     modalType: 'update',
      //     currentItem: item,
      //   },
      // });
      console.log('item');
      console.log(item);
      console.log(modalType);
      // console.log(modalVisible);
    //   dispatch({
    //     type: 'attrlist/Changetitle',
    //     payload: {title:'修改'},
    //   });
    // },
      dispatch({
        type: 'attrlist/showEditModal',
        payload:{
        	modalType:'update',
        	currentItem:item,
        }
      });
      console.log(modalType);
    },
    additem(){
    	console.log('增加条目');
    	dispatch({
        type: 'attrlist/showAddModal',
        payload:{
        	  modalType: 'create',
        }
      });
    }
  };

  const UserModalGen = () =>
    <AttrModel {...attrModalProps} />;


	return(
		<Wrap
		   last="服装属性"
		   next="维护尺寸"
		   >
		  
		  <SizeList {...attrListProps}/>
		  <UserModalGen />
		   </Wrap>

		);
}


MaintainSize.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ attrlist }) {
  return { attrlist };
}

export default connect(mapStateToProps)(MaintainSize);
