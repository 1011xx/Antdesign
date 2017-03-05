import { queryTagPriceConfig,
          queryTagPriceConfigState,
          deleteTagPriceConfig,
          queryTagPriceConfigInfo,
          queryTagPriceConfigAudit,
          updateAuditTagPriceConfig,//修改页面提交审核
          updateSaveTagPriceConfig,//修改页面暂存
          saveTagPriceConfig,//新增页面暂存
          toAuditTagPriceConfig,//新增页面提交审核
          queryTagPriceConfigStyleYear,
          queryTagPriceConfigStyleSeason,
          queryTagPriceConfigStyleBrand,
          queryTagPriceConfigStyleCategory,
          queryTagPriceConfigStyle,
          queryTagPriceAuditState,
          queryTagPriceAuditResult,
          auditTagPriceConfig,//价格审核-》审核
          queryTagPriceConfigSetPrice//添加款号后，查询当前的吊牌价

        } from '../services/price';
import {Modal} from 'antd';
export default {
  //颜色属性维护
    namespace: 'price',
    state: {
      lookupvis:false,
      statedata:[],
      set_statedata:[],
      visibleSure:false,
      commitvis:false,
      explaintext:'',
      textareavalue:'',
      dataSource:[],
      set_dataSource:[],
      loading:true,
      detaildatasource:{},
      auditdetaildata:{},
      deleteid:'',
      commitdata:{},
      total:0,
      current:1,
      defaultPageSize:10,
      setpagetotal:0,
      setpagecurrent:1,
      setpagedefaultPageSize:10,
      modalyear:[],
      modalseason:[],
      modalbrand:[],
      modalcategory:[],
      modalpici:[],
      modalstyle:[],
      chosestylemodal:false,
      setType: 'create',
      setStatus:'新增调价单',
      newData:{
        dataList:[]
      },
      saveState:'tempsave',//暂存tempsave，提交审核commit
      uploadExcel:[],
      targetKeys:[],//选中的数据
      moveKeys:[],//移动的数据
      allpriceModal:false,
      selectedRows:[],
      tiptitle:'',





      pending_visible:false,
      pending_spin:true,
      commitdone:false,//审核提交完成，弹框的状态
      addeditloading:false,

      styleCode:'',
      start:undefined,
      end:undefined,
      state:'',

      set_styleCode:'',
      set_start:undefined,
      set_end:undefined,
      set_state:'',
      confirmLoading:false,


    },
    effects: {
        *enter({ payload }, { call, put, select }){
          const currentpage = yield select(({ price }) => price.current);
          const pagesize = yield select(({ price }) => price.defaultPageSize);
           let temp={};
          temp.rows=pagesize;
          temp.page=currentpage;
          let strarr=JSON.stringify(temp);
            //获取表格数据
            const {data}= yield call(queryTagPriceConfig,{jsonParam:strarr});
            //获取状态控件数据
            const status= yield call(queryTagPriceConfigState);
            if(data){
            console.log(data);
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
                        // data.dataList[j-size].key=j+1;
                      }
                    }
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            };
            if(status.data.code==0){
              // let tempobj={};
              // tempobj.label="全部";
              // tempobj.value="";
              // status.data.dataList.unshift(tempobj);
              console.log(status.data.dataList);
              yield put({type:'publicDate',
                        payload:{
                          statedata:status.data.dataList,
                        }
                      });
            }
        },
        *enterset({ payload }, { call, put, select }){
          const setpagecurrentpage = yield select(({ price }) => price.setpagecurrent);
          const setpagepagesize = yield select(({ price }) => price.setpagedefaultPageSize);
          let temp={};
          temp.rows=setpagepagesize;
          temp.page=setpagecurrentpage;
          let strarr=JSON.stringify(temp);
          // console.log(strarr);
           //获取表格数据
            const {data}= yield call(queryTagPriceAuditResult,{jsonParam:strarr});
            //获取状态控件数据
            const status= yield call(queryTagPriceAuditState);
            if(data){
            console.log(data);
             let long=data.dataList.length;
                  if(setpagecurrentpage<2){
                    for(let i=1;i<=long;i++){
                        data.dataList[i-1].num=i;
                        // data.dataList[i-1].key=i;
                      }
                    }else{
                      let size=(setpagecurrentpage-1)*setpagepagesize;
                      for(let j=size;j<long+size;j++){
                        data.dataList[j-size].num=j+1;
                        // data.dataList[j-size].key=j+1;
                      }
                    }
            yield put({type:'publicDate',
                      payload:{
                        set_dataSource:data.dataList,
                        setpagetotal:data.total,
                        loading:false
                      }
                    });
            };
            if(status.data.code==0){
              console.log(status);
              // let tempobj={};
              // tempobj.label="全部";
              // tempobj.value="";
              // status.data.state.unshift(tempobj);
              console.log(status.data.state);
              yield put({type:'publicDate',
                        payload:{
                          set_statedata:status.data.state,
                        }
                      });
            }
        },
        *querysetpage({ payload }, { call, put, select }){
          const currentpage = yield select(({ price }) =>  price.setpagecurrent);
          const pagesize = yield select(({ price }) => price.setpagedefaultPageSize);
          const styleCode = yield select(({ price }) => price.set_styleCode);
          const state = yield select(({ price }) => price.set_state);
          const start = yield select(({ price }) => price.set_start);
          const end = yield select(({ price }) => price.set_end);
          // console.log(payload);
          //使用传递过来的参数
           let tempobj={};
            tempobj.page=currentpage;
            tempobj.rows=pagesize;
            tempobj.styleCode=styleCode;
            tempobj.resultState=state;
            tempobj.expectEffectiveDate=start;
            tempobj.expectEffectiveEndDate=end;
            let strarr=JSON.stringify(tempobj);
            console.log(strarr)
            //获取表格数据
            const {data}= yield call(queryTagPriceAuditResult,{jsonParam:strarr});

            if(data){
              console.log('set_dataSourcedata',data);
               // 开始添加页面序号
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
                        // data.dataList[j-size].key=j+1;

                      }
                    }
                    //添加页面序号结束
            yield put({type:'publicDate',
                      payload:{
                        set_dataSource:data.dataList,
                        setpagetotal:data.total,
                        loading:false
                      }
                    });
            }
        },
        *querypage({ payload }, { call, put, select }){
          const currentpage = yield select(({ price }) => price.current);
          const pagesize = yield select(({ price }) => price.defaultPageSize);
          const styleCode = yield select(({ price }) => price.styleCode);
          const state = yield select(({ price }) => price.state);
          const start = yield select(({ price }) => price.start);
          const end = yield select(({ price }) => price.end);
          // console.log(payload);
          //使用传递过来的参数
          let tempobj={};
            tempobj.page=currentpage;
            tempobj.rows=pagesize;
            tempobj.styleCode=styleCode;
            tempobj.state=state;
            tempobj.expectEffectiveDate=start;
            tempobj.expectEffectiveEndDate=end;

            let strarr=JSON.stringify(tempobj);
            console.log(strarr)
            //获取表格数据
            const {data}= yield call(queryTagPriceConfig,{jsonParam:strarr});

            if(data.code==0){
              console.log(data);
               // 开始添加页面序号
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
                          // data.dataList[j-size].key=j+1;
                      }
                    }
                    //添加页面序号结束
            yield put({type:'publicDate',
                      payload:{
                        dataSource:data.dataList,
                        total:data.total,
                        loading:false
                      }
                    });
            }
        },
        // *create({ payload }, { call, put,select }){
        //     const tabledata = yield select(({ attrlist }) => attrlist.dataSource);
        //     let strarr=JSON.stringify(payload);
        //     console.log(strarr);
        //     const {data}= yield call(newColor,{jsonParam:strarr});
        //     console.log(data);
        //     //data.code=="0"是成功时要执行的回调
        //     if(data.code=="0"){
        //        // message.success(data.msg);
        //          //方案一：修改页面数据,直接在数据源上push意条数据(可以省略，再次请求数据)
        //             // payload.num=tabledata.length+1;
        //             // console.log(payload);
        //             // const newtabledata=tabledata.push(payload);
        //             // console.log(tabledata);
        //         //方案二：再次请求数据
        //          yield put({type:'enter'});
        //           //将页码设为默认
        //           yield put({type:'publicDate',
        //               payload:{
        //                  current:1,
        //                  defaultPageSize:10
        //               }
        //             });
        //
        //     }else{
        //        Modal.error({
        //          title: '提示',
        //          content: data.msg,
        //        });
        //        yield put({type:'publicDate',payload:{loading:false}});
        //     }
        // },
        // *edit({ payload }, { call, put,select }){
        //     const id = yield select(({ attrlist }) => attrlist.currentItem.id);
        //     const newpayload = { ...payload, id }; // 等价于payload.id=id;
        //     let strarr=JSON.stringify(newpayload);
        //     console.log(strarr);
        //     const {data}= yield call(updateColor,{jsonParam:strarr});
        //     if(data.code=="0"){
        //        // message.success(data.msg);
        //         console.log(data);
        //          //方案二：再次请求数据
        //          yield put({type:'enter'});
        //           //将页码设为默认
        //           yield put({type:'publicDate',
        //               payload:{
        //                  current:1,
        //                  defaultPageSize:10
        //               }
        //             });
        //     }else{
        //        Modal.error({
        //          title: '提示',
        //          content: data.msg,
        //        });
        //        yield put({type:'publicDate',payload:{loading:false}});
        //     }
        // },
        *delete({ payload }, { call, put,select }){
          //删除价格单列表的数据
          const delid = yield select(({ price }) => price.deleteid);
          const currentpage = yield select(({ price }) => price.current);
          const dataSource = yield select(({ price }) => price.dataSource);
            let newId={};
            newId.id=delid;
            let strarr=JSON.stringify(newId);
            const {data}= yield call(deleteTagPriceConfig,{jsonParam:strarr});
            console.log(data);
            if(data.code=="0"){
              // message.success(data.msg);
                console.log(data);
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
                   yield put({type:'querypage'});
            }else{
              Modal.error({
                 title: '提示',
                 content: data.msg,
               });
              yield put({type:'publicDate',payload:{loading:false}});
            }
        },
         *details({ payload }, { call, put,select }){
          //查看详情页面，修改页面也会需要用到这个接口
            let newId={};
            newId.Id=payload;
            let strarr=JSON.stringify(newId);
            const {data}= yield call(queryTagPriceConfigInfo,{jsonParam:strarr});
            if(data.code=="0"){
                console.log(data);
                data.tagPriceConfig.createDate=data.tagPriceConfig.createDate.split(" ")[0];
                if(data.tagPriceConfig.dataList){
                    for(let i=0;i<data.tagPriceConfig.dataList.length;i++){
                    data.tagPriceConfig.dataList[i].num=i+1;
                    // data.tagPriceConfig.dataList[i].key=i+1;
                    //给已经存在的数据加上标记
                data.tagPriceConfig.dataList[i].priceFlag=`configTagprice${i+1}`;
                data.tagPriceConfig.dataList[i].remarkFlag=`remarks${i+1}`;

                  }
                }else{
                  data.tagPriceConfig.dataList=[];
                }

              //将获取到的数据给详情页面的表格
                  yield put({type:'publicDate',
                      payload:{
                        detaildatasource:data.tagPriceConfig,
                        pending_spin:false
                      }
                    });
            }
        },
        *auditdetail({ payload }, { call, put,select }){
          //审核详情弹框
            let newId={};
            newId.Id=payload;
            let strarr=JSON.stringify(newId);
            const {data}= yield call(queryTagPriceConfigAudit,{jsonParam:strarr});
            if(data.code=="0"){
                console.log('data',data);
                // 获取年月日，出去具体的时间
                data.tagPriceConfig.createDate=data.tagPriceConfig.createDate.split(' ')[0];
                // 给table数据添加序号
                for(let i=0;i<data.tagPriceConfig.dataList.length;i++){
                  data.tagPriceConfig.dataList[i].num=i+1;
                  // data.tagPriceConfig.dataList[i].key=i+1;
                }
              //将获取到的数据给审核详情弹框
                  yield put({type:'publicDate',
                      payload:{
                        auditdetaildata:data.tagPriceConfig
                      }
                    });
            }
        },
         *commit({ payload }, { call, put,select }){
          //提交吊牌价
            let strarr=JSON.stringify(payload);
            const {data}= yield call(updateAuditTagPriceConfig,{jsonParam:strarr});

            if(data.code=="0"){


                  yield put({type:'publicDate',
                      payload:{
                        commitvis:false,
                        loading:true,
                        confirmLoading:false,
                        commitdone:true
                      }
                    });
                   yield put({type: 'enter'});
            }else{
                  yield put({type:'publicDate',
                      payload:{
                        confirmLoading:false
                      }
                    });
              Modal.error({
                 title: '提示',
                 content: data.msg,
               });
            }
        },
        *getselectdata({ payload }, { call, put,select }){
         //获得弹框中的select组件的下拉选项数据
          const styleno= yield call(queryTagPriceConfigStyle);//获取所有的款号
          const styleYear= yield call(queryTagPriceConfigStyleYear);
          const styleSeason= yield call(queryTagPriceConfigStyleSeason);
          const styleBrand= yield call(queryTagPriceConfigStyleBrand);
          const styleCategory= yield call(queryTagPriceConfigStyleCategory);
          // const stylepc= yield call(pici);
           if(styleno.data.code=="0"){
            // console.log(styleno.data);
             //复制原数组；
                const temparr=styleno.data.data.concat();
                const temparr1=styleno.data.data.concat();

                for(let i=0;i<styleno.data.data.length;i++){
                  temparr[i].key=i;
                }
                console.log('temparr:',temparr,temparr1);
                 yield put({type:'publicDate',
                     payload:{
                       modalstyle:temparr,
                       copymodalstyle:temparr1
                     }
                   });
           };
           if(styleYear.data.code=="0"){
            // console.log(styleYear);
              // let tempyear={};
              // tempyear.code="undefined";
              // tempyear.name="全部";
              // styleYear.data.data.unshift(tempyear);
                 yield put({type:'publicDate',
                     payload:{
                       modalyear:styleYear.data.data
                     }
                   });
           };
           if(styleSeason.data.code=="0"){
            // console.log(styleSeason);
            //  let tempSeason={};
            //   tempSeason.code="undefined";
            //   tempSeason.name="全部";
            //   styleSeason.data.data.unshift(tempSeason);
                 yield put({type:'publicDate',
                     payload:{
                       modalseason:styleSeason.data.data
                     }
                   });
           };
           if(styleBrand.data.code=="0"){
            // console.log(styleBrand);
              //  let tempBrand={};
              // tempBrand.code="undefined";
              // tempBrand.name="全部";
              // styleBrand.data.data.unshift(tempBrand);
                 yield put({type:'publicDate',
                     payload:{
                       modalbrand:styleBrand.data.data
                     }
                   });
           };
           if(styleCategory.data.code=="0"){
            // console.log(styleCategory);
            //  let tempCategory={};
            //   tempCategory.code="undefined";
            //   tempCategory.name="全部";
            //   styleCategory.data.data.unshift(tempCategory);
                 yield put({type:'publicDate',
                     payload:{
                       modalcategory:styleCategory.data.data
                     }
                   });
           };
           // if(stylepc.data.code=="0"){
           //  console.log(stylepc);

           //       yield put({type:'publicDate',
           //           payload:{
           //             auditdetaildata:data.data
           //           }
           //         });
           // };
       },
       *getstyle({ payload }, { call, put,select }){
        //根据条件获取款号,新增页面穿梭匡数据获取
          const newData = yield select(({ price }) => price.newData);
        let strarr=JSON.stringify(payload);
        const {data}= yield call(queryTagPriceConfigStyle,{jsonParam:strarr});
          if(data.code==0){
            //复制原数组；
                const temparr=data.data.concat();
                const temparr1=data.data.concat();
                //依次为数据源添加key
                for(let i=0;i<data.data.length;i++){
                  temparr[i].key=i+1;
                }
                //从页面中存在的数据源中取出已存在的数据
                if(newData.dataList){
                  for(let index_i in temparr){
                    for(let index_j in newData.dataList){
                      if(temparr[index_i].code==newData.dataList[index_j].styleNo){
                        // console.error(temparr[index_i].code);
                        temparr.splice(index_i,1);
                      }
                    }
                  }
                }

                 console.log('temparr:',temparr,temparr1);
                 yield put({type:'publicDate',
                     payload:{
                       modalstyle:temparr,
                       copymodalstyle:temparr1
                     }
                   });
          }
       },
       *getstyleEdit({ payload }, { call, put,select }){
        //根据条件获取款号,新增页面穿梭匡数据获取
          const detaildatasource = yield select(({ price }) => price.detaildatasource);
        let strarr=JSON.stringify(payload);
        const {data}= yield call(queryTagPriceConfigStyle,{jsonParam:strarr});
          if(data.code==0){
            //复制原数组；
                const temparr=data.data.concat();
                const temparr1=data.data.concat();
                //依次为数据源添加key
                for(let i=0;i<data.data.length;i++){
                  temparr[i].key=i+1;
                }
                //从页面中存在的数据源中取出已存在的数据
                if(detaildatasource.dataList){
                  for(let index_i in temparr){
                    for(let index_j in detaildatasource.dataList){
                      if(temparr[index_i].code==detaildatasource.dataList[index_j].styleNo){
                        // console.error(temparr[index_i].code);
                        temparr.splice(index_i,1);
                      }
                    }
                  }
                }

                 console.log('temparr:',temparr,temparr1);
                 yield put({type:'publicDate',
                     payload:{
                       modalstyle:temparr,
                       copymodalstyle:temparr1
                     }
                   });
          }
       },
       *queryPrice({ payload }, { call, put,select }){
         let tempqueryprice={};
         tempqueryprice.styleNo=payload;
         let strarr=JSON.stringify(tempqueryprice);
         const {data}= yield call(queryTagPriceConfigSetPrice,{jsonParam:strarr});
         if(data.code==0){
            console.log(data);
            //这里对取到的数据做处理。

         }else{
           Modal.error({
                title: '提示',
                content: data.msg,
              });
         }


       },
       *tempsave({ payload }, { call, put,select }){
        //新增页面暂存
        let strarr=JSON.stringify(payload);
        const {data}= yield call(saveTagPriceConfig,{jsonParam:strarr});
          if(data.code==0){
             yield put({type:'publicDate',
                         payload:{
                           commitdone:true,
                           addeditloading:false,
                           confirmLoading:false
                         }
                       });

                       //清空所有的搜索条件
                        yield put({
                         type:'publicDate',
                         payload:{
                           loading:true,
                           styleCode:'',
                           start:undefined,
                           end:undefined,
                           state:'',
                           current:1,
                           defaultPageSize:10
                         }
                       });
                       //新增成功后需要重新请求数据
                        yield put({
                         type:'enter'
                       });

          }else{

             yield put({type:'publicDate',
                         payload:{
                           addeditloading:false,
                           confirmLoading:false
                         }
                       });
            Modal.error({
                 title: '提示',
                 content: data.msg,
               });
          }

       },
       *audittempsave({ payload }, { call, put,select }){
        //修改页面暂存
        let strarr=JSON.stringify(payload);
        console.log(payload);
        const {data}= yield call(updateSaveTagPriceConfig,{jsonParam:strarr});
          if(data.code==0){
            yield put({type:'publicDate',
                         payload:{
                           commitdone:true,
                           loading:true
                         }
                       });

                       yield put({type:'querypage'});

          }else{
            yield put({type:'publicDate',
                         payload:{
                           addeditloading:false
                         }
                       });
             Modal.error({
                 title: '提示',
                 content: data.msg,
               });
          }

       },
       *commitsave({ payload }, { call, put,select }){
        //新增页面提交审核
        let strarr=JSON.stringify(payload);
         // console.log('payload:',strarr);
        const {data}= yield call(toAuditTagPriceConfig,{jsonParam:strarr});
          if(data.code==0){
            //复制原数组；

                  yield put({type:'publicDate',
                         payload:{
                           commitdone:true,
                           commitvis:false,
                           addeditloading:false,
                           confirmLoading:false
                         }
                       });
                       //清空所有的搜索条件
                        yield put({
                         type:'publicDate',
                         payload:{
                           loading:true,
                           styleCode:'',
                           start:undefined,
                           end:undefined,
                           state:'',
                           current:1,
                           defaultPageSize:10
                         }
                       });
                       //新增成功后需要重新请求数据
                        yield put({
                         type:'enter'
                       });

          }else if(data.code==1){
            yield put({type:'publicDate',
                         payload:{
                           confirmLoading:false
                         }
                       });
              Modal.error({
                 title: '提示',
                 content: `下列款号重复：${data.msg}`,
               });
          }else{
            yield put({type:'publicDate',
                         payload:{
                           confirmLoading:false
                         }
                       });
             Modal.error({
                 title: '提示',
                 content: data.msg,
               });
          }
       },
       *updatecommitsave({ payload }, { call, put}){
        //修改页面提交审核
        let strarr=JSON.stringify(payload);
         console.log('payload:',payload);
        const {data}= yield call(updateAuditTagPriceConfig,{jsonParam:strarr});
          if(data.code==0){
            //复制原数组；

                  yield put({type:'publicDate',
                         payload:{
                           commitdone:true,
                           commitvis:false,
                           confirmLoading:false
                         }
                       });
                       //修改成功的话，按条件继续查询一次
                        yield put({type:'querypage'});

          }else if(data.code==1){
            yield put({type:'publicDate',
                   payload:{
                     confirmLoading:false
                   }
                 });
              Modal.error({
                 title: '提示',
                 content: `下列款号重复${data.msg}`,
               });
          }else{
            yield put({type:'publicDate',
                   payload:{
                     confirmLoading:false
                   }
                 });
             Modal.error({
                 title: '提示',
                 content: data.msg,
               });
          }
       },
       *geteditdata({ payload }, { call, put,select }){
        //获得弹框中的select组件的下拉选项数据
        let newId={};
        newId.Id=payload;
        let strarr=JSON.stringify(newId);
        //获取页面的详情数据
         const {data}= yield call(queryTagPriceConfigInfo,{jsonParam:strarr});
         const styleno= yield call(queryTagPriceConfigStyle);//获取所有的款号
         const styleYear= yield call(queryTagPriceConfigStyleYear);
         const styleSeason= yield call(queryTagPriceConfigStyleSeason);
         const styleBrand= yield call(queryTagPriceConfigStyleBrand);
         const styleCategory= yield call(queryTagPriceConfigStyleCategory);
         //在这里对获取到的详情数据做处理
         if(data.code=="0"){

                data.tagPriceConfig.createDate=data.tagPriceConfig.createDate.split(" ")[0];
                if(data.tagPriceConfig.dataList){
                    for(let i=0;i<data.tagPriceConfig.dataList.length;i++){
                    data.tagPriceConfig.dataList[i].num=i+1;
                    data.tagPriceConfig.dataList[i].key=i+1;
                    //给已经存在的数据加上标记
                data.tagPriceConfig.dataList[i].priceFlag=`configTagprice${i+1}`;
                data.tagPriceConfig.dataList[i].remarkFlag=`remarks${i+1}`;
                let num=parseFloat(data.tagPriceConfig.dataList[i].configTagprice).toFixed(3);
                let numvalue=num.substring(0,num.lastIndexOf('.')+3);
                data.tagPriceConfig.dataList[i].configTagprice=numvalue;

                  }
                }else{
                  data.tagPriceConfig.dataList=[];
                }
// console.log(typeof(data.tagPriceConfig.dataList[1].configTagprice));
              //将获取到的数据给详情页面的表格
                  yield put({type:'publicDate',
                      payload:{
                        detaildatasource:data.tagPriceConfig,
                        pending_spin:false,
                        addeditloading:false
                      }
                    });
            };

          if(styleno.data.code=="0"){
           console.log(styleno.data);
            //复制原数组；
               const temparr=styleno.data.data.concat();
               const temparr1=styleno.data.data.concat();

               for(let i=0;i<styleno.data.data.length;i++){
                 temparr[i].key=i;
               }
              //  console.log('temparr:',temparr,temparr1);
                yield put({type:'publicDate',
                    payload:{
                      modalstyle:temparr,
                      copymodalstyle:temparr1
                    }
                  });
          };
          if(data.code==0&&styleno.data.code==0){
            //如果款号数据和页面详情数据都下来了
            console.log("数据都下来了！");
            let dataList=data.tagPriceConfig.dataList;//详情页面列表数据
            let styleList=styleno.data.data.concat();//款号数据
            console.log('数据都下来了：',dataList,styleList);
            if(data.tagPriceConfig && data.tagPriceConfig.dataList){
              console.log("this cycle");
              for(let i in dataList){
                for(let j in styleList){
                  if(dataList[i].styleNo==styleList[j].code){
                    //在这里将请求下来的数据款号从穿梭框中去掉
                    styleList.splice(j,1);
                    yield put({type:'publicDate',
                        payload:{
                          modalstyle:styleList
                        }
                      });

                  }
                }
              }
            }


          }
          if(styleYear.data.code=="0"){
           // console.log(styleYear);
             let tempyear={};
             tempyear.code="undefined";
             tempyear.name="全部";
             styleYear.data.data.unshift(tempyear);
                yield put({type:'publicDate',
                    payload:{
                      modalyear:styleYear.data.data
                    }
                  });
          };
          if(styleSeason.data.code=="0"){
           // console.log(styleSeason);
            let tempSeason={};
             tempSeason.code="undefined";
             tempSeason.name="全部";
             styleSeason.data.data.unshift(tempSeason);
                yield put({type:'publicDate',
                    payload:{
                      modalseason:styleSeason.data.data
                    }
                  });
          };
          if(styleBrand.data.code=="0"){
           // console.log(styleBrand);
              let tempBrand={};
             tempBrand.code="undefined";
             tempBrand.name="全部";
             styleBrand.data.data.unshift(tempBrand);
                yield put({type:'publicDate',
                    payload:{
                      modalbrand:styleBrand.data.data
                    }
                  });
          };
          if(styleCategory.data.code=="0"){
           // console.log(styleCategory);
            let tempCategory={};
             tempCategory.code="undefined";
             tempCategory.name="全部";
             styleCategory.data.data.unshift(tempCategory);
                yield put({type:'publicDate',
                    payload:{
                      modalcategory:styleCategory.data.data
                    }
                  });
          };

      },
      *setAudit({payload},{put,call,select}){
        console.log('payload',payload);
        let strarr=JSON.stringify(payload);
        //获取页面的详情数据
         const {data}= yield call(auditTagPriceConfig,{jsonParam:strarr});
         if(data.code==0){
           yield put({
             type:'publicDate',
             payload:{
               pending_visible:true,
               pending_spin:false
             }

           });
         }else{
           Modal.error({
               title: '提示',
               content: data.msg,
             });
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
          let auditstate=true;
          let setstate=true;
         history.listen(location => {
        if (location.pathname === '/audit') {
          if(auditstate){
            dispatch({
            type: 'publicDate',
            payload:{
               loading:true,
            }
          });
            //当页面第一次进入的时候，去请求数据初始化
            dispatch({type: 'enter'});
            auditstate=false;
          }

           dispatch({
            type: 'publicDate',
            payload:{
               newData:{},
            }
          });

           }else if(location.pathname === '/set'){

            if(setstate){


              dispatch({
            type: 'publicDate',
            payload:{
               loading:true,
            }
          });
              dispatch({type: 'enterset'});
              setstate=false;
            }
            dispatch({
            type: 'publicDate',
            payload:{
               // styleCode:undefined,
               // start:undefined,
               // end:undefined,
               // state:undefined,
               // loading:true,
               // current:1,
              defaultPageSize:10
            }
          });


           }else{
            let str=location.pathname;
            let strs = str.split("/");
            strs.shift();
            if(strs[1]==='auditpricedetails'||strs[1]==='setpricedetails'||strs[1]==='pending'){
              //如果是查看页面，取得要查询的id,通过id来请求数据

               dispatch({
                    type: 'publicDate',
                    payload:{
                      pending_spin:true
                    }
                  });
                dispatch({
                type:'details',
                payload:strs[2]
              });

            }else if(strs[1]==='Edit'){
              //修改页面需要去请求数据，和详情页面请求的数据一样
              dispatch({
                   type: 'publicDate',
                   payload:{
                     addeditloading:true
                   }
                 });
              //款号和详情合并在一个文件function里面
                if(strs[2]){
                   dispatch({
                      type:'geteditdata',
                      payload:strs[2]
                    });
                }

            }else if(strs[1]==='Add'){

               dispatch({
                    type: 'publicDate',
                    payload:{
                      chosestylemodal:true,
                      newData:{
                        dataList:[]
                      }
                    }
                  });


               //首先请求款号列表
               dispatch({
                  type:'getselectdata'
                });

            }

           }
         });
       }
     }

};
