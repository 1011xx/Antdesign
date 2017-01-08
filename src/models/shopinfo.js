import { queryShopInfo,updateShop,addShop,queryProvicneAndCity,querySaleArea,queryShopStatus,queryShopType ,queryShop} from '../services/shopinfo';
import { parse } from 'qs';
import {message} from 'antd';
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
    defaultPageSize:10,
    //shopadd
    previewVisible:false,
    previewImage:true,
    fileList: [],
    fileListlength:0,
    oFile:[],
    behavier:'create',//是否为新增
    //update
    currentItem:{},
    detailItem:{},
    saving:false,
    updating:false



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
    },
    publicdate(state,action){
      return {...state,...action.payload};
    }
  },
  effects: {

  	//当进入的时出发的事件
  	*enter({ payload}, { call, put }) {
  		yield put({type:'publicdate',
          payload:{
            loading:true
          }
        });
  	  const shoplist=yield call(queryShop,{jsonparam:'{"page":"1","rows":"10"}'});
      const province=yield call(queryProvicneAndCity);
      const salesarea=yield call(querySaleArea);
      const shopstatus=yield call(queryShopStatus);
      const shoptype=yield call(queryShopType);
      if(shoplist.data){
       		console.log(shoplist.data);
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
	      		options:province.data.provincecity
	      	}
	      });
      };
       if(salesarea.data){
       
	       	 yield put({type:'SaleArea',
	      	payload:{
	      		region:salesarea.data.salesArea
	      	}
	      });
       };
       if(shopstatus.data){
       
	      	yield put({type:'ShopStatus',
	      	payload:{
	      		status:shopstatus.data.shopStatus
	      	}
	      });
      };
      if(shoptype.data){
        
	      	yield put({type:'ShopType',
	      	payload:{
	      		types:shoptype.data.shopType
	      	}
	      });
      };
       //enteraddpage
      
    },
    *enteraddpage({ payload}, { call, put }) {
      
      const province=yield call(queryProvicneAndCity);
      const salesarea=yield call(querySaleArea);
      const shoptype=yield call(queryShopType);
      
      if(province.data){
          yield put({type:'ProvicneAndCity',
          payload:{
            options:province.data.provincecity
          }
        });
      };
       if(salesarea.data){
           yield put({type:'SaleArea',
          payload:{
            region:salesarea.data.salesArea
          }
        });
       };
       if(shoptype.data){
          yield put({type:'ShopType',
          payload:{
            types:shoptype.data.shopType
          }
        });
      };
      
    },
    *entershopedit({ payload}, { call, put }){
      //查看修改页面的
       // const resultlist=yield call(queryShop,{jsonparam:payload});
    },
    *queryinfo({ payload}, { call, put }){
      const resultinfo=yield call(queryShopInfo,{jsonparam:payload});
      if(resultinfo.data){
          console.log(resultinfo.data);
            yield put({type:'publicdate',
          payload:{
            currentItem:resultinfo.data.shopInfo
          }
        });
      }
  
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
    const resultupload=yield call(addShop,payload);
    if(resultupload.data){
      // console.info(resultupload.data.msg);
      yield put({type:'publicdate',
          payload:{
            saving:false
          }
        });
      if(resultupload.data.code==0){
       message.success(resultupload.data.msg); 
       
       }else if(resultupload.data.code==4){
       message.error(resultupload.data.msg); 
       
       }else{
       message.warning(resultupload.data.msg);

       };
    }
    
   },
   *update({payload},{call,put}){
    const resultupdate=yield call(updateShop,payload);
    if(resultupdate.data){
     console.log(resultupdate.data.msg);
      yield put({type:'publicdate',
          payload:{
            updating:false
          }
        });
        if(resultupdate.data.code==0){
       message.success(resultupdate.data.msg); 
       
       }else if(resultupdate.data.code==4){
       message.error(resultupdate.data.msg); 
       
       }else{
       message.warning(resultupdate.data.msg);
       };
    }
 }

},
  subscriptions: {
  	setup({ dispatch, history }){
  		 history.listen(location => {
        if (location.pathname === '/shopinfo') {
        	// console.log(location.pathname);
          dispatch({type: 'enter'});
           
        }else if (location.pathname === '/shopinfo/shopadd') {
          // console.log(location.pathname);
          dispatch({type: 'enteraddpage'});
          //新增完成后将图片上传列表删除
          dispatch({type: 'publicdate',
                      payload:{
                      fileList:[],
                      fileListlength:0,
                      oFile:[]
                    }
                  });
          
           
        }else if(location.pathname === '/shopinfo/shopedit'){
          console.log('go in');
           dispatch({type: 'enteraddpage'});
           dispatch({type: 'queryinfo'});
        }
  		 });
  	}
  },
}
