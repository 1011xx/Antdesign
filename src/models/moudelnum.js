import {
  queryStyleAttribute,
  queryStyleSizeGroup,
  queryStyleUnit,
  queryStyle,
  deleteStyleById,
  newStyle ,
  queryStyleRule,
  getStyleInfoById,
  queryStyleCategory,
  queryStyleYear,
  updateStyle,
  queryStyleColor
} from '../services/attribute';
import {message} from 'antd';
export default {
  namespace: 'moudelnum',
  state: {
      title:"",
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],
      visibleSure:false,
      loading:true,
      total:0,
      current:1,
      defaultPageSize:10,
      styleCategory:[],
      styleYear:[],
      chosecolorModal:false,


      currentpage:1,
      pagesize:10,

      brand:[],//品牌
      year:[],//年份
      season:[],//季节
      seriesnum:[],//序号
      category:[],//类别
      materials:[],//面料
      series:[],//"系列"
      bigCategory:[],//"大类别"
      smallCategory:[],//"小类别"
      saleType:[],//"销售类型"

      sizeItem:[],//尺寸组
      styleUnit:[],//单位
      styleNumbrules:[],
      styleNamerules:[],
      stylename:'',
      stylenum:'',


      arr:[],
      arrlabel:[],


      transfordata:[],//颜色穿梭框数据
      targetKeys:[],//选中的数据
      config:{},//配置页面信息的获取
      detaildata:{}//获取商品详情json数据

    },
    effects: {
        *enter({ payload }, { call, put, select }){
          // const currentpage = yield select(({ moudelnum }) => moudelnum.current);
          // const pagesize = yield select(({ moudelnum }) => moudelnum.defaultPageSize);
          // let tempobj={};
          // tempobj.page=currentpage;
          // tempobj.rows=pagesize;
          let tempobj={};
          tempobj.page=1;
          tempobj.rows=10;
          let strarr=JSON.stringify(tempobj);
          console.log(strarr)
            const {data}= yield call(queryStyle,{jsonparam:strarr});
            const stylecategory= yield call(queryStyleCategory);
            const styleyear= yield call(queryStyleYear);

            if(data){
              //将数据源改变成
            // console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            };
            if(stylecategory.data.code==0){
              // console.log(stylecategory.data);
               yield put({type:'publicDate',
                      payload:{
                        styleCategory:stylecategory.data.dataList,
                      }
                    });
            };
            if(styleyear.data.code==0){
              // console.log(styleyear.data);
               yield put({type:'publicDate',
                      payload:{
                        styleYear:styleyear.data.dataList,
                      }
                    });
            };
        },
        *gettablelist({ payload }, { call, put, select }){
          const currentpage = yield select(({ moudelnum }) => moudelnum.current);
          const pagesize = yield select(({ moudelnum }) => moudelnum.defaultPageSize);
          payload.page=currentpage;
          payload.rows=pagesize;
          let strarr=JSON.stringify(payload);
          console.info(strarr);
            const {data}= yield call(queryStyle,{jsonparam:strarr});

            if(data){
               let long=data.dataList.length;
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                  }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            }

        },
        *styleAttribute({ payload }, { call, put,select }){
            const {data}= yield call(queryStyleAttribute);
            const size= yield call(queryStyleSizeGroup);
            const unit= yield call(queryStyleUnit);
            const rules=yield call(queryStyleRule);

            if(data.code){
              console.log(data);
              yield put({
                type:'publicDate',
                payload:{
                  brand:data.dataList[0].propertyValueList,
                  year:data.dataList[1].propertyValueList,
                  season:data.dataList[2].propertyValueList,
                  seriesnum:data.dataList[3].propertyValueList,
                  category:data.dataList[4].propertyValueList,
                  materials:data.dataList[5].propertyValueList,
                  series:data.dataList[6].propertyValueList,
                  bigCategory:data.dataList[7].propertyValueList,
                  smallCategory:data.dataList[8].propertyValueList,
                  saleType:data.dataList[9].propertyValueList,

                }
              });
            };
            if(size.data){
               yield put({
                type:'publicDate',
                payload:{
                  sizeItem:size.data.dataList
                }
              });
            };
            if(unit.data){
               yield put({
                type:'publicDate',
                payload:{
                  styleUnit:unit.data.dataList
                }
              });
            };
            if(rules.data){
                  rules.data.dataList[0].arrrules=rules.data.dataList[0].ruleName.split(":"),
                  rules.data.dataList[1].arrrules=rules.data.dataList[1].ruleName.split(":"),
                  // console.log(rules.data.dataList[0].arrrules);
              yield put({
                type:'publicDate',
                payload:{
                  styleNumbrules:rules.data.dataList[0].arrrules,
                  styleNamerules:rules.data.dataList[1].arrrules,
                }
              });
            }
        },
        *queryinfo({ payload}, { call, put }){
          const resultinfo=yield call(getStyleInfoById,{jsonparam:payload});
          const rules=yield call(queryStyleRule);
          if(resultinfo.data){
            console.log(resultinfo.data.styleInfo);
      
          //将请求的数据赋值给currentItem和detailItem
            yield put({type:'publicDate',
            payload:{
              currentItem:resultinfo.data.styleInfo,
                stylename: resultinfo.data.styleInfo.name,//品名
                stylenum: resultinfo.data.styleInfo.code,//款号
              arr:[
                    undefined,
                    resultinfo.data.styleInfo.brandCode,
                    resultinfo.data.styleInfo.yearCode,
                    resultinfo.data.styleInfo.seasonCode,
                    resultinfo.data.styleInfo.serialnoCode,
                    resultinfo.data.styleInfo.categoryCode,
                    resultinfo.data.styleInfo.materialsCode,
                    resultinfo.data.styleInfo.seriesCode,
                    resultinfo.data.styleInfo.bigcategoryCode,
                    resultinfo.data.styleInfo.smallcategoryCode,
                    resultinfo.data.styleInfo.saletypeCode
              ],
              arrlabel:[
                  undefined,
                  resultinfo.data.styleInfo.brandName,
                  resultinfo.data.styleInfo.yearName,
                  resultinfo.data.styleInfo.seasonName,
                  resultinfo.data.styleInfo.serialnoName,
                  resultinfo.data.styleInfo.categoryName,
                  resultinfo.data.styleInfo.materialsName,
                  resultinfo.data.styleInfo.seriesName,
                  resultinfo.data.styleInfo.bigcategoryName,
                  resultinfo.data.styleInfo.smallcategoryName,
                  resultinfo.data.styleInfo.saletypeName
              ]
            }
          });
        };
          if(rules.data){
            rules.data.dataList[0].arrrules=rules.data.dataList[0].ruleName.split(":"),
            rules.data.dataList[1].arrrules=rules.data.dataList[1].ruleName.split(":"),
                  console.log(rules.data);
              yield put({
                type:'publicDate',
                payload:{
                  styleNumbrules:rules.data.dataList[0].arrrules,
                  styleNamerules:rules.data.dataList[1].arrrules,
                }
              });
            }
    },
    *configcs({ payload }, { call, put,select }){
      //用于获取配置页面的呀颜色等
      const details=yield call(getStyleInfoById,{jsonparam:payload});
      const {data}=yield call(queryStyleColor);
      if(data.code==0){
        console.log(data);
        for(let i=0;i<data.dataList.length;i++){
          data.dataList[i].key=i+1;
        }
        yield put({
          type:'publicDate',
          payload:{
              transfordata:data.dataList
          }
        });
      };
      if(details.data.code){
        console.log(details);
        yield put({
          type:'publicDate',
          payload:{
            config:details.data.styleInfo
          }
        })
      }
    },
    *querybyid({ payload }, { call, put}){
      //根据id来获取商品的详情
      const {data}=yield call(getStyleInfoById,{jsonparam:payload});
      
      if(data.code==0){
        console.log(data);
         yield put({
          type:'publicDate',
          payload:{
            detaildata:data.styleInfo
          }
        });
      };

    },
        *querypage({ payload }, { call, put,select }){
          // const currentpage = yield select(({ attrsizeItem }) => attrsizeItem.current);
          // const pagesize = yield select(({ attrsizeItem }) => attrsizeItem.defaultPageSize);
          //   let strarr=JSON.stringify(payload);
          //   console.log(strarr)
          //   const {data}= yield call(queryAllSizeGroup,{jsonParam:strarr});
          //   if(data){
          //   console.log(data);
          //    // 开始添加页面序号
          //        let long=data.dataList.length;
          //         if(currentpage<2){
          //           for(let i=1;i<=long;i++){
          //               data.dataList[i-1].num=i;
          //             }
          //           }else{
          //             let size=(currentpage-1)*10;
          //             for(let j=size;j<long+size;j++){
          //               data.dataList[j-size].num=j+1;
          //             }
          //           }
          //           //添加页面序号结束
          //   yield put({type:'publicDate',
          //             payload:{
          //               dataSource:data.dataList,
          //               total:data.total,
          //               loading:false
          //             }
          //           });
          //   }
        },
        *create({ payload }, { call, put,select }){
            // const tabledata = yield select(({ attrsizeItem }) => attrsizeItem.dataSource);
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(newStyle,{jsonparam:strarr});
            console.log(data);
            //data.code=="0"是成功时要执行的回调
            if(data.code=="0"){
              message.success(data.msg);
                 //方案一：修改页面数据,直接在数据源上push意条数据(可以省略，再次请求数据)
                    // payload.num=tabledata.length+1;
                    // console.log(payload);
                    // const newtabledata=tabledata.push(payload);
                    // console.log(tabledata);
                //方案二：再次请求数据
                 yield put({type:'gettablelist'});
                  //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                         defaultPageSize:10
                      }
                    });

            }else if(data.code=="4"){
                message.error(data.msg);
                 yield put({type:'publicDate',payload:{loading:false}});
            }else{
              message.warning(data.msg);
               yield put({type:'publicDate',payload:{loading:false}});
            }

        },
        *update({ payload }, { call, put,select }){
            const id = yield select(({ moudelnum }) => moudelnum.currentItem.id);
            payload.id=id;
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(updateStyle,{jsonparam:strarr});
            if(data.code=="0"){
              message.success(data.msg);
                console.log(data);
                
            }else if(data.code=="4"){
                message.error(data.msg);
                 yield put({type:'publicDate',payload:{loading:false}});
            }else{
              message.warning(data.msg);
               yield put({type:'publicDate',payload:{loading:false}});
            }

        },
        *delete({ payload }, { call, put,select }){
            console.log('payload:'+payload);
            let strarr=JSON.stringify(payload);
            const {data}= yield call(deleteStyleById,{jsonparam:strarr});
            if(data.code=="0"){
              message.success(data.msg);
                console.log(data);
                //方案二：再次请求数据
                yield put({type:'enter'});
                 //将页码设为默认
                  yield put({type:'publicDate',
                      payload:{
                         current:1,
                         defaultPageSize:10
                      }
                    });
            }else if(data.code=="4"){
                message.error(data.msg);
                 yield put({type:'publicDate',payload:{loading:false}});
            }else{
              message.warning(data.msg);
               yield put({type:'publicDate',payload:{loading:false}});
            }

        }
    },
    reducers: {
        Changetitle(state, action) {
            return {...state,
                ...action.payload
            };
        },
         publicDate(state, action) {
            return {...state,
                ...action.payload
            };
        },
        showEditModal(state,action) {
            return {...state, ...action.payload,modalVisible:true,title:"修改" };
        },
        showAddModal(state,action) {
            return {...state,...action.payload, modalVisible:true,title:"增加" };
        },
        hideModal(state) {
            return {...state, modalVisible:false  };
        },
        tableLoading(state){
            return {...state,loading:true}
        },
        tableLoadingClose(state){
            return {...state,loading:false}
        },
        sureModalshow(state){
            return {...state,visibleSure:true}
        },
        sureModalhide(state){
            return {...state,visibleSure:false}
        }
    },
     subscriptions: {
        setup({ dispatch, history }){
         history.listen(location => {
        if (location.pathname === '/modelnumber') {
            console.log(location.pathname);
          dispatch({type: 'enter'});
          //刷新页面使得页码恢复到默认值
           dispatch({
            type: 'publicDate',
            payload:{
               current:1,
               defaultPageSize:10
            }
          });
        }else{
          let str=location.pathname;
          let strs = str.split("/");
          strs.shift();
          let tempobj={};
          tempobj.id=strs[2];
          let querystr=JSON.stringify(tempobj);
          if(strs[1]==='editstyle'){
            //当进入新增款号页面时候请求下拉框数据
            dispatch({type:'styleAttribute'});
            dispatch({
              type: 'publicDate',
              payload:{
                stylename:'',
                stylenum:''
              }
            });
            // //请求表格数据和款号类数据
            //  dispatch({
            //   type: 'enterstyleattr',
            //   payload:strs[2]
            // });

          }else if(strs[1]==='addstyle'){
            //当进入新增款号页面时候请求下拉框数据
            dispatch({type:'styleAttribute'});
            dispatch({
              type:'queryinfo',
              payload:querystr
            });
            //根据获得的id来请求每条数据
          }else if(strs[1]==='configcolorsize'){
            console.log(querystr);
            dispatch({
              type:'configcs',
              payload:querystr
            });
          }else if(strs[1]==='styledetails'){
            //如果是查看页面
            dispatch({
              type:'querybyid',
              payload:querystr
            });

          }else if(strs[1]==='styledetails'){
            //如果是天马页面
          }
        }
         });
       }
     }

};
