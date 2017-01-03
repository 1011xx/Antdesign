import { create, remove, update, query } from '../services/users';
export default {
    namespace: 'attrlist',
    state: {
      title:"",
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
    },
    effects: {
        *getlogin({ payload }, { call, put }){
             console.log(payload);

            const {data}= yield call(query);
            if(data){
            console.log(data);
                yield put({ type: 'iferro' });
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
        showEditModal(state,action) {
            return {...state, ...action.payload,modalVisible:true,title:"修改" };
        },
        showAddModal(state,action) {
            return {...state,...action.payload, modalVisible:true,title:"增加" };
        },
        hideModal(state) {
            return {...state, modalVisible:false  };
        },

    }

};
