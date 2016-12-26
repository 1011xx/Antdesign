import { create, remove, update, query } from '../services/users';
export default {
    namespace: 'main',
    state: {
      currentopenkey:'sub1',
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
            // console.log(action.payload);
            return {...state,
                ...action.payload
            };
        },
        ChangeSelectkey(state, action) {
            console.log('action.payload');
            console.log(action.payload);
            return {...state, currentselectkey:action.payload  };
        },

    }

};
