import {addAll} from "../utils/common";
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
  queryStyleColor,
  queryStyleBarcode,
  queryStyleConfigList,
  queryStyleSize,
  saveStyleConfig
} from '../services/attribute';
import {Modal} from 'antd';
export default {
  namespace: 'moudelnum',
  state: {
      title:"",
      savedone:false,//保存成功状态
      savedtwo:false,//修改成功状态
      switchstatus:false,//修改界面switch状态
      currentItem:{},
      modalVisible:false,
      modalType: 'create',
      dataSource:[],
      barcodeSource:[],//查看条码表格的数据源
      barcodeTotal:0,
      barcodecurrent:1,
      barcodepagesize:10,
      visibleSure:false,
      savevisibleSave:false,
      loading:true,
      total:0,
      current:1,
      defaultPageSize:10,
      styleCategory:[],
      styleYear:[],
      chosecolorModal:false,
      saveSpin:false,


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
      saveConfig:{},

      arr:[],
      arrlabel:[],


      transfordata:[],//颜色穿梭框数据
      exitcolor:[],//拷贝穿梭匡数据
      targetKeys:[],//选中的数据
      config:{},//配置页面信息的获取
      detaildata:{},//获取商品详情json数据
      configlist:[],//获取详情也和配置页面的数据，列表展示页数据
      colorcode:'',//存储颜色代码
      currentid:'',//当前页面的id
      currentsizegrop:'',//尺寸组代码
      sizeoption:[],//尺寸选择数据源
      listarry:[],//选择颜色后的表格数组

      saveFlag:false,
      spinflag:true,
      labelarr:[],
      keyarr:[],





      styleCode:'',
      categoryCode:'',
      yearCode:'',
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
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                    // data.dataList[i-1].key=i;
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
              console.log(stylecategory.data);
             //添加全部选项
            //  stylecategory.data.dataList.unshift(addAll());
               yield put({type:'publicDate',
                      payload:{
                        styleCategory:stylecategory.data.dataList,
                      }
                    });


            };
            if(styleyear.data.code==0){
             //添加全部选项
            //  styleyear.data.dataList.unshift(addAll());
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
          console.log(payload);
          let strarr=JSON.stringify(payload);
          console.info(strarr);
            const {data}= yield call(queryStyle,{jsonparam:strarr});

            if(data){
               let long=data.dataList.length;
            console.log(data);
             for(let i=1;i<=data.dataList.length;i++){
                    data.dataList[i-1].num=i;
                    // data.dataList[i-1].key=i;
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
                  saveFlag:false
                }
              });
            }
        },
        *queryinfo({ payload}, { call, put }){
          const resultinfo=yield call(getStyleInfoById,{jsonparam:payload});
          const rules=yield call(queryStyleRule);
          if(resultinfo.data){
            if(resultinfo.data.styleInfo.isUniqCodemanagementCode==1){
              resultinfo.data.styleInfo.isUniqCodemanagementCode=true;
            }else{
              resultinfo.data.styleInfo.isUniqCodemanagementCode=false;
            }
            console.info(resultinfo.data.styleInfo);

          //将请求的数据赋值给currentItem和detailItem
            yield put({type:'publicDate',
            payload:{
              currentItem:resultinfo.data.styleInfo,
              switchstatus:resultinfo.data.styleInfo.isUniqCodemanagementCode,
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
      const id = yield select(({ moudelnum }) => moudelnum.currentid);
      const sizegrop = yield select(({ moudelnum }) => moudelnum.currentsizegrop);
      let tempid={};
      let tempstyleid={};
      let temidstyle={};
      temidstyle.styleId=id;
      temidstyle.sizeGroupCode=sizegrop;
      tempid.id=id;
      tempstyleid.styleId=id;
      let str1=JSON.stringify(tempid);
      let str2=JSON.stringify(tempstyleid);
      let str3=JSON.stringify(temidstyle);
      var exitcolorCode=[];//已存在的颜色
      const styleConfigList=yield call(queryStyleConfigList,{jsonparam:str2});//获取已有列表的数据
      const details=yield call(getStyleInfoById,{jsonparam:str1});//通过id获取款号信息
      const size=yield call(queryStyleSize,{jsonparam:str3});//获取尺寸下拉选框的数据
      const {data}=yield call(queryStyleColor);//获取颜色列表



      if(styleConfigList.data.code==0){
        console.log(styleConfigList.data);
        //这里将获取到的颜色保存下来
        if(styleConfigList.data.dataList){
          for(let i=0;i<styleConfigList.data.dataList.length;i++){
            exitcolorCode.push(styleConfigList.data.dataList[i].colorCode);
          }
        }
        // console.log(exitcolorCode);
        //这里给选择尺寸框数据
        if(styleConfigList.data.dataList){
          for(let i=0;i<styleConfigList.data.dataList.length;i++){
            let temp={};
            styleConfigList.data.dataList[i].sizes=styleConfigList.data.dataList[i].sizes.split(',');
            temp.styleId=styleConfigList.data.dataList[i].styleId;
            temp.colorCode=styleConfigList.data.dataList[i].colorCode;
            let tempdata=JSON.parse(styleConfigList.data.dataList[i].image);

              //当不使用代理的时候取消这条注释
              // styleConfigList.data.dataList[i].proimage='http://'+location.host+'/fmss'+temp.imageDirectory;
              //当使用代理的时候取消这条注释
              console.log(tempdata);
               // styleConfigList.data.dataList[i].proimage='http://192.168.10.146:5001/fmss'+tempdata.imageDirectory;
               //     temp.imageName=tempdata.imageName;
               //     styleConfigList.data.dataList[i].json=JSON.stringify(temp);
               //     styleConfigList.data.dataList[i].image=tempdata;
              if(tempdata.imageDirectory){
                   styleConfigList.data.dataList[i].proimage='http://192.168.10.146:5001/fmss'+tempdata.imageDirectory;
                    // styleConfigList.data.dataList[i].proimage='http://192.168.10.159:9081/fmss'+tempdata.imageDirectory;
                   // temp.imageName=tempdata.imageName;
                   styleConfigList.data.dataList[i].json=JSON.stringify(temp);
                   styleConfigList.data.dataList[i].image=tempdata;
              }else{
                  styleConfigList.data.dataList[i].proimage='';
                   // temp.imageName=tempdata.imageName;
                   styleConfigList.data.dataList[i].json=JSON.stringify(temp);
                   styleConfigList.data.dataList[i].image=tempdata;
              }

          }
          console.info(styleConfigList.data);
          yield put({
            type:'publicDate',
            payload:{
              configlist:styleConfigList.data.dataList,
            }
          });
        }else{
          yield put({
            type:'publicDate',
            payload:{
              configlist:{}
            }
          });
        }
      };
      if(details.data.code){
        // console.info("details",details);
        yield put({
          type:'publicDate',
          payload:{
            config:details.data.styleInfo,
            saveSpin:false,
            saveConfig:{
              //拼装保存配置的数据头，根据进入不同的页面，去获取不同的信息
              styleId:details.data.styleInfo.id,
              styleCode:details.data.styleInfo.code,
              styleName:details.data.styleInfo.name,
            }
          }
        })
      };
      if(data.code==0){
        //获取到的颜色列表


        for(let i=0;i<data.dataList.length;i++){
          data.dataList[i].key=i+1;
        }
        //复制原数组；
        const temparr=data.dataList.concat();
        // console.info('data.dataList:',data.dataList);
        //保存备份的颜色，之后要通过这个数据找到它的可以值
        yield put({
          type:'publicDate',
          payload:{
              exitcolor:temparr
          }
        });

            console.log('exitcolorCode:',exitcolorCode);
            //找出列表中已经有的数据，并排除掉给穿梭框
            for(let i=0;i<exitcolorCode.length;i++){
              for(let j=0;j<data.dataList.length;j++){
                if(exitcolorCode[i]==data.dataList[j].colorCode){
                  // console.log(data.dataList[j]);
                  // console.log(data.dataList.splice(j,1));
                  data.dataList.splice(j,1);

                }
              }
            }

        yield put({
          type:'publicDate',
          payload:{
              transfordata:data.dataList,

          }
        });
      };


      if(size.data.code==0){
        // console.log(size.data);
        yield put({
          type:'publicDate',
          payload:{
            sizeoption:size.data.dataList
          }
        });
      }
    },
    *querybyid({ payload }, { call, put}){
      //根据id来获取商品的详情
      let tempid={};
      let tempstyleid={}
      tempid.id=payload;
      tempstyleid.styleId=payload;
      let str1=JSON.stringify(tempid);
      let str2=JSON.stringify(tempstyleid);

      console.log(payload);
      const {data}=yield call(getStyleInfoById,{jsonparam:str1});
      const styleConfigList=yield call(queryStyleConfigList,{jsonparam:str2});
      if(data.code==0){
        if(data.styleInfo.remarks){
          data.styleInfo.remarks=data.styleInfo.remarks.replace(/\n/g, '<br/>');
        }

        console.log(data);
         yield put({
          type:'publicDate',
          payload:{
            detaildata:data.styleInfo
          }
        });
      };
      if(styleConfigList.data.code==0){
         console.log('styleConfigList.data');
        console.log(styleConfigList.data);
        if(styleConfigList.data.dataList){
            for(let i=0;i<styleConfigList.data.dataList.length;i++){
              let size=styleConfigList.data.dataList[i].sizes.split(",").join(" ");
              styleConfigList.data.dataList[i].colorSize=styleConfigList.data.dataList[i].colorName+"： "+size;
              // styleConfigList.data.dataList[i].proimage='http://'+location.host+'/fmss'+styleConfigList.data.dataList[i].imageDirectory;
              let temp=JSON.parse(styleConfigList.data.dataList[i].image);
              //当不使用代理的时候取消这条注释
              // styleConfigList.data.dataList[i].proimage='http://'+location.host+'/fmss'+temp.imageDirectory;
              //当使用代理的时候取消这条注释
              styleConfigList.data.dataList[i].proimage='http://192.168.10.146:5001/fmss'+temp.imageDirectory;
              // styleConfigList.data.dataList[i].proimage='http://192.168.10.159:9081/fmss'+temp.imageDirectory;
          }
        }
        // console.error('styleConfigList.data:',styleConfigList.data);
        yield put({
          type:'publicDate',
          payload:{
            configlist:styleConfigList.data.dataList,
            spinflag:false
          }
        });
      }

    },
    *querybarcode({ payload }, { call, put,select}){
      //查询条码，以及分页查询条码
      //需要传递页码，页数，和styleid
      //翻页，翻页，翻页，翻页，翻页，翻页，翻页
      const id = yield select(({ moudelnum }) => moudelnum.currentid);
      const barcodepage = yield select(({ moudelnum }) => moudelnum.barcodecurrent);
      const barcodepagesize = yield select(({ moudelnum }) => moudelnum.barcodepagesize);
      var tempobj={};
      tempobj.styleId=id;
      tempobj.page=barcodepage;
      tempobj.rows=barcodepagesize;
      console.log(tempobj);
      let querystr=JSON.stringify(tempobj);
       const {data}=yield call(queryStyleBarcode,{jsonparam:querystr});
        if(data.code==0){

        let long=data.dataList.length;
      if(barcodepage<2){
        for(let i=1;i<=long;i++){
            data.dataList[i-1].num=i;
              // data.dataList[i-1].key=i;
          }
        }else{
          let size=(barcodepage-1)*barcodepagesize;
          for(let j=size;j<long+size;j++){
            data.dataList[j-size].num=j+1;
            // data.dataList[j-size].key=j+1;
          }
        }
        console.log(data);
         yield put({
          type:'publicDate',
          payload:{
            barcodeSource:data.dataList,
            barcodeTotal:data.total,
            spinflag:false
          }
        });
      };
    },
        *querypage({ payload }, { call, put,select }){
          const currentpage = yield select(({ moudelnum }) => moudelnum.current);
          const pagesize = yield select(({ moudelnum }) => moudelnum.defaultPageSize);

          payload.page=currentpage;
          payload.rows=pagesize;

          let strarr=JSON.stringify(payload);
          console.log(strarr)
          const {data}= yield call(queryStyle,{jsonparam:strarr});

            if(data.code==0){
              //将数据源改变成
                  let long=data.dataList.length;
                       if(currentpage<2){
                         for(let i=1;i<=long;i++){
                             data.dataList[i-1].num=i;
                              // data.dataList[i-1].key=i;
                           }
                         }else{
                           let size=(currentpage-1)*pagesize;
                           for(let j=size;j<long+size;j++){
                             data.dataList[j-size].num=j+1;
                            //  data.dataList[j-size].key=j+1;
                           }
                         }
               console.log(data);
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            };

        },
        *create({ payload }, { call, put,select }){
            // const tabledata = yield select(({ attrsizeItem }) => attrsizeItem.dataSource);
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(newStyle,{jsonparam:strarr});
            console.log(data);
            //data.code=="0"是成功时要执行的回调
            if(data.code=="0"){
              // message.success(data.msg);
                 //方案一：修改页面数据,直接在数据源上push意条数据(可以省略，再次请求数据)
                    // payload.num=tabledata.length+1;
                    // console.log(payload);
                    // const newtabledata=tabledata.push(payload);
                    // console.log(tabledata);


                  //将页码设为默认,同时清空搜索条件
                  yield put({type:'publicDate',
                      payload:{
                         saveFlag:false,
                         current:1,
                         defaultPageSize:10,
                         savedone:true,
                         styleCode:'',
                         categoryCode:'',
                         yearCode:'',
                         loading:true
                      }
                    });

                    //当新增页面成功后，刷星列表
                    yield put({
                      type:'enter'
                    })

            }else{
               yield put({type:'publicDate',
                      payload:{
                         saveFlag:false
                      }
                    });
              Modal.error({
                 title: '提示',
                 content: data.msg,
               });
            }

        },
        *update({ payload }, { call, put,select }){
            const id = yield select(({ moudelnum }) => moudelnum.currentItem.id);
            payload.id=id;
            let strarr=JSON.stringify(payload);
            console.log(strarr);
            const {data}= yield call(updateStyle,{jsonparam:strarr});

            if(data.code=="0"){
              // message.success(data.msg);
                // console.log(data);
                 yield put({
                  type:'publicDate',
                  payload:{
                     saveFlag:false,
                    savedtwo:true
                  }
                });
            }else{
               yield put({type:'publicDate',
                      payload:{
                         saveFlag:false
                      }
                    });
              Modal.error({
                 title: '提示',
                 content: data.msg,
               });
            }



        },
        *delete({ payload }, { call, put,select }){
          const currentpage = yield select(({ moudelnum }) => moudelnum.current);
          const dataSource = yield select(({ attrsizeItem }) => attrsizeItem.dataSource);
            console.log('payload:'+payload);
            let strarr=JSON.stringify(payload);
            const {data}= yield call(deleteStyleById,{jsonparam:strarr});
            if(data.code=="0"){
              //这里判断当页是否还有一条数据，如果还有一条数据的话，再判断页数，如果当前的页数
              // 小于2页的话不做操作，否则页数减一
              if(dataSource.length<2){
                if(currentpage<2){
                  yield put({type:'publicDate',
                        payload:{
                           current:1,
                           loading:true
                        }
                      });
                }else{
                  yield put({type:'publicDate',
                       payload:{
                          current:currentpage-1,
                          loading:true
                       }
                     });
                }
              }

                //方案二：再次请求数据
                yield put({type:'enter'});

            }else{
               yield put({type:'publicDate',
                      payload:{
                         loading:false
                      }
                    });
              Modal.error({
                 title: '提示',
                 content: data.msg,
               });}

        },
        *saveconfigs({ payload }, { call, put,select }){
          //配置颜色尺寸图片后的保存
          let strarr=JSON.stringify(payload);
            const {data}= yield call(saveStyleConfig,{jsonparam:strarr});
            if(data.code=="0"){
              // message.success(data.msg);
                console.log(data);
                 yield put({type:'publicDate',payload:{savevisibleSave:true}});
            }else {
               yield put({type:'publicDate',payload:{saveSpin:false}});
              Modal.error({
                 title: '提示',
                 content: data.msg,
               });
               // yield put({type:'publicDate',payload:{loading:false}});
            }

        },
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
          let state=true;
         history.listen(location => {
        if (location.pathname === '/modelnumber') {
            if(state){
                 //刷新页面使得页码恢复到默认值
           dispatch({
            type: 'publicDate',
            payload:{
               defaultPageSize:10,
               loading:true
            }
          });
               dispatch({type: 'enter'});
               state=false;
            }


        }else{
          let str=location.pathname;
          let strs = str.split("/");
          strs.shift();
          let tempobj={};


          tempobj.id=strs[2];
          let querystr=JSON.stringify(tempobj);
          dispatch({
              type: 'publicDate',
              payload:{
              currentid:strs[2]
              }
            });
          if(strs[1]==='editstyle'){

             dispatch({
              type: 'publicDate',
              payload:{
                saveFlag:true,
                stylename:'',
                stylenum:'',
                labelarr:[],
                keyarr:[]
              }
            });
            //当进入新增款号页面时候请求下拉框数据
            dispatch({type:'styleAttribute'});

            // //请求表格数据和款号类数据
            //  dispatch({
            //   type: 'enterstyleattr',
            //   payload:strs[2]
            // });

          }else if(strs[1]==='addstyle'){
            //当进入新增款号页面时候请求下拉框数据
             dispatch({
              type: 'publicDate',
              payload:{
                saveFlag:true
              }
            });
            dispatch({type:'styleAttribute'});
            dispatch({
              type:'queryinfo',
              payload:querystr
            });
            //根据获得的id来请求每条数据
          }else if(strs[1]==='configcolorsize'){
            console.log(querystr);
            let strarr=strs[2];
            var newarr=strarr.split(":");
            console.info('strarr:',newarr[0]);
            dispatch({
                type: 'publicDate',
                payload:{
                currentid:newarr[0],
                currentsizegrop:newarr[1],
                saveSpin:true
                }
              });
            dispatch({
              type:'configcs'
            });
          }else if(strs[1]==='styledetails'){
            //如果是查看页面详情
            dispatch({
                type: 'publicDate',
                payload:{
                spinflag:true
                }
              });
            dispatch({
              type:'querybyid',
              payload:strs[2]
            });

          }else if(strs[1]==='barcode'){
            dispatch({
                type: 'publicDate',
                payload:{
                spinflag:true
                }
              });
            //如果是条码页面
            dispatch({
              type:'querybarcode'
            });
          }
        }
         });
       }
     }

};
