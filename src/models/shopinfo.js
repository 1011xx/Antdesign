import { addShop,queryProvicneAndCity,querySaleArea,queryShopStatus,queryShopType ,queryShop} from '../services/shopinfo';
import { parse } from 'qs';
export default {
  namespace: 'shopinfo',
  state: {
  	options:[],
  	region:[],
  	status:[],
  	types:[],
    total:0,
  	dataSource:[],
  	searchForm:{
  		page:1,
  		rows:10
  	},
  	query:'',
  	loading:true,
    changePage:{
      page:1,
      rows:10
    },
    //shopadd
    previewVisible:false,
    previewImage:true,
    fileList: [],
    fileListlength:1,
    oFile:[],
    behavier:'create',//是否为新增
    //update
    currentItem:{},


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

      return { ...state, ...action.payload,loading:false};
    },
    //显示预览
    ShowPreview(state){
      return {...state,previewVisible:true};
    },
    //关闭预览
    HidePreview(state){
      return {...state,previewVisible:false};
    },
    //
    PreviewImage(state, action) {
      return { ...state, ...action.payload};
    },
    //
    FileListlength(state, action) {
      return { ...state, ...action.payload};
    },
    //
    FileList(state, action) {
      return { ...state, ...action.payload};
    },
    updateinfo(state,action){
       return { ...state, ...action.payload};
    }

  },
  effects: {

  	//当进入的时出发的事件
  	*enter({ payload}, { call, put }) {
  		
  	  const shoplist=yield call(queryShop,{jsonparam:'{"page":"1","rows":"10"}'});
      const province=yield call(queryProvicneAndCity);
      const salesarea=yield call(querySaleArea);
      const shopstatus=yield call(queryShopStatus);
      const shoptype=yield call(queryShopType);
      if(shoplist.data){
       		// console.log(shoplist.data);
          for(let i=1;i<=shoplist.data.dataList.length;i++){
            shoplist.data.dataList[i-1].num=i;
          }
	      	yield put({type:'ShopList',
	      	payload:{
	      		dataSource:shoplist.data.dataList,
            total:shoplist.data.total
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
       //enteraddpage
      
    },
   *queryShop({payload},{select,call,put}){
   	 // console.log(payload);
    const currentpage = yield select(({ shopinfo }) => shopinfo.changePage.page);
    const pagesize = yield select(({ shopinfo }) => shopinfo.changePage.rows);
   
   	 const resultlist=yield call(queryShop,{jsonparam:payload});
   	 if(resultlist.data){
      // console.log(resultlist.data);
      let long=resultlist.data.dataList.length;
      if(currentpage<2){
        for(let i=1;i<=long;i++){
            resultlist.data.dataList[i-1].num=i;
          }
        }else{
           // console.log(currentpage);
          // console.log(currentpage*10);
          let size=currentpage*10;
          for(let j=size;j<long+size;j++){
            // console.log(j-size);
            resultlist.data.dataList[j-size].num=j;
          }
        }
       		
	      	yield put({type:'ShopList',
	      	payload:{
	      		dataSource:resultlist.data.dataList
	      	}
	      });
      };
   },
   *upload({payload},{call,put}){
    const resultlist=yield call(addShop,payload);
   }
 

},
  subscriptions: {
  	setup({ dispatch, history }){
  		 history.listen(location => {
        if (location.pathname === '/shopinfo') {
        	// console.log(location.pathname);
          dispatch({type: 'enter'});
           
        }
  		 });
  	}
  },
}
