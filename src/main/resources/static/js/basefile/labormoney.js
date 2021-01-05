var $window = $(window);
$window.resize(function() {
    resizeWindow();
});

var maxIds1 = 0;
var maxIds2 = 0;
var maxIds3 = 0;
var maxIds4 = 0;
$(function() {
    resizeWindow();

    /*门套*/
    $('#reportTable2').bootstrapTable({
        url:"../ProcessController/getDataDoors?type="+2+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,//每页的记录行数（*）
        pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
        queryParams: queryParams2,//请求远程数据时，可以通过修改queryParams发送其他参数。
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
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    return index + 1;
                }
            },
            {
                field:"typeCode",title:"产品大类",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str ='<select  id="typeCode'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'typeCode\','+index+',2)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="0" ';
                    if(value==0){
                        str+=' selected="selected" ';
                    }
                    str+='>免漆</option>';
                    str+='<option value="1" ';
                    if(value==1){
                        str+=' selected="selected" ';
                    }
                    str+='>烤漆</option>';
                    str+='<option value="2" ';
                    if(value==2){
                        str+=' selected="selected" ';
                    }
                    str+='>防火门</option>';
                    str+='</select>';
                    return str;
                }
            },
            {
                field:"needDrawFlag",title:"是否需要图纸组协助",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str ='<select  id="needDrawFlag'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'needDrawFlag\','+index+',2)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="0" ';
                    if(value==0){
                        str+=' selected="selected" ';
                    }
                    str+='>是</option>';
                    str+='<option value="1" ';
                    if(value==1){
                        str+=' selected="selected" ';
                    }
                    str+='>否</option>';
                    str+='</select>';
                    return str;
                }
            },
            /*{
                field:"modelName",title:"模型名称",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                            var str ='<div class="input-group">'+
                                  '<input id="modelName'+index+'" class="form-control parsley-validated" maxlength="11" style="background-color:#fff;font-size:15px" />'+
                                  '<span class="input-group-addon"  id="choose" onclick="chooseQuoteModel('+row.bomTypeOnes+','+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                            '</div>';
                            return str;
                }
            },
             {
                 field:"modelCode",
                 visible: false,
                 title:"模型编号"
             },*/
            /*{
                field:"companyName",title:"组织名称",align:"center",valign:"middle",sortable:"true",
                 formatter : function(value, row, index) {
                      var str ='<div class="input-group">'+
                           '<input id="companyName'+index+'" class="form-control parsley-validated" maxlength="11" style="background-color:#fff;font-size:15px" />'+
                           '<span class="input-group-addon"  id="choose" onclick="chooseCompany('+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                       '</div>';
                       return str;
                 }
            },
              {
                  field:"companyCode",
                  visible: false,
                  title:"组织编号"
              },
            {
                field:"baseName",title:"生产基地",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                      var str ='<div class="input-group">'+
                           '<input id="baseName'+index+'" class="form-control parsley-validated" maxlength="11" style="background-color:#fff;font-size:15px" />'+
                           '<span class="input-group-addon"  id="choose" onclick="chooseBase(\''+row.companyCode+'\','+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                       '</div>';
                       return str;
                 }
            },
           {
               field:"baseCode",
               visible: false,
               title:"生产基地编号"
           },*/
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="bomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',2)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="color'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',2)" maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"paint",title:"油漆",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="paint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',2)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"quoteLong",title:"门套长(毫米)",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="quoteLong'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',2)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"quoteWidth",title:"门套宽(毫米)",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="quoteWidth'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',2)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"quoteThick",title:"门套厚(毫米)",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="quoteThick'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',2)" maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            /*{
                field:"needGlass",title:"是否需要玻璃",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str ='<select  id="needGlass'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'needGlass\''+index+',2)">'+
                               '<option value="">---请选择---</option>'+
                               '<option value="0" ';
                                if(value==0){
                                    str+=' selected="selected" ';
                                }
                               str+='>是</option>';
                               str+='<option value="1" ';
                               if(value==1){
                                   str+=' selected="selected" ';
                               }
                              str+='>否</option>';
                           str+='</select>';
                  return str;
                }

            },*/
            {
                field:"unit",title:"单位",align:"center",valign:"middle",sortable:"true" ,
                formatter : function(value, row, index) {
                    return '<input id="unit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',2)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',2)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"filename2",title:"图纸附件",align:"center",valign:"middle",sortable:"true"
            },
            {
                field:"",title:"操作",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<button type="button" class="btn btn-s-xs greenbtn" onclick="uploadFile()">上传相关附件</button>';
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
        url:"../ProcessController/getDataDoors?type="+3+"&processCode="+$("#processCode").val(),
        method: 'get',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,//每页的记录行数（*）
        pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
                checkbox: true
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
            },
            {
                field:"typeCode",title:"产品大类",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str ='<select  id="typeCode'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'typeCode\','+index+',3)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="0" ';
                    if(value==0){
                        str+=' selected="selected" ';
                    }
                    str+='>免漆</option>';
                    str+='<option value="1" ';
                    if(value==1){
                        str+=' selected="selected" ';
                    }
                    str+='>烤漆</option>';
                    str+='<option value="2" ';
                    if(value==2){
                        str+=' selected="selected" ';
                    }
                    str+='>防火门</option>';
                    str+='</select>';
                    return str;
                }
            },{
                field:"needDrawFlag",title:"是否需要图纸组协助",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str ='<select  id="needDrawFlag'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'needDrawFlag\','+index+',3)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="0" ';
                    if(value==0){
                        str+=' selected="selected" ';
                    }
                    str+='>是</option>';
                    str+='<option value="1" ';
                    if(value==1){
                        str+=' selected="selected" ';
                    }
                    str+='>否</option>';
                    str+='</select>';
                    return str;
                }
            },
            /*{
                field:"modelName",title:"模型名称",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                            var str ='<div class="input-group">'+
                                  '<input id="modelName'+index+'" class="form-control parsley-validated" maxlength="11" style="background-color:#fff;font-size:15px" />'+
                                  '<span class="input-group-addon"  id="choose" onclick="chooseQuoteModel('+row.bomTypeOnes+','+index+',3)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                            '</div>';
                            return str;
                }
            },
             {
                 field:"modelCode",
                 visible: false,
                 title:"模型编号"
             },*/
            /*{
                field:"companyName",title:"组织名称",align:"center",valign:"middle",sortable:"true",
                 formatter : function(value, row, index) {
                      var str ='<div class="input-group">'+
                           '<input id="companyName'+index+'" class="form-control parsley-validated" maxlength="11" style="background-color:#fff;font-size:15px" />'+
                           '<span class="input-group-addon"  id="choose" onclick="chooseCompany('+index+',3)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                       '</div>';
                       return str;
                 }
            },
              {
                  field:"companyCode",
                  visible: false,
                  title:"组织编号"
              },
            {
                field:"baseName",title:"生产基地",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                      var str ='<div class="input-group">'+
                           '<input id="baseName'+index+'" class="form-control parsley-validated" maxlength="11" style="background-color:#fff;font-size:15px" />'+
                           '<span class="input-group-addon"  id="choose" onclick="chooseBase(\''+row.companyCode+'\','+index+',3)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                       '</div>';
                       return str;
                 }
            },
           {
               field:"baseCode",
               visible: false,
               title:"生产基地编号"
           },*/
            {
                field:"bomStyle",title:"款式/型号",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="bomStyle'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'bomStyle\','+index+',3)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"color",title:"颜色",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="color'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'color\','+index+',3)" maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"paint",title:"油漆",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="paint'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'paint\','+index+',3)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"quoteLong",title:"线条长(毫米)",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="quoteLong'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteLong\','+index+',3)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"quoteWidth",title:"线条宽(毫米)",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="quoteWidth'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteWidth\','+index+',3)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"quoteThick",title:"线条厚(毫米)",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="quoteThick'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'quoteThick\','+index+',3)" maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            /*{
                field:"needGlass",title:"是否需要玻璃",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str ='<select  id="needGlass'+index+'"   class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'needGlass\''+index+',3)">'+
                               '<option value="">---请选择---</option>'+
                               '<option value="0" ';

                                if(value==0){
                                    str+=' selected="selected" ';
                                }
                               str+='>是</option>';
                               str+='<option value="1" ';
                               if(value==1){
                                   str+=' selected="selected" ';
                               }
                              str+='>否</option>';
                           str+='</select>';
                  return str;
                }

            },*/
            {
                field:"unit",title:"单位",align:"center",valign:"middle",sortable:"true" ,
                formatter : function(value, row, index) {
                    return '<input id="unit'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'unit\','+index+',3)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"memo",title:"生产单备注",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'memo\','+index+',3)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"filename2",title:"图纸附件",align:"center",valign:"middle",sortable:"true"
            },
            {
                field:"",title:"操作",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<button type="button" class="btn btn-s-xs greenbtn" onclick="uploadFile()">上传相关附件</button>';
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
});

function select(){
    var names=$("#selectbomname").val();
    var valuees=$("#selectvarvalue").val();
    console.log(valuees);
    allchengbentrend(names,valuees);
}
//左侧列表加载详情
function allchengbentrend(name,value){
    $("#mytable").bootstrapTable('destroy');
    $("#mytable").bootstrapTable({
        method : 'get',
        url: "../basicFileController/getalllabor?name="+name+"&value="+value,
        //url:"http://localhost:80/api/User/GetList",   //请求地址
        striped : false, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        pageList : [ 5, 10, 20],//可选择单页记录数
        showRefresh : false,//刷新按钮
        responseHandler:function(res){
                              return res.data;},
        queryParams : function(params) {//上传服务器的参数
            return { pageSize : 100 };
        },
        onClickRow:function (row,$element) {
            rightload(row.id);
            // window.location.href="chengben_detail.html?ID=" + row.id +"&name=" + row.name ;
        },
        columns:[
            {
                field:"checkFlag",
                checkbox: true
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
            },
            {
                field:"modelName",title:"Bom名称",align:"center",valign:"middle",sortable:"true",
            },
            {
                field:"type",title:"Bom编码",align:"center",valign:"middle",sortable:"true",
            },
            {
                field:"baseName",title:"生产基地",align:"center",valign:"middle",sortable:"true",
            },
            {
                field:"processVersion",title:"工艺版本",align:"center",valign:"middle",sortable:"true",
            },
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        },
        onPostBody:function(data){
        }
    })
}


function rightload(id){
    $.ajax({
        url:"../basicFileController/getlaborbyId",    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data:{"id":id},    //参数值
        type:"GET",   //请求方式
        success:function(req){
            //请求成功时处理
            $('#id').val( req.data.id);
            $('#bomname').val( req.data.modelName);
            $('#bomcode').val( req.data.modelcode);
            // $('#employeeName').val( req.data.variablename);
            // $('#employeecode').val( req.data.variablecode);
            $('#varvalid').val( req.data.mvmappingID);
            // $('#varvalue').val( req.data.variablevalue);
            $('#shengchancode').val( req.data.basecode);
            $('#shengchan').val( req.data.baseName);
            $('#gongyi').val( req.data.processVersion);
            $('#replyDate').val( req.data.updated_time);
            $('#quotationMethod').val( req.data.status);
            $('#rengong').val( req.data.totallabor);
            $('#dianfei').val( req.data.totalelectricity);
            console.log('运行类表查询');
            reTypetable1(id);
            console.log('运行完毕');
            retable1(id);
        },
        error:function(){
            //请求出错处理
        }
    });
    
}
function retable1(id) {
    $('#reportTable1').bootstrapTable('destroy');
    $('#reportTable1').bootstrapTable({
        url:"../basicFileController/getlabordetails?id="+id,
       // data:{"id":id},
        method: 'get',
        dataType: "json",
        uniqueId:"id",
        // dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: false, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,//每页的记录行数（*）
        pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
        responseHandler:function(res){
            return res.data;
            },
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"id",
                visible: false
            },

            // {
            //     field:"mainID",
            //     //visible: false
            // },
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
                field:"componet",title:"部件",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="componet'+index+'" value="'+value+'"  class="form-control parsley-validated" onblur="changeReason(\'componet\','+index+',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"workprocedure",title:"工序",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="workprocedure'+index+'" value="'+value+'" class="form-control parsley-validated" onblur="changeReason(\'workprocedure\','+index+',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },

            {
                field:"labor",title:"人工",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="labor'+index+'" value="'+value+'" class="form-control parsley-validated" onkeyup="checknum(this);" onblur="changeReason(\'labor\','+index+',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"electiy",title:"电费",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="electiy'+index+'" value="'+value+'" class="form-control parsley-validated" onkeyup="checknum(this);" onblur="changeReason(\'electiy\','+index+',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
            {
                field:"memo",title:"备注",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    return '<input id="memo'+index+'" value="'+value+'" class="form-control parsley-validated"  onblur="changeReason(\'memo\','+index+',1)"  maxlength="11" style="background-color:#fff;font-size:15px" />';
                }
            },
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        },
        onLoadSuccess:function (data) {
          console.log(data);
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

}

function reTypetable1(id) {
    $('#typeTable1').bootstrapTable('destroy');
    $('#typeTable1').bootstrapTable({
        url:"../basicFileController/getLaborTypeList?id="+id,
        // data:{"id":id},
        method: 'get',
        dataType: "json",
        uniqueId:"id",
        // dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: false, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 5,//每页的记录行数（*）
        pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
        striped : true,//隔行变色
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        clickToSelect: true,  //是否启用点击选中行
        data_local: "zh-US",//表格汉化
        showColumns: false,
        sidePagination: "client", //服务端处理分页
        queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
        responseHandler:function(res){
            return res.data;
        },
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            // {
            //     field:"rowIndex",
            //     title:"序号",
            //     visible: false,
            //     formatter : function(value, row, index) {
            //         return index + 1;
            //     }
            // },
            {
                field: "id",
                visible: false
            },
            {
                field: "variablecode",
                // visible: false,
                width : '0px',
                formatter : function (value, row, index) {
                    return '<div class="input-group"><input id="employeecode'+index+'" onchange="changeReason(\'variablecode\','+index+',4)" value="'+value+'" disabled="disabled" style="background-color:#fff;font-size:15px;display: none" /></div>'
                }
            },
            {
                field: "variablename",
                title: "变量名称",
                formatter : function (value, row, index) {
                    return '<div class="input-group">'
                        +'<input id="employeeName'+index+'" value="'+value+'" class="form-control parsley-validated" disabled="disabled" onchange="changeReason(\'variablename\','+index+',4)"  maxlength="11" style="background-color:#fff;font-size:15px" />'
                        +'<span class="input-group-addon"  id="choose1'+index+'" onclick="choosevarinamelist(\'variablename\','+index+')">选择</span></div>'
                }
            },
            {
                field: "variablevalue",
                title: "变量值",
                formatter : function (value, row, index) {
                    return '<div class="input-group"><input id="varvalid'+index+'" class="form-control parsley-validated hidden" onchange="changeReason(\'variablevalue\','+index+',4)"  maxlength="11" style="background-color:#fff;font-size:15px" />'
                        +'<input id="varvalue'+index+'" value="'+value+'" class="form-control parsley-validated"  maxlength="11" disabled="disabled" style="background-color:#fff;font-size:15px" />'
                        +'<span class="input-group-addon"  id="choose2'+index+'" onclick="choosevarivaluelist(\'variablevalue\','+index+')">选择</span></div>'
                }
            }
        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        },
        onLoadSuccess:function (data) {
            console.log(data);
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
}




var valueTemp = "";
function checknum(obj) {
    if (/^\d*\.?\d{0,5}$/.test(obj.value)) {
        valueTemp = obj.value;
    } else {
        obj.value = valueTemp;
    }
}


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
            // var nowDate = new Date();
            // if(  new Date(value).getTime() < nowDate.getTime()){
            //     layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
            // }
        }
    });
});
function clicks(){
    layer.msg("此空格不可输入", {icon:5, anim:6, time: 2000});
}
//切换tab
function changetabs(tabFlag){
    if(tabFlag==0){
        $("#tabFlag").val(tabFlag);
        $("#table1").removeClass("hidden");
        $("#table2").addClass("hidden");
        $("#table3").addClass("hidden");
    }else if(tabFlag==1){
        $("#tabFlag").val(tabFlag);
        $("#table1").addClass("hidden");
        $("#table2").removeClass("hidden");
        $("#table3").addClass("hidden");
    }else if(tabFlag==2){
        $("#tabFlag").val(tabFlag);
        $("#table1").addClass("hidden");
        $("#table2").addClass("hidden");
        $("#table3").removeClass("hidden");
    }
}
//onput事件触发update,单元格数据重新渲染
function changeReason(fieldName,indexNumber,flag){
    // if(fieldName=='electiy'){
    //     if(/\D/.test(value)){
    //         layer.msg("请输入数字格式");
    //         $("#"+fieldName+indexNumber).val(0);
    //     }
    // }
    var value = $("#"+fieldName+indexNumber).val();
    if(flag==1){
        $("#reportTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==2){
        $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if(flag==3){
        $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }else if (flag==4){
        $("#typeTable1").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    }

    if(fieldName=='electiy'){
        var infoMS = $("#reportTable1").bootstrapTable('getData');
        calel(infoMS);
    }
    if(fieldName=='labor'){
        var infoMS = $("#reportTable1").bootstrapTable('getData');
        callabor(infoMS);
    }
}
function addNewType(){
    var count = $('#typeTable1').bootstrapTable('getData').length;

    $('#typeTable1').bootstrapTable('insertRow', {index:count,row:{checkFlag:"",variablecode:"",variablename:"",variablevalue:"",id:maxIds4-1}});
    maxIds4 --;
}
var delArraysTS = new Array();
function delType(){
    var rows = $("#typeTable1").bootstrapTable('getSelections');
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("请先选择要删除的记录!", {icon:5, anim:6, time: 3000});
        return;
    } else {
        $(rows).each(function () {
            $('#typeTable1').bootstrapTable('removeByUniqueId', this.id);
            if (this.id > 0){
                delArraysTS.push(this.id);
            }
        })
    }
}
//列表新增一行数据
function addRow(tabFlag){
    if(tabFlag==0){
        var count = $('#reportTable1').bootstrapTable('getData').length;
        $('#reportTable1').bootstrapTable('insertRow',{index:count,row:{checkFlag:"",rowIndex:"",componet:"",workprocedure:"",labor:"",electiy:"",memo:"",id:maxIds1-1}});
        maxIds1 --;
    }else if(tabFlag==1){
        var count = $('#reportTable2').bootstrapTable('getData').length;
        $('#reportTable2').bootstrapTable('insertRow',{index:count,row:{bomSeries:"",bomStyle:"",bomColor:"",bomLong:"",bomWidth:"",bomThick:"",needGlassFlag:"",unit:"",memo:"",id:maxIds2-1,setOfBooks:"",productionBase:"",paint:""}});
        maxIds2 --;
    }else if(tabFlag==2){
        var count = $('#reportTable3').bootstrapTable('getData').length;
        $('#reportTable3').bootstrapTable('insertRow',{index:count,row:{bomSeries:"",bomStyle:"",bomColor:"",bomLong:"",bomWidth:"",bomThick:"",needGlassFlag:"",unit:"",memo:"",id:maxIds3-1,setOfBooks:"",productionBase:"",paint:""}});
        maxIds3 --;
    }
}
var delArraysMS = new Array();// 声明一个数组，存放要删除的门扇
var delArraysMT = new Array();// 声明一个数组，存放要删除的门套
var delArraysXT = new Array();// 声明一个数组，存放要删除的线条
//主列表删除操作
var delMainLabor=new Array();//声明一个数组，存放要删除的主列表
function dellabormain(){
    var rows = $("#mytable").bootstrapTable('getSelections');
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("请先选择要删除的记录!", {icon:5, anim:6, time: 3000});
        return;
    }else{
        $(rows).each(function () {
            delMainLabor.push(this.id);
        });
        var datas = {
            delMainLabor:delMainLabor
        } ;
        console.log(datas);
        deletesubmit(datas);
    }
}
function addlabor(){
    window.location.href="../basicFileController/addlabor";
}
//列表删除操作
function delRow(tabFlag){
    var rows = $("#reportTable1").bootstrapTable('getSelections');
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        layer.msg("请先选择要删除的记录!", {icon:5, anim:6, time: 3000});
        return;
    } else {
        $(rows).each(function () {// 通过获得别选中的来进行遍历
            if(tabFlag==0){
                $("#reportTable1").bootstrapTable('removeByUniqueId', this.id);
                if(this.id>0){
                    delArraysMS.push(this.id);
                }
            }else if(tabFlag==1){
                $("#reportTable2").bootstrapTable('remove', {field: 'id', values: "'"+this.id+"'"});
                if(this.id>0){
                    delArraysMT.push();
                }
            }else if(tabFlag==2){
                $("#reportTable3").bootstrapTable('remove', {field: 'id', values: "'"+this.id+"'"});
                if(this.id>0){
                    delArraysXT.push();
                }
            }
        });
    }
}
//技术部图纸组上附件
function uploadFile(){
    post("../ProcessController/processUploadFile",{step:2});//jinrru
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
function choosebomlist(){
    parent.layer.open({
        type: 2,
        title: ['模型列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../basicFileController/chooseboms' //setBOMForProcess
    });
}
function choosevarinamelist(name,index){
    $("#chooseIndex").val(index);
    var modelcode=$("#bomcode").val();
    if(modelcode==undefined||modelcode==''||modelcode==null){
        layer.msg("请先选择模型档案", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['变量名称列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../basicFileController/choosevarinames?modelcode='+modelcode, //setBOMForProcess
        end:function(){
            var varinameModelCode = $("#variname").val();
            $("#typeTable1").bootstrapTable('updateCell', {index: index, field: name, value: varinameModelCode});
            $("#variname").val("");

            var varicodeModel = $("#varicode").val();
            $("#typeTable1").bootstrapTable('updateCell', {index: index, field: "variablecode", value: varicodeModel});
            $("#varicode").val("");

            $("#varvalue").val("");
            var varvalueModelCode = $("#varvalue").val();
            $("#typeTable1").bootstrapTable('updateCell', {index: index, field: "variablevalue", value: varvalueModelCode});
        }
    });
}
function chooseproducelist(index){
    $("#chooseIndex").val(index);
    parent.layer.open({
        type: 2,
        title: ['变量名称列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../basicFileController/chooseproduce', //setBOMForProcess
    });
}

function choosevarivaluelist(name,index){
    var modelcode=$("#bomcode").val();
    var varicode=$("#employeecode"+index).val();
    if(modelcode==undefined||modelcode==''||modelcode==null||varicode==undefined||varicode==''||varicode==null){
        layer.msg("请先选择模型档案与变量类型档案。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['变量值列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../basicFileController/choosevarivalues?modelcode='+modelcode+'&varicode='+varicode,//setBOMForProcess
        end:function(){
            var modelCode = $("#varvalue").val();
            $("#typeTable1").bootstrapTable('updateCell', {index: index, field: name, value: modelCode});
            $("#varvalue").val("");
        }

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
            }
        }
    });
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
//返回
function back() {
    post("../basicFileController/copy2",{})
}
//提交
function save(){
    if($("#bomcode").val() == null || $("#bomcode").val() == "" || $("#bomcode").val() == undefined || $("#bomcode").val() == "undefined"){
        layer.msg("请选择模型档案资料", {icon:5, anim:6, time: 3000});
        return;
    }
    // if($("#employeecode").val() == null || $("#employeecode").val() == "" || $("#employeecode").val() == undefined || $("#employeecode").val() == "undefined"){
    //     layer.msg("请选择变量名称档案资料", {icon:5, anim:6, time: 3000});
    //     return;
    // }
    // if($("#varvalue").val() == null || $("#varvalue").val() == "" || $("#varvalue").val() == undefined || $("#varvalue").val() == "undefined"){
    //     layer.msg("请选择变量值档案资料", {icon:5, anim:6, time: 3000});
    //     return;
    // }
    // if($("#shengchancode").val() == null || $("#shengchancode").val() == "" || $("#shengchancode").val() == undefined || $("#shengchancode").val() == "undefined"){
    //     layer.msg("请选择生产基地档案资料", {icon:5, anim:6, time: 3000});
    //     return;
    // }
    if($("#gongyi").val() == null || $("#gongyi").val() == "" || $("#gongyi").val() == undefined || $("#gongyi").val() == "undefined"){
        layer.msg("请填写工艺名称", {icon:5, anim:6, time: 3000});
        return;
    }
    var data = {doorLeafList: []};
    var laborCostDetails=[];
    var infoMS = $("#reportTable1").bootstrapTable('getData');
    if(infoMS==null || infoMS=="" || infoMS==undefined ){
        layer.msg("列表里未添加数据", {icon:5, anim:6, time: 3000});
        return;
    }
    getObjects(infoMS,1,laborCostDetails)
    // console.log("details = {}",laborCostDetails);

    var jsonMiddle = JSON.stringify(laborCostDetails);
    var formData = new FormData();
     if($("#id").val() != null && $("#id").val() != "" && $("#id").val() != undefined && $("#id").val() != "undefined"){
        formData.append("id", $("#id").val());
    }

     var laborTypeLists=[];
     var infoTS = $("#typeTable1").bootstrapTable('getData');
     if(infoTS==null || infoTS=="" || infoTS==undefined){
         layer.msg("列表里未添加数据", {icon:5, anim:6, time: 3000});
         return;
     }
     getTypeObjects(infoTS,1,laborTypeLists);
    if (laborTypeLists.length == 0){
        layer.msg("类型列表不能为空！", {icon:5, anim:6, time: 3000});
        return;
    }
     var jsonTypeMiddle = JSON.stringify(laborTypeLists);

     var data = {
         id : $("#id").val(),
         laborCostDetails: laborCostDetails,
         modelcode:$("#bomcode").val(),
         basecode: $("#shengchancode").val(),
         processVersion:$("#gongyi").val(),
         status:$("#quotationMethod").val(),
         totalelectricity:$("#dianfei").val(),
         totallabor:$("#rengong").val(),

         variablevalue:$("#varvalue").val(),
         mvmappingID:$("#varvalid").val(),
         variablecode:$("#employeecode").val(),

         updated_time:$("#replyDate").val(),
         laborTypeLists: laborTypeLists,
         delArraysTS: delArraysTS,
         delArraysMS:delArraysMS
     } ;

    // formData.append("laborCostDetails", laborCostDetails);//保存发布标志位
    //
    // formData.append("modelcode", $("#bomcode").val());
    //
    // formData.append("mvmappingID", $("#varvalid").val());
    // formData.append("variablecode", $("#employeecode").val());
    // formData.append("basecode", $("#shengchancode").val());
    // formData.append("processVersion", $("#gongyi").val());
    // formData.append("status", $("#quotationMethod").val());
    // formData.append("totalelectricity", $("#dianfei").val());
    // formData.append("totallabor", $("#rengong").val());
    // formData.append("variablevalue", $("#varvalue").val());
    // formData.append("updated_time", $("#replyDate").val());

    /*编辑是需要从报价明细表中删除的数据*/
    // formData.append("delArraysMS", delArraysMS);
    // formData.append("delArraysMT", delArraysMT);
    // formData.append("delArraysXT", delArraysXT);
    console.log(data);
    submitMsg(data);
}
function getObjects(info,flag,detailes){
    for (var i = 0; i < info.length; i++) {
        var isEmpty = false;
        var timeSet = new Object();
        timeSet.id = info[i].id;
        timeSet.mainID = info[i].mainID;
        timeSet.componet = info[i].componet;
        timeSet.workprocedure = info[i].workprocedure;
        timeSet.labor = info[i].labor;
        timeSet.electiy = info[i].electiy;
        timeSet.memo = info[i].memo;
        if (info[i].componet == "" && info[i].workprocedure == "" && info[i].labor == "" && info[i].electiy == "" && info[i].memo == ""){
            isEmpty = true;
        }
        if(flag==1 && !isEmpty){
            detailes.push(timeSet);
        }
    }
}
function getTypeObjects(info,flag,typelist) {
    for (var i = 0;i < info.length; i++) {
        var timeSet = new Object();
        var isEmpty = false;
        timeSet.id = info[i].id;
        timeSet.mainid = $("#id").val();
        timeSet.modelcode = $('#bomcode').val();
        timeSet.variablename = info[i].variablename;
        timeSet.variablecode = info[i].variablecode;
        timeSet.variablevalue = info[i].variablevalue;
        if (info[i].variablecode == "" && info[i].variablevalue == "" && info[i].variablename == ""){
            isEmpty = true;
        }
        if (info[i].variablevalue == ""){
            isEmpty = true;
        }
        if (flag==1 && !isEmpty){
            typelist.push(timeSet);
        }
    }
}
//重新计算总电费
function calel(info){
    var sums=0*1;
    for(var i=0;i<info.length;i++){
        var nowel=(info[i].electiy)*1;
       // sums=sums+nowel;
        sums=accAdd(sums,nowel);
    }
    sums = keepTwoDecimalFull(2);
    console.log(sums);
    $("#dianfei").val(sums);
}

function keepTwoDecimalFull(num) {
  var result = parseFloat(num);
      if (isNaN(result)) {
            console.error('参数非数值，无法四舍五入保留两位小数！');
            return false;
          }
      result = Math.round(num * 100) / 100;
       var s_x = result.toString();
      var pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
          }
      while (s_x.length <= pos_decimal + 2) {
           s_x += '0';
          }
      return s_x;
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//重新计算人工费用
function callabor(info){
    var sums=0*1;
    for(var i=0;i<info.length;i++){
        var nowel=(info[i].labor)*1;
        sums=accAdd(sums,nowel);
    }
    sums = keepTwoDecimalFull(2);
    $("#rengong").val(sums);
}

var ajax;
function  submitMsg(formData){
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../basicFileController/updateDataLaborById";
     $.ajax({
        type : "POST",
        url : request,
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(formData),
        dataType : "json",
        cache : false,
        processData : false, // 告诉jQuery不要去处理发送的数据
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.errorCode == '000') {
                layer.alert('修改成功',function(){
                    window.location.href="../basicFileController/copy2";
                })
            }else {
                layer.msg("系统错误");
            // ,function(){
            //         post("../UserController/roleAssignments",{id:result.id})
            //     }
            }
        }
    });
}
function  deletesubmit(formData){
    var requests = "../basicFileController/dellabor";
    $.ajax({
        type : "POST",
        url : requests,
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(formData),
        dataType : "json",
        cache : false,
        processData : false, // 告诉jQuery不要去处理发送的数据
        traditional:true,//防止深度序列化
        success : function(result) {
            if(result.errorCode == '000') {
                layer.alert('删除成功',function(){
                    delMainLabor=[];
                    window.location.href="../basicFileController/copy2";
                })

            }else {
                layer.msg("系统错误");
                // ,function(){
                //         post("../UserController/roleAssignments",{id:result.id})
                //     }
            }
        }
    });
}
$('#selectbomname').bind('keyup', function(event) {
     　　if (event.keyCode == "13") {
     　　　　//回车执行查询
     　　　　select();
     　　}
     });
     $('#selectvarvalue').bind('keyup', function(event) {
          　　if (event.keyCode == "13") {
          　　　　//回车执行查询
          　　　　select();
          　　}
          });