import { queryProvicneAndCity,querySaleArea,queryShopStatus,queryShopType ,queryShop} from '../services/shopinfo';
import { parse } from 'qs';
export default {
  namespace: 'shopinfo',
  state: {
  	options:[],
  	region:[],
  	status:[],
  	types:[],
  	dataSource:[],
  },
  reducers: {
  	// 获取省市数据并赋值
  	ProvicneAndCity(state, action) {
      return { ...state, ...action.payload};
    },
    //获取销售地区并赋值
    SaleArea(state, action) {
      return { ...state, ...action.payload};
    },
     //获取店仓状态并赋值
    ShopStatus(state, action) {
      return { ...state, ...action.payload};
    },
     //获取店仓状态并赋值
    ShopType(state, action) {
      return { ...state, ...action.payload};
    },
     //获取列表数据并赋值
    ShopList(state, action) {

      return { ...state, ...action.payload};
    }

  },
  effects: {
  	//当进入的时出发的事件
  	*enter({ payload}, { call, put }) {
  		
  	  const shoplist=yield call(queryShop,{jsonparam:'{"start":1,"rows":10}'});
      const province=yield call(queryProvicneAndCity);
      const salesarea=yield call(querySaleArea);
      const shopstatus=yield call(queryShopStatus);
      const shoptype=yield call(queryShopType);
      if(shoplist.data){
       	// console.log(shoplist.data.dataList.length);
       	// let datalength=shoplist.data.dataList.length;
       	// let tablebase=shoplist.data.dataList;
       	// 	for (let i =1; i <=datalength; i++) {
       	// 		tablebase[i-1].num=i;
       	// 	}
       	// 	console.log(tablebase);
	      	yield put({type:'ShopList',
	      	payload:{
	      		dataSource:shoplist.data.dataList
	      	}
	      });
      };
      if(province.data){
	      	yield put({type:'ProvicneAndCity',
	      	payload:{
	      		options:province.data
	      	}
	      });
      };
       if(salesarea.data){
	       	 yield put({type:'SaleArea',
	      	payload:{
	      		region:salesarea.data
	      	}
	      });
       };
       if(shopstatus.data){
	      	yield put({type:'ShopStatus',
	      	payload:{
	      		status:shopstatus.data
	      	}
	      });
      };
      if(shoptype.data){
	      	yield put({type:'ShopType',
	      	payload:{
	      		types:shoptype.data
	      	}
	      });
      };
       
    }
},
  subscriptions: {
  	setup({ dispatch, history }){
  		 history.listen(location => {
        if (location.pathname === '/shopinfo') {
        	console.log(location.pathname);
          dispatch({type: 'enter'});
        }
  		 });
  	}
  },
}
