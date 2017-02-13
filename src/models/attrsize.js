import { querySize,newSize,updateSize,removeSize } from '../services/attribute';
import {message,Modal} from 'antd';
export default {
  //尺寸属性维护
    namespace: 'attrsize',
    state: {
      title:"",
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],
      visibleSure:false,
      loading:true,
      total:0,
      current:1,
      defaultPageSize:10,
    },
    effects: {
        *enter({ payload }, { call, put, select }){
          //若后期保留停留的页面，开启注释
           const currentpage = yield select(({ attrsize }) => attrsize.current);
           const pagesize = yield select(({ attrsize }) => attrsize.defaultPageSize);
           let tempobj={};
           tempobj.page=currentpage;
           tempobj.rows=pagesize;
           let strarr=JSON.stringify(tempobj);
            const {data}= yield call(querySize,{jsonParam:strarr});
            if(data){
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false,
                         current:1,
                      }
                    });
            }
        },
        *querypage({ payload }, { call, put, select }){
          const currentpage = yield select(({ attrsize }) => attrsize.current);
          const pagesize = yield select(({ attrsize }) => attrsize.defaultPageSize);
          //使用传递过来的参数
          // const currentpage = payload.page;
          // const pagesize = payload.rows;
            let strarr=JSON.stringify(payload);
            console.log(strarr)
            const {data}= yield call(querySize,{jsonParam:strarr});
            if(data){
            console.log(data);
              // 开始添加页面序号
                 let long=data.dataList.length;
                 console.log(currentpage);
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
            const tabledata = yield select(({ attrsize }) => attrsize.dataSource);
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(newSize,{jsonParam:strarr});
            console.log(data);
            //data.code=="0"是成功时要执行的回调
            if(data.code=="0"){
               // message.success(data.msg);
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
                        modalVisible:false,
                        loading:true,
                         current:1,
                      }
                    });

            }else{

                Modal.error({
                title: '提示',
                content: data.msg,
              });

            }
        },
        *edit({ payload }, { call, put,select }){
            const id = yield select(({ attrsize }) => attrsize.currentItem.id);
            const newpayload = { ...payload, id }; // 等价于payload.id=id;
            let strarr=JSON.stringify(newpayload);
            console.log(strarr);
            const {data}= yield call(updateSize,{jsonParam:strarr});
            if(data.code=="0"){
               // message.success(data.msg);
                console.log(data);
                 //方案二：再次请求数据
                 yield put({type:'enter'});
                  //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                        modalVisible:false,
                        loadings:true,
                        current:1
                      }
                    });
            }else{

                Modal.error({
                title: '提示',
                content: data.msg,
              });

            }
        },
        *delete({ payload }, { call, put,select }){
            console.log('payload:'+payload);
            let newId={};
            newId.id=payload;
            let strarr=JSON.stringify(newId);
            const {data}= yield call(removeSize,{jsonParam:strarr});
            if(data.code=="0"){
               // message.success(data.msg);
                console.log(data);
                //方案二：再次请求数据
                yield put({type:'enter'});
                 //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1
                      }
                    });
            }else{

               Modal.error({
                title: '提示',
                content: data.msg,
              });
               yield put({type:'tableLoadingClose'});
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
        if (location.pathname === '/maintainsize') {
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
