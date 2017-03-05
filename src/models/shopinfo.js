import { queryShopInfo,updateShop,addShop,queryProvicneAndCity,querySaleArea,queryShopStatus,queryShopType ,queryShop} from '../services/shopinfo';
import { parse } from 'qs';
import {Modal} from 'antd';
import {addAll} from '../utils/common'
export default {
  namespace: 'shopinfo',
  state: {
  	provincecityoptions:[{
      label:'全部',
      value:'',
      children:[{
        label:'全部',
        value:''
      }]
    }],
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






 shopType:'',
 saleAreaCode:'',
 provinceCode:'',
 cityCode:'',
 shopStatus:'',
 fullName:''

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
      const currentpage = yield select(({ shopinfo }) => shopinfo.current);
  		// yield put({type:'publicdate',
      //     payload:{
      //       loading:true
      //     }
      //   });
      const shoplist=yield call(queryShop,{jsonparam:'{"page":"'+currentpage+'","rows":"'+PageSize+'"}'});
      const province=yield call(queryProvicneAndCity);
      const salesarea=yield call(querySaleArea);
      const shopstatus=yield call(queryShopStatus);
      const shoptype=yield call(queryShopType);

      if(shoplist.data){
         // console.log(shoplist.data);
         for(let i=1;i<=shoplist.data.dataList.length;i++){
           shoplist.data.dataList[i-1].num=i;
           // shoplist.data.dataList[i-1].key=i;
         }
         yield put({type:'ShopList',
         payload:{
           dataSource:shoplist.data.dataList,
           total:shoplist.data.total,
           loading:false
         }
       });
     };
      if(province.data){
        console.log(province.data.provincecity);
        let tempobj={};
        let childobj={};
        let childarr=[];
        tempobj.label="全部";
        tempobj.value="";
        childobj.label="全部";
        childobj.value="";
        childarr.push(childobj);
        tempobj.children=childarr;
        province.data.provincecity.unshift(tempobj);
	      	yield put({type:'ProvicneAndCity',
	      	payload:{
	      		provincecityoptions:province.data.provincecity
	      	}
	      });
      };
       if(salesarea.data){
          // salesarea.data.salesArea.unshift(addAll());
	       	 yield put({type:'SaleArea',
	      	payload:{
	      		region:salesarea.data.salesArea
	      	}
	      });
       };
       if(shopstatus.data){
        // shopstatus.data.shopStatus.unshift(addAll());
	      	yield put({type:'ShopStatus',
	      	payload:{
	      		status:shopstatus.data.shopStatus
	      	}
	      });
      };
      if(shoptype.data){
          // shoptype.data.shopType.unshift(addAll());
	      	yield put({type:'ShopType',
	      	payload:{
	      		types:shoptype.data.shopType
	      	}
	      });
      };



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
              imagearr[i].url='http://192.168.10.146:5001/fmss'+imagearr[i].imageDirectory;
              // imagearr[i].url='http://127.0.0.1:8081/fmss'+imagearr[i].imageDirectory;
              //如果发布后使用下面的代码取得服务器ip，如果使用的是代理的话就用上面的地址
              // imagearr[i].url='http://'+location.host+'/fmss'+imagearr[i].imageDirectory;
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
    const currentpage = yield select(({ shopinfo }) => shopinfo.current);
    const pagesize = yield select(({ shopinfo }) => shopinfo.defaultPageSize);
    // console.info('pagesize--currentpage:',currentpage,pagesize);
   	 const resultlist=yield call(queryShop,{jsonparam:payload});
   	 if(resultlist.data){
      // 开始添加页面序号
      let long=resultlist.data.dataList.length;
      if(currentpage<2){
        for(let i=1;i<=long;i++){
            resultlist.data.dataList[i-1].num=i;
            // resultlist.data.dataList[i-1].key=i;
          }
        }else{
          let size=(currentpage-1)*pagesize;
          for(let j=size;j<long+size;j++){
            resultlist.data.dataList[j-size].num=j+1;
            // resultlist.data.dataList[j-size].key=j+1;
          }
        }
       		//添加页面序号结束
	      	yield put({type:'ShopList',
	      	payload:{
	      		dataSource:resultlist.data.dataList,
            total:resultlist.data.total,
            loading:false
	      	}
	      });
      };
   },
   *upload({payload},{call,put}){
    //新增店仓
    const resultupload=yield call(addShop,payload);

      //如果新增成功
      if(resultupload.data.code==0){
        yield put({type:'publicdate',
        payload:{
          addvisibleSave:true,
          adduploading:false,
          saving:false
        }
      });
//新增完店仓后，需要清空所有的查询数据
    yield put({type:'publicdate',
    payload:{
      loading:true,
      current:1,
      defaultPageSize:10,
      shopType:'',
      saleAreaCode:'',
      provinceCode:'',
      cityCode:'',
      shopStatus:'',
      fullName:''
    }
    });


        yield put({type:'enter'});

       }else{

         yield put({type:'publicdate',
         payload:{
           saving:false
         }
       });
         Modal.error({
           title: '提示',
           content: resultupload.data.msg,
         });

       };


   },
   *update({payload},{call,put}){
    //修改店仓
    const resultupdate=yield call(updateShop,payload);

        if(resultupdate.data.code==0){
          yield put({type:'publicdate',
          payload:{
            visibleSave:true,
            uploading:false,
            updating:false
          }
        });


       }else{
         yield put({type:'publicdate',
         payload:{
           updating:false
         }
       });
         Modal.error({
           title: '提示',
           content: resultupdate.data.msg,
         });

       };

 }

},
  subscriptions: {
  	setup({ dispatch, history }){
      //这个状态是为了让页面打开的第一次加载
       let state=true;
  		 history.listen(location => {
        if (location.pathname === '/shopinfo') {
        	// console.log(location.pathname);

            dispatch({type: 'publicdate',
                      payload:{
                      // current:1,
                      // defaultPageSize:10,
                      fileListlength:0,
                      oFile:[],
                      // searchForm:{
                      //   cityCode:undefined,
                      //   fullName:undefined,
                      //   page:1,
                      //   provinceCode:undefined,
                      //   rows:10,
                      //   saleAreaCode:undefined,
                      //   shopStatus:undefined,
                      //   shopType:undefined
                      // },
                      // changePage:{
                      //   cityCode:undefined,
                      //   fullName:undefined,
                      //   page:1,
                      //   provinceCode:undefined,
                      //   rows:10,
                      //   saleAreaCode:undefined,
                      //   shopStatus:undefined,
                      //   shopType:undefined
                      // },
                      // fullName:undefined,
                      // shopType:undefined,
                      // saleAreaCode:undefined,
                      // shopStatus:undefined,
                      // provinceCode:undefined,
                      // cityCode:undefined

                    }
                  });
            if(state){
              dispatch({type: 'enter'});
              state=false;
            }
          // dispatch({type: 'enter'});

        }else if (location.pathname === '/shopinfo/shopadd') {
          // console.log(location.pathname);
          dispatch({type: 'enteraddpage'});
          //新增完成后将图片上传列表删除
          dispatch({type: 'publicdate',
                      payload:{
                      fileList:[],
                      fileListlength:0,
                      oFile:[],

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
                     behavier:'update',
                     editloading:true
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
