import {updateAttribute,newAttribute,removeAttribute,queryAttributeClass,queryAttributeByAttributeClassId,queryAttributeClassById } from '../services/attribute';
import {Modal,message} from 'antd';
export default {
  //颜色属性维护
    namespace: 'attributeClass',
    state: {
       title:"",
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],//属性类列表数据
      dataSources:[],//属性列表数据
      visibleSure:false,
      loading:true,
      loadings:true,
      spinloading:true,
      total:0,
      current:1,
      defaultPageSize:10,
      name:'',
      confirmLoading:false,
      


      details:{},
      addressId:'',
    },
    effects: {
      //请求/mainattrlist页面的数据
        *enter({ payload }, { call, put }){
            const {data}= yield call(queryAttributeClass);
            if(data){
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        loading:false
                      }
                    });
            }
        },
        //重新请求/mainattrlist/styleattr整个页面的数据
        *enterstyleattr({ payload }, { call, put }){
            let quest1={};
            let quest2={};
            quest1.Id=payload;
            quest2.clsId=payload;
            let strarr1=JSON.stringify(quest1);
            let strarr2=JSON.stringify(quest2);
            const attrdetails= yield call(queryAttributeClassById,{jsonParam:strarr1});
            const {data}= yield call(queryAttributeByAttributeClassId,{jsonParam:strarr2});
            if(data){
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSources:data.dataList,
                        total:data.total,
                        loadings:false
                      }
                    });
            };

            if(attrdetails.data.code=="0"){
              console.log(attrdetails.data);
                yield put({type:'publicDate',
                      payload:{
                        details:attrdetails.data.data,
                        spinloading:false,
                        name:attrdetails.data.data.name
                      }
                    });
            }
        },
        //重新请求/mainattrlist/styleattr页面表格的数据
        *queryAttributeClassId({ payload }, { call, put, select }){
          const currentpage = yield select(({ attributeClass }) => attributeClass.current);
          const pagesize = yield select(({ attributeClass }) => attributeClass.defaultPageSize);
          const id = yield select(({ attributeClass }) => attributeClass.addressId);
          let tempobj={};
          tempobj.clsId=id;
          tempobj.page=currentpage;
          tempobj.rows=pagesize;
          let tempstr=JSON.stringify(tempobj);
          const {data}= yield call(queryAttributeByAttributeClassId,{jsonParam:tempstr});
            if(data){
            // console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSources:data.dataList,
                        total:data.total,
                        loadings:false
                      }
                    });
            };
        },
        *querypage({ payload }, { call, put, select }){
          const id = yield select(({ attributeClass }) => attributeClass.addressId);
          const currentpage = yield select(({ attributeClass }) => attributeClass.current);
          const pagesize = yield select(({ attributeClass }) => attributeClass.defaultPageSize);
           payload.clsId=id;
           // console.log('payload:',payload);
          let tempstr=JSON.stringify(payload);
           const {data}= yield call(queryAttributeByAttributeClassId,{jsonParam:tempstr});
            if(data){
              console.log(data);
               // 开始添加页面序号
                 let long=data.dataList.length;
                  if(currentpage<2){
                    for(let i=1;i<=long;i++){
                        data.dataList[i-1].num=i;
                      }
                    }else{
                      let size=(currentpage-1)*pagesize;
                      for(let j=size;j<long+size;j++){
                        data.dataList[j-size].num=j+1;
                      }
                    }
                    //添加页面序号结束
            yield put({type:'publicDate',
                      payload:{
                        dataSources:data.dataList,
                        total:data.total,
                        loadings:false

                      }
                    });
            }
        },
        //新增属性数据
        *create({ payload }, { call, put,select }){
          const id = yield select(({ attributeClass }) => attributeClass.addressId);
            payload.clsId=id;
            // console.log(payload);
            let strarr=JSON.stringify(payload);
            // console.log(strarr);
            const {data}= yield call(newAttribute,{jsonParam:strarr});
            console.log(data);
            //data.code=="0"是成功时要执行的回调
            if(data.code=="0"){
               //将页码设为默认,并关闭弹窗
                  yield put({type:'publicDate',
                      payload:{
                         modalVisible:false,
                         current:1,
                         loadings:true
                      }
                    });
                //再次请求数据
                 yield put({type:'queryAttributeClassId'});
            }else{

                Modal.error({
                title: '提示',
                content: data.msg,
              });

            }
        },
        //修改数据
        *edit({ payload }, { call, put,select }){
            // const id = yield select(({ attrlist }) => attrlist.currentItem.id);
            // const newpayload = { ...payload, id }; // 等价于payload.id=id;

            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(updateAttribute,{jsonParam:strarr});
            if(data.code=="0"){

                console.log(data);
                //将页码设为默认,并关闭弹窗，是表格显示loading状态
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                         modalVisible:false,
                         loadings:true
                      }
                    });
                 //再次请求数据
                 yield put({type:'queryAttributeClassId'});
                  
            }else{

              Modal.error({
                title: '提示',
                content: data.msg,
              });
              // message.warning(data.msg);
               // yield put({type:'publicDate',
               // payload:{
               //   backMsg:data.msg,
               //   backvalidateStatus:"error"
               // }});
            }
        },
        *delete({ payload }, { call, put,select }){
            // console.log('payload:'+payload);
            let newId={};
            newId.Id=payload;
            let strarr=JSON.stringify(newId);
            const {data}= yield call(removeAttribute,{jsonParam:strarr});
            if(data.code=="0"){
               // message.success(data.msg);
                console.log(data);
                //再次请求数据
                yield put({type:'queryAttributeClassId'});
                 //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                      }
                    });
            }else{
               // message.warning(data.msg);
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
        tableLoadings(state){
            return {...state,loadings:true}
        },
        tableLoadingClose(state){
            return {...state,loading:false}
        },
        tableLoadingsClose(state){
            return {...state,loadings:false}
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
              if (location.pathname === '/mainattrlist') {
                dispatch({type: 'publicDate',payload:{loading:true}});
                dispatch({type: 'enter'});
                 }else{
                let str=location.pathname;
                 // let queryobj={};
                 // let temparr=[];
                let strs = str.split("/");
                strs.shift();
                // queryobj.Id=strs[2];
                // temparr.push(queryobj.Id);
                // let querystr=JSON.stringify(queryobj);
                if(strs[1]==='styleattr'){
                  // console.log(strs[2])
                  //当进入styleattr页面时候要执行的请求
                  dispatch({
                    type: 'publicDate',
                    payload:{
                      loadings:true,
                      addressId:strs[2],
                      current:1,
                      defaultPageSize:10
                    }
                  });
                  //请求表格数据和款号类数据
                   dispatch({
                    type: 'enterstyleattr',
                    payload:strs[2]
                  });
                  //  dispatch({
                  //   type: 'enterstyleattr',
                  //   payload:querystr
                  // });
                  // console.log('当进入styleattr页面时候要执行的请求,feifei is writing...');
                   //详情页是不需要请求下拉框数据源的
                }
           }
         });
       }
     }

};
