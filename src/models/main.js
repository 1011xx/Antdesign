import { create, remove, update, query } from '../services/users';
export default {
    namespace: 'main',
    state: {
      currentopenkey:[],
      currentselectkey:'',

    },
    subscriptions: {
    //输入对应的页面使得相应的导航栏显示高亮
    setup({ dispatch, history }) {
      history.listen(location => {
       
        switch(location.pathname)
        {
        case '/shopinfo':
              dispatch({
                type: 'ChangeOpenkey',
                payload: ['sub1'],
              });
               dispatch({
                type: 'ChangeSelectkey',
                payload: '1',
              });
          break;
          case '/mainattrlist':
                    dispatch({
                    type: 'ChangeOpenkey',
                    payload: ['sub2'],
                  });
                    dispatch({
                    type: 'ChangeSelectkey',
                    payload: '2',
                  });
          break;  
          case '/maintaincolor':
                  dispatch({
                    type: 'ChangeOpenkey',
                    payload: ['sub2'],
                  });
                  dispatch({
                    type: 'ChangeSelectkey',
                    payload: '3',
                  });
          break;
          case '/maintainsize':
                  dispatch({
                    type: 'ChangeOpenkey',
                    payload: ['sub2'],
                  });
                  dispatch({
                    type: 'ChangeSelectkey',
                    payload: '4',
                  });
          break;
          case '/maintainsizeitem':
                  dispatch({
                    type: 'ChangeOpenkey',
                    payload: ['sub2'],
                  });
                  dispatch({
                    type: 'ChangeSelectkey',
                    payload: '5',
                  });
          break; 
           case '/modelnumber':
                  dispatch({
                    type: 'ChangeOpenkey',
                    payload: ['sub2'],
                  });
                  dispatch({
                    type: 'ChangeSelectkey',
                    payload: '6',
                  });
          break; 
        }

//针对浏览器地址栏里面有ID的页面进行处理,使得对应的页面使得相应的导航栏显示高亮
             let str=location.pathname;
             let queryobj={};
             let strs = str.split("/"); 
             strs.shift(); 
             switch(strs[1]){
                case 'styleattr':
                 dispatch({
                    type: 'ChangeOpenkey',
                    payload: ['sub2'],
                  });
                    dispatch({
                    type: 'ChangeSelectkey',
                    payload: '2',
                  });
                break;
                case 'shopadd':
                dispatch({
                  type: 'ChangeOpenkey',
                  payload: ['sub1'],
                });
                  dispatch({
                  type: 'ChangeSelectkey',
                  payload: '1',
                });
                 break;
                case 'shopedit':
                dispatch({
                  type: 'ChangeOpenkey',
                  payload: ['sub1'],
                  });
                    dispatch({
                    type: 'ChangeSelectkey',
                    payload: '1',
                  });
                   break;
                case 'shopdetail':
                dispatch({
                  type: 'ChangeOpenkey',
                  payload: ['sub1'],
                  });
                    dispatch({
                    type: 'ChangeSelectkey',
                    payload: '1',
                  });
                   break;
             }



      });
    }
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
            return {...state, currentselectkey:action.payload  };
        },

    }

};
