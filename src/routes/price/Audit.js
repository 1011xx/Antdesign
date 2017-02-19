import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Priceaudit from '../../components/Price/Priceaudit';
import LookupModal from '../../components/Price/LookupModal';
import CommitModal from '../../components/Price/CommitModal';
import Paginations from '../../commonComponents/Pagination/Paginations';
import SureModel from '../../commonComponents/SureModal/SureModal';


var exp;
var styleCode;
var start;
var end;
var state;
function Audit({dispatch,price}) {
  const {dataSource,lookupvis,loading,statedata,visibleSure,commitvis,commitdata,textareavalue,auditdetaildata,deleteid,total,current,defaultPageSize,detaildatasource,setType}=price;
  const auditProps={
    dataSource,
    loading,
    statedata,
    passdata(data){
      //当点击提交按钮的时候,

      styleCode=data.styleCode;
      start=data.start;
      end=data.end;
      state=data.status;
      //按照搜索条件请求表格数据
      let tempobj={};
      if(styleCode){
        tempobj.styleNo=styleCode;
      }
     if(state){
       tempobj.state=state;
     }
     if(start){
       tempobj.expectEffectiveDate=start;
     }
     if(end){
       tempobj.expectEffectiveEndDate=end;
     }
     dispatch({type:'price/tableLoading'});
     dispatch({
       type:'price/publicDate',
       payload:{
         current:1
       }
     });
      dispatch({
       type: 'price/querypage',
       payload:tempobj
     });
    },
    setPrice(){
      //当点击设置吊牌价的时候
      dispatch({
        type:'price/publicDate',
        payload:{
          setType:'create',
          setStatus:'新增调价单'
        }
      });
      dispatch(routerRedux.push('/audit/modify'));
    },
    onCommit(item){
      console.log(item);
      //当点击提交的时候，获取当前行表格的数据，在模态框上显示
      item.createDate=item.createDate.split(" ")[0];
      dispatch({
        type:'price/publicDate',
        payload:{
          commitvis:true,
          commitdata:item
        }
      });
      //请求接口数据
      dispatch({
        type:'price/details',
        payload:item.id
      });

    },
    onEditItem(){
      dispatch({
        type:'price/publicDate',
        payload:{
          setType:'edit',
          setStatus:'修改调价单'
        }
      });
    },
    onDelete(item){
      //当点击删除按钮的时候,显示删除弹窗
      console.log(item.id);
      dispatch({
        type:'price/publicDate',
        payload:{
          visibleSure:true,
          deleteid:item.id
        }
      });
    },
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
  const commitProps={
     commitvis,
     commitdata,
     initvalue:textareavalue,
     handleCancel(e){
       //取消提交关闭弹窗
       dispatch({
         type:'price/publicDate',
         payload:{
           commitvis:false
         }
       });
     },
     makeSure(Value){
       //组装要发给后台的数据，点击提交的时候发送的数据

       // detaildatasource是获取到的详情数据，需要从获取到的详情数据中提取数据发送给后台
      //  console.log(detaildatasource);
       let tempcommitobj={};
       if(Value.description){
         //获取description数据
         tempcommitobj.description=Value.description;
       }
       tempcommitobj.id=detaildatasource.id;
       tempcommitobj.documentNumber=detaildatasource.documentNumber;
       tempcommitobj.expectEffectiveDate=detaildatasource.expectEffectiveDate;
       tempcommitobj.state=detaildatasource.state;
       tempcommitobj.remarks=detaildatasource.remarks;

       let tempcommitarr=[];
       for (let value of detaildatasource.dataList) {
         //遍历dataList并组装数据
           let temparrobj={};
           temparrobj.id=value.configId;
           temparrobj.styleNo=value.styleNo;
           temparrobj.currentTagprice=value.currentTagprice;
           temparrobj.configTagprice=value.configTagprice;
           temparrobj.remarks=value.remarks;
           temparrobj.seqno=value.seqno;
           tempcommitarr.push(temparrobj);
         }
       tempcommitobj.tagpriceConfigDetailDto=tempcommitarr;

       console.log('tempcommitobj:',tempcommitobj);


       //确定提交后要执行操作,关闭弹窗，然后执行提交操作
      //  dispatch({
      //    type:'price/publicDate',
      //    payload:{
      //      commitvis:false
      //    }
      //  });
       dispatch({
         type:'price/commit',
         payload:tempcommitobj
       });

     },
     explain(e){
       //获取说明输入框的内容
       exp = e.target.value;
       console.log(exp);
       dispatch({
         type:'price/publicDate',
         payload:{
           explaintext:e.target.value
         }
       });
     }
  };
  const delProps={
    visibleSure,
    handleCancel(){
      //取消删除关闭弹窗
      dispatch({
        type:'price/publicDate',
        payload:{
          visibleSure:false
        }
      });
    },
    makeSure(){
      //确定删除后要执行操作,关闭弹窗，然后执行删除操作
      dispatch({
        type:'price/publicDate',
        payload:{
          visibleSure:false
        }
      });
      //执行删除操作
      dispatch({
        type:'price/delete',
      });
    },
  };


  //页码
  	const pageProps={
  		total,
  		current,
  		defaultPageSize,
  		onShowSizeChange(currentpage,pagesize){
        let tempobj={};
        if(styleCode){
          tempobj.styleNo=styleCode;
        }
       if(state){
         tempobj.state=state;
       }
       if(start){
         tempobj.expectEffectiveDate=start;
       }
       if(end){
         tempobj.expectEffectiveEndDate=end;
       }



  			dispatch({type:'price/tableLoading'});
  			dispatch({
  				type:'price/publicDate',
  				payload:{
  					current:currentpage,
  					defaultPageSize:pagesize
  				}
  			});
  			 dispatch({
  				type: 'price/querypage',
  				payload:tempobj
  			});

  		},
  		onPageChange(currentpage){
        let tempobj={};
        if(styleCode){
          tempobj.styleNo=styleCode;
        }
       if(state){
         tempobj.state=state;
       }
       if(start){
         tempobj.expectEffectiveDate=start;
       }
       if(end){
         tempobj.expectEffectiveEndDate=end;
       }

  			dispatch({type:'price/tableLoading'});

  			dispatch({
  				type:'price/publicDate',
  				payload:{
  					current:currentpage
  				}
  			});
  			//执行分页请求
  			dispatch({
  			 type: 'price/querypage',
  			 payload:tempobj
  		 });
  		}
  	};


  return (
    <Wrap
       num="1"
       last="价格维护"
       >
       <Priceaudit {...auditProps}/>
       <Paginations {...pageProps}/>
       <LookupModal {...lookupProps}/>
       <CommitModal {...commitProps}/>
       <SureModel {...delProps}/>

   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Audit);
