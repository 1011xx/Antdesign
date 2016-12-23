export default {
    namespace: 'drop',
    state: {
        username: '',
        password: '',
        flag:false,
        showtext:'用戶名或密碼錯誤',
    },
    effects: {
        *getlogin({ payload }, { call, put }){
             console.log(payload);
            const { data } = yield call(query, parse(payload));
            if(data){

                yield put({ type: 'iferro' });
            }
        },
    },
    reducers: {
        getValue(state, action) {
            // console.log(action.payload);
            return {...state,
                ...action.payload
            };
        },
        iferro(state){
            return {...state,flag:true};
        },
        ifok(state){
            return {...state,flag:false};
        },
    }

};
