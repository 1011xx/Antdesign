import { create, remove, update, query } from '../services/users';
export default {
    namespace: 'main',
    state: {
      currentopenkey:[],
      currentselectkey:'1',

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
        ChangeOpenkey(state, action) {
            //更改左侧但航菜单的状态
            return {...state,
                currentopenkey:action.payload
            };
        },
        ChangeSelectkey(state, action) {

            console.log(action.payload);
            return {...state, currentselectkey:action.payload  };
        },

    }

};
