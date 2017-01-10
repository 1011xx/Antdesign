import { queryColor } from '../services/attribute';
export default {
    namespace: 'attrlist',
    state: {
      title:"",
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],
    },
    effects: {
        *enter({ payload }, { call, put }){
            const {data}= yield call(queryColor);
            if(data){
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList
                      }
                    });
            }
        },
    },
    reducers: {
        Changetitle(state, action) {
            console.log(action.payload);
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

    },
     subscriptions: {
        setup({ dispatch, history }){
         history.listen(location => {
        if (location.pathname === '/maintaincolor') {
            // console.log(location.pathname);
          dispatch({type: 'enter'});
           }
         });
       }
     }

};
