var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var ajax;
$(function() {
    var  flowFlag = $("#flowFlag").val();
    taskName = $("#taskName").val();

    resizewindow();
    /*************************工程报价 分可编辑与不可编辑情况**************************/
    $('#reportTable1').bootstrapTable({
            url:"../ProcessController/getDataDoorsByJson?returnCode="+$("#returnCode").val()+"&taskName="+$("#taskName").val() ,
            method: 'post',
               dataType: "json",
               dataField: 'rows',
               striped: true,//设置为 true 会有隔行变色效果
               undefinedText: "空",//当数据为 undefined 时显示的字符
               pagination: true, //设置为 true 会在表格底部显示分页条。
               showToggle: "true",//是否显示 切换试图（table/card）按钮
               showColumns: "true",//是否显示 内容列下拉框
               pageNumber: 1,//初始化加载第一页，默认第一页
                pageSize: 20,//每页的记录行数（*）
                pageList: [20, 100, 200],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
               queryParams: queryParams1,//请求远程数据时，可以通过修改queryParams发送其他参数。
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
                    field:"flowFlag",
                    visible: false
//                     title:"flowFlag"
                },{
                    field:"userId",
                    visible: false
//                     title:"flowFlag"
                },{
                    field:"quotationDetailNumber",
                    visible: false
//            title:"detailsType"
                },
                {
                    field:"detailsType",
                    visible: false
                },
                {
                    field:"quoteDetailCode",
                    visible: false
                },
                {
                    field:"codeForModel",
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
                }/*,{
                   field:"quotationDetailNumber",
                   title:"报价单编号",
                   width : '45px',
                   align : 'center'
               }*/,
                {
                    field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle",sortable:"true"
                },
                {
                    field:"quotationNumber",title:"报价单号",align:"center",valign:"middle",sortable:"true",visible: false
                },
                {
                    field:"projectName",title:"项目名称",align:"center",valign:"middle",sortable:"true",visible: false
                },
                {
                    field:"departmentName",title:"申请部门",align:"center",valign:"middle",sortable:"true",visible: false
                },
                {
                    field:"quotationMethod",title:"报价方式",align:"center",valign:"middle",sortable:"true",visible: false
                },
                {
                    field:"replyDate",title:"回复日期",align:"center",valign:"middle",sortable:"true",visible: false
                },
                 {
                     field:"employeeName",title:"业务员姓名",align:"center",valign:"middle",sortable:"true",visible: false
                 },
                {
                field:"typeCode",title:"产品大类",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                        var bomTypeOneHtml = $("#bomTypeOneHtml").val();
                        if(value!=null && value!=undefined  && value!=""){
                            bomTypeOneHtml = bomTypeOneHtml.replace(value+"\"",value+"\" selected ");
                        }
                        value = bomTypeOneHtml;
                        if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                            value = value.replace("<select","<select  disabled ");
                        }
                        var reg = RegExp(/【index】/);
                        while(value.match(reg)){
                            value = value.replace("【index】",index);
                        }
                        return value;
                   }
                } ,
                {
                    field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true",
                     formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str= '<input id="bomStyle'+index+'"  value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                         }
                         return str;
                     }
                },
                {
                    field:"color",title:"颜色",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str= '<input id="color'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',1)" maxlength="64" style="background-color:#fff" />';
                         }
                         return str;
                    }
                },
                 {
                     field:"paint",title:"油漆",align:"center",valign:"middle",sortable:"true",
                     formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str= '<input id="paint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                         }
                         return str;
                     }
                 },
                {
                    field:"quoteLong",title:"长(mm)",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str= '<input id="quoteLong'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                         }
                         return str;
                    }
                },
                {
                    field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str= '<input id="quoteWidth'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                         }
                         return str;
                    }
                },
                {
                    field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str = '<input id="quoteThick'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',1)" maxlength="11" style="background-color:#fff" />';
                         }
                         return str;
                    }
                },
                {
                    field:"wallThickness",title:"墙体厚度(mm)",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                        var str ="";
                        if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                            return value;
                        }else{
                            str = '<input id="wallThickness'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'wallThickness\','+index+',1)" maxlength="11" style="background-color:#fff" />';
                        }
                        return str;
                    }
                },
                {
                    field:"socketLength",title:"插口长度(mm)",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                        var str ="";
                        if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                            return value;
                        }else{
                            str = '<input id="socketLength'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'socketLength\','+index+',1)" maxlength="11" style="background-color:#fff" />';
                        }
                        return str;
                    }
                }/*,{
                    field:"wallThickness",title:"墙体厚度(mm)",align:"center",valign:"middle"
                },{
                    field:"socketLength",title:"插口长度(mm)",align:"center",valign:"middle"
                }*/,
              {
                    field:"unit",title:"单位",align:"center",valign:"middle",sortable:"true" ,
                    formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             // str = '<input id="unit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',1)"  maxlength="11" style="background-color:#fff" />';
                             str ='<select  id="unit'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'unit\','+index+',1)">'+
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
                         return str;
                    }
                },
                {
                    field:"memo",title:"生产单备注",align:"center",valign:"middle",sortable:"true",
                    formatter : function(value, row, index) {
                         var str ="";
                         if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                             return value;
                         }else{
                             str = '<textarea id="memo'+index+'" rows="3" style="background-color:#fff"  class="letter" onblur="changeReason(\'memo\','+index+',1)"  maxlength="128" >'+value+'</textarea>';
                         }
                         return str;
                    }
                },
                  {
                    field:"fileNamesAndIds",title:"报价相关附件",align:"center",valign:"middle",sortable:"true",
                      formatter : function(value, row, index) {
                           var str ='<span id="fileNamesAndIds'+index+'" >';
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
                  },{
                   field:"fileNamesAndIdsPic",title:"图纸关附件",align:"center",valign:"middle",sortable:"true",
                     formatter : function(value, row, index) {
                          var str ='<span id="fileNamesAndIdsPic'+index+'" >';
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
                 field:"fileIdPic",
                 visible: false
             },
              {
                  field:"auditOpinion",title:"审核意见",align:"center",valign:"middle",sortable:"true",
                  formatter : function(value, row, index) {
                      var str= '<textarea id="auditOpinion'+index+'" rows="3" style="background-color:#fff"  class="letter" onblur="changeReason(\'auditOpinion\','+index+',1)"  maxlength="128">'+value+'</textarea>';
                      return str;
                  }
              },
             {
                 field:"doMenoth",title:"操作",align:"center",valign:"middle",sortable:"true",visible: false,
                 formatter : function(value, row, index) {
                    if(taskName != "工程报价" || taskName == "工程报价" && row.flowFlag!=2 || $("#flag").val() == 0){
                        return "-";
                    }else{
                        var str ="-";
                        if($("#uploadFileMethod0").val() ==null || $("#uploadFileMethod0").val() ==""  || $("#uploadFileMethod0").val() ==undefined || $("#uploadFileMethod0").val() !=null && $("#uploadFileMethod0").val()!="" && $("#uploadFileMethod0").val() == 0   ){
                            str = '<button type="button"  class="btn btn-s-xs greenbtn uploadFileMethod0"  onclick="uploadFile(\''+row.id+'\','+index+',1)"">上传相关附件</button>';
                        }
                        return str;
                    }
                 }
             }
            ],
              onLoadSuccess: function () {
                //为技术部图纸组、技术部成本组、技术部工艺组、技术部领导不能上传文件
                if(taskName == "技术部图纸组" || taskName == "技术部成本组" || taskName == "技术部工艺组" || taskName == "技术部领导"){
                    $("#reportTable1").bootstrapTable('hideColumn', 'doMenoth');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('hideColumn', 'checkFlag');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('hideColumn', 'auditOpinion');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('hideColumn', 'fileNamesAndIdsPic');//隐藏上述taskName列

                    $("#reportTable1").bootstrapTable('hideColumn', 'fileNamesAndIds');//隐藏上述taskName列
                }else{
                    //为工程报价节点可以上传附件
                    $("#reportTable1").bootstrapTable('showColumn', 'fileNamesAndIdsPic');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('showColumn', 'doMenoth');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('showColumn', 'checkFlag');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('showColumn', 'auditOpinion');//隐藏上述taskName列
                    $("#reportTable1").bootstrapTable('showColumn', 'fileNamesAndIds');//隐藏上述taskName列
                }

             if($("#disableFlag").val()==1){
                 $("#reportTable1").bootstrapTable('hideColumn', 'quotationNumber');//隐藏上述quotationNumber列
                 $("#reportTable1").bootstrapTable('hideColumn', 'projectName');//隐藏上述projectName列
                 $("#reportTable1").bootstrapTable('hideColumn', 'departmentName');//隐藏上述departmentName列
                 $("#reportTable1").bootstrapTable('hideColumn', 'quotationMethod');//隐藏上述quotationMethod列
                 $("#reportTable1").bootstrapTable('hideColumn', 'replyDate');//隐藏上述replyDate列
                 $("#reportTable1").bootstrapTable('hideColumn', 'employeeName');//隐藏上述employeeName列
             }else{
                 $("#reportTable1").bootstrapTable('showColumn', 'quotationNumber');//隐藏上述quotationNumber列
                 $("#reportTable1").bootstrapTable('showColumn', 'projectName');//隐藏上述projectName列
                 $("#reportTable1").bootstrapTable('showColumn', 'departmentName');//隐藏上述departmentName列
                 $("#reportTable1").bootstrapTable('showColumn', 'quotationMethod');//隐藏上述quotationMethod列
                 $("#reportTable1").bootstrapTable('showColumn', 'replyDate');//隐藏上述replyDate列
                 $("#reportTable1").bootstrapTable('showColumn', 'employeeName');//隐藏上述employeeName列
             }
              if(taskName == "工程报价" && $("#disableFlag").val()==1 ){
                  $("#reportTable1").bootstrapTable('showColumn', 'auditOpinion');//隐藏上述taskName列
              }else{
                  $("#reportTable1").bootstrapTable('hideColumn', 'auditOpinion');//隐藏上述taskName列
              }
          },
            formatNoMatches: function(){
                return '无符合条件的记录';
            }
        });
        //服务端分页调用方法
    function queryParams1(params) {
        console.log(params);
        var json = {
            pageSize: params.limit, // 每页显示数量
            offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
            name: params.sort,
            order: params.order
        };
        return json;
    }

/*************************技术部成本组、技术部工艺组、技术部领导 start**************************/
$('#reportTable2').bootstrapTable({
    url:"../ProcessController/getDataDoorsByJson?returnCode="+$("#returnCode").val()+"&taskName="+$("#taskName").val() ,
    method: 'post',
       dataType: "json",
       dataField: 'rows',
       striped: true,//设置为 true 会有隔行变色效果
       undefinedText: "空",//当数据为 undefined 时显示的字符
       pagination: true, //设置为 true 会在表格底部显示分页条。
       showToggle: "true",//是否显示 切换试图（table/card）按钮
       showColumns: "true",//是否显示 内容列下拉框
       pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 20,//每页的记录行数（*）
        pageList: [20, 100, 200],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
            checkbox: true,
            visible: true
        },
        {
            field:"id",
            visible: false,
             title:"id"
        },{
            field:"userId",
            visible: false
        },
        {
              field:"quoteDetailCode",
              visible: false
          },
        {
            field:"typeCode",
            visible: false
        },
        {
            field:"codeForModel",
            visible: false
        },
        {
            field:"detailsType",
            visible: false
//            title:"detailsType"
        },
        {
            field:"quotationDetailNumber",
            visible: false
//            title:"detailsType"
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
             field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle",sortable:"true"
         },
        {
            field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true"
        },
        {
            field:"craftVersionHtml",visible: false
        },/*{
           field:"craftVersion",title:"工艺版本",align:"center",valign:"middle",width : '100px',visible: false
           formatter : function(value, row, index) {

               var craftVersionsHtml = $("#craftVersionsHtml").val();
               craftVersionsHtml = craftVersionsHtml.replace(value+"\"",value+"\" selected ");
               value = craftVersionsHtml;

               var reg = RegExp(/【index】/);
               while(value.match(reg)){
                   value = value.replace("【index】",index);
               }
               return value;
              }
           } ,*/
        {
            field:"typeCode", visible: false
        },/*{
              field:"quotationDetailNumber",
              title:"报价单编号",
              width : '45px',
              align : 'center'
          },*/
        {
            field:"modelCode",title:"杠杆BOM编码",align:"center",valign:"middle",sortable:"true",width:"250px",
            formatter : function(value, row, index) {
                var str = "";
                if($("#flag").val() != 0 && taskName!="技术部成本组"){
                  str += value
                }else{
                    var str ='<div class="input-group">'+
                          '<input disabled id="modelCode'+index+'"';
                          str +=' class="form-control parsley-validated"  maxlength="32" value="'+value+'" style="background-color:#fff" />'+
                          '<span class="input-group-addon"  id="choose" onclick="chooseQuoteModel(\''+row.typeCode+'\','+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                    '</div>';
                }
                return str;
            }
        },
         {
             field:"modelName",
             visible: false,
             // title:"模型编号"
         }/*,
        {
            field:"companyName",title:"组织名称",align:"center",valign:"middle",sortable:"true",
             formatter : function(value, row, index) {
                   var str = "";
                   if($("#flag").val() != 0 && taskName!="技术部成本组"){
                     str += value
                   }else{
                       var str ='<div class="input-group">'+
                           '<input id="companyName'+index+'" class="form-control parsley-validated" value="'+value+'" maxlength="11" style="background-color:#fff" />'+
                           '<span class="input-group-addon"  id="choose" onclick="chooseCompany('+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                       '</div>';
                   }
                   return str;
             }
        },
          {
              field:"companyCode",
              visible: false/!*,
              title:"组织编号"*!/
          }*/,
        {
            field:"baseName",title:"生产基地",align:"center",valign:"middle",sortable:"true",
            formatter : function(value, row, index) {
                   var str = "";
                   if($("#flag").val() != 0 && taskName!="技术部成本组"){
                     str += value
                   }else{
                       var str ='<div class="input-group">'+
                               '<input id="baseName'+index+'" disabled class="form-control parsley-validated" value="'+value+'" maxlength="11" style="background-color:#fff" />'+
                               '<span class="input-group-addon"  id="choose" onclick="chooseBase('+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                           '</div>';
                   }
                   return str;
             }
        },
       {
           field:"baseCode",
           visible: false
       },{
            field:"color",title:"颜色",align:"center",valign:"middle",sortable:"true"
        },
       {
           field:"quoteLong",title:"长(mm)",align:"center",valign:"middle",sortable:"true"
       },
       {
           field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle",sortable:"true"
       },
       {
           field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle",sortable:"true"
       },{
            field:"wallThickness",title:"墙体厚度(mm)",align:"center",valign:"middle"
        },{
            field:"socketLength",title:"插口长度(mm)",align:"center",valign:"middle"
        },
        {
            field:"parameterString",
            visible: false
        },
        {
            field:"unit", visible: false
        },
       {
           field:"auditOpinion",title:"审核意见",align:"center",valign:"middle",sortable:"true",
           formatter : function(value, row, index) {
               var str= '<textarea id="auditOpinion'+index+'" rows="3" style="background-color:#fff"  class="letter" onblur="changeReason(\'auditOpinion\','+index+',2)"  maxlength="128">'+value+'</textarea>';
               return str;
           }
       },
        {
            field:"modelMassage1",title:"操作",align:"center",valign:"middle",sortable:"true",
            formatter : function(value, row, index) {
                var str;

                var codeForModel = row.codeForModel ;
                var type =  row.typeCode;
                var bomStyle = row.bomStyle;
                var templateCode = row.modelCode;
                var templateName = row.modelName;
                var bomClass = row.detailsTypeName;

                if(taskName == "技术部成本组" && $("#flag").val()!=0){
                    if($("#viewModelMassageMethod1").val() ==null || $("#viewModelMassageMethod1").val() ==""  || $("#viewModelMassageMethod1").val() ==undefined || $("#viewModelMassageMethod1").val() !=null && $("#viewModelMassageMethod1").val()!="" && $("#viewModelMassageMethod1").val() == 0   ){
                        str = '<button type="button" ';
                        /*if($("#flag").val() != 0 && taskName!="技术部成本组"){
                            str +=' disabled '
                        }*/
                        str +=' class="btn btn-s-xs greenbtn viewModelMassageMethod1"  onclick="modelExcelView(\''+type+'\',\''+bomStyle.trim().replace("'","").replace('\n','')+'\',\''+templateCode+'\',\''+templateName+'\',\''+bomClass+'\',\''+codeForModel+'\',1,'+index+','+row.quoteLong+','+row.quoteWidth+','+row.quoteThick+',\''+row.baseCode+'\',\''+row.color+'\',\''+row.socketLength+'\',\''+row.wallThickness+'\',\''+row.unit+'\')"">编辑BOM</button>';//
                    }else{
                        str ="-";
                    }

                }else{
                    if($("#viewModelMassageMethod0").val() ==null || $("#viewModelMassageMethod0").val() ==""  || $("#viewModelMassageMethod0").val() ==undefined || $("#viewModelMassageMethod0").val() !=null && $("#viewModelMassageMethod0").val()!="" && $("#viewModelMassageMethod0").val() == 0   ){
                        str = '<button type="button" class="btn btn-s-xs greenbtn viewModelMassageMethod0"  onclick="modelExcelView(\''+type+'\',\''+bomStyle.trim().replace("'","").replace('\n','')+'\',\''+templateCode+'\',\''+templateName+'\',\''+bomClass+'\',\''+codeForModel+'\',0,'+index+','+row.quoteLong+','+row.quoteWidth+','+row.quoteThick+',\''+row.baseCode+'\',\''+row.color+'\',\''+row.socketLength+'\',\''+row.wallThickness+'\',\''+row.unit+'\')"">查看BOM</button>';
                    }else{
                        str ="-";
                    }
                }
                return str;
            }

        }
    ],
    onLoadSuccess: function () {
         if(taskName=="技术部成本组" || taskName=="技术部工艺组" || taskName=="技术部领导" ){
             $("#reportTable2").bootstrapTable('showColumn', 'checkFlag');//隐藏上述taskName列
             $("#reportTable2").bootstrapTable('showColumn', 'auditOpinion');//隐藏上述taskName列
         }else{
             $("#reportTable2").bootstrapTable('hideColumn', 'auditOpinion');//隐藏上述taskName列
             $("#reportTable2").bootstrapTable('hideColumn', 'checkFlag');//隐藏上述taskName列
         }
    },
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

    /*************************技术部成本组、技术部工艺组、技术部领导 end**************************/


    /*************************图纸组**************************/
    $('#reportTable3').bootstrapTable({
                    url:"../ProcessController/getDataDoorsByJsonForPic?returnCode="+$("#returnCode").val()+"&taskName="+$("#taskName").val() ,
                    method: 'post',
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
                       sidePagination: "server", //服务端处理分页
                       queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
                    queryParams: queryParams3,//请求远程数据时，可以通过修改queryParams发送其他参数。
                    columns: [
                        {
                            field:"checkFlag",
                            checkbox: true,
                            visible: true
                        },
                        {
                            field:"id",
                            visible: false
                        },
                        {
                            field:"quoteDetailCode",
                            visible: false
                        }
                        ,{
                            field:"userId",
                            visible: false
//                     title:"flowFlag"
                        },
                        {
                            field:"typeCode",
                            visible: false
                        },{
                            field:"quotationDetailNumber",
                            visible: false
//            title:"detailsType"
                        },
                        {
                            field:"codeForModel",
                            visible: false
                        },{
                              field:"detailsType",
                              visible: false
                          },
                         {
                             field:"id",
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
                        },/*{
                           field:"quotationDetailNumber",
                           title:"报价单编号",
                           width : '45px',
                           align : 'center'
                       },*/
                        /* {
                             field:"detailsTypeName",title:"产品类型",align:"center",valign:"middle",sortable:"true",width : '100px',
                         },*/
                        {
                            field:"fileNamesAndIdsPic",title:"图纸关附件",align:"center",valign:"middle",sortable:"true",width : '500px',
                              formatter : function(value, row, index) {
                                   var str ='<span id="fileNamesAndIdsPic'+index+'" >';
                                   if(value!=null && value!=""){
                                       var stringArr = value.split(";");
                                       for (i = 0; i < stringArr.length; i++) {
                                            var stringArrOne = stringArr[i].split(":");
                                            str +='<a style="cursor: pointer;" title="'+stringArrOne[0]+'" class="line-limit-lengthpic" id="\''+stringArrOne[1]+'\'" onclick="downloadFile(\''+stringArrOne[1]+'\')">'+stringArrOne[0]+'</a>';
                                       }
                                   }
                                   str+='</span>';
                                  return str
                              }
                      },{
                          field:"fileIdPic",
                          visible: false
                      },
                      {
                          field:"auditOpinion",title:"审核意见",align:"center",valign:"middle",sortable:"true",width:"600px",
                          formatter : function(value, row, index) {
                              var str= '<textarea id="auditOpinion'+index+'" rows="3" style="background-color:#fff;width: 100%;"  class="letter" onblur="changeReason(\'auditOpinion\','+index+',3)"  maxlength="128">'+value+'</textarea>';
                              return str;
                          }
                      },
                        {
                             field:"doMenoth",title:"操作",align:"center",valign:"middle",sortable:"true",width:"150px",
                             formatter : function(value, row, index) {
                                 var str ="-";
                                 if($("#uploadFileMethod1").val() ==null || $("#uploadFileMethod1").val() ==""  || $("#uploadFileMethod1").val() ==undefined || $("#uploadFileMethod1").val() !=null && $("#uploadFileMethod1").val()!="" && $("#uploadFileMethod1").val() == 0   ){
                                     str = '<button type="button" ';
                                     if($("#flag").val() == 0){
                                         str +=' disabled '
                                     }
                                     str +=' class="btn btn-s-xs greenbtn uploadFileMethod1"  onclick="uploadFile(\''+row.id+'\','+index+',3)"">上传相关附件</button>';
                                 }
                                 return str;
                             }
                         }
                    ],onLoadSuccess: function () {
                          if(taskName=="技术部图纸组"){
                              $("#reportTable3").bootstrapTable('showColumn', 'doMenoth');//隐藏上述taskName列
                              $("#reportTable3").bootstrapTable('showColumn', 'checkFlag');//隐藏上述taskName列
                              $("#reportTable3").bootstrapTable('showColumn', 'auditOpinion');//隐藏上述taskName列
                              $("#reportTable3").bootstrapTable('showColumn', 'fileNamesAndIdsPic');//隐藏上述taskName列
                          }else{
                              $("#reportTable3").bootstrapTable('hideColumn', 'doMenoth');//隐藏上述taskName列
                              $("#reportTable3").bootstrapTable('hideColumn', 'checkFlag');//隐藏上述taskName列
                              $("#reportTable3").bootstrapTable('hideColumn', 'auditOpinion');//隐藏上述taskName列
                              $("#reportTable3").bootstrapTable('hideColumn', 'fileNamesAndIdsPic');//隐藏上述taskName列
                          }
                    },
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

    /*************************获取报价结果**************************/
    if(taskName=='工程报价' && ($("#returnFlowFlag").val()==3 || $("#returnFlowFlag").val()==1) ||taskName=='技术部成本组' || taskName=='技术部工艺组' || taskName=='技术部领导'){
        getResultTable("",$("#forModelCodeMiddle").val());
    }
});
//onput事件触发update,单元格数据重新渲染
function changeReason(fieldName,indexNumber,flag){
    var value = $("#"+fieldName+indexNumber).val();
    if(flag==1){
        $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==2){
        $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==3){
       $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }
}
//产品大类change事件，重新绚烂
function bomTypeOnesChange(fieldName,indexNumber,flag){
    var value = $("#"+fieldName+indexNumber).val();
    if(flag==1){
         $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==2){
         $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==3){
         $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }
}


//设置模型参数
function  viewModelMassage(quoteLong,quoteWidth,quoteThick,modelCode,quoteDetailCode,codeForModel,flag,indexNumber){
   /* if(modelCode==null || modelCode == "" || modelCode == undefined){
        layer.msg("填写参数前，请选择相应的模型。", {icon:5, anim:6, time: 3000});
        return;
    }*/
    parent.layer.open({
        type: 2,
        title: ['设置模型参数', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1, //BasicFileController
        content: '../ProcessController/viewModelMassage?quoteDetailCode='+quoteDetailCode+"&modelCode="+modelCode+"&flag="+flag+"&quoteLong="+quoteLong+"&quoteWidth="+quoteWidth+"&quoteThick="+quoteThick+"&codeForModel="+codeForModel+"&menuid="+$("#menuid").val(),
        end:function(){
            var parameterString = JSON.parse($("#parameterString").val());
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "parameterString", value: parameterString});
        }
    });
}
//设置模型数据
function modelExcelView(type,bomStyle,templateCode,templateName,bomClass,codeForModel,flag,indexNumber,quoteLong,quoteWidth,quoteThick,baseCode,color,socketLength,wallThickness,units){
    /*if(templateCode==null || templateCode == "" || templateCode == undefined){
        layer.msg("填写参数前，请选择相应的模型。", {icon:5, anim:6, time: 3000});
        return;
    }*/
    // craftVersions = craftVersions.replace(/#/g,"|");

    var json = {bomColors:color};
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
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
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else{
                if(result.flag==0 && (templateCode==null || templateCode == "" || templateCode == undefined)){
                    layer.msg("该条记录，没有生产过单据bom，请先选择对应的杠杆bom", {icon : 5, anim : 6, time : 3000});
                }else{
                    if(type == "KQ" && (baseCode==null || baseCode == undefined || baseCode == "") ){
                        layer.msg("产品大类为烤漆时，请选择生产基地信息。", {icon : 5, anim : 6, time : 3000});
                        return;
                    }else if(type != "KQ" && baseCode!=null && baseCode != undefined && baseCode != ""){
                        layer.msg("产品大类不为为烤漆时，不能选择生产基地信息。", {icon : 5, anim : 6, time : 3000});
                        return;
                    }
                    /*if(companyName==null || companyName == undefined || companyName == ""){
                        layer.msg("请先选择明细记录对应的组织名称信息。", {icon : 5, anim : 6, time : 3000});
                        return;
                    }*/
                    //保存页面数据
                    save();
                    var menuid =  $("#menuid").val() ;
                    var progarm = "?type="+type+"&bomStyles="+bomStyle+"&flag="+flag+"&templateCode="+templateCode+"&templateName="+templateName+"&bomClasss="+bomClass
                        +"&codeForModels="+codeForModel+"&menuid="+menuid+"&modelCode=" + beforeModelCode+"&bomLongs=" + quoteLong+"&bomWidths=" + quoteWidth+"&bomThicks=" + quoteThick+"&baseCode=" + baseCode+"&bomColors=" + color+"&socketLengths=" + socketLength+"&wallThicknesss=" + wallThickness+"&units=" + units;
                    var url ="../ExcelPlugController/excelPage" + progarm;
                    // window.open(url, "_blank", "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
                    window.open(url ,'_blank');

                }
            }
        }
    });
}

/**
 *  旧modelCode
 * @type {null}
 */
var beforeModelCode = null ;

//选择产品类型
function chooseQuoteModel(bomTypeOnes,indexNumber,flag){
   parent.layer.open({
       type: 2,
       title: ['杠杆BOM列表', 'font-size:18px;color:#788188;'],
       area : ['800px', '600px'],
       closeBtn: 1, //BasicFileController
       content: '../basicFileController/chooseboms?flag='+$("#flag").val()+"&batchFlag="+0, // chooseBomType
       end:function(){
            var modelCode = $("#bomcode").val();
            var modelName = $("#bomname").val();
            // 获取 modelCode
            var data = $("#reportTable2").bootstrapTable('getData');
            beforeModelCode = data[indexNumber].modelCode ;
            console.log(modelCode);
            console.log(modelName);
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "modelCode", value: modelCode});
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "modelName", value: modelName});
       }
   });
}

/*bootstrap table 表单操作相关*/
 //选择报价单中的组织信息
function chooseCompany(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['组织列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseCompany',
        end:function(){
            if($("#companyChooseFlag").val()==0){
                $("#companyCode").val("");
                $("#companyName").val("");
            }else{
                $("#companyChooseFlag").val(0);
            }
            var companyCode = $("#companyCode").val();
            var companyName = $("#companyName").val();
            console.log(companyCode);
            console.log(companyName);
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "companyName", value: companyName});
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "companyCode", value: companyCode});
        }
    });
}
//选择报价单中的生产基地
function chooseBase(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['生产基地列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBase', //chooseBOMSeries
        end:function(){
            if($("#baseChooseFlag").val()==0){
                $("#baseCode").val("");
                $("#baseName").val("");
            }else{
                $("#baseChooseFlag").val(0);
            }
            var baseCode = $("#baseCode").val();
            var baseName = $("#baseName").val();
            console.log(baseCode);
            console.log(baseCode);
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "baseName", value: baseName});
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "baseCode", value: baseCode});
        }
    });
}

//重新计算页面尺寸
function resizewindow(){
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
});

//返回
function back() {
    post("../ProcessController/quoteDetails",{menuid:$("#menuid").val()})
}
//驳回
var ajax;
var fileLineId = new Array();// 声明一个数组，存放要删除的门扇
//上传附件
function  uploadFile(id,indexNumber,flag){
    var fileIds = "" ;
    var type = 0;
    //获取所有的表单上面的附件的id
    if(flag==1){
        type = 0;
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable1 #fileNamesAndIds"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
            if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
                fileIds +=$(this).attr("id")+";";
            }
        });
    } else if(flag==3){
        type = 1;
        //获取所有的bootstrap table a标签中的附件表id信息
        var rowalables =  $("#reportTable3 #fileNamesAndIdsPic"+indexNumber+" a " );
        //取出a标签中的附件表id信息
        $(rowalables).each(function () {// 通过获得别选中的来进行遍历，为以后多条赋值预留
           if($(this).attr("id")!=null && $(this).attr("id")!="" && $(this).attr("id")!="undefined" && $(this).attr("id")!=undefined){
               fileIds +=$(this).attr("id")+";";
           }
        });
    }
    parent.layer.open({
        type: 2,
        title: ['流程附件导入', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/importQuoteFile?fileIds='+fileIds+'&type='+type, //chooseBOMSeries
        end:function(){
         var fileNamesAndIds = $("#fileNamesAndIds").val();
         var fileIds = $("#fileIds").val();
         if(flag==1){
             $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIds", value: fileNamesAndIds});
             $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: "fileId", value: fileIds});
         }else if(flag==3){
             $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "fileNamesAndIdsPic", value: fileNamesAndIds});
             $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: "fileIdPic", value: fileIds});
         }
        }
    });
}




var returnFlag = 0 ;//判断
var emptyFlag = 0 ;//判断
//提交
function flowProcess(approveFlag){
    returnFlag =0 ;
    emptyFlag =0;
    var taskName = $("#taskName").val();
    if(approveFlag == 1 && $("#reportTable1").bootstrapTable('getData').length!=$("#reportTable4").bootstrapTable('getData').length && $("#taskName").val()=="技术部成本组"){
        layer.msg("生成的报价结果条数和报价明细表记录数不匹配，请确认。", {icon:5, anim:6, time: 3000});
        return;
    }
    //业务员确认报价或者技术部领导审核
    if((taskName=='工程报价' && $("#returnFlowFlag").val() == 3 || taskName == "技术部领导") && approveFlag==1){//为提交
        var infoResult = $("#reportTable4").bootstrapTable('getData');
        getResultMassage(infoResult);
        if(returnFlag == 1){
            return;
        }
    }
    var returnFlowTask;
    var massage ="";
    if(approveFlag==1){//提交
        returnFlowTask = 0;
        massage ="确定将该流程提交到下一个节点吗？";
    }else if(approveFlag==0){//驳回
        returnFlowTask = $("#returnFlowTask").val();
        if(returnFlowTask==0){
            layer.msg("驳回操作请先选择要驳回到的节点。", {icon:5, anim:6, time: 3000});
            return;
        }
        massage ="确定将该流程驳回到上一个节点吗？";
    }

    layer.confirm(massage, {icon: 3, title:false},function(index1){
        layer.close(index1);
        var jsonMiddle ;
        var data = {doorLeafList: []};
        var infoMS;
        if(taskName=="工程报价"){
            infoMS = $("#reportTable1").bootstrapTable('getData');
            if(infoMS==null || infoMS=="" || infoMS==undefined ){
               layer.msg("工程报价表单至少需要一条数据，至少需要有一条明细数据。", {icon:5, anim:6, time: 3000});
               return;
            }
            getObjects(infoMS,1,data)
            jsonMiddle = JSON.stringify(data);
        }else if(taskName=="技术部图纸组"){
            infoMS = $("#reportTable3").bootstrapTable('getData');
            if(infoMS==null || infoMS=="" || infoMS==undefined ){
                layer.msg("技术部图纸组表单至少需要一条数据，至少需要有一条明细数据。", {icon:5, anim:6, time: 3000});
                return;
            }
            getObjects3(infoMS,1,data)
            jsonMiddle = JSON.stringify(data);
        }else if(taskName=="技术部成本组" ||taskName=="技术部工艺组" || taskName=="技术部领导"){
            if(taskName=="技术部成本组" && returnFlowTask ==0 && (getResultFlag==null || getResultFlag=="" || getResultFlag==undefined || getResultFlag != true)){
                layer.msg("请先生成报价再点击提交。", {icon:5, anim:6, time: 3000});
                return;
            }
            infoMS = $("#reportTable2").bootstrapTable('getData');
            if(infoMS==null || infoMS=="" || infoMS==undefined ){
                layer.msg("技术部成本组表单至少需要一条数据，至少需要有一条明细数据。", {icon:5, anim:6, time: 3000});
                return;
            }
            var infoMSAll = $("#reportTable4").bootstrapTable('getData');
            if(infoMS==null || infoMS=="" || infoMS==undefined ){
                layer.msg("请在技术部成本组节点获取所有的表单报价汇总信息。", {icon:5, anim:6, time: 3000});
                return;
            }
            getObjects2(infoMS,1,data)
            jsonMiddle = JSON.stringify(data);
        }
        if(returnFlag==1){
            return;
        }
        if(emptyFlag==0 && returnFlowTask!=0){
            layer.msg("驳回必须填写记录中的审核意见信息。", {icon:5, anim:6, time: 3000});
            return;
        }
        var formData = new FormData();
        formData.append("jsonMiddle", jsonMiddle);//表单明细内容
        formData.append("taskName", taskName);//当前节点名称
        if($("#returnFlowTask").val() ==null || $("#returnFlowTask").val() =="" || $("#returnFlowTask").val() ==undefined || $("#returnFlowTask").val() =="undefined" || approveFlag==1){
            returnFlowTask = 0;
        }else{
            returnFlowTask = $("#returnFlowTask").val();
        }
        formData.append("returnFlowTask", returnFlowTask);//当前节点名称
        // return;
        submitMsg(formData);
    });
}

function getResultMassage(info){
    for (var i = 0; i < info.length; i++) {

        if(info[i].unitPrice==null || info[i].unitPrice == "" || info[i].unitPrice == "undefined" ||info[i].unitPrice == undefined){
            layer.msg("报价结果表的第"+(i+1)+"行记录，人工费用未生成请确认。", {icon:5, anim:6, time: 3000});
            returnFlag = 1;
            return;
        }
        if(info[i].socialSecurityBenefits==null || info[i].socialSecurityBenefits == "" || info[i].socialSecurityBenefits == "undefined" ||info[i].socialSecurityBenefits == undefined ){
            layer.msg("报价结果表的第"+(i+1)+"行记录，社保福利费未生成请确认。", {icon:5, anim:6, time: 3000});
            returnFlag = 1;
            return;
        }
        if(info[i].normalElectricityBill==null || info[i].normalElectricityBill == "" || info[i].normalElectricityBill == "undefined" ||info[i].normalElectricityBill == undefined ){
            layer.msg("报价结果表的第"+(i+1)+"行记录，正常电费未生成请确认。", {icon:5, anim:6, time: 3000});
            returnFlag = 1;
            return;
        }
        if(info[i].totalVariableCosts==null || info[i].totalVariableCosts == "" || info[i].totalVariableCosts == "undefined" ||info[i].totalVariableCosts == undefined ){
            layer.msg("报价结果表的第"+i(i+1)+"行记录，可变成本未生成请确认。", {icon:5, anim:6, time: 3000});
            returnFlag = 1;
            return;
        }
        if(info[i].totalCost==null || info[i].totalCost == "" || info[i].totalCost == "undefined" ||info[i].totalCost == undefined ){
            layer.msg("报价结果表的第"+(i+1)+"行记录，总成本未生成请确认。", {icon:5, anim:6, time: 3000});
            returnFlag = 1;
            return;
        }
    }
}

/*工程报价*/
function getObjects(info,flag,data){
    for (var i = 0; i < info.length; i++) {
        var timeSet = new Object();
        timeSet.id = info[i].id;
        timeSet.typeCode = info[i].typeCode;
        timeSet.bomStyle = info[i].bomStyle;
        timeSet.color = info[i].color;
        timeSet.paint = info[i].paint;
        timeSet.quoteLong = info[i].quoteLong;
        timeSet.quoteWidth = info[i].quoteWidth;
        timeSet.quoteThick = info[i].quoteThick;
        timeSet.wallThickness = info[i].wallThickness;
        timeSet.socketLength = info[i].socketLength;
        timeSet.unit = info[i].unit;
        timeSet.memo = info[i].memo;
        timeSet.userId = info[i].userId;
        timeSet.quoteDetailCode = info[i].quoteDetailCode;
        timeSet.auditOpinion = info[i].auditOpinion;
        timeSet.quotationDetailNumber = info[i].quotationDetailNumber;
        if(info[i].auditOpinion!=null && info[i].auditOpinion!="" && info[i].auditOpinion!=undefined){
            emptyFlag=1;
        }
        timeSet.flowFlag = info[i].flowFlag;
        if(info[i].fileId==null || info[i].fileId == "" || info[i].fileId == "undefined" ||info[i].fileId == undefined ){
            // layer.msg("工程报价单明细表的第"+i+"行记录，未上传附件。", {icon:5, anim:6, time: 3000});
            // returnFlag = 1;
        }
        timeSet.fileId = info[i].fileId;
        data.doorLeafList.push(timeSet);
    }
}
/*技术部成本组*/
function getObjects2(info,flag,data){
    for (var i = 0; i < info.length; i++) {
        var timeSet = new Object();
        timeSet.id = info[i].id;
        timeSet.modelName = info[i].modelName;
        timeSet.modelCode = info[i].modelCode;
        timeSet.typeCode = info[i].typeCode;
        timeSet.companyName = info[i].companyName;
        timeSet.companyCode = info[i].companyCode;
        timeSet.baseName = info[i].baseName;
        timeSet.baseCode = info[i].baseCode;
        timeSet.panelThickness = info[i].panelThickness;
        timeSet.fillingMethod = info[i].fillingMethod;
        timeSet.linerFlag = info[i].linerFlag;
        timeSet.hingeShimFlag = info[i].hingeShimFlag;
        timeSet.catEyeHoleFlag = info[i].catEyeHoleFlag;
        timeSet.packingMethod = info[i].packingMethod;
        timeSet.quoteDetailCode = info[i].quoteDetailCode;
        // timeSet.craftVersion = info[i].craftVersion;
        timeSet.auditOpinion = info[i].auditOpinion;
        timeSet.quotationDetailNumber = info[i].quotationDetailNumber;
        timeSet.userId = info[i].userId;
        if(info[i].auditOpinion!=null && info[i].auditOpinion!="" && info[i].auditOpinion!=undefined){
            emptyFlag=1;
        }
        data.doorLeafList.push(timeSet);
    }
}
/*技术部图纸组*/
function getObjects3(info,flag,data){
    for (var i = 0; i < info.length; i++) {
        var timeSet = new Object();
        timeSet.id = info[i].id;
        timeSet.typeCode = info[i].typeCode;
        timeSet.quoteDetailCode = info[i].quoteDetailCode;
        timeSet.auditOpinion = info[i].auditOpinion;
        timeSet.userId = info[i].userId;
        timeSet.quotationDetailNumber = info[i].quotationDetailNumber;
        if(info[i].auditOpinion!=null && info[i].auditOpinion!="" && info[i].auditOpinion!=undefined){
            emptyFlag=1;
        }
        if(info[i].fileId==null || info[i].fileId == "" || info[i].fileId == "undefined" ||info[i].fileId == undefined ){
            // layer.msg("工程报价单明细表的第"+i+"行记录，未上传附件。", {icon:5, anim:6, time: 3000});
            // returnFlag = 1;
        }
        timeSet.fileIdPic = info[i].fileIdPic;
        data.doorLeafList.push(timeSet);
    }
}



function  submitMsg(formData){
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/reviewQuotationProcess";/*saveDataDoors*/
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
                    post("../ProcessController/quoteDetails",{menuid:$("#menuid").val()})
//                });
            }
        }
    });
}
var getResultFlag;
//获取报价单信息
function getModelResult(){
    var reportTable2 = $("#reportTable2").bootstrapTable('getSelections');
     if(reportTable2.length==0){
        layer.msg("请选择成本组审核表单中，要生成报价结果得记录。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    // layer.confirm("确认生成报价单吗，如果已经存在生成的结果，之前的结果将被覆盖？", {icon: 3, title:false},function(index1){
    //     layer.close(index1);
        var codeForModels = "";
        for (var i = 0; i < reportTable2.length; i++) {
            if(reportTable2[i].codeForModel!=null && reportTable2[i].codeForModel !=undefined && reportTable2[i].codeForModel !="undefined" && reportTable2[i].codeForModel!=""){
                codeForModels+=reportTable2[i].codeForModel+";"
            }
        }

        getResultTable("",codeForModels);
        getResultFlag = 1;
    // });
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




//为报价单批量设置杠杆bom
function chooseLeverageBom(){
    var reportTable2 = $("#reportTable2").bootstrapTable('getSelections');
    if(reportTable2.length==0){
        layer.msg("请选择成本组审核表单中，要批量编辑BOM的记录。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var codeForModels="";
    var bomLongs="";
    var bomWidths="";
    var bomThicks="";
    var bomStyles="";
    var bomClasss="";
    var bomColors="";
    var socketLengths="";
    var wallThicknesss="";
    var wallThicknesss="";
    var units="";
    var ids = new Array();
    var type;
    for (var i = 0; i < reportTable2.length; i++) {
        codeForModels+=reportTable2[i].codeForModel+";";
        bomLongs+=reportTable2[i].quoteLong+";";
        bomWidths+=reportTable2[i].quoteWidth+";";
        bomThicks+=reportTable2[i].quoteThick+";";
        bomStyles+=reportTable2[i].bomStyle+";";
        bomClasss+=reportTable2[i].detailsTypeName+";";
        bomColors+=reportTable2[i].color+";";
        socketLengths+=reportTable2[i].socketLength+";";
        wallThicknesss+=reportTable2[i].wallThickness+";";
        units+=reportTable2[i].unit+";";
        type = reportTable2[i].typeCode;

        ids.push(reportTable2[i].id);
    }


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
                parent.layer.open({
                    type: 2,
                    title: ['杠杆BOM列表', 'font-size:18px;color:#788188;'],
                    area : ['1200px', '600px'],
                    closeBtn: 1, //BasicFileController
                    content: '../basicFileController/chooseboms?flag='+$("#flag").val()+"&batchFlag="+1+"&type="+type,
                    end:function(){
                        var jsonDatas = {

                        };
                        if($("#bomcode").val()!=null && $("#bomcode").val()!="" && $("#bomcode").val()!=undefined){
                            jsonDatas.modelCode = $("#bomcode").val();
                        }else{
                            jsonDatas.modelCode = "";
                        }
                        if($("#bomname").val()!=null && $("#bomname").val()!="" && $("#bomname").val()!=undefined){
                            jsonDatas.modelName = $("#bomname").val();
                        }else{
                            jsonDatas.modelName = "";
                        }
                        if($("#companyCode").val()!=null && $("#companyCode").val()!="" && $("#companyCode").val()!=undefined){
                            jsonDatas.companyCode = $("#companyCode").val();
                        }else{
                            jsonDatas.companyCode = "";
                        }
                        if($("#companyName").val()!=null && $("#companyName").val()!="" && $("#companyName").val()!=undefined){
                            jsonDatas.companyName = $("#companyName").val();
                        }else{
                            jsonDatas.companyName = "";
                        }
                        if($("#baseCode").val()!=null && $("#baseCode").val()!="" && $("#baseCode").val()!=undefined){
                            jsonDatas.baseCode = $("#baseCode").val();
                        }else{
                            jsonDatas.baseCode = "";
                        }
                        if($("#baseName").val()!=null && $("#baseName").val()!="" && $("#baseName").val()!=undefined){
                            jsonDatas.baseName = $("#baseName").val();
                        }else{
                            jsonDatas.baseName = "";
                        }
                        // if($("#craftVersionsValue").val()!=null && $("#craftVersionsValue").val()!="" && $("#craftVersionsValue").val()!=undefined){
                        //     jsonDatas.craftVersion = $("#craftVersionsValue").val();
                        // }

                        if($("#chooseFlag").val()!=null && $("#chooseFlag").val()!="" && $("#chooseFlag").val()!=undefined  && $("#chooseFlag").val() == 1){

                            //遍历存放了被选行
                            for (var index = 0;index < ids.length ; index ++){
                                $('#reportTable2').bootstrapTable('updateByUniqueId', {
                                    id: ids[index],
                                    row: jsonDatas
                                });
                            }

                            editExcel(type,codeForModels,bomLongs,bomWidths,bomThicks,bomStyles,bomClasss,$("#baseCode").val(),$("#companyName").val(),bomColors,socketLengths,wallThicknesss,units);
                            $("#chooseFlag").val(0);
                        }
                    }
                });
            }
        }
    });
}
function editExcel(type,codeForModels,bomLongs,bomWidths,bomThicks,bomStyles,bomClasss,baseCode,companyName,bomColors,socketLengths,wallThicknesss,units){
    save();
    var menuid =  $("#menuid").val() ;
    var templateCode = $("#bomcode").val() ;
    if(templateCode==null || templateCode==undefined || templateCode==""){
        layer.msg("批量编辑BOM，必须选择杠杆BOM。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var templateName = $("#bomname").val() ;
    var codeForModels = codeForModels ;
    var bomLongs = bomLongs ;
    var bomWidths = bomWidths ;
    var bomThicks = bomThicks ;
    var bomStyles = bomStyles ;
    var bomClasss = bomClasss ;
    var progarm = "?flag="+1
        +"&templateCode="+templateCode
        +"&templateName="+templateName
        +"&codeForModels="+codeForModels
        +"&menuid="+menuid
        +"&bomLongs=" + bomLongs
        +"&bomWidths=" + bomWidths
        +"&bomThicks=" + bomThicks
        +"&bomStyles=" + bomStyles
        +"&bomClasss=" + bomClasss
        +"&baseCode=" + baseCode
        +"&companyName=" + companyName
        +"&type=" + type
        +"&bomColors=" + bomColors
        +"&socketLengths=" + socketLengths
        +"&wallThicknesss=" + wallThicknesss
        +"&units="+units
    ;
    // +"&craftVersions=" + craftVersions
    var url ="../ExcelPlugController/excelPage" + progarm;
    window.open(url ,'_blank');


}
//保存草稿
function save(){
        var jsonMiddle ;
        var taskName = $("#taskName").val();
        var data = {doorLeafList: []};
        var infoMS;
        if(taskName=="工程报价"){
            infoMS = $("#reportTable1").bootstrapTable('getData');
            getObjects(infoMS,1,data);
            jsonMiddle = JSON.stringify(data);
        }else if(taskName=="技术部图纸组"){
            infoMS = $("#reportTable3").bootstrapTable('getData');
            getObjects3(infoMS,1,data);
            jsonMiddle = JSON.stringify(data);
        }else if(taskName=="技术部成本组" ||taskName=="技术部工艺组" || taskName=="技术部领导"){
            infoMS = $("#reportTable2").bootstrapTable('getData');
            var infoMSAll = $("#reportTable4").bootstrapTable('getData');
            getObjects2(infoMS,1,data);
            jsonMiddle = JSON.stringify(data);
        }
        var formData = new FormData();
        formData.append("jsonMiddle", jsonMiddle);//表单明细内容
        // formData.append("taskName", taskName);//当前节点名称
        saveDraft(formData);
}
function  saveDraft(formData){
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveDraft";/*reviewQuotationProcess*/
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
        }
    });
}
//获取人工费用
function getPersonCost(){
    var reportTable2 = $("#reportTable2").bootstrapTable('getSelections');
    if(reportTable2.length==0){
        layer.msg("请选择成本组审核表单中，要获取人工费用的记录。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var codeForModels="";
    for (var i = 0; i < reportTable2.length; i++) {
        codeForModels+=reportTable2[i].codeForModel+";";
    }
    var index1=layer.load(1,{
        shade:[0.5,'#fff']
    });
    var json = {codeForModels:codeForModels};
    var request = "../ExcelPlugController/getPersonCost";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        beforeSend:function(){
            jQuery('#loading1').showLoading();
        },
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index1);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else{
                getResultTable("",$("#forModelCodeMiddle").val());
            }
        },
        complete: function () {
            jQuery('#loading1').hideLoading();
        },
    });
}
//获取制造费用
function getManufacturingCosts(){
    var reportTable2 = $("#reportTable2").bootstrapTable('getSelections');
    if(reportTable2.length==0){
        layer.msg("请选择成本组审核表单中，要生成制造费用的记录。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var codeForModels="";
    for (var i = 0; i < reportTable2.length; i++) {
        codeForModels+=reportTable2[i].codeForModel+";";
    }

    var codeForModels="";
    for (var i = 0; i < reportTable2.length; i++) {
        codeForModels+=reportTable2[i].codeForModel+";";
    }
    var index1=layer.load(1,{
        shade:[0.5,'#fff']
    });
    var json = {codeForModels:codeForModels};
    var request = "../ExcelPlugController/setManufacturingCosts";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        beforeSend:function(){
            jQuery('#loading1').showLoading();
        },
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index1);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else{
                getResultTable("",$("#forModelCodeMiddle").val());
            }
        },
        complete: function () {
            jQuery('#loading1').hideLoading();
        },
    });
}