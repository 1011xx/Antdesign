import { querySizeList,queryAllSizeGroup,newSizeGroup,updateSizeGroup,removeSizeGroup } from '../services/attribute';
import {message} from 'antd';
export default {
    namespace: 'attrsizeItem',
    state: {
      title:"",
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],
      selectSource:[],
      visibleSure:false,
      loading:true,
      total:0,
      current:1,
      defaultPageSize:10,
    },
    effects: {
        *enter({ payload }, { call, put, select }){
        	// const currentpage = yield select(({ attrsizeItem }) => attrsizeItem.current);
        	// const pagesize = yield select(({ attrsizeItem }) => attrsizeItem.defaultPageSize);
        	// let tempobj={};
        	// tempobj.start=currentpage;
        	// tempobj.rows=pagesize;
        	let tempobj={};
        	tempobj.page=1;
        	tempobj.rows=10;
        	let strarr=JSON.stringify(tempobj);
            const {data}= yield call(queryAllSizeGroup,{jsonParam:strarr});
            const sizeList= yield call(querySizeList);

            if(data){
              //将数据源改变成
             let long=data.dataList.length;
             for(let i=0;i<long;i++){
              let tempsizes=data.dataList[i].sizes.split(",").join(" ");
              data.dataList[i].sizes=tempsizes;
             }
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            }
            if(sizeList.data){
              console.log(sizeList.data);
               yield put({type:'publicDate',
                      payload:{
                        selectSource:sizeList.data.dataList,
                      }
                    });
            }
        },
        *gettablelist({ payload }, { call, put, select }){
          let tempobj={};
          tempobj.page=1;
          tempobj.rows=10;
          let strarr=JSON.stringify(tempobj);
            const {data}= yield call(queryAllSizeGroup,{jsonParam:strarr});

            if(data){
               let long=data.dataList.length;
             for(let i=0;i<long;i++){
              let tempsizes=data.dataList[i].sizes.split(",").join(" ");
              data.dataList[i].sizes=tempsizes;
             }
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            }

        },
        *querypage({ payload }, { call, put,select }){
          const currentpage = yield select(({ attrsizeItem }) => attrsizeItem.current);
          const pagesize = yield select(({ attrsizeItem }) => attrsizeItem.defaultPageSize);
            let strarr=JSON.stringify(payload);
            console.log(strarr)
            const {data}= yield call(queryAllSizeGroup,{jsonParam:strarr});
            if(data){
              let long=data.dataList.length;
              for(let i=0;i<long;i++){
               let tempsizes=data.dataList[i].sizes.split(",").join(" ");
               data.dataList[i].sizes=tempsizes;
              }
            console.log(data);
             // 开始添加页面序号

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
            const tabledata = yield select(({ attrsizeItem }) => attrsizeItem.dataSource);
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(newSizeGroup,{jsonParam:strarr});
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
                 yield put({type:'gettablelist'});
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
            const id = yield select(({ attrsizeItem }) => attrsizeItem.currentItem.id);
            const newpayload = { ...payload, id }; // 等价于payload.id=id;
            let strarr=JSON.stringify(newpayload);
            console.log(strarr);
            const {data}= yield call(updateSizeGroup,{jsonParam:strarr});
            if(data.code=="0"){
              message.success(data.msg);
                console.log(data);
                 //方案二：再次请求数据
                 yield put({type:'gettablelist'});
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
            const {data}= yield call(removeSizeGroup,{jsonParam:strarr});
            if(data.code=="0"){
              message.success(data.msg);
                console.log(data);
                //方案二：再次请求数据
                yield put({type:'gettablelist'});
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
        if (location.pathname === '/maintainsizeitem') {
            // console.log(location.pathname);
          dispatch({type: 'enter'});
          //刷新页面使得页码恢复到默认值
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
