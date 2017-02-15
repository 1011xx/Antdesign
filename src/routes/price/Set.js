import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import LookupModal from '../../components/Price/LookupModal';
import Pricemaintain from '../../components/Price/Pricemaintain';
import Paginations from '../../commonComponents/Pagination/Paginations';

function Set({dispatch,price}) {
  const {dataSource, statedata,lookupvis,auditdetaildata }=price;
  const auditProps={
    dataSource,
    statedata,
    onLook(item){
      //当点击详情的时候
      dispatch({
        type:'price/auditdetail',
        payload:item.id
      })
      dispatch({
        type:'price/publicDate',
        payload:{
          lookupvis:true
        }
      });
    },
  };
  const lookupProps={
      lookupvis,
      auditdetaildata,
      onOk(){
        //当点击模态框上的确定按钮的时候
        dispatch({
          type:'price/publicDate',
          payload:{
            lookupvis:false
          }
        });
      },
    	handleCancel(){
        //当点击模态框上的取消按钮的时候
        dispatch({
          type:'price/publicDate',
          payload:{
            lookupvis:false
          }
        });
      },
  };
  //页码
  	// const pageProps={
  	// 	total,
  	// 	current,
  	// 	defaultPageSize,
  	// 	onShowSizeChange(currentpage,pagesize){
  	// 		// console.log(currentpage,pagesize);
  	// 		 let tempobj={};
  	// 		 if(styleCode){
  	// 			 tempobj.styleNo=styleCode;
  	// 		 }
  	// 		if(state){
  	// 			tempobj.state=state;
  	// 		}
    //     if(start){
    //       tempobj.expectEffectiveStartDate=start;
    //     }
    //     if(end){
    //       tempobj.expectEffectivEndDate=end;
    //     }
    //
    //
    //
  	// 		dispatch({type:'price/tableLoading'});
  	// 		dispatch({
  	// 			type:'price/publicDate',
  	// 			payload:{
  	// 				current:currentpage,
  	// 				defaultPageSize:pagesize
  	// 			}
  	// 		});
  	// 		 dispatch({
  	// 			type: 'price/querypage',
  	// 			payload:tempobj
  	// 		});
    //
  	// 	},
  	// 	onPageChange(currentpage){
    //     let tempobj={};
    //     if(styleCode){
    //       tempobj.styleNo=styleCode;
    //     }
    //    if(state){
    //      tempobj.state=state;
    //    }
    //    if(start){
    //      tempobj.expectEffectiveStartDate=start;
    //    }
    //    if(end){
    //      tempobj.expectEffectivEndDate=end;
    //    }
    //
  	// 		dispatch({type:'price/tableLoading'});
    //
  	// 		dispatch({
  	// 			type:'price/publicDate',
  	// 			payload:{
  	// 				current:currentpage
  	// 			}
  	// 		});
  	// 		//执行分页请求
  	// 		dispatch({
  	// 		 type: 'price/querypage',
  	// 		 payload:tempobj
  	// 	 });
  	// 	}
  	// };
  return (
    <Wrap
       num="1"
       last="价格审核"
       >
       <Pricemaintain {...auditProps}/>
       {/* <Paginations {...pageProps}/>*/}

        <LookupModal {...lookupProps}/>
       </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Set);
