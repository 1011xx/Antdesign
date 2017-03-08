import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import LookupModal from '../../components/Price/SetLookupModal';
import Pricemaintain from '../../components/Price/Pricemaintain';
import Paginations from '../../commonComponents/Pagination/Paginations';
import {Objtrim} from '../../utils/common';
// var styleCode;
// var start;
// var end;
// var state;

function Set({dispatch,price}) {
  const {set_styleCode,set_start,set_end,set_state,set_dataSource, set_statedata,loading,lookupvis,auditdetaildata,setpagetotal,setpagecurrent,setpagedefaultPageSize }=price;
  const setProps={
    set_dataSource,
    set_statedata,
    loading,
    set_styleCode,
    set_start,
    set_end,
    set_state,
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

    passdata(value){
      let data=Objtrim(value);
       //当点击提交按钮的时候,
// console.log(data);
 dispatch({
       type:'price/publicDate',
       payload:{
          set_styleCode:data.styleCode,
          set_start:data.start,
          set_end:data.end,
          set_state:data.status
       }
     });
      // styleCode=data.styleCode;
      // start=data.start;
      // end=data.end;
      // state=data.status;
      //按照搜索条件请求表格数据
     //  let tempobj={};
     //  if(styleCode){
     //    tempobj.styleNo=styleCode;
     //  }
     // if(state){
     //   tempobj.resultState=state;
     // }
     // if(start){
     //   tempobj.expectEffectiveDate=start;
     // }
     // if(end){
     //   tempobj.expectEffectiveEndDate=end;
     // }
     dispatch({
       type:'price/publicDate',
       payload:{
         setpagecurrent:1,
         loading:true
       }
     });
      dispatch({
       type: 'price/querysetpage'
     });

    }
  };
  const lookupProps={
      lookupvis,
      auditdetaildata,
      onOk(){
        //当点击模态框上的确定按钮的时候
        dispatch({
          type:'price/publicDate',
          payload:{
            lookupvis:false,
            auditdetaildata:{}
          }
        });
      },
    	handleCancel(){
        //当点击模态框上的取消按钮的时候
        dispatch({
          type:'price/publicDate',
          payload:{
            lookupvis:false,
            auditdetaildata:{}
          }
        });
      },
  };
  //页码
  	const pageProps={
      total:setpagetotal,
      current:setpagecurrent,
      defaultPageSize:setpagedefaultPageSize,
  		onShowSizeChange(currentpage,pagesize){
  			// console.log(currentpage,pagesize);
  			 let tempobj={};
  			 if(set_styleCode){
  				 tempobj.styleNo=set_styleCode;
  			 }
  			if(set_state){
  				tempobj.resultState=set_state;
  			}
        if(set_start){
          tempobj.expectEffectiveDate=set_start;
        }
        if(set_end){
          tempobj.expectEffectiveEndDate=set_end;
        }



  			dispatch({type:'price/tableLoading'});
  			dispatch({
  				type:'price/publicDate',
  				payload:{
  					setpagecurrent:currentpage,
  					setpagedefaultPageSize:pagesize
  				}
  			});
  			 dispatch({
  				type: 'price/querysetpage',
  				payload:tempobj
  			});

  		},
  		onPageChange(currentpage){
        let tempobj={};
        if(set_styleCode){
          tempobj.styleNo=set_styleCode;
        }
       if(set_state){
         tempobj.resultState=set_state;
       }
       if(set_start){
         tempobj.expectEffectiveDate=set_start;
       }
       if(set_end){
         tempobj.expectEffectiveEndDate=set_end;
       }

  			dispatch({type:'price/tableLoading'});

  			dispatch({
  				type:'price/publicDate',
  				payload:{
  					setpagecurrent:currentpage
  				}
  			});
  			//执行分页请求
  			dispatch({
  			 type: 'price/querysetpage',
  			 payload:tempobj
  		 });
  		}
  	};
  return (
    <Wrap
       num="1"
       last="价格审核"
       >
       <Pricemaintain {...setProps}/>
        <Paginations {...pageProps}/>

        <LookupModal {...lookupProps}/>
       </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Set);
