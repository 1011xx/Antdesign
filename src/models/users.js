import { create, remove, update, query } from '../services/users';
import { parse } from 'qs';

export default {

  namespace: 'users',

  state: {
    list: [],
    field: '',
    keyword: '',
    loading: false,
    total: null,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location.pathname);
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
        }
      });
    },
  },

  effects: {
    // *['count/add']() {} 等同于 'count/add': function*(){}
     // call 和 put 都是 redux-saga 的 effects，
     // call 表示调用异步函数，
     // put 表示 dispatch action，
     // 其他的还有 select, take, fork, cancel 等，
     // 详见 redux-saga 文档 默认的 effect 触发规则是每次都触发( takeEvery )，
     // 还可以选择 takeLatest ，或者完全自定义 take 规则
     'hello':function *({ payload }, { call, put }){
      yield put({
        type:'query',
        payload:{
          crrent:4,
        }
      });
      console.log('hello');
     },
    *query({ payload }, { call, put }) {
      console.log('i am query');
      yield put({ type: 'showLoading' });
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, field: '', keyword: '', ...payload },
      });
      const { data } = yield call(query, parse(payload));
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
          },
        });
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data && data.success) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(user => user.id !== id);
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
    testquery(state,action){
        const id= action.payload;
         console.log('testquery--action.payload');
        console.log(action.payload);
      return { ...state, ...action.payload}
    },
  },

};
