var $window = $(window);
$window.resize(function() {
    resizeWindow();
});
var maxIds3 = 0;

$(document).ready(function() {
    // 获取角色
    // getUserRoleIDs();
    testCode =  getParam("code");
    if (testCode == "" || testCode.length <=5){
        layer.msg("参数错误，请返回重试。", {icon: 5, anim: 6, time: 3000});
    }
});

var testCode = "";


/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

/**
 * 所有入参
 * @type {{}}
 */
var dataInput = {};

//所有结果
var allData = [] ;

var roleIDs = [];

var detailCanChange = false ;

/**
 * 数据初始化
 * @param type
 * @param detailIDs
 * @constructor
 */
function DataInit(datas) {
    var rgcbCellIndex = 6 ;
    var zzcbCellIndex = 7 ;
    $('#reportTable4').bootstrapTable('destroy');
    $('#reportTable4').bootstrapTable({
        //url:"../BomContoller/InitBomViews",
        method: 'post',
        contentType : "application/json",  //"x-www-form-urlencoded", //
        dataType: "json",
        dataField: 'data',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一页
        pageSize: 10,//每页的记录行数（*）
        pageList: [ 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
                field:"detailID",
                title:"单据明细编号",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"modelName",
                title:"模型名称",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"materialCost",
                title:"材料—理论及正常损耗成本",
                align:"center",
                valign:"middle",
                sortable:"true",
            },
            {
                field:"abnormalMaterialCost",
                title:"材料—异常历史损耗成本",
                align:"center",
                valign:"middle",
                sortable:"true"

            },{
                field:"laborCost",
                title:"人工成本",
                align:"center",
                valign:"middle",
                sortable:"true"
             },
            {
                field:"manufacturingCost",
                title:"制造成本",
                align:"center",
                valign:"middle",
                sortable:"true"
            },
            {
                field:"totalCostExcludeTax_val",
                title:"不含税总成本",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false
            },
            {
                field:"totalCostIncludeTax",
                title:"总成本",
                align:"center",
                valign:"middle",
                sortable:"true"
            },
            {
                field:"cc",
                title:"操作",
                align:"center",
                valign:"middle",
                formatter:operateFormatter
            }
        ],
        onClickRow:function (row,$element) {
            console.log($element);
            // var jsonStr = JSON.stringify(row);
            var clickCellIndex =  $element.context.cellIndex;
            if (clickCellIndex === rgcbCellIndex)
            {
            }else if(clickCellIndex === zzcbCellIndex )
            {
            }
        },
        data:datas,
        responseHandler:function(res){
            // return [res.data];
        },
        onPostBody:function(data){
            console.log("change !!!");
        }
    });


    function operateFormatter(value, row, index) {
        var contanerID =  "container" + row.id;
        var rgmx = "showBomDetail(1,'"+row.detailID+"','"+ row.mainID +"')";
        var qd = "showBomDetail(2,'"+row.detailID+"','"+ row.mainID +"')";
        var zzcb = "showBomDetail(3,'"+row.detailID+"','"+ row.mainID +"')";
        var toExcel = "showBomDetail(4,'"+row.detailID+"','"+ row.mainID +"')";

        return [
            '<div class="btn-group">',
            '<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ rgmx +' " >人工成本明细</button>' ,
            '<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ qd +' " >Bom清单明细</button>' ,
            '<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ zzcb +' " >制造成本明细</button>' ,
            '<button type="button" class="btn btn-s-xs greenbtn" style="margin:3px 3px 3px 3px;" onclick=" '+ toExcel +' " >制造成本明细</button>' ,
            // '<a class="btn btn-xs btn-default" onclick=" '+ rgmx +' " title="查看" data-toggle="tooltip">人工成本明细</a>',
            // '<a class="btn btn-xs btn-default" onclick=" '+ qd +'" title="查看" data-toggle="tooltip">Bom清单明细</a></div>',
            // '<a class="btn btn-xs btn-default" onclick="' + zzcb +'" title="查看" data-toggle="tooltip">制造成本   明细</a>',
            '</div>'
        ].join('');
    };

    //服务端分页调用方法
    function queryParams3(para) {
        var data =
           {"pargrams":
                [
                {
                    "modelCode":"001",
                    "modelType":"DOOR_LEAF",
                    "param": {
                        "height":2100,
                        "width":800,
                        "doorLeafThickness":40,
                        "pvcColor":"深柚木1846-37（16S*1.25M）",
                        "panelThickness":6,
                        "type":"条玻门",
                        "variableCodeOfType":"V001",
                        "glassType":"钢化玉砂玻璃",
                        "fillMode":"空心刨花板",
                        "needInner":true,
                        "innerMaterial":"LVL",
                        "needHingeWood":true,
                        "needShutter":true,
                        "needMiddleLayer":false,
                        "needHorizontalAluBar":false,
                        "needKaraAluBar":false,
                        "processVersion":"工程版本",
                        "productionBaseCode":"01"
                    }
                }
                ]
       };
        var datas= JSON.stringify(data)
        return datas;
    }
};

function getUserRoleIDs(detailIDs) {
    $.ajax({
        url : '../BomContoller/getUserRoleIDs',
        type: "GET",
        datatype:"json",
        contentType: "application/json;charset=utf-8",
        success : function(data, stats) {
            //dataInput = obj ;
            if (data.success == 'true'){
                roleIDs = data.data;
                var a = roleIDs.indexOf(1); // 2
                if (a===-1){
                    detailCanChange = false;
                }
                else {
                    //可修改
                    detailCanChange = true;
                }
            }
            else {
                roleIDs = [];
            }
        },
        error : function(data) {
            alert("请求失败");
        },
    })
}

/**
 * 生成报价 保存并展示
 * @param obj
 * @param type
 * @constructor
 */
function DataShow(obj) {
    $.ajax({
        url : '../BomContoller/bomTrial',
        type: "POST",
        datatype:"json",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(obj),
        success : function(data, stats) {
            if (data.data!=null){
                DataInit(data.data);
                dataInput = obj ;
                allData = data.data ;
                return true;
            }
            else {
                layer.msg("生成失败，请稍后再试。 " + data.msg , {icon: 5, anim: 6, time: 3000});
                return  false;
            }
        },
        error : function(data) {
            layer.msg("请求失败。", {icon: 5, anim: 6, time: 3000});
            return false;
        },
    })
}

/**
 * 展示已存在报价 并 展示
 * @param detailIDs
 */
function showView(detailIDs) {
    $.ajax({
        url : '../BomContoller/GetHistoryBomViews',
        type: "post",
        datatype:"json",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(detailIDs),
        success : function(data, stats) {
            //dataInput = obj ;
            if (data.success == 'true'){
                allData = data.data ;
                DataInit(data.data);
            }
            else {
                allData = null ;
            }
        },
        error : function(data) {
            alert("请求失败");
        },
    })
}

function SaveProgramsInit() {
    var programs = {
        boms:[]
    };
    //获取所有 明细ID
    for (var i = 0; i < dataInput.pargrams.length; i++) {
        var val= allData.find(function (ele,index) {
               return ele.detailID == dataInput.pargrams[i].detailID;
            });
        var cell = {
          initBomViewCell : dataInput.pargrams[i],
          bomViewOutput : val
        }
        programs.boms.push(cell);
    }
    return programs;
}


//$("#quoteDetailCode").val()

/*************************技术部成本组、技术部工艺组、技术部领导 start**************************/
var taskName = "技术部成本组" ;
function showD(){
    $('#reportTable2').bootstrapTable({
        url:"../ProcessController/getDataDoorsByJson?returnCode="+testCode+"&taskName="+taskName ,
        method: 'post',
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
        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
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
            },
            {
                field:"quoteDetailCode",
                visible: false
            },
            {
                field:"detailsType",
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
            },{
                field:"craftVersion",title:"工艺版本",align:"center",valign:"middle",width : '100px',
                formatter : function(value, row, index) {
                    var str ='<select disabled="disabled" id="craftVersion'+index+'" ';
                    if($("#flag").val() != 0 && taskName!="技术部成本组"){
                        str +=' disabled '
                    }
                    str +='  class="form-control parsley-validated" name="d" onchange="bomTypeOnesChange(\'craftVersion\','+index+',2)">'+
                        '<option value="">---请选择---</option>'+
                        '<option value="0" ';
                    if(value==="0" || value==0){
                        str+=' selected="selected" ';
                    }
                    str+='>工程版本</option>';
                    str+='<option value="1" ';
                    if(value==="1" || value==1){
                        str+=' selected="selected" ';
                    }
                    str+='>外贸版本</option>';
                    str+='</select>';
                    return str;
                }
            } ,
            {
                field:"typeCode", visible: false
            },{
                field:"quotationDetailNumber",
                title:"报价单编号",
                width : '45px',
                align : 'center'
            },
            {
                field:"modelName",title:"模型名称",align:"center",valign:"middle",sortable:"true",width:"250px",
                formatter : function(value, row, index) {
                    var str = "";
                    if($("#flag").val() != 0 && taskName!="技术部成本组"){
                        str += value
                    }else{
                        var str ='<div class="input-group">'+
                            '<input readonly id="modelName'+index+'"';
                        str +=' class="form-control parsley-validated" maxlength="11" value="'+value+'" style="background-color:#fff" />'+
                            '<span class="input-group-addon"  id="choose" onclick="chooseQuoteModel(\''+row.typeCode+'\','+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                            '</div>';
                    }
                    return str;
                }
            },
            {
                field:"modelCode",
                visible: false,
                title:"模型编号"
            },
            {
                field:"companyName",title:"组织名称",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str = "";
                    if($("#flag").val() != 0 && taskName!="技术部成本组"){
                        str += value
                    }else{
                        var str ='<div class="input-group">'+
                            '<input readonly id="companyName'+index+'" class="form-control parsley-validated" value="'+value+'" maxlength="11" style="background-color:#fff" />'+
                            '<span class="input-group-addon"  id="choose" onclick="chooseCompany('+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                            '</div>';
                    }
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
                    var str = "";
                    if($("#flag").val() != 0 && taskName!="技术部成本组"){
                        str += value
                    }else{
                        var str ='<div class="input-group">'+
                            '<input readonly id="baseName'+index+'"  class="form-control parsley-validated" value="'+value+'" maxlength="11" style="background-color:#fff" />'+
                            '<span class="input-group-addon"  id="choose" onclick="chooseBase('+index+',2)"><i class="fa fa-search" aria-hidden="true"></i></span>'+
                            '</div>';
                    }
                    return str;
                }
            },
            {
                field:"baseCode",
                visible: false
            },
            {
                field:"quoteLong",title:"长(mm)",align:"center",valign:"middle",sortable:"true"
            },
            {
                field:"quoteWidth",title:"宽(mm)",align:"center",valign:"middle",sortable:"true"
            },
            {
                field:"quoteThick",title:"厚(mm)",align:"center",valign:"middle",sortable:"true"
            },
            {
                field:"parameterString",
                visible: false
            },
            {
                field:"auditOpinion",
                title:"审核意见",
                align:"center",valign:"middle",sortable:"true",
                visible: false
                // formatter : function(value, row, index) {
                //     var str= '<textarea id="auditOpinion'+index+'" rows="3" style="background-color:#fff"  class="letter" onblur="changeReason(\'auditOpinion\','+index+',2)"  maxlength="128">'+value+'</textarea>';
                //     return str;
                // }
            },
            {
                field:"modelMassage",title:"操作",align:"center",valign:"middle",sortable:"true",
                formatter : function(value, row, index) {
                    var str;
                    if(taskName == "技术部成本组"){
                        if($("#viewModelMassageMethod1").val() ==null || $("#viewModelMassageMethod1").val() ==""  || $("#viewModelMassageMethod1").val() ==undefined || $("#viewModelMassageMethod1").val() !=null && $("#viewModelMassageMethod1").val()!="" && $("#viewModelMassageMethod1").val() == 0   ){
                            str = '<button type="button" ';
                            if($("#flag").val() != 0 && taskName!="技术部成本组"){
                                str +=' disabled '
                            }
                            str +=' class="btn btn-s-xs greenbtn"  onclick="viewModelMassage(\''+row.quoteLong+'\',\''+row.detailsTypeName+'\',\''+row.quoteWidth+'\',\''+row.quoteThick+'\',\''+row.modelCode+'\',\''+row.quoteDetailCode+'\',2,'+index+')"">设置模型参数</button>';
                        }else{
                            return "-";
                        }

                    }else{
                        if($("#viewModelMassageMethod0").val() ==null || $("#viewModelMassageMethod0").val() ==""  || $("#viewModelMassageMethod0").val() ==undefined || $("#viewModelMassageMethod0").val() !=null && $("#viewModelMassageMethod0").val()!="" && $("#viewModelMassageMethod0").val() == 0   ){
                            str = '<button type="button" class="btn btn-s-xs greenbtn"  onclick="viewModelMassage(\''+row.quoteLong+'\',\''+row.detailsTypeName+'\',\''+row.quoteWidth+'\',\''+row.quoteThick+'\',\''+row.modelCode+'\',\''+row.quoteDetailCode+'\',2,'+index+')"">查看模型参数</button>';
                        }else{
                            return "-";
                        }

                    }
                    return str;
                }
            }
        ],
        onLoadSuccess: function () {
            // if(taskName=="技术部成本组" || taskName=="技术部工艺组" || taskName=="技术部领导" ){
            //     $("#reportTable2").bootstrapTable('showColumn', 'checkFlag');//隐藏上述taskName列
            //     $("#reportTable2").bootstrapTable('showColumn', 'auditOpinion');//隐藏上述taskName列
            // }else{
            //     $("#reportTable2").bootstrapTable('hideColumn', 'auditOpinion');//隐藏上述taskName列
            //     $("#reportTable2").bootstrapTable('hideColumn', 'checkFlag');//隐藏上述taskName列
            // }
        },
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
}

//设置模型参数
function viewModelMassage(quoteLong, type,quoteWidth,quoteThick,modelCode,quoteDetailCode,flag,indexNumber){
    if(modelCode==null || modelCode == "" || modelCode == undefined){
        layer.msg("填写参数前，请选择相应的模型。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['设置模型参数', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1, //BasicFileController
        success: function(layero, index){
        },
        content: '../ProcessController/viewModelMassage?quoteDetailCode='+quoteDetailCode+"&modelCode="+modelCode+"&flag="+flag+"&quoteLong="+quoteLong+"&quoteWidth="+quoteWidth+"&quoteThick="+quoteThick,
        end:function(){
            var parameterString = JSON.parse($("#parameterString").val());
            var height = $("#height").val();
            var width = $("#width").val() ;
            var doorLeafThickness = $("#deep").val() ;

            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "parameterString", value: parameterString});
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "quoteLong", value: height});
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "quoteWidth", value: width});
            $("#reportTable2").bootstrapTable('updateCell', {index: indexNumber, field: "quoteThick", value: doorLeafThickness});
        }
    });
}

var getResultFlag;

//获取报价单信息
function calculation(){
    var reportTable2 = $("#reportTable2").bootstrapTable('getSelections');
    if(reportTable2.length==0){
        layer.msg("请选择成本组审核表单中，要生成报价结果得记录。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    layer.confirm("确认生成报价单吗，若页面存在已生成试算结果将被覆盖？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var obj = {pargrams: []};
        for (var i = 0; i < reportTable2.length; i++) {
            getObjectModel(reportTable2[i],obj)
        }
        console.log(obj.toString());
        console.log(obj.toString());
        DataShow(obj ,"init");
        getResultFlag = 1;
    });
}
/*技术部成本组*/
function getObjectModel(info2,obj){//info2 是成本组表单；info1 是工程报价表单
    var timeSet = new Object();
    var json = info2.parameterString;
    timeSet.modelCode = info2.modelCode;
    if(info2.detailsType==0){
        timeSet.modelType = "DOOR_LEAF";
        json.variableCodeOfType = "type";
    }else if (info2.detailsType==1){
        timeSet.modelType = "DOOR_JAMB";
        json.variableCodeOfType = "type";
    }else if (info2.detailsType==2){
        timeSet.modelType = "DOOR_LINE";
        json.variableCodeOfProduction = "production";
    }
    console.log(info2.parameterString);
    if(info2.craftVersion==0){
        json.processVersion = "工程版本"; // 工艺版本
    }else if(info2.craftVersion==1){
        json.processVersion = "外贸版本"; // 工艺版本
    }
    json.productionBaseCode = info2.baseCode; // 生产基地
    timeSet.detailID = info2.quoteDetailCode;
    timeSet.quotationDetailNumber = info2.quotationDetailNumber;
    timeSet.parameterString = JSON.stringify(json);
    obj.pargrams.push(timeSet);
}



/*************************技术部成本组、技术部工艺组、技术部领导 end**************************/


//重新计算页面尺寸
function resizeWindow(){


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
                }
            }
        });
});


/**
 * 保存
 * @param type
 * @param orderDetail
 * @param mainID
 */
function showBomDetail(type,orderDetail,mainID) {
    var dataList = allData.filter(function(item,index,array){
        return item.detailID == orderDetail ;
    });
    var tart = '';
    var btnList = ['返回'] ;
    if (type==1){
        tart= '../BomContoller/bomLaborCost';
    }else if (type==2){
        tart= '../BomContoller/bomInitDetail';
    }else if (type==3){
        tart= '../BomContoller/bomManufacturingCost';
     }
    else if (type==4){
        tart= '../ProcessController/execlEditPageForBomDetail?orderID='+ orderDetail;
        parent.layer.open({
            type: 2,
            title: false,
            area: ['100%', '100%'],
            btn: ['返回'],
            success: function(layero, index){
            },
            yes: function(index, layero){
            },
            closeBtn: 0,
            content: tart, // chooseBomTypes
            end: function () {
            }
        });
        return ;
    }


    parent.layer.open({
        type: 2,
        title: false,
        area: ['98%', '100%'],
        btn: btnList,
        success: function(layero, index){

        },
        yes: function(index, layero){

            parent.layer.close(index);
        }
        ,btn2: function(index, layero){
            // 按钮【按钮二】的回调
            // return false 开启该代码可禁止点击该按钮关闭
        },
        closeBtn: 1,
        content: tart, // chooseBomType
        end: function () {

        }
    });


    parent.layer.open({
        type: 2,
        title: false,
        area: ['98%', '100%'],
        btn: btnList,
        success: function(layero, index){
            var iframeWin  = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：
            //iframeWin.DataShowDetail("init","1234");
            var dataValue = null;
            var allCost = 0 ;
            // 人工
            if (type == 1){
                //DataInit(data.data[0].laborCostResult ,data.data[0].laborCost);
                dataValue = dataList[0].laborCostResult ;
                allCost = dataList[0].laborCost ;
            }
            // 明细
            else if (type==2){
                dataValue = dataList[0].bomDetailViewExtendList ;
                allCost = dataList[0].materialCost ;
                iframeWin.setCanChange(false);
            }
            // 制造成本
            else if(type==3)
            {
                dataValue = dataList[0].manufacturingCostDetail ;
                allCost = dataList[0].manufacturingCost ;
            }
            iframeWin.DataInit(dataValue ,allCost);
        },
        yes: function(index, layero){
           parent.layer.close(index);
        }
        ,btn2: function(index, layero){
            // 按钮【按钮二】的回调
            // return false 开启该代码可禁止点击该按钮关闭
        },
        closeBtn: 1,
        content: tart, // chooseBomType
        end: function () {

        }
    });
}


function getObjects(info, flag, data) {
        for (var i = 0; i < info.length; i++) {
            var timeSet = new Object();
            timeSet.id = info[i].id;
            timeSet.typeCode = info[i].bomTypeOnes;
            timeSet.modelName = info[i].modelName;
            timeSet.modelCode = info[i].modelCode;
            timeSet.companyName = info[i].companyName;
            timeSet.companyCode = info[i].companyCode;
            timeSet.baseName = info[i].baseName;
            timeSet.baseCode = info[i].baseCode;
            timeSet.bomStyle = info[i].bomStyle;
            timeSet.color = info[i].bomColor;
            timeSet.paint = info[i].paint;
            timeSet.quoteLong = info[i].bomLong;
            timeSet.quoteWidth = info[i].bomWidth;
            timeSet.quoteThick = info[i].bomThick;
            timeSet.needGlass = info[i].needGlassFlag;
            timeSet.unit = info[i].unit;
            timeSet.memo = info[i].memo;
            timeSet.needDrawFlag = info[i].needDrawFlag;
            if (flag == 1) {
                data.doorLeafList.push(timeSet);
            } else if (flag == 2) {
                data.doorLeafList.push(timeSet);
            } else if (flag == 3) {
                data.doorLeafList.push(timeSet);
            }
        }
    }

