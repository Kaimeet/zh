var $window = $(window);
$window.resize(function() {
    resizeWindow();
});

var maxIds1 = 0;
var maxIds2 = 0;
var maxIds3 = 0;
var maxIds4 = 0;
var maxIds5 = 0;
$(function() {
    resizeWindow();
    /*门扇*/
    $('#reportTable1').bootstrapTable({
        url:"../ProcessController/getDataDoors?type="+0+"&menuid="+$("#menuid").val()+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 1000,//每页的记录行数（*）
        pageList: [1000, 2000, 3000],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        uniqueId:"id",
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"quoteDetailCode",
                visible: false
            },{
                field:"quotationDetailNumber",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },
            {
            field:"typeCode",title:"产品大类",align:"center",valign:"middle",
            formatter : function(value, row, index) {
                    var bomTypeOneMSHtml = $("#bomTypeOneMSHtml").val();
                    if(value!=null && value!=undefined  && value!=""){
                        bomTypeOneMSHtml = bomTypeOneMSHtml.replace(value+"\"",value+"\" selected ");
                    }
                    value = bomTypeOneMSHtml;
                    var reg = RegExp(/【index】/);
                    while(value.match(reg)){
                        value = value.replace("【index】",index);
                    }
                    return value;
               }
            } ,
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",
                 formatter : function(value, row, index) {
                       return '<input id="msbomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',1)"  maxlength="50" style="background-color:#fff" />';
                 }
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var str  ='<div class="input-group">'+
                        '<input id="mscolor'+index+'" disabled class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',1)" value="'+value+'" maxlength="64" style="background-color:#fff" />'+
                        '<span class="input-group-addon"  id="choose" onclick="chooseColor('+index+',1)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                        '</div>';
                    return str;
                }
                /*formatter : function(value, row, index) {
                    return '<input id="xtcolor'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',1)" maxlength="11" style="background-color:#fff" />';
                }*/
            },
             {
                 field:"paint",title:"油漆",align:"center",valign:"middle",
                 formatter : function(value, row, index) {
                     return '<input id="mspaint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                 }
             },
            {
                field:"quoteLong",title:"门扇长(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="msquoteLong'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteWidth",title:"门扇宽(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="msquoteWidth'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteThick",title:"门扇厚(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="msquoteThick'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',1)" maxlength="11" style="background-color:#fff" />';
                }
            },
          {
                field:"unit",title:"单位",align:"center",valign:"middle" ,
                formatter : function(value, row, index) {
                    // return '<input id="msunit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                    var str ='<select  id="msunit'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'unit\','+index+',1)">'+
                    '<option value="">---请选择---</option>'+
                    '<option value="扇" ';
                    if(value=="扇"){
                        str+=' selected="selected" ';
                    }
                    str+='>扇</option>';
                    str+='<option value="套" ';
                    if(value=="套"){
                        str+=' selected="selected" ';
                    }
                    str+='>套</option>';
                    str+='<option value="支" ';
                    if(value=="支"){
                        str+=' selected="selected" ';
                    }
                    str+='>支</option>';
                    str+='<option value="块" ';
                    if(value=="块"){
                        str+=' selected="selected" ';
                    }
                    str+='>块</option>';
                    str+='<option value="PCS" ';
                    if(value=="PCS"){
                        str+=' selected="selected" ';
                    }
                    str+='>PCS</option>';
                    str+='</select>';
                    return str;
                }
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle",
                formatter : function(value, row, index) {
//                    return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',1)"  maxlength="128" style="background-color:#fff" />';
                    return '<textarea class="letter" style="background-color:#fff" id="msmemo'+index+'" rows="3" onblur="changeReason(\'memo\','+index+',1)" maxlength="128" style="overflow:hidden">'+value+'</textarea>'
                }
            },
              {
                field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                  formatter : function(value, row, index) {
                       var str ='<span id="msfilename'+index+'" >';
                       if(value!=null && value!=""){
                           var stringArr = value.split(";");
                           for (i = 0; i < stringArr.length; i++) {
                                var stringArrOne = stringArr[i].split(":");
                                str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                           }
                       }
                       str+='</span>';
                      return str
                  }
            },{
                  field:"fileId",
                  visible: false
              },
             {
                 field:"doit",title:"操作",align:"center",valign:"middle",
                 formatter : function(value, row, index) {
                     if($("#uploadFileMethod").val() ==null || $("#uploadFileMethod").val() ==""  || $("#uploadFileMethod").val() ==undefined || $("#uploadFileMethod").val() !=null && $("#uploadFileMethod").val()!="" && $("#uploadFileMethod").val() == 0 ){
                         return '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod"  onclick="uploadFile(\''+row.id+'\','+index+',1)"">上传相关附件</button>';
                     }else{
                         return '-';
                     }
                 }
             }
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }

    /*门套*/
    $('#reportTable2').bootstrapTable({//quoteDetailCode
        url:"../ProcessController/getDataDoors?type="+1+"&menuid="+$("#menuid").val()+"&processCode="+$("#processCode").val(),
         method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 1000,//每页的记录行数（*）
        pageList: [1000, 2000, 3000],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams2,//请求远程数据时，可以通过修改queryParams发送其他参数。
        uniqueId:"id",
        columns: [
                     {
                         field:"checkFlag",
                         checkbox: true
                     },
                     {
                         field:"id",
                         visible: false
                     },
                    {
                      field:"quoteDetailCode",
                      visible: false
                    },{
                        field:"quotationDetailNumber",
                        visible: false
                    },
                     {
                         field:"rowIndex",
                         title:"序号",
                         width : '45px',
                         align : 'center',
                         formatter : function(value, row, index) {
                             return index + 1;
                         }
                     },
                     {
                     field:"typeCode",title:"产品大类",align:"center",valign:"middle",
                     formatter : function(value, row, index) {
                             var bomTypeOneMTHtml = $("#bomTypeOneMTHtml").val();
                             if(value!=null && value!=undefined  && value!=""){
                                 bomTypeOneMTHtml = bomTypeOneMTHtml.replace(value+"\"",value+"\" selected ");
                             }
                             value = bomTypeOneMTHtml;
                             var reg = RegExp(/【index】/);
                             while(value.match(reg)){
                                 value = value.replace("【index】",index);
                             }
                             return value;
                        }
                     } ,
                     {
                         field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",
                          formatter : function(value, row, index) {
                                return '<input id="mtbomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',2)"  maxlength="50" style="background-color:#fff" />';
                          }
                     },
                     {
                         field:"color",title:"颜色",align:"center",valign:"middle",
                         formatter : function(value, row, index) {
                             var str  ='<div class="input-group">'+
                                 '<input id="mtcolor'+index+'" disabled class="form-control parsley-validated" value="'+value+'" onblur="changeReason(\'color\','+index+',2)" maxlength="64" style="background-color:#fff" />'+
                                 '<span class="input-group-addon"  id="choose" onclick="chooseColor('+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                                 '</div>';
                             return str;
                         }
                         /*formatter : function(value, row, index) {
                             return '<input id="mtcolor'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',2)" maxlength="11" style="background-color:#fff" />';
                         }*/
                     },
                      {
                          field:"paint",title:"油漆",align:"center",valign:"middle",
                          formatter : function(value, row, index) {
                              return '<input id="mtpaint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',2)"  maxlength="11" style="background-color:#fff" />';
                          }
                      },
                     {
                         field:"quoteLong",title:"门套长(mm)",align:"center",valign:"middle",
                         formatter : function(value, row, index) {
                             return '<input id="mtquoteLong'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',2)"  maxlength="11" style="background-color:#fff" />';
                         }
                     },
                     {
                         field:"quoteWidth",title:"门套宽(mm)",align:"center",valign:"middle",
                         formatter : function(value, row, index) {
                             return '<input id="mtquoteWidth'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',2)"  maxlength="11" style="background-color:#fff" />';
                         }
                     },
                     {
                         field:"quoteThick",title:"门套厚(mm)",align:"center",valign:"middle",
                         formatter : function(value, row, index) {
                             return '<input id="mtquoteThick'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',2)" maxlength="11" style="background-color:#fff" />';
                         }
                     },
                    {
                        field:"wallThickness",title:"墙体厚度(mm)",align:"center",valign:"middle",
                        formatter : function(value, row, index) {
                            return '<input id="mtwallThickness'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'wallThickness\','+index+',2)" maxlength="11" style="background-color:#fff" />';
                        }
                    },
                     {
                         field:"unit",title:"单位",align:"center",valign:"middle" ,
                         formatter : function(value, row, index) {
                             // return '<input id="mtunit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',2)"  maxlength="11" style="background-color:#fff" />';
                             var str ='<select  id="mtunit'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'unit\','+index+',2)">'+
                                 '<option value="">---请选择---</option>'+
                                 '<option value="扇" ';
                             if(value=="扇"){
                                 str+=' selected="selected" ';
                             }
                             str+='>扇</option>';
                             str+='<option value="套" ';
                             if(value=="套"){
                                 str+=' selected="selected" ';
                             }
                             str+='>套</option>';
                             str+='<option value="支" ';
                             if(value=="支"){
                                 str+=' selected="selected" ';
                             }
                             str+='>支</option>';
                             str+='<option value="块" ';
                             if(value=="块"){
                                 str+=' selected="selected" ';
                             }
                             str+='>块</option>';
                             str+='<option value="PCS" ';
                             if(value=="PCS"){
                                 str+=' selected="selected" ';
                             }
                             str+='>PCS</option>';
                             str+='</select>';
                             return str;
                         }
                     },
                     {
                         field:"memo",title:"生产单备注",align:"center",valign:"middle",
                         formatter : function(value, row, index) {
//                             return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',2)"  maxlength="11" style="background-color:#fff" />';
                            return '<textarea class="letter" style="background-color:#fff" id="mtmemo'+index+'" rows="3" onblur="changeReason(\'memo\','+index+',2)" maxlength="128" style="overflow:hidden">'+value+'</textarea>'
                         }
                     },
                     {
                         field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                         formatter : function(value, row, index) {
                              var str ='<span id="mtfilename'+index+'" >';
                              if(value!=null && value!=""){
                                  var stringArr = value.split(";");
                                  for (i = 0; i < stringArr.length; i++) {
                                       var stringArrOne = stringArr[i].split(":");
                                       str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                                  }
                              }
                              str+='</span>';
                             return str
                         }
                       },{
                           field:"fileId",
                           visible: false
                       },
                      {
                          field:"doit",title:"操作",align:"center",valign:"middle",
                          formatter : function(value, row, index) {
                              if($("#uploadFileMethod").val() ==null || $("#uploadFileMethod").val() ==""  || $("#uploadFileMethod").val() ==undefined || $("#uploadFileMethod").val() !=null && $("#uploadFileMethod").val()!="" && $("#uploadFileMethod").val() == 0 ){
                                  return '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod"  onclick="uploadFile(\''+row.id+'\','+index+',2)"">上传相关附件</button>';
                              }else{
                                  return '-';
                              }
                          }
                      }
                 ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams2(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }


    /*线条*/
    $('#reportTable3').bootstrapTable({
        url:"../ProcessController/getDataDoors?type="+2+"&menuid="+$("#menuid").val()+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 1000,//每页的记录行数（*）
        pageList: [1000, 2000, 3000],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams3,//请求远程数据时，可以通过修改queryParams发送其他参数。
        uniqueId:"id",
        columns: [
                  {
                      field:"checkFlag",
                      checkbox: true
                  },
                  {
                      field:"id",
                      visible: false
                  },{
                     field:"quoteDetailCode",
                     visible: false
                   },{
                        field:"quotationDetailNumber",
                        visible: false
                    } ,
                  {
                      field:"rowIndex",
                      title:"序号",
                      width : '45px',
                      align : 'center',
                      formatter : function(value, row, index) {
                          return index + 1;
                      }
                  },
                  {
                  field:"typeCode",title:"产品大类",align:"center",valign:"middle",
                  formatter : function(value, row, index) {
                          var bomTypeOneXTHtml = $("#bomTypeOneXTHtml").val();
                          if(value!=null && value!=undefined  && value!=""){
                              bomTypeOneXTHtml = bomTypeOneXTHtml.replace(value+"\"",value+"\" selected ");
                          }
                          value = bomTypeOneXTHtml;
                          var reg = RegExp(/【index】/);
                          while(value.match(reg)){
                              value = value.replace("【index】",index);
                          }
                          return value;
                     }
                  },
                  {
                      field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",
                       formatter : function(value, row, index) {
                             return '<input id="xtbomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',3)"  maxlength="50" style="background-color:#fff" />';
                       }
                  },
                  {
                      field:"color",title:"颜色",align:"center",valign:"middle",
                      formatter : function(value, row, index) {
                          var str  ='<div class="input-group">'+
                                  '<input id="xtcolor'+index+'" disabled class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',3)" value="'+value+'" maxlength="64" style="background-color:#fff" />'+
                                  '<span class="input-group-addon"  id="choose" onclick="chooseColor('+index+',3)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                                  '</div>';
                          return str;
                      }
                      /*formatter : function(value, row, index) {
                          return '<input id="xtcolor'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',3)" maxlength="11" style="background-color:#fff" />';
                      }*/
                  },
                   {
                       field:"paint",title:"油漆",align:"center",valign:"middle",
                       formatter : function(value, row, index) {
                           return '<input id="xtpaint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',3)"  maxlength="11" style="background-color:#fff" />';
                       }
                   },
                  {
                      field:"quoteLong",title:"线条长(mm)",align:"center",valign:"middle",
                      formatter : function(value, row, index) {
                          return '<input id="xtquoteLong'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',3)"  maxlength="11" style="background-color:#fff" />';
                      }
                  },
                  {
                      field:"quoteWidth",title:"线条宽(mm)",align:"center",valign:"middle",
                      formatter : function(value, row, index) {
                          return '<input id="xtquoteWidth'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',3)"  maxlength="11" style="background-color:#fff" />';
                      }
                  },
                  {
                      field:"quoteThick",title:"线条厚(mm)",align:"center",valign:"middle",
                      formatter : function(value, row, index) {
                          return '<input id="xtquoteThick'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',3)" maxlength="11" style="background-color:#fff" />';
                      }
                  },
                    {
                        field:"socketLength",title:"插口长度(mm)",align:"center",valign:"middle",
                        formatter : function(value, row, index) {
                            return '<input id="xtsocketLength'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'socketLength\','+index+',3)" maxlength="11" style="background-color:#fff" />';
                        }
                    },
                  {
                      field:"unit",title:"单位",align:"center",valign:"middle" ,
                      formatter : function(value, row, index) {
                          // return '<input id="xtunit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',3)"  maxlength="11" style="background-color:#fff" />';
                          var str ='<select  id="xtunit'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'unit\','+index+',3)">'+
                              '<option value="">---请选择---</option>'+
                              '<option value="扇" ';
                          if(value=="扇"){
                              str+=' selected="selected" ';
                          }
                          str+='>扇</option>';
                          str+='<option value="套" ';
                          if(value=="套"){
                              str+=' selected="selected" ';
                          }
                          str+='>套</option>';
                          str+='<option value="支" ';
                          if(value=="支"){
                              str+=' selected="selected" ';
                          }
                          str+='>支</option>';
                          str+='<option value="块" ';
                          if(value=="块"){
                              str+=' selected="selected" ';
                          }
                          str+='>块</option>';
                          str+='<option value="PCS" ';
                          if(value=="PCS"){
                              str+=' selected="selected" ';
                          }
                          str+='>PCS</option>';
                          str+='</select>';
                          return str;
                      }
                  },
                  {
                      field:"memo",title:"生产单备注",align:"center",valign:"middle",
                      formatter : function(value, row, index) {
//                              return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',3)"  maxlength="11" style="background-color:#fff" />';
                        return '<textarea class="letter" style="background-color:#fff" id="xtmemo'+index+'" rows="3" onblur="changeReason(\'memo\','+index+',3)" maxlength="128" style="overflow:hidden">'+value+'</textarea>'
                      }
                  },
                   {
                      field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                      formatter : function(value, row, index) {
                           var str ='<span id="xtfilename'+index+'" >';
                           if(value!=null && value!=""){
                               var stringArr = value.split(";");
                               for (i = 0; i < stringArr.length; i++) {
                                    var stringArrOne = stringArr[i].split(":");
                                    str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                               }
                           }
                           str+='</span>';
                          return str
                      }
                  },{
                      field:"fileId",
                      visible: false
                  },
                  {
                     field:"doit",title:"操作",align:"center",valign:"middle",
                     formatter : function(value, row, index) {
                         if($("#uploadFileMethod").val() ==null || $("#uploadFileMethod").val() ==""  || $("#uploadFileMethod").val() ==undefined || $("#uploadFileMethod").val() !=null && $("#uploadFileMethod").val()!="" && $("#uploadFileMethod").val() == 0  ){
                             return '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod"  onclick="uploadFile(\''+row.id+'\','+index+',3)"">上传相关附件</button>';
                         }else{
                             return '-';
                         }
                     }
                  }
              ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams3(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }


    /*副套*/
    $('#reportTable4').bootstrapTable({
        url:"../ProcessController/getDataDoors?type="+3+"&menuid="+$("#menuid").val()+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 1000,//每页的记录行数（*）
        pageList: [1000, 2000, 3000],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams4,//请求远程数据时，可以通过修改queryParams发送其他参数。
        uniqueId:"id",
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"quoteDetailCode",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },{
                field:"quotationDetailNumber",
                visible: false
            },
            {
                field:"typeCode",title:"产品大类",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var bomTypeOneFTHtml = $("#bomTypeOneFTHtml").val();
                    if(value!=null && value!=undefined  && value!=""){
                        bomTypeOneFTHtml = bomTypeOneFTHtml.replace(value+"\"",value+"\" selected ");
                    }
                    value = bomTypeOneFTHtml;
                    var reg = RegExp(/【index】/);
                    while(value.match(reg)){
                        value = value.replace("【index】",index);
                    }
                    return value;
                }
            } ,
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="ftbomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',4)"  maxlength="50" style="background-color:#fff" />';
                }
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var str  ='<div class="input-group">'+
                        '<input id="ftcolor'+index+'" disabled class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',4)" value="'+value+'" maxlength="64" style="background-color:#fff" />'+
                        '<span class="input-group-addon"  id="choose" onclick="chooseColor('+index+',4)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                        '</div>';
                    return str;
                }
                /*formatter : function(value, row, index) {
                    return '<input id="ftcolor'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',4)" maxlength="11" style="background-color:#fff" />';
                }*/
            },
            {
                field:"paint",title:"油漆",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="ftpaint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',4)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteLong",title:"副套长(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="ftquoteLong'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',4)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteWidth",title:"副套宽(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="ftquoteWidth'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',4)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteThick",title:"副套厚(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="ftquoteThick'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',4)" maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"wallThickness",title:"墙体厚度(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="ftwallThickness'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'wallThickness\','+index+',4)" maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"unit",title:"单位",align:"center",valign:"middle" ,
                formatter : function(value, row, index) {
                    // return '<input id="ftunit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',4)"  maxlength="11" style="background-color:#fff" />';
                    var str ='<select  id="ftunit'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'unit\','+index+',4)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="扇" ';
                    if(value=="扇"){
                        str+=' selected="selected" ';
                    }
                    str+='>扇</option>';
                    str+='<option value="套" ';
                    if(value=="套"){
                        str+=' selected="selected" ';
                    }
                    str+='>套</option>';
                    str+='<option value="支" ';
                    if(value=="支"){
                        str+=' selected="selected" ';
                    }
                    str+='>支</option>';
                    str+='<option value="块" ';
                    if(value=="块"){
                        str+=' selected="selected" ';
                    }
                    str+='>块</option>';
                    str+='<option value="PCS" ';
                    if(value=="PCS"){
                        str+=' selected="selected" ';
                    }
                    str+='>PCS</option>';
                    str+='</select>';
                    return str;
                }
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle",
                formatter : function(value, row, index) {
//                             return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',2)"  maxlength="11" style="background-color:#fff" />';
                    return '<textarea class="letter" style="background-color:#fff" id="ftmemo'+index+'" rows="3" onblur="changeReason(\'memo\','+index+',4)" maxlength="128" style="overflow:hidden">'+value+'</textarea>'
                }
            },
            {
                field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var str ='<span id="ftfilename'+index+'" >';
                    if(value!=null && value!=""){
                        var stringArr = value.split(";");
                        for (i = 0; i < stringArr.length; i++) {
                            var stringArrOne = stringArr[i].split(":");
                            str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                        }
                    }
                    str+='</span>';
                    return str
                }
            },{
                field:"fileId",
                visible: false
            },
            {
                field:"doit",title:"操作",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    if($("#uploadFileMethod").val() ==null || $("#uploadFileMethod").val() ==""  || $("#uploadFileMethod").val() ==undefined || $("#uploadFileMethod").val() !=null && $("#uploadFileMethod").val()!="" && $("#uploadFileMethod").val() == 0 ){
                        return '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod"  onclick="uploadFile(\''+row.id+'\','+index+',4)"">上传相关附件</button>';
                    }else{
                        return '-';
                    }
                }
            }
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams4(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }

    /*其它*/
    $('#reportTable5').bootstrapTable({
        url:"../ProcessController/getDataDoors?type="+4+"&menuid="+$("#menuid").val()+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 1000,//每页的记录行数（*）
        pageList: [1000, 2000, 3000],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: true,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        queryParams: queryParams5,//请求远程数据时，可以通过修改queryParams发送其他参数。
        uniqueId:"id",
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },
            {
                field:"quoteDetailCode",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },{
                field:"quotationDetailNumber",
                visible: false
            },
            {
                field:"typeCode",title:"产品大类",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var bomTypeOneQTHtml = $("#bomTypeOneQTHtml").val();
                    if(value!=null && value!=undefined  && value!=""){
                        bomTypeOneQTHtml = bomTypeOneQTHtml.replace(value+"\"",value+"\" selected ");
                    }
                    value = bomTypeOneQTHtml;
                    var reg = RegExp(/【index】/);
                    while(value.match(reg)){
                        value = value.replace("【index】",index);
                    }
                    return value;
                }
            } ,
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="qtbomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',5)"  maxlength="50" style="background-color:#fff" />';
                }
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var str  ='<div class="input-group">'+
                        '<input id="qtcolor'+index+'" disabled class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',5)" value="'+value+'" maxlength="64" style="background-color:#fff" />'+
                        '<span class="input-group-addon"  id="choose" onclick="chooseColor('+index+',5)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                        '</div>';
                    return str;
                }
                /*formatter : function(value, row, index) {
                    return '<input id="qtcolor'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',5)" maxlength="11" style="background-color:#fff" />';
                }*/
            },
            {
                field:"paint",title:"油漆",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="qtpaint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',5)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteLong",title:"长(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="qtquoteLong'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',5)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="qtquoteWidth'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',5)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    return '<input id="qtquoteThick'+index+'" onkeyup="value=value.replace(/[^0-9]/g,\'\')" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',5)" maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"unit",title:"单位",align:"center",valign:"middle" ,
                formatter : function(value, row, index) {
                    // return '<input id="qtunit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',5)"  maxlength="11" style="background-color:#fff" />';
                    var str ='<select  id="qtunit'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'unit\','+index+',5)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="扇" ';
                    if(value=="扇"){
                        str+=' selected="selected" ';
                    }
                    str+='>扇</option>';
                    str+='<option value="套" ';
                    if(value=="套"){
                        str+=' selected="selected" ';
                    }
                    str+='>套</option>';
                    str+='<option value="支" ';
                    if(value=="支"){
                        str+=' selected="selected" ';
                    }
                    str+='>支</option>';
                    str+='<option value="块" ';
                    if(value=="块"){
                        str+=' selected="selected" ';
                    }
                    str+='>块</option>';
                    str+='<option value="PCS" ';
                    if(value=="PCS"){
                        str+=' selected="selected" ';
                    }
                    str+='>PCS</option>';
                    str+='</select>';
                    return str;
                }
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle",
                formatter : function(value, row, index) {
//                    return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',1)"  maxlength="128" style="background-color:#fff" />';
                    return '<textarea class="letter" style="background-color:#fff" id="qtmemo'+index+'" rows="3" onblur="changeReason(\'memo\','+index+',5)" maxlength="128" style="overflow:hidden">'+value+'</textarea>'
                }
            },
            {
                field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    var str ='<span id="qtfilename'+index+'" >';
                    if(value!=null && value!=""){
                        var stringArr = value.split(";");
                        for (i = 0; i < stringArr.length; i++) {
                            var stringArrOne = stringArr[i].split(":");
                            str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-length" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                        }
                    }
                    str+='</span>';
                    return str
                }
            },{
                field:"fileId",
                visible: false
            },
            {
                field:"doit",title:"操作",align:"center",valign:"middle",
                formatter : function(value, row, index) {
                    if($("#uploadFileMethod").val() ==null || $("#uploadFileMethod").val() ==""  || $("#uploadFileMethod").val() ==undefined || $("#uploadFileMethod").val() !=null && $("#uploadFileMethod").val()!="" && $("#uploadFileMethod").val() == 0 ){
                        return '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod"  onclick="uploadFile(\''+row.id+'\','+index+',5)"">上传相关附件</button>';
                    }else{
                        return '-';
                    }
                }
            }
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
    //服务端分页调用方法
    function queryParams5(params) {
        console.log(params);
        return {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
    }

});
//重新计算页面尺寸
function resizeWindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        $("#btndiv").css("top",n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height())-105);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }
}
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    laydate.render({
            elem: '#replyDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){
                var nowDate = new Date();
                if(  new Date(value).getTime() < nowDate.getTime()){
                    layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
                    $("#replyDate").val("");
                }
            }
        });
});
//切换tab
function changetabs(tabFlag){
    if(tabFlag==0){
        $("#tabFlag").val(tabFlag);
        $("#table1").removeClass("hidden");
        $("#table2").addClass("hidden");
        $("#table3").addClass("hidden");
        $("#table4").addClass("hidden");
        $("#table5").addClass("hidden");
    }else if(tabFlag==1){
        $("#tabFlag").val(tabFlag);
        $("#table1").addClass("hidden");
        $("#table2").removeClass("hidden");
        $("#table3").addClass("hidden");
        $("#table4").addClass("hidden");
        $("#table5").addClass("hidden");
    }else if(tabFlag==2){
        $("#tabFlag").val(tabFlag);
        $("#table1").addClass("hidden");
        $("#table2").addClass("hidden");
        $("#table3").removeClass("hidden");
        $("#table4").addClass("hidden");
        $("#table5").addClass("hidden");
    }else if(tabFlag==3){
        $("#tabFlag").val(tabFlag);
        $("#table1").addClass("hidden");
        $("#table2").addClass("hidden");
        $("#table3").addClass("hidden");
        $("#table4").removeClass("hidden");
        $("#table5").addClass("hidden");
    }else if(tabFlag==4){
        $("#tabFlag").val(tabFlag);
        $("#table1").addClass("hidden");
        $("#table2").addClass("hidden");
        $("#table3").addClass("hidden");
        $("#table4").addClass("hidden");
        $("#table5").removeClass("hidden");
    }
}
//onput事件触发update,单元格数据重新渲染
function changeReason(fieldName,indexNumber,flag){

    var value;
    if(flag==1){
        value = $("#ms"+fieldName+indexNumber).val();
        console.log("value = " + value);
        $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==2){
        value = $("#mt"+fieldName+indexNumber).val();
        $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==3){
       value = $("#xt"+fieldName+indexNumber).val();
       $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==4){
        value = $("#ft"+fieldName+indexNumber).val();
        $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==5){
        value = $("#qt"+fieldName+indexNumber).val();
        $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }
    if(projectSplitFlag==1){
        projectSplit();
    }
}
//列表新增一行数据
function addRow(tabFlag){
    var date = new Date();

   if(tabFlag==0){
        var count = $('#reportTable1').bootstrapTable('getData').length;
        $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{typeCode:"",bomStyle:"",color:"",paint:"",quoteLong:"",quoteWidth:"",quoteThick:"",unit:"",memo:"",id:maxIds1-1,fileNamesAndIds:""}});
        maxIds1 --;
   }else if(tabFlag==1){
        var count = $('#reportTable2').bootstrapTable('getData').length;
        $('#reportTable2').bootstrapTable('insertRow',{index:count,row:{typeCode:"",bomStyle:"",color:"",paint:"",quoteLong:"",quoteWidth:"",quoteThick:"",unit:"",memo:"",id:maxIds2-1,fileNamesAndIds:"",wallThickness:""}});
        maxIds2 --;
   }else if(tabFlag==2){
        var count = $('#reportTable3').bootstrapTable('getData').length;
        $('#reportTable3').bootstrapTable('insertRow',{index:count,row:{typeCode:"",bomStyle:"",color:"",paint:"",quoteLong:"",quoteWidth:"",quoteThick:"",unit:"",memo:"",id:maxIds3-1,fileNamesAndIds:"",socketLength:""}});
        maxIds3 --;
   }else if(tabFlag==3){
       var count = $('#reportTable4').bootstrapTable('getData').length;
       $('#reportTable4').bootstrapTable('insertRow',{index:count,row:{typeCode:"",bomStyle:"",color:"",paint:"",quoteLong:"",quoteWidth:"",quoteThick:"",unit:"",memo:"",id:maxIds4-1,fileNamesAndIds:"",wallThickness:""}});
       maxIds4 --;
   }else if(tabFlag==4){
       var count = $('#reportTable5').bootstrapTable('getData').length;
       $('#reportTable5').bootstrapTable('insertRow',{index:count,row:{typeCode:"",bomStyle:"",color:"",paint:"",quoteLong:"",quoteWidth:"",quoteThick:"",unit:"",memo:"",id:maxIds5-1,fileNamesAndIds:""}});
       maxIds5 --;
   }
    if(projectSplitFlag==1){
        projectSplit();
    }
    var time = new Date().getTime() - date.getTime();

 }
 var delArraysMS = new Array();// 声明一个数组，存放要删除的门扇
 var delArraysMT = new Array();// 声明一个数组，存放要删除的门套
 var delArraysXT = new Array();// 声明一个数组，存放要删除的线条
 var delArraysFT = new Array();// 声明一个数组，存放要删除的线条
 var delArraysQT = new Array();// 声明一个数组，存放要删除的线条
//列表删除操作
function delRow(tabFlag){
    if(tabFlag==0){
        var rows = $("#reportTable1").bootstrapTable('getSelections');
    }else if(tabFlag==1){
       var rows = $("#reportTable2").bootstrapTable('getSelections');
    }else if(tabFlag==2){
       var rows = $("#reportTable3").bootstrapTable('getSelections');
    }else if(tabFlag==3){
        var rows = $("#reportTable4").bootstrapTable('getSelections');
    }else if(tabFlag==4){
        var rows = $("#reportTable5").bootstrapTable('getSelections');
    }
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("请先选择要删除的记录!", {icon:5, anim:6, time: 3000});
        return;
    } else {
        $(rows).each(function () {// 通过获得别选中的来进行遍历
            if(tabFlag==0){
                if(this.id>0){
                    delArraysMS.push(this.id);
                }
                $("#reportTable1").bootstrapTable('removeByUniqueId',this.id);
            }else if(tabFlag==1){
                if(this.id>0){
                    delArraysMT.push(this.id);
                }
               $("#reportTable2").bootstrapTable('removeByUniqueId',this.id);
            }else if(tabFlag==2){
                if(this.id>0){
                    delArraysXT.push(this.id);
                }
               $("#reportTable3").bootstrapTable('removeByUniqueId',this.id);
            }else if(tabFlag==3){
                if(this.id>0){
                    delArraysFT.push(this.id);
                }
                $("#reportTable4").bootstrapTable('removeByUniqueId',this.id);
            }else if(tabFlag==4){
                if(this.id>0){
                    delArraysQT.push(this.id);
                }
                $("#reportTable5").bootstrapTable('removeByUniqueId',this.id);
            }
        });
     }
    if(projectSplitFlag==1){
        projectSplit();
    }
}


//数据拷贝
function copy(tabFlag){
    var rows;
    if(tabFlag==0){
        rows = $("#reportTable1").bootstrapTable('getSelections');
    }else if(tabFlag==1){
        rows = $("#reportTable2").bootstrapTable('getSelections');
    }else if(tabFlag==2){
        rows = $("#reportTable3").bootstrapTable('getSelections');
    }else if(tabFlag==3){
        rows = $("#reportTable4").bootstrapTable('getSelections');
    }else if(tabFlag==4){
        rows = $("#reportTable5").bootstrapTable('getSelections');
    }
    if (rows.length > 1 || rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("有且只能选择一条被拷贝的数据!", {icon:5, anim:6, time: 3000});
        return;
    } else {
         $(rows).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
            var addCount = 0;
            if(tabFlag==0){
                addCount = parseInt($("#countInput1").val());
                if(addCount == 0){
                    layer.msg("请输入要拷贝多少行数据。", {icon:5, anim:6, time: 3000});
                    return;
                }
                for (var i = 0; i < addCount; i++) {
                    var count = $('#reportTable1').bootstrapTable('getData').length;
                    $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{typeCode:this.typeCode,bomStyle:this.bomStyle,color:this.color,paint:this.paint,quoteLong:this.quoteLong,quoteWidth:this.quoteWidth,quoteThick:this.quoteThick,unit:this.unit,memo:this.memo,id:maxIds1-1,filename2:this.filename2}});
                    maxIds1 --;
                }
            }else if(tabFlag==1){
                addCount = parseInt($("#countInput2").val());
                if(addCount == 0){
                    layer.msg("请输入要拷贝多少行数据。", {icon:5, anim:6, time: 3000});
                    return;
                }
                for (var i = 0; i < addCount; i++) {
                    var count = $('#reportTable2').bootstrapTable('getData').length;
                    $('#reportTable2').bootstrapTable('insertRow',{index:count,row:{typeCode:this.typeCode,bomStyle:this.bomStyle,color:this.color,paint:this.paint,quoteLong:this.quoteLong,quoteWidth:this.quoteWidth,quoteThick:this.quoteThick,unit:this.unit,memo:this.memo,id:maxIds2-1,filename2:this.filename2,wallThickness:this.wallThickness}});
                    maxIds2 --;
                }
            }else if(tabFlag==2){
                addCount = parseInt($("#countInput3").val());
                if(addCount == 0){
                    layer.msg("请输入要拷贝多少行数据。", {icon:5, anim:6, time: 3000});
                    return;
                }
                for (var i = 0; i <  addCount;  i++) {
                    var count = $('#reportTable3').bootstrapTable('getData').length;
                    $('#reportTable3').bootstrapTable('insertRow',{index:count,row:{typeCode:this.typeCode,bomStyle:this.bomStyle,color:this.color,paint:this.paint,quoteLong:this.quoteLong,quoteWidth:this.quoteWidth,quoteThick:this.quoteThick,unit:this.unit,memo:this.memo,id:maxIds3-1,filename2:this.filename2,socketLength:this.socketLength}});
                    maxIds3 --;
                }
            }else if(tabFlag==3){
                addCount = parseInt($("#countInput4").val());
                if(addCount == 0){
                    layer.msg("请输入要拷贝多少行数据。", {icon:5, anim:6, time: 3000});
                    return;
                }
                for (var i = 0; i <  addCount;  i++) {
                    var count = $('#reportTable4').bootstrapTable('getData').length;
                    $('#reportTable4').bootstrapTable('insertRow',{index:count,row:{typeCode:this.typeCode,bomStyle:this.bomStyle,color:this.color,paint:this.paint,quoteLong:this.quoteLong,quoteWidth:this.quoteWidth,quoteThick:this.quoteThick,unit:this.unit,memo:this.memo,id:maxIds4-1,filename2:this.filename2,wallThickness:this.wallThickness}});
                    maxIds4 --;
                }
            }else if(tabFlag==4){
                addCount = parseInt($("#countInput5").val());
                if(addCount == 0){
                    layer.msg("请输入要拷贝多少行数据。", {icon:5, anim:6, time: 3000});
                    return;
                }
                for (var i = 0; i <  addCount;  i++) {
                    var count = $('#reportTable5').bootstrapTable('getData').length;
                    $('#reportTable5').bootstrapTable('insertRow',{index:count,row:{typeCode:this.typeCode,bomStyle:this.bomStyle,color:this.color,paint:this.paint,quoteLong:this.quoteLong,quoteWidth:this.quoteWidth,quoteThick:this.quoteThick,unit:this.unit,memo:this.memo,id:maxIds5-1,filename2:this.filename2}});
                    maxIds5 --;
                }
            }
        });
    }
    if(projectSplitFlag==1){
        projectSplit();
    }
}
//保存操作
var ajax;
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;
    var myDate = new Date();
    var mytime=myDate.toLocaleTimeString(); //获取当前时间
    console.log(mytime);
    upload.render({
        elem: '#test3'
        ,url: '../ProcessController/importExpBao'
        ,accept: 'file' //普通文件
        ,dataType:'JSON',
         before:function(){
                jQuery('#loading1').showLoading();
         }
        ,done: function(responseStr){
            if(responseStr.date1.length>0){
                for(var i =0;i<responseStr.date1.length;i++){
                    var count = responseStr.date1.length;
                    $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date1[i].typeName,bomStyle:responseStr.date1[i].bomStyle,color:responseStr.date1[i].color,paint:responseStr.date1[i].paint,quoteLong:responseStr.date1[i].quoteLong,quoteWidth:responseStr.date1[i].quoteWidth,quoteThick:responseStr.date1[i].quoteThick,unit:responseStr.date1[i].unit,memo:responseStr.date1[i].memo,id:maxIds1-1,fileNamesAndIds:""}});
                    maxIds1 --;
                }
            }
            if(responseStr.date2.length>0){
                for(var i =0;i<responseStr.date2.length;i++){
                    var count = responseStr.date2.length;
                    $('#reportTable2').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date2[i].typeName,bomStyle:responseStr.date2[i].bomStyle,color:responseStr.date2[i].color,paint:responseStr.date2[i].paint,quoteLong:responseStr.date2[i].quoteLong,quoteWidth:responseStr.date2[i].quoteWidth,quoteThick:responseStr.date2[i].quoteThick,unit:responseStr.date2[i].unit,memo:responseStr.date2[i].memo,id:maxIds2-1,fileNamesAndIds:"",wallThickness:responseStr.date2[i].wallThickness}});
                    maxIds2 --;
                }
            }
            if(responseStr.date3.length>0){
                for(var i =0;i<responseStr.date3.length;i++){
                    var count = responseStr.date3.length;
                    $('#reportTable3').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date3[i].typeName,bomStyle:responseStr.date3[i].bomStyle,color:responseStr.date3[i].color,paint:responseStr.date3[i].paint,quoteLong:responseStr.date3[i].quoteLong,quoteWidth:responseStr.date3[i].quoteWidth,quoteThick:responseStr.date3[i].quoteThick,unit:responseStr.date3[i].unit,memo:responseStr.date3[i].memo,id:maxIds3-1,fileNamesAndIds:"",socketLength:responseStr.date3[i].socketLength}});
                    maxIds3 --;
                }
            }
            if(responseStr.date4.length>0){
                for(var i =0;i<responseStr.date4.length;i++){
                    var count = responseStr.date4.length;
                    $('#reportTable4').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date4[i].typeName,bomStyle:responseStr.date4[i].bomStyle,color:responseStr.date4[i].color,paint:responseStr.date4[i].paint,quoteLong:responseStr.date4[i].quoteLong,quoteWidth:responseStr.date4[i].quoteWidth,quoteThick:responseStr.date4[i].quoteThick,unit:responseStr.date4[i].unit,memo:responseStr.date4[i].memo,id:maxIds4-1,fileNamesAndIds:"",wallThickness:responseStr.date4[i].wallThickness}});
                    maxIds4 --;
                }
            }
            if(responseStr.date5.length>0){
                for(var i =0;i<responseStr.date5.length;i++){
                    var count = responseStr.date5.length;
                    $('#reportTable5').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date5[i].typeName,bomStyle:responseStr.date5[i].bomStyle,color:responseStr.date5[i].color,paint:responseStr.date5[i].paint,quoteLong:responseStr.date5[i].quoteLong,quoteWidth:responseStr.date5[i].quoteWidth,quoteThick:responseStr.date5[i].quoteThick,unit:responseStr.date5[i].unit,memo:responseStr.date5[i].memo,id:maxIds5-1,fileNamesAndIds:""}});
                    maxIds5 --;
                }
            }
            console.log(mytime);
            layer.msg('上传成功');
            jQuery('#loading1').hideLoading();
            // console.log(res)
        },
        error: function(){
            layer.msg('上传失败');
            jQuery('#loading1').hideLoading();
    },
    });
});
// upload.render({
//     elem: '#test8'
//     ,url: '../ProcessController/importExpBao'
//     ,accept: 'file'
//     ,auto: false
//     ,multiple: true
//     ,bindAction: '#test9'
//     ,dataType:'JSON'
//     ,done: function(responseStr){
//         if(responseStr.date1.length>0){
//             for(var i =0;i<responseStr.date1.length;i++){
//                 var count = responseStr.date1.length;
//                 $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date1[i].typeName,bomStyle:responseStr.date1[i].bomStyle,color:responseStr.date1[i].color,paint:responseStr.date1[i].paint,quoteLong:responseStr.date1[i].quoteLong,quoteWidth:responseStr.date1[i].quoteWidth,quoteThick:responseStr.date1[i].quoteThick,unit:responseStr.date1[i].unit,memo:responseStr.date1[i].memo,id:maxIds1-1,fileNamesAndIds:""}});
//                 maxIds1 --;
//             }
//         }
//         if(responseStr.date2.length>0){
//             for(var i =0;i<responseStr.date2.length;i++){
//                 var count = responseStr.date2.length;
//                 $('#reportTable2').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date2[i].typeName,bomStyle:responseStr.date2[i].bomStyle,color:responseStr.date2[i].color,paint:responseStr.date2[i].paint,quoteLong:responseStr.date2[i].quoteLong,quoteWidth:responseStr.date2[i].quoteWidth,quoteThick:responseStr.date2[i].quoteThick,unit:responseStr.date2[i].unit,memo:responseStr.date2[i].memo,id:maxIds2-1,fileNamesAndIds:"",wallThickness:responseStr.date2[i].wallThickness}});
//                 maxIds2 --;
//             }
//         }
//         if(responseStr.date3.length>0){
//             for(var i =0;i<responseStr.date3.length;i++){
//                 var count = responseStr.date3.length;
//                 $('#reportTable3').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date3[i].typeName,bomStyle:responseStr.date3[i].bomStyle,color:responseStr.date3[i].color,paint:responseStr.date3[i].paint,quoteLong:responseStr.date3[i].quoteLong,quoteWidth:responseStr.date2[i].quoteWidth,quoteThick:responseStr.date3[i].quoteThick,unit:responseStr.date3[i].unit,memo:responseStr.date3[i].memo,id:maxIds3-1,fileNamesAndIds:"",socketLength:responseStr.date3[i].socketLength}});
//                 maxIds3 --;
//             }
//         }
//         if(responseStr.date4.length>0){
//             for(var i =0;i<responseStr.date4.length;i++){
//                 var count = responseStr.date4.length;
//                 $('#reportTable4').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date4[i].typeName,bomStyle:responseStr.date4[i].bomStyle,color:responseStr.date4[i].color,paint:responseStr.date4[i].paint,quoteLong:responseStr.date4[i].quoteLong,quoteWidth:responseStr.date4[i].quoteWidth,quoteThick:responseStr.date4[i].quoteThick,unit:responseStr.date2[i].unit,memo:responseStr.date4[i].memo,id:maxIds4-1,fileNamesAndIds:"",wallThickness:responseStr.date4[i].wallThickness}});
//                 maxIds4 --;
//             }
//         }
//         if(responseStr.date5.length>0){
//             for(var i =0;i<responseStr.date5.length;i++){
//                 var count = responseStr.date5.length;
//                 $('#reportTable5').bootstrapTable('insertRow',{index:count,row:{typeCode:responseStr.date5[i].typeName,bomStyle:responseStr.date5[i].bomStyle,color:responseStr.date5[i].color,paint:responseStr.date5[i].paint,quoteLong:responseStr.date5[i].quoteLong,quoteWidth:responseStr.date5[i].quoteWidth,quoteThick:responseStr.date5[i].quoteThick,unit:responseStr.date5[i].unit,memo:responseStr.date5[i].memo,id:maxIds5-1,fileNamesAndIds:""}});
//                 maxIds5 --;
//             }
//         }
//         layer.msg('上传成功');
//        // console.log(res)
//     }
// });});

function daochu(){

    window.open("../ProcessController/downloadExcel");
    // $.ajax({
    //     type : 'POST',
    //     url : '../ProcessController/downloadExcel',
    //     dataType : "json",
    //     cache : false,
    //     async : true,
    //     success : function() {
    //             layer.msg('下载成功');
    //     }
    // });
}

//选择业务
function chooseUser(){
    parent.layer.open({
        type: 2,
        title: ['业务员列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseUser' //setBOMForProcess
    });
}

//选择产品类型
function chooseQuoteModel(bomTypeOnes,indexNumber,flag){
   if(bomTypeOnes===null || bomTypeOnes==="" || bomTypeOnes === undefined || bomTypeOnes === "undefined" ){
       layer.msg("请先选择模型所属的产品大类。", {icon:5, anim:6, time: 3000});
       return;
   }
   parent.layer.open({
       type: 2,
       title: ['报价模型列表', 'font-size:18px;color:#788188;'],
       area : ['800px', '600px'],
       closeBtn: 1,
       content: '../ProcessController/chooseQuoteModel?typeCode='+bomTypeOnes, // chooseBomType
       end:function(){
            var modelCode = $("#modelCode").val();
            var modelName = $("#modelName").val();
            if(flag==1){
               $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "modelCode", value: modelCode});
               $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "modelName", value: modelName});
            }else if(flag==2){
               $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "modelCode", value: modelCode});
               $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "modelName", value: modelName});
            }else if(flag==3){
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "modelCode", value: modelCode});
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "modelName", value: modelName});
            }else if(flag==4){
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "modelCode", value: modelCode});
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "modelName", value: modelName});
            }else if(flag==5){
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "modelCode", value: modelCode});
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "modelName", value: modelName});
            }
       }
   });
}
 //选择报价单中的组织信息
function chooseCompany(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['组织列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseCompany',
        end:function(){
            var companyCode = $("#companyCode").val();
            var companyName = $("#companyName").val();
            if(flag==1){
                $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "companyCode", value: companyCode});
                $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "companyName", value: companyName});
            }else if(flag==2){
                $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "companyCode", value: companyCode});
                $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "companyName", value: companyName});
            }else if(flag==3){
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "companyCode", value: companyCode});
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "companyName", value: companyName});
            }else if(flag==4){
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "companyCode", value: companyCode});
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "companyName", value: companyName});
            }else if(flag==5){
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "companyCode", value: companyCode});
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "companyName", value: companyName});
            }
        }
    });
}

//选择报价单中的生产基地
function chooseBase(companyCode,indexNumber,flag){
    if(companyCode===null || companyCode==="" || companyCode === "undefined" || companyCode === undefined){
        layer.msg("请先选择组织信息。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['BOM系列列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBase?companyCode='+companyCode, //chooseBOMSeries
        end:function(){
            var baseCode = $("#baseCode").val();
            var baseName = $("#baseName").val();
            if(flag==1){
                $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
                $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "baseName", value: baseName});
            }else if(flag==2){
                $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
                $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "baseName", value: baseName});
            }else if(flag==3){
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "baseName", value: baseName});
            }else if(flag==4){
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "baseName", value: baseName});
            }else if(flag==5){
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "baseName", value: baseName});
            }
        }
    });
}


var fileLineId = new Array();// 声明一个数组，存放要删除的门扇
//上传附件
function  uploadFile(id,indexNumber,flag){
    var fileIds = "" ;
    //获取所有的表单上面的附件的id
    if(flag==1){
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable1 #msfilename"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
            if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
                fileIds +=$(this).attr("id")+";";
            }
        });
    }else if(flag==2){
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable2 #mtfilename"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
            if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
                fileIds +=$(this).attr("id")+";";
            }
        });
    }else if(flag==3){
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable3 #xtfilename"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
           if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
               fileIds +=$(this).attr("id")+";";
           }
        });
    }else if(flag==4){
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable4 #ftfilename"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
            if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
                fileIds +=$(this).attr("id")+";";
            }
        });
    }else if(flag==5){
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable5 #qtfilename"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
            if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
                fileIds +=$(this).attr("id")+";";
            }
        });
    }
    parent.layer.open({
        type: 2,
        title: ['附件导入', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/importQuoteFile?fileIds='+fileIds+'&type='+0, //choodownloadFileseBOMSeries
        end:function(){
         var fileNamesAndIds = $("#fileNamesAndIds").val();
         var fileIds = $("#fileIds").val();
         if(flag==1){
             $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIds", value: fileNamesAndIds});
             $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "fileId", value: fileIds});
         }else if(flag==2){
             $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIds", value: fileNamesAndIds});
              $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "fileId", value: fileIds});
         }else if(flag==3){
             $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIds", value: fileNamesAndIds});
             $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "fileId", value: fileIds});
         }else if(flag==4){
             $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIds", value: fileNamesAndIds});
             $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "fileId", value: fileIds});
         }else if(flag==5){
             $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIds", value: fileNamesAndIds});
             $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "fileId", value: fileIds});
         }
         $("#fileNamesAndIds").val("");
         $("#fileIds").val("");
        }
    });
}

//产品大类change事件，重新绚烂
function bomTypeOnesChange(fieldName,indexNumber,flag){
    var value
    if(flag==1){
         value = $("#ms"+fieldName+indexNumber).val();
         $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==2){
         value = $("#mt"+fieldName+indexNumber).val();
         $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==3){
         value = $("#xt"+fieldName+indexNumber).val();
         $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==4){
        value = $("#ft"+fieldName+indexNumber).val();
        $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==5){
        value = $("#qt"+fieldName+indexNumber).val();
        $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }
    if(projectSplitFlag==1){
        projectSplit();
    }
}
//返回
function back() {
    post("../ProcessController/quotationProcess",{menuid:$("#menuid").val()})
}
var returnFlag = 0;
var errorMassage = 0;
var bomColors = "";
//提交
function save(submitFlag){
    bomColors = "";
    projectSplit();
    returnFlag = 0;
    var data = {doorLeafList: [],doorCoverList: [],doorLineList: [],doorViceSetList:[],doorOtherList:[]};
    var infoMS = $("#reportTable1").bootstrapTable('getData');
    var infoMT = $("#reportTable2").bootstrapTable('getData');
    var infoXT = $("#reportTable3").bootstrapTable('getData');
    var infoFT = $("#reportTable4").bootstrapTable('getData');
    var infoQT = $("#reportTable5").bootstrapTable('getData');
    if((infoMS==null || infoMS=="" || infoMS==undefined ) &&
        (infoMT==null || infoMT=="" || infoMT==undefined ) &&
            (infoXT==null || infoXT=="" || infoXT==undefined ) &&
                (infoFT==null || infoFT=="" || infoFT==undefined  ) &&
                    (infoQT==null || infoQT=="" || infoQT==undefined)   ){
       layer.msg("门扇、门套、线条、副套、其他等五个明细表，至少需要有一条明细数据。", {icon:5, anim:6, time: 3000});
       return;
    }
    getObjects(infoMS,1,data);
    getObjects(infoMT,2,data);
    getObjects(infoXT,3,data);
    getObjects(infoFT,4,data);
    getObjects(infoQT,5,data);
    if(returnFlag==1){
        return;
    }
    if(bomColors!=""){
        var json = {bomColors:bomColors};
        var request = "../ExcelPlugController/determineIfItExistsBom";
        ajax = $.ajax({
            type : "POST",
            url : encodeURI(request),
            data : json,
            dataType : "json",
            cache : false,
            // processData : false, // 告诉jQuery不要去处理发送的数据
            // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
            // traditional:true,//防止深度序列化
            success : function(result) {
                if(result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                }else{
                    var jsonMiddle = JSON.stringify(data);
                    var formData = new FormData();

                    if($("#id").val() != null && $("#id").val() != "" && $("#id").val() != undefined && $("#id").val() != "undefined"){
                        formData.append("id", $("#id").val());
                    }

                    formData.append("jsonMiddle", jsonMiddle);//保存发布标志位

                    formData.append("processCode", $("#processCode").val());

                    formData.append("urgentState", $("#urgentState").val());

                    if($("#projectName").val() == null || $("#projectName").val() == "" || $("#projectName").val() == undefined || $("#projectName").val() == "undefined"){
                        layer.msg("请填写报价申请单对应的项目名称。", {icon:5, anim:6, time: 3000});
                        return;
                    }
                    formData.append("projectName", $("#projectName").val());

                    if($("#employeeName").val() == null || $("#employeeName").val() == "" || $("#employeeName").val() == undefined || $("#employeeName").val() == "undefined"){
                        layer.msg("请选择报价申请单对应的业务员。", {icon:5, anim:6, time: 3000});
                        return;
                    }
                    formData.append("employeeName", $("#employeeName").val());

                    if($("#userId").val()==null || $("#userId").val() == "" || $("#userId").val() == undefined || $("#userId").val() == "undefined"){
                        layer.msg("请选择报价申请单对应的业务员。", {icon:5, anim:6, time: 3000});
                        return;
                    }
                    formData.append("userId", $("#userId").val());

                    if($("#departmentName").val()==null || $("#departmentName").val() == "" || $("#departmentName").val() == undefined || $("#departmentName").val() == "undefined"){
                        layer.msg("改业务员还没有绑定部门信息，请先为其绑定部门信息。", {icon:5, anim:6, time: 3000});
                        return;
                    }
                    formData.append("departmentName", $("#departmentName").val());

                    if($("#quotationMethod").val()==null || $("#quotationMethod").val() == "" || $("#quotationMethod").val() == undefined || $("#quotationMethod").val() == "undefined"){
                        layer.msg("请选择报价方式。", {icon:5, anim:6, time: 3000});
                        return;
                    }
                    formData.append("quotationMethod", $("#quotationMethod").val());

                    if($("#replyDate").val()==null || $("#replyDate").val() == "" || $("#replyDate").val() == undefined || $("#replyDate").val() == "undefined"){
                        layer.msg("请选择回复日期。", {icon:5, anim:6, time: 3000});
                        return;
                    }
                    var date = new Date($("#replyDate").val()+" 14:58:43");
                    formData.append("replyDate", date);

                    /*编辑是需要从报价明细表中删除的数据*/
                    formData.append("delArraysMS", delArraysMS);
                    formData.append("delArraysMT", delArraysMT);
                    formData.append("delArraysXT", delArraysXT);
                    formData.append("delArraysFT", delArraysFT);
                    formData.append("delArraysQT", delArraysQT);
                    formData.append("submitFlag", submitFlag);
                    formData.append("quotationNumber", $("#quotationNumber").text());
                    // return;
                    submitMsg(formData,submitFlag);
                }
            }
        });
    }else{
        var jsonMiddle = JSON.stringify(data);
        var formData = new FormData();

        if($("#id").val() != null && $("#id").val() != "" && $("#id").val() != undefined && $("#id").val() != "undefined"){
            formData.append("id", $("#id").val());
        }

        formData.append("jsonMiddle", jsonMiddle);//保存发布标志位

        formData.append("processCode", $("#processCode").val());

        formData.append("urgentState", $("#urgentState").val());

        if($("#projectName").val() == null || $("#projectName").val() == "" || $("#projectName").val() == undefined || $("#projectName").val() == "undefined"){
            layer.msg("请填写报价申请单对应的项目名称。", {icon:5, anim:6, time: 3000});
            return;
        }
        formData.append("projectName", $("#projectName").val());

        if($("#employeeName").val() == null || $("#employeeName").val() == "" || $("#employeeName").val() == undefined || $("#employeeName").val() == "undefined"){
            layer.msg("请选择报价申请单对应的业务员。", {icon:5, anim:6, time: 3000});
            return;
        }
        formData.append("employeeName", $("#employeeName").val());

        if($("#userId").val()==null || $("#userId").val() == "" || $("#userId").val() == undefined || $("#userId").val() == "undefined"){
            layer.msg("请选择报价申请单对应的业务员。", {icon:5, anim:6, time: 3000});
            return;
        }
        formData.append("userId", $("#userId").val());

        if($("#departmentName").val()==null || $("#departmentName").val() == "" || $("#departmentName").val() == undefined || $("#departmentName").val() == "undefined"){
            layer.msg("改业务员还没有绑定部门信息，请先为其绑定部门信息。", {icon:5, anim:6, time: 3000});
            return;
        }
        formData.append("departmentName", $("#departmentName").val());

        if($("#quotationMethod").val()==null || $("#quotationMethod").val() == "" || $("#quotationMethod").val() == undefined || $("#quotationMethod").val() == "undefined"){
            layer.msg("请选择报价方式。", {icon:5, anim:6, time: 3000});
            return;
        }
        formData.append("quotationMethod", $("#quotationMethod").val());

        if($("#replyDate").val()==null || $("#replyDate").val() == "" || $("#replyDate").val() == undefined || $("#replyDate").val() == "undefined"){
            layer.msg("请选择回复日期。", {icon:5, anim:6, time: 3000});
            return;
        }
        var date = new Date($("#replyDate").val()+" 14:58:43");
        formData.append("replyDate", date);

        /*编辑是需要从报价明细表中删除的数据*/
        formData.append("delArraysMS", delArraysMS);
        formData.append("delArraysMT", delArraysMT);
        formData.append("delArraysXT", delArraysXT);
        formData.append("delArraysFT", delArraysFT);
        formData.append("delArraysQT", delArraysQT);
        formData.append("submitFlag", submitFlag);
        formData.append("quotationNumber", $("#quotationNumber").text());
        // return;
        submitMsg(formData,submitFlag);
    }
}
//是否有附件标志位
var havaFileFlag = 0;
var middleTypeCode;
function getObjects(info,flag,data){

    for (var i = 0; i < info.length; i++) {
        if(middleTypeCode==null || middleTypeCode==undefined || middleTypeCode==""){
            middleTypeCode = info[i].typeCode;

        }
        var timeSet = new Object();
        timeSet.id = info[i].id;
        if(info[i].typeCode==null || info[i].typeCode=="" || info[i].typeCode==undefined){
            if(flag==1){
                layer.msg("门扇报价单明细表的第"+(i+1)+"行记录，产品大类未选择。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==2){
                layer.msg("门套报价单明细表的第"+(i+1)+"行记录，产品大类未选择。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==3){
                layer.msg("线条报价单明细表的第"+(i+1)+"行记录，产品大类未选择。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==4){
                layer.msg("副套报价单明细表的第"+(i+1)+"行记录，产品大类未选择。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==5){
                layer.msg("其他报价单明细表的第"+(i+1)+"行记录，产品大类未选择。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }
        }
        timeSet.typeCode = info[i].typeCode;

        if(info[i].bomStyle==null || info[i].bomStyle=="" || info[i].bomStyle==undefined){
            if(flag==1){
                layer.msg("门扇报价单明细表的第"+(i+1)+"行记录，产品款式/型号未填写。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==2){
                layer.msg("门套报价单明细表的第"+(i+1)+"行记录，产品款式/型号未填写。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==3){
                layer.msg("线条报价单明细表的第"+(i+1)+"行记录，产品款式/型号未填写。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==4){
                layer.msg("副套报价单明细表的第"+(i+1)+"行记录，产品款式/型号未填写。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }else if(flag==5){
                layer.msg("其他报价单明细表的第"+(i+1)+"行记录，产品款式/型号未填写。", {icon:5, anim:6, time: 3000});
                returnFlag = 1;
            }
        }
        if(info[i].socketLength!=undefined){
            timeSet.socketLength = info[i].socketLength;
        }
        if(info[i].wallThickness!=undefined){
            timeSet.wallThickness = info[i].wallThickness;
        }
        console.log("detailNumber = " + info[i].detailNumber);
        timeSet.quotationDetailNumber = info[i].quotationDetailNumber;
        timeSet.bomStyle = info[i].bomStyle;
        timeSet.color = info[i].color;
        if(info[i].color!=null && info[i].color!=undefined && info[i].color!=""){
            bomColors+=info[i].color+";";
        }
        timeSet.paint = info[i].paint;
        timeSet.quoteLong = info[i].quoteLong;
        timeSet.quoteWidth = info[i].quoteWidth;
        timeSet.quoteThick = info[i].quoteThick;
        timeSet.unit = info[i].unit;
        timeSet.memo = info[i].memo;
        timeSet.quoteDetailCode = info[i].quoteDetailCode;
        if(info[i].fileId==null || info[i].fileId == "" || info[i].fileId == "undefined" ||info[i].fileId == undefined ){
            if(flag==1){
              // layer.msg("门扇报价单明细表的第"+(i+1)+"行记录，未上传附件。", {icon:5, anim:6, time: 3000});
              // returnFlag = 1;
            }else if(flag==2){
              // layer.msg("门套报价单明细表的第"+(i+1)+"行记录，未上传附件。", {icon:5, anim:6, time: 3000});
              // returnFlag = 1;
            }else if(flag==3){
              // layer.msg("线条报价单明细表的第"+(i+1)+"行记录，未上传附件。", {icon:5, anim:6, time: 3000});
              // returnFlag = 1;
            }
        }
        timeSet.fileId = info[i].fileId;
        if(flag==1){
            data.doorLeafList.push(timeSet);
        }else if(flag==2){
            data.doorCoverList.push(timeSet);
        }else if(flag==3){
            data.doorLineList.push(timeSet);
        }else if(flag==4){
            data.doorViceSetList.push(timeSet);
        }else if(flag==5){
            data.doorOtherList.push(timeSet);
        }
    }
}
function  submitMsg(formData,submitFlag){
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveDataDoors";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : formData,
        dataType : "json",
        cache : false,
        processData : false, // 告诉jQuery不要去处理发送的数据
        contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    if(submitFlag==0){
                        post("../ProcessController/quoteDetails",{menuid:$("#menuid").val()})
                    }else{
                        post("../ProcessController/quotationProcess",{menuid:$("#menuid").val()})
                    }
//                });
            }
        }
    });
}
//文件下载
function downloadFile(fileId){
	var index1=layer.load(1,{
   	 shade:[0.5,'#fff']
    });
	var jsondata = {"fileId" : fileId };
	$.ajax({
		type : 'POST',
		url : '../ProcessController/downloadFile',
		data : jsondata,
		dataType : "json",
		cache : false,
		async : true,
		success : function(result) {
			layer.close(index1);
			if(result.resultCode==1){
				$("#exportExcel").get(0).href="../ProcessController/download";//Datum_Download
				downloadFileFunc("exportExcel");
			}else{
				layer.msg(result.resultMsg, {icon : 5, anim : 6, time : 6000});
			}
		}
	});
}
//下载文件
function downloadFileFunc(field) {
	var e = document.createEvent('MouseEvent');
	e.initEvent('click', false, false);
	setTimeout(document.getElementById(field).dispatchEvent(e), 2000);
}
//删除流程相关数据
function delQuotation(){
    var id = $("#id").val();
    if(id == null || id =="" || id == undefined){
        layer.msg("该条报价记录信息丢失，请刷新页面后再试。", {icon: 5, anim: 6, time: 3000});
        return;
    }
    layer.confirm("确定删除该条草稿状体的报价记录吗？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json = {};
        json.id = id;
        var index = layer.load(1, {shade: [0.5, '#fff']}); // 0.5透明度的白色背景
        var request = "../ProcessController/delQuotationProcess";
        ajax = $.ajax({
            type: "POST",
            url: encodeURI(request),
            data: json,
            dataType: "json",
            cache: false,
//            processData: false, // 告诉jQuery不要去处理发送的数据
//            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            traditional: true,//防止深度序列化
            success: function (result) {
                layer.close(index);
                if (result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon: 5, anim: 6, time: 3000});
                } else {
//                    layer.msg(result.resultMassage, {icon: 6, anim: 5, time: 3000}, function () {
//                        onsearchtable();
//                    });
                    post("../ProcessController/quotationProcess",{});
                }
            }
        });
    });
}
var projectSplitFlag = 0;
//项目拆分
function projectSplit(){
    var infoMS = $("#reportTable1").bootstrapTable('getData');
    var infoMT = $("#reportTable2").bootstrapTable('getData');
    var infoXT = $("#reportTable3").bootstrapTable('getData');
    var infoFT = $("#reportTable4").bootstrapTable('getData');
    var infoQT = $("#reportTable5").bootstrapTable('getData');

    getObjectsOrder(infoMS,1);
    getObjectsOrder(infoMT,2);
    getObjectsOrder(infoXT,3);
    getObjectsOrder(infoFT,4);
    getObjectsOrder(infoQT,5);
    $("#btnOne").addClass("hidden");
    $("#btnTwo").removeClass("hidden");
    projectSplitFlag = 1;
}
var startIndex = 0;
var typeSize = 0;
var middleTypeCode;
function getObjectsOrder(info,flag){

    var typeCodeMiddleArray = new Array();
    typeCodeMiddleArray = $("#typeCodeMiddle").val().split(";");
    var data = {orderMassages: []};
    for(var j = 0; j < typeCodeMiddleArray.length; j++){
        for (var i = 0; i < info.length; i++) {
            if(info[i].typeCode== typeCodeMiddleArray[j]){//保证相同的产品类型记录时连续排列的
                var timeSet = new Object();
                timeSet.id = info[i].id;
                timeSet.quoteDetailCode = info[i].quoteDetailCode;
                timeSet.quotationDetailNumber = info[i].quotationDetailNumber;

                timeSet.rowIndex = info[i].rowIndex;
                timeSet.typeCode = info[i].typeCode;
                timeSet.bomStyle = info[i].bomStyle;
                timeSet.color = info[i].color;
                timeSet.paint = info[i].paint;
                timeSet.quoteLong = info[i].quoteLong;
                timeSet.quoteWidth = info[i].quoteWidth;
                timeSet.quoteThick = info[i].quoteThick;

                if(info[i].socketLength!=undefined){
                    timeSet.socketLength = info[i].socketLength;
                }
                if(info[i].wallThickness!=undefined){
                    timeSet.wallThickness = info[i].wallThickness;
                }
                timeSet.unit = info[i].unit;
                timeSet.memo = info[i].memo;
                timeSet.fileNamesAndIds = info[i].fileNamesAndIds;
                timeSet.fileId = info[i].fileId;
                data.orderMassages.push(timeSet);
            }
        }
    }
    splitProject(data,flag);
}

//将表格老数据清空，写上新数据
function splitProject(data,flag){
    var STARTINDEXXS = new Array();// 声明一个数组，存放要删除的线条
    var ENDINDEXXS = new Array();// 声明一个数组，存放要删除的线条
    var orderMassages = data.orderMassages;
    if(flag==1){
        $("#reportTable1").bootstrapTable('removeAll');
        var startIndex = 0;
        var size = 0;
        var middleTypeCode;
        for (var p in orderMassages) {//遍历json数组时，这么写p为索引，0,1
            if(middleTypeCode==null || middleTypeCode=="" || middleTypeCode==undefined || middleTypeCode!=orderMassages[p].typeCode){
                /**/
                if(middleTypeCode!=null && middleTypeCode!="" && middleTypeCode!=undefined && middleTypeCode!=orderMassages[p].typeCode){
                    STARTINDEXXS.push(startIndex);
                    ENDINDEXXS.push(size-startIndex);
                }
                middleTypeCode = orderMassages[p].typeCode;
                startIndex = size;
            }
            size ++;
            $('#reportTable1').bootstrapTable('insertRow',
                {
                    index:size-1,
                    row:
                        {
                            id:orderMassages[p].id,
                            quoteDetailCode:orderMassages[p].quoteDetailCode,
                            rowIndex:orderMassages[p].rowIndex,
                            typeCode:orderMassages[p].typeCode,
                            bomStyle:orderMassages[p].bomStyle,
                            color:orderMassages[p].color,
                            paint:orderMassages[p].paint,
                            quoteLong:orderMassages[p].quoteLong,
                            quoteWidth:orderMassages[p].quoteWidth,
                            quoteThick:orderMassages[p].quoteThick,
                            unit:orderMassages[p].unit,
                            memo:orderMassages[p].memo,
                            fileNamesAndIds:orderMassages[p].fileNamesAndIds,
                            fileId:orderMassages[p].fileId,
                            quotationDetailNumber:orderMassages[p].quotationDetailNumber,

                        }
                }
            );
        }
        STARTINDEXXS.push(startIndex);
        ENDINDEXXS.push(size-startIndex);
        if(STARTINDEXXS.length>0){
            mergeCells(STARTINDEXXS,ENDINDEXXS,1);
        }
    }else if(flag==2){
        $("#reportTable2").bootstrapTable('removeAll');
        var startIndex = 0;
        var size = 0;
        var middleTypeCode;
        for (var p in orderMassages) {//遍历json数组时，这么写p为索引，0,1
            if(middleTypeCode==null || middleTypeCode=="" || middleTypeCode==undefined || middleTypeCode!=orderMassages[p].typeCode){
                /**/
                if(middleTypeCode!=null && middleTypeCode!="" && middleTypeCode!=undefined && middleTypeCode!=orderMassages[p].typeCode){
                    STARTINDEXXS.push(startIndex);
                    ENDINDEXXS.push(size-startIndex);
                }
                middleTypeCode = orderMassages[p].typeCode;
                startIndex = size;
            }
            size ++;
            $('#reportTable2').bootstrapTable('insertRow',
                {
                    index:size-1,
                    row:
                        {
                            id:orderMassages[p].id,
                            quoteDetailCode:orderMassages[p].quoteDetailCode,
                            rowIndex:orderMassages[p].rowIndex,
                            typeCode:orderMassages[p].typeCode,
                            bomStyle:orderMassages[p].bomStyle,
                            color:orderMassages[p].color,
                            paint:orderMassages[p].paint,
                            quoteLong:orderMassages[p].quoteLong,
                            quoteWidth:orderMassages[p].quoteWidth,
                            quoteThick:orderMassages[p].quoteThick,
                            unit:orderMassages[p].unit,
                            memo:orderMassages[p].memo,
                            fileNamesAndIds:orderMassages[p].fileNamesAndIds,
                            fileId:orderMassages[p].fileId,
                            quotationDetailNumber:orderMassages[p].quotationDetailNumber,
                            wallThickness:orderMassages[p].wallThickness,
                        }
                }
            );
        }
        STARTINDEXXS.push(startIndex);
        ENDINDEXXS.push(size-startIndex);
        if(STARTINDEXXS.length>0){
            mergeCells(STARTINDEXXS,ENDINDEXXS,2);
        }

    }else if(flag==3){
        $("#reportTable3").bootstrapTable('removeAll');
        var startIndex = 0;
        var size = 0;
        var middleTypeCode;
        for (var p in orderMassages) {//遍历json数组时，这么写p为索引，0,1
            if(middleTypeCode==null || middleTypeCode=="" || middleTypeCode==undefined || middleTypeCode!=orderMassages[p].typeCode){
                /**/
                if(middleTypeCode!=null && middleTypeCode!="" && middleTypeCode!=undefined && middleTypeCode!=orderMassages[p].typeCode){
                    STARTINDEXXS.push(startIndex);
                    ENDINDEXXS.push(size-startIndex);
                }
                middleTypeCode = orderMassages[p].typeCode;
                startIndex = size;
            }
            size ++;
            $('#reportTable3').bootstrapTable('insertRow',
                {
                    index:size-1,
                    row:
                        {
                            id:orderMassages[p].id,
                            quoteDetailCode:orderMassages[p].quoteDetailCode,
                            rowIndex:orderMassages[p].rowIndex,
                            typeCode:orderMassages[p].typeCode,
                            bomStyle:orderMassages[p].bomStyle,
                            color:orderMassages[p].color,
                            paint:orderMassages[p].paint,
                            socketLength:orderMassages[p].socketLength,
                            quoteLong:orderMassages[p].quoteLong,
                            quoteWidth:orderMassages[p].quoteWidth,
                            quoteThick:orderMassages[p].quoteThick,
                            unit:orderMassages[p].unit,
                            memo:orderMassages[p].memo,
                            fileNamesAndIds:orderMassages[p].fileNamesAndIds,
                            fileId:orderMassages[p].fileId,
                            quotationDetailNumber:orderMassages[p].quotationDetailNumber,
                        }
                }
            );
        }
        STARTINDEXXS.push(startIndex);
        ENDINDEXXS.push(size-startIndex);
        if(STARTINDEXXS.length>0){
            mergeCells(STARTINDEXXS,ENDINDEXXS,3);
        }

    }else if(flag==4){
        $("#reportTable4").bootstrapTable('removeAll');
        var startIndex = 0;
        var size = 0;
        var middleTypeCode;
        for (var p in orderMassages) {//遍历json数组时，这么写p为索引，0,1
            if(middleTypeCode==null || middleTypeCode=="" || middleTypeCode==undefined || middleTypeCode!=orderMassages[p].typeCode){
                /**/
                if(middleTypeCode!=null && middleTypeCode!="" && middleTypeCode!=undefined && middleTypeCode!=orderMassages[p].typeCode){
                    STARTINDEXXS.push(startIndex);
                    ENDINDEXXS.push(size-startIndex);
                }
                middleTypeCode = orderMassages[p].typeCode;
                startIndex = size;
            }
            size ++;
            $('#reportTable4').bootstrapTable('insertRow',
                {
                    index:size-1,
                    row:
                        {
                            id:orderMassages[p].id,
                            quoteDetailCode:orderMassages[p].quoteDetailCode,
                            rowIndex:orderMassages[p].rowIndex,
                            typeCode:orderMassages[p].typeCode,
                            bomStyle:orderMassages[p].bomStyle,
                            color:orderMassages[p].color,
                            paint:orderMassages[p].paint,
                            quoteLong:orderMassages[p].quoteLong,
                            wallThickness:orderMassages[p].wallThickness,
                            quoteWidth:orderMassages[p].quoteWidth,
                            quoteThick:orderMassages[p].quoteThick,
                            unit:orderMassages[p].unit,
                            memo:orderMassages[p].memo,
                            fileNamesAndIds:orderMassages[p].fileNamesAndIds,
                            fileId:orderMassages[p].fileId,
                            quotationDetailNumber:orderMassages[p].quotationDetailNumber,
                        }
                }
            );
        }
        STARTINDEXXS.push(startIndex);
        ENDINDEXXS.push(size-startIndex);
        if(STARTINDEXXS.length>0){
            mergeCells(STARTINDEXXS,ENDINDEXXS,4);
        }

    }else if(flag==5){
        $("#reportTable5").bootstrapTable('removeAll');
        var startIndex = 0;
        var size = 0;
        var middleTypeCode;
        for (var p in orderMassages) {//遍历json数组时，这么写p为索引，0,1
            if(middleTypeCode==null || middleTypeCode=="" || middleTypeCode==undefined || middleTypeCode!=orderMassages[p].typeCode){
                /**/
                if(middleTypeCode!=null && middleTypeCode!="" && middleTypeCode!=undefined && middleTypeCode!=orderMassages[p].typeCode){
                    STARTINDEXXS.push(startIndex);
                    ENDINDEXXS.push(size-startIndex);
                }
                middleTypeCode = orderMassages[p].typeCode;
                startIndex = size;
            }
            size ++;
            $('#reportTable5').bootstrapTable('insertRow',
                {
                    index:size-1,
                    row:
                        {
                            id:orderMassages[p].id,
                            quoteDetailCode:orderMassages[p].quoteDetailCode,
                            rowIndex:orderMassages[p].rowIndex,
                            typeCode:orderMassages[p].typeCode,
                            bomStyle:orderMassages[p].bomStyle,
                            color:orderMassages[p].color,
                            paint:orderMassages[p].paint,
                            quoteLong:orderMassages[p].quoteLong,
                            quoteWidth:orderMassages[p].quoteWidth,
                            quoteThick:orderMassages[p].quoteThick,
                            unit:orderMassages[p].unit,
                            memo:orderMassages[p].memo,
                            fileNamesAndIds:orderMassages[p].fileNamesAndIds,
                            fileId:orderMassages[p].fileId,
                            quotationDetailNumber:orderMassages[p].quotationDetailNumber,
                        }
                }
            );
        }
        STARTINDEXXS.push(startIndex);
        ENDINDEXXS.push(size-startIndex);
        if(STARTINDEXXS.length>0){
            mergeCells(STARTINDEXXS,ENDINDEXXS,5);
        }

    }
}
//单元格合并
function mergeCells(STARTINDEXXS,ENDINDEXXS,flag){
    if(flag==1){
        for(i = 0,len=STARTINDEXXS.length; i < len; i++) {
            $('#reportTable1').bootstrapTable('mergeCells', {index: STARTINDEXXS[i], field: 'typeCode', colspan: 1, rowspan: ENDINDEXXS[i]});
        }
    }else if(flag==2){
        for(i = 0,len=STARTINDEXXS.length; i < len; i++) {
            $('#reportTable2').bootstrapTable('mergeCells', {index: STARTINDEXXS[i], field: 'typeCode', colspan: 1, rowspan: ENDINDEXXS[i]});
        }
    }else if(flag==3){
        for(i = 0,len=STARTINDEXXS.length; i < len; i++) {
            $('#reportTable3').bootstrapTable('mergeCells', {index: STARTINDEXXS[i], field: 'typeCode', colspan: 1, rowspan: ENDINDEXXS[i]});
        }
    }else if(flag==4){
        for(i = 0,len=STARTINDEXXS.length; i < len; i++) {
            $('#reportTable4').bootstrapTable('mergeCells', {index: STARTINDEXXS[i], field: 'typeCode', colspan: 1, rowspan: ENDINDEXXS[i]});
        }
    }else if(flag==5){
        for(i = 0,len=STARTINDEXXS.length; i < len; i++) {
            $('#reportTable5').bootstrapTable('mergeCells', {index: STARTINDEXXS[i], field: 'typeCode', colspan: 1, rowspan: ENDINDEXXS[i]});
        }
    }
}
//归类还原
function categorizationReduction(){
    $("#btnOne").removeClass("hidden");
    $("#btnTwo").addClass("hidden");
    projectSplitFlag = 0;
    if( $("#reportTable1").bootstrapTable('getData').length>0){
        $("#reportTable1").bootstrapTable('updateCell', {index: 0, field: "rowIndex", value: 1});
    }
    if( $("#reportTable2").bootstrapTable('getData').length>0){
        $('#reportTable2').bootstrapTable('updateCell', {index: 0, field: "rowIndex", value: 1});
    }
    if( $("#reportTable3").bootstrapTable('getData').length>0){
        $('#reportTable3').bootstrapTable('updateCell', {index: 0, field: "rowIndex", value: 1});
    }
    if( $("#reportTable4").bootstrapTable('getData').length>0){
        $('#reportTable4').bootstrapTable('updateCell', {index: 0, field: "rowIndex", value: 1});
    }
    if( $("#reportTable5").bootstrapTable('getData').length>0){
        $('#reportTable5').bootstrapTable('updateCell', {index: 0, field: "rowIndex", value: 1});
    }
}
//选中pvc 颜色
function chooseColor(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['颜色列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseColor', /*chooseCompany*/
        end:function(){
            var color = $("#color").val();
            console.log(color);
            if(flag==1){
                $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "color", value: color});
            }else if(flag==2){
                $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "color", value: color});
            }else if(flag==3){
                $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "color", value: color});
            }else if(flag==4){
                $("#reportTable4").bootstrapTable('updateCell', {index: indexNumber, field: "color", value: color});
            }else if(flag==5){
                $("#reportTable5").bootstrapTable('updateCell', {index: indexNumber, field: "color", value: color});
            }
         }
    });
}