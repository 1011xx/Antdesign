import { queryTagPriceConfigAudit,queryTagPriceConfigState } from '../services/price';
import {message} from 'antd';
export default {
  //颜色属性维护
    namespace: 'price',
    state: {
      lookupvis:false,
      statedata:[],
      visibleSure:false,
      commitvis:false,


      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],
      
      loading:true,
      total:0,
      current:1,
      defaultPageSize:10,
    },
    effects: {
        *enter({ payload }, { call, put, select }){
          const currentpage = yield select(({ price }) => price.current);
          const pagesize = yield select(({ price }) => price.defaultPageSize);
            //获取表格数据
            // const {data}= yield call(queryTagPriceConfigAudit);
            //获取状态控件数据
            const status= yield call(queryTagPriceConfigState);
            // if(data){
            // console.log(data);
            //  for(let i=1;i<=data.dataList.length;i++){
            //         data.dataList[i-1].num=i;
            //       }
            // yield put({type:'publicDate',
            //           payload:{
            //             dataSource:data.dataList,
            //             total:data.total,
            //             loading:false
            //           }
            //         });
            // };
            if(status.data.code==0){
              console.log(status.data);
              yield put({type:'publicDate',
                        payload:{
                          statedata:status.data.state,
                        }
                      });
            }
        },
        *querypage({ payload }, { call, put, select }){
          const currentpage = yield select(({ price }) => price.current);
          const pagesize = yield select(({ price }) => price.defaultPageSize);
          console.log(payload);
          //使用传递过来的参数
          // const currentpage = payload.page;
          // const pagesize = payload.rows;
            let strarr=JSON.stringify(payload);
            // console.log(strarr)
            const {data}= yield call(queryColor,{jsonParam:strarr});

            if(data){
              console.log(data);
               // 开始添加页面序号
                 let long=data.dataList.length;
                  if(currentpage<2){
                    for(let i=1;i<=long;i++){
                        data.dataList[i-1].num=i;
                      }
                    }else{
                      let size=(currentpage-1)*10;
                      for(let j=size;j<long+size;j++){
                        data.dataList[j-size].num=j+1;
                      }
                    }
                    //添加页面序号结束
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            }
        },
        *create({ payload }, { call, put,select }){
            const tabledata = yield select(({ attrlist }) => attrlist.dataSource);
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(newColor,{jsonParam:strarr});
            console.log(data);
            //data.code=="0"是成功时要执行的回调
            if(data.code=="0"){
               message.success(data.msg);
                 //方案一：修改页面数据,直接在数据源上push意条数据(可以省略，再次请求数据)
                    // payload.num=tabledata.length+1;
                    // console.log(payload);
                    // const newtabledata=tabledata.push(payload);
                    // console.log(tabledata);
                //方案二：再次请求数据
                 yield put({type:'enter'});
                  //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                         defaultPageSize:10
                      }
                    });

            }else if(data.code=="4"){
                message.error(data.msg);
                 yield put({type:'publicDate',payload:{loading:false}});
            }else{
              message.warning(data.msg);
               yield put({type:'publicDate',payload:{loading:false}});
            }
        },
        *edit({ payload }, { call, put,select }){
            const id = yield select(({ attrlist }) => attrlist.currentItem.id);
            const newpayload = { ...payload, id }; // 等价于payload.id=id;
            let strarr=JSON.stringify(newpayload);
            console.log(strarr);
            const {data}= yield call(updateColor,{jsonParam:strarr});
            if(data.code=="0"){
               message.success(data.msg);
                console.log(data);
                 //方案二：再次请求数据
                 yield put({type:'enter'});
                  //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                         defaultPageSize:10
                      }
                    });
            }else if(data.code=="4"){
                message.error(data.msg);
                 yield put({type:'publicDate',payload:{loading:false}});
            }else{
              message.warning(data.msg);
               yield put({type:'publicDate',payload:{loading:false}});
            }
        },
        *delete({ payload }, { call, put,select }){
            console.log('payload:'+payload);
            let newId={};
            newId.id=payload;
            let strarr=JSON.stringify(newId);
            const {data}= yield call(removeColor,{jsonParam:strarr});
            if(data.code=="0"){
              message.success(data.msg);
                console.log(data);
                //方案二：再次请求数据
                yield put({type:'enter'});
                 //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                         defaultPageSize:10
                      }
                    });
            }else if(data.code=="4"){
                message.error(data.msg);
                yield put({type:'publicDate',payload:{loadings:false}});
            }else{
              message.warning(data.msg);
               yield put({type:'publicDate',payload:{loadings:false}});
            }
        }
    },
    reducers: {
        Changetitle(state, action) {
            return {...state,
                ...action.payload
            };
        },
         publicDate(state, action) {
            return {...state,
                ...action.payload
            };
        },
        showEditModal(state,action) {
            return {...state, ...action.payload,modalVisible:true,title:"修改" };
        },
        showAddModal(state,action) {
            return {...state,...action.payload, modalVisible:true,title:"增加" };
        },
        hideModal(state) {
            return {...state, modalVisible:false  };
        },
        tableLoading(state){
            return {...state,loading:true}
        },
        tableLoadingClose(state){
            return {...state,loading:false}
        },
        sureModalshow(state){
            return {...state,visibleSure:true}
        },
        sureModalhide(state){
            return {...state,visibleSure:false}
        }
    },
     subscriptions: {
        setup({ dispatch, history }){
         history.listen(location => {
        if (location.pathname === '/audit'||location.pathname === '/set') {
          dispatch({type: 'enter'});
           dispatch({
            type: 'publicDate',
            payload:{
               current:1,
               defaultPageSize:10
            }
          });
           }
         });
       }
     }

};
