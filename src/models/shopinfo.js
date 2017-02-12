import { queryShopInfo,updateShop,addShop,queryProvicneAndCity,querySaleArea,queryShopStatus,queryShopType ,queryShop} from '../services/shopinfo';
import { parse } from 'qs';
import {Modal} from 'antd';
export default {
  namespace: 'shopinfo',
  state: {
  	options:[],
  	region:[],
  	status:[],
  	types:[],
    total:0,
    current:1,
  	dataSource:[],
  	searchForm:{
  		page:1,
  		rows:10
  	},
  	query:'',
    queryStatus:'AllShop',
  	loading:true,
    editloading:true,
    changePage:{
      page:1,
      rows:10
    },
    defaultPageSize:10,
    //shopadd
    previewVisible:false,
    previewImage:true,
    fileList: [],
    deleteImg:[],
    fileListlength:0,
    oFile:[],
    behavier:'create',//是否为新增
    //update
    currentItem:{},
    detailItem:{},
    saving:false,
    updating:false,
    visibleSave:false,
    addvisibleSave:false,
    uploading:false,
    adduploading:false,

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
  	*enter({ payload}, { call, put ,select}) {
      const PageSize = yield select(({ shopinfo }) => shopinfo.defaultPageSize);
  		yield put({type:'publicdate',
          payload:{
            loading:true
          }
        });
  	  const shoplist=yield call(queryShop,{jsonparam:'{"page":"1","rows":"'+PageSize+'"}'});
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
    *queryinfo({ payload}, { call, put }){
      const resultinfo=yield call(queryShopInfo,{jsonparam:payload});
          if(resultinfo.data){
            console.log(resultinfo.data);
              if(resultinfo.data.shopInfo.images){
            let imagearr=JSON.parse(resultinfo.data.shopInfo.images);
            // console.log('imageobj',imagearr);
            // images=[{"imageDirectory":"\\images\\shop\\d17446cb5afe45f692def5ebfdcb7473.png","imageName":"12ebb50ce49a485882b316351c75ca01.png","imageOrginalName":"i6pg.png","imageType":"png"}]
            for(let i=0;i<imagearr.length;i++){
              imagearr[i].uid=-i;
              // imagearr[i].url='/proxyDir/fmss'+imagearr[i].imageDirectory;
              imagearr[i].url='http://'+location.host+'/fmss'+imagearr[i].imageDirectory;
            }
            //将组装后的json赋值给updateFileList；
               yield put({
                type: 'publicdate',
                payload:{
                  fileList:imagearr,
                  fileListlength:imagearr.length
                }
              });
          }
          //将请求的数据赋值给currentItem和detailItem
            yield put({type:'publicdate',
            payload:{
              currentItem:resultinfo.data.shopInfo,
              detailItem:resultinfo.data.shopInfo,
              editloading:false
            }
        });
      }

    },
    *queryShop({payload},{select,call,put}){
   	 // console.log(payload);
    const currentpage = yield select(({ shopinfo }) => shopinfo.changePage.page);
    const pagesize = yield select(({ shopinfo }) => shopinfo.changePage.rows);
    // console.info('pagesize--currentpage:',currentpage,pagesize);
   	 const resultlist=yield call(queryShop,{jsonparam:payload});
   	 if(resultlist.data){
      // 开始添加页面序号
      let long=resultlist.data.dataList.length;
      if(currentpage<2){
        for(let i=1;i<=long;i++){
            resultlist.data.dataList[i-1].num=i;
          }
        }else{
          let size=(currentpage-1)*pagesize;
          for(let j=size;j<long+size;j++){
            resultlist.data.dataList[j-size].num=j+1;
          }
        }
       		//添加页面序号结束
	      	yield put({type:'ShopList',
	      	payload:{
	      		dataSource:resultlist.data.dataList,
            total:resultlist.data.total
	      	}
	      });
      };
   },
   *upload({payload},{call,put}){
    const resultupload=yield call(addShop,payload);
    if(resultupload.data){
      console.info(resultupload.data.msg);
      yield put({type:'publicdate',
          payload:{
            saving:false
          }
        });
      if(resultupload.data.code==0){
        yield put({type:'publicdate',
        payload:{
          addvisibleSave:true,
          adduploading:false
        }
      });
alert(resultupload.data.msg);

       }else{
         Modal.error({
           title: '提示',
           content: resultupload.data.msg,
         });

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
          yield put({type:'publicdate',
          payload:{
            visibleSave:true,
            uploading:false
          }
        });


       }else{
         Modal.error({
           title: '提示',
           content: resultupdate.data.msg,
         });

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


        }else{
          let str=location.pathname;
           let queryobj={};
          let strs = str.split("/");
          strs.shift();
          queryobj.id=strs[2];
          let querystr=JSON.stringify(queryobj);
          if(strs[1]==='shopdetail'){

            //当进入shopdetail页面时候要执行的请求
             dispatch({
              type: 'queryinfo',
              payload:querystr
            });
             //详情页是不需要请求下拉框数据源的
          }else if(strs[1]==='shopedit'){
             dispatch({type: 'publicdate',
                      payload:{
                     behavier:'update'
                    }
                  });


            //请求下拉框数据源
              dispatch({type: 'enteraddpage'});
             //当进入shopedit页面时候要执行的请求
             dispatch({
              type: 'queryinfo',
              payload:querystr
            });

          }
        }
  		 });
  	}
  },
}
