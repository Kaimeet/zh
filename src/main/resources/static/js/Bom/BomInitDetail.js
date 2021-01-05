var $window = $(window);
$window.resize(function() {
    resizeWindow();
});

var maxIds3 = 0;
/**
 * 有效材料金额
 * @type {number}
 */
var allCost = 0;

/**
 * 材料金额
 * @type {number}
 */
var allCostNormal = 0 ;

/**
 * 不含税总计
 * @type {number}
 */
var totalCost = 0 ;

/**
 * 正常损耗
 * @type {number}
 */
var normalLost = 0 ;

/**
 * 可变成本
 * @type {number}
 */
var variableCost = 0 ;

// 储存 insert update  detail
var modifyL = [] ;
var inserL=[];
var delL =[];
// 总表有效规则
var summaryRuleMap = null ;
// 总表 规格
var totalSummaryRuleMap = null ;



var ifModify = false;
var ifCanChange = false ;

function getVariableCost() {
    return variableCost;
}

function getNormalLost() {
    return normalLost;
}

function setTotalSummaryRuleMap(rule) {
    totalSummaryRuleMap = new Map(Object.entries(rule));
}

function setSummaryRuleMap(rule) {
    summaryRuleMap = new Map(Object.entries(rule));
}

function getIfModify() {
    return ifModify;
}

/**
 * 设置总金额
 */
function setNormalAllCost(val){
    allCostNormal = val;
}

/**
 * 获取总金额
 */
function getNormalAllCost() {
    return allCostNormal ;
}

/**
 * 获取总金额
 */
function getTotal() {
    return totalCost ;
}

function setCanChange(flag) {
    ifCanChange = flag;
    if (ifCanChange){
        document.getElementById("cc").style.display="";//显示
    }
    else
    {
        document.getElementById("cc").style.display="none";//隐藏
    }
}

function DataInit(datas,allCount) {
    changeDataBack = datas;
    allCost = allCount ;
    $("#allCost").text("总计： "+ allCount);

    //  人工成本 6
    //  制造成本 7
    var rgcbCellIndex = 6 ;
    var zzcbCellIndex = 7 ;

    $('#reportTable3').bootstrapTable('destroy');

    $('#reportTable3').bootstrapTable({
        //url:"../ProcessController/getDataDoors?type="+1+"&processCode="+$("#processCode").val(),
        method: 'post',
        dataType: "json",
        dataField: 'rows',
        striped: true,//设置为 true 会有隔行变色效果
        undefinedText: "空",//当数据为 undefined 时显示的字符
        pagination: true, //设置为 true 会在表格底部显示分页条。
        showToggle: "true",//是否显示 切换试图（table/card）按钮
        showColumns: "true",//是否显示 内容列下拉框
        pageNumber: 1,//初始化加载第一页，默认第一
        pageSize: 50,//每页的记录行数（*）
        pageList: [10,20, 50,100],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
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
        uniqueId:"bomDetailID",
        columns: [
            {
                field:"checkFlag",
                checkbox: true
            },
            {
                field:"bomDetailID",
                visible: false
            },
            {
                field:"rowIndex",
                title:"序号",
                width : '45px',
                align : 'center',
                formatter : function(value, row, index) {
                    //$("#reportTable3").bootstrapTable('updateCell', {index: index, field: "rowIndex", value: index + 1});
                    return index + 1;
                }
            },
            {
                field:"partName",
                title:"部件名称",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter : function(value, row, index) {
                    var detailID = row.bomDetailID ;
                    return editInit("partName" ,index , value ,detailID);
                    // return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'partName\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"code",
                title:"存货编码",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("code" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'code\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"name",
                title:"原材料名称",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("name" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'name\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }

            },{
                field:"spec",
                title:"原材料规格",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("spec" ,index , value ,detailID);
                    // return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'spec\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
             },
            {
                field:"unit",
                title:"材料单位",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("unit" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'unit\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"price",
                title:"材料单价（元）",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("price" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'price\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            }
            ,
            {
                field:"lengthOfSpec",
                title:"材料规格（长）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("lengthOfSpec" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'lengthOfSpec\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"thicknessOfSpec",
                title:"材料规格（厚）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("thicknessOfSpec" ,index , value ,detailID);
                    // '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'thicknessOfSpec\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }

            },
            {
                field:"lengthOfSelection",
                title:"材料选择（长）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("lengthOfSelection" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'lengthOfSelection\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },{
                field:"widthOfSelection",
                title:"材料选择（宽）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("widthOfSelection" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'widthOfSelection\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"thicknessOfSelection",
                title:"材料选择（厚）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("thicknessOfSelection" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'thicknessOfSelection\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"lengthOfLeft",
                title:"材料余量（长）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("lengthOfLeft" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'lengthOfLeft\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"widthOfLeft",
                title:"材料余量（宽）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("widthOfLeft" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'widthOfLeft\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            }
            ,
            {
                field:"thicknessOfLeft",
                title:"材料余量（厚）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("thicknessOfLeft" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'thicknessOfLeft\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"lengthOfUsed",
                title:"实际用量（长）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("lengthOfUsed" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'lengthOfUsed\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"widthOfUsed",
                title:"实际用量（宽）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("widthOfUsed" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'widthOfUsed\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },{
                field:"thicknessOfUsed",
                title:"实际用量（厚）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("thicknessOfUsed" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'thicknessOfUsed\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"unitOfUse",
                title:"单位用量",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("unitOfUse" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'unitOfUse\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"materialUsed",
                title:"耗用材料",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: true,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("materialUsed" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'materialUsed\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },

            {
                field:"effectiveMaterialUsed",
                title:"有效材料耗用",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: true,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("effectiveMaterialUsed" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'materialUsed\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"loss",
                title:"损耗（%）",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("loss" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'loss\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            }
            ,
            {
                field:"totalUsed",
                title:"合计用量",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("totalUsed" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'totalUsed\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"unitOfMeasurement",
                title:"用量计量单位",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("unitOfMeasurement" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'unitOfMeasurement\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"materialNum",
                title:"配料数量",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: true,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("materialNum" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'materialNum\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            },
            {
                field:"convertFactor",
                title:"计量单位转换因子",
                align:"center",
                valign:"middle",
                sortable:"true",
                visible: false,
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("convertFactor" ,index , value ,detailID);
                    //return '<input value="'+value+'" class="form-control parsley-validated" onblur="changeReason2(\'convertFactor\','+index+',this)"  maxlength="11" style="background-color:#fff" />';
                }
            }
            ,
            {
                //field:"fee",
                field:"fee",
                title:"金额（元）",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("fee" ,index , value ,detailID);
                    // return '<input value="'+value+'" class="form-control parsley-validated" onblur="sumChange(\'fee\','+index+','+ value +','+ detailID + ',this)"  maxlength="11" style="background-color:#fff" />';
                }
            }
            ,
            {
                //field:"fee",
                field:"effFee",
                title:"有效材料金额（元）",
                align:"center",
                valign:"middle",
                sortable:"true",
                formatter: function(value, row, index)
                {
                    var detailID = row.bomDetailID ;
                    return editInit("effFee" ,index , value ,detailID);
                    // return '<input value="'+value+'" class="form-control parsley-validated" onblur="sumChange(\'fee\','+index+','+ value +','+ detailID + ',this)"  maxlength="11" style="background-color:#fff" />';
                }
            }
        ],
        onClickRow:function (row,$element) {
            // var jsonStr = JSON.stringify(row);
            var clickCellIndex =  $element.context.cellIndex;
            if (clickCellIndex === rgcbCellIndex)
            {

            }else if(clickCellIndex === zzcbCellIndex )
            {

            }
        },
        data:changeDataBack
    });

    //服务端分页调用方法
    function queryParams3(params) {
        // console.log(params);
        // return {
        //     pageSize: params.limit, // 每页显示数量
        //     offset: params.offset, // SQL语句起始索引,从第几条记录开始查询
        //     name: params.sort,s
        //     order: params.order
        // };
    }
}


/**
 * 获取 有效 总表
 * @returns {number}
 */
function getAddSummaryAddCost() {

    var AddSummaryAddCost = 0.0 ;
    if (summaryRuleMap === undefined || summaryRuleMap=== null)
    {
    }
    else
    {
        var dataSource = getData();
        summaryRuleMap.forEach(function(value,key){
            var curPartName = key.trim() ;
            var rule =  value ;
            // 部件和
            var partSource =  dataSource.filter(function(cur,index,arr){
                return cur.partName.trim() === curPartName ;
            })

            // 计算和
            var sumList =  partSource.map(function(cur,index,arr){
                return parseFloat(cur.effFee);
            });

            var sum = sumList.reduce(function(pre,cur){
                return accAdd(pre , cur);
            },0) ;

            // // 部件和
            // var partSource =  dataSource.filter(function(cur,index,arr){
            //     return cur.partName.trim() === curPartName ;
            // })
            //
            // // 计算和
            // var sum = partSource.reduce(function(pre,cur){
            //     return pre.effFee + cur.effFee;
            // },0) ;

            //"return function(){[sum] * 1.0}".replace(/\[sum\]/g,12.0)
            rule = rule.replace(/\[sum\]/g,sum) ;
            var res = eval(rule);
            AddSummaryAddCost = accAdd(AddSummaryAddCost , res) ;

        });
    }
    console.log(AddSummaryAddCost);
    return  AddSummaryAddCost;
}


/**
 * 获取 总表
 * @returns {number}
 */
function getTotalAddSummaryAddCost() {
    var AddSummaryAddCost = 0.0 ;
    if (totalSummaryRuleMap === undefined || totalSummaryRuleMap=== null)
    {
    }
    else
    {
        var dataSource = getData();
        totalSummaryRuleMap.forEach(function(value,key){
            var curPartName = key.trim() ;
            var rule =  value ;
            // 部件和
            var partSource =  dataSource.filter(function(cur,index,arr){
                return cur.partName.trim() === curPartName ;
            })
            // 计算和
            var sumList =  partSource.map(function(cur,index,arr){
                return parseFloat(cur.fee);
            });
            //
            var sum = sumList.reduce(function(pre,cur){
                return accAdd(pre , cur);
            },0) ;
            rule = rule.replace(/\[sum\]/g,sum) ;
            var res = eval(rule);
            AddSummaryAddCost = accAdd(AddSummaryAddCost , res) ;
        });
    }
    console.log("总表 : " + AddSummaryAddCost);
    return  AddSummaryAddCost;
}



function showView(detailIDs) {
    $.ajax({
        url : '../BomContoller/GetHistoryBomViews',
        type: "post",
        datatype:"json",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(detailIDs),
        success : function(data, stats) {
            DataInit(data.data[0].bomDetailViewExtendList ,data.data[0].materialCost);
        },
        error : function(data) {
            alert("请求失败");
        },
    })
}

function DataShowDetail(type,detailIDs) {
    //  人工成本 6
    //  制造成本 7
    if (type=='init'){

    }
    else if (type=='check')
    {

    }
    else
    {
        return;
    }

    var obj =  {pargrams:
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

    $.ajax({
        url : '../BomContoller/InitBomViews',
        type: "POST",
        datatype:"json",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify(obj),
        success : function(data, stats) {
            //console.log(data.data[0].materialCost)
            DataInit(data.data[0].bomDetailViewExtendList ,data.data[0].materialCost);
        },
        error : function(data) {
            alert("请求失败");
        },
    })

}

function qwert(o) {
    console.log($(o).val()) ;
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
                var nowDate = new Date();
                if(  new Date(value).getTime() < nowDate.getTime()){
                    layer.msg("回复时间不能小于当前时间。", {icon:5, anim:6, time: 3000});
                }
            }
        });
});


//onput事件触发update,单元格数据重新渲染
function changeReason2(fieldName,indexNumber,o){
    var value = $(o).val()  //$("#"+fieldName+indexNumber).val();
    $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    console.log($(o));
}

function editInit(fileName ,index ,value ,detailID ) {
    if (ifCanChange){
        return '<input value="'+value+'" class="form-control parsley-validated" onblur="sumChange(\'' + fileName + '\',' + index + ',\''+ value +'\','+ detailID + ',this)"  maxlength="11" style="background-color:#fff" />';
    }
    else
    {
        return '<input value="'+value+'" readonly class="form-control parsley-validated" onblur="sumChange(\'' + fileName + '\',' + index + ',\''+ value +'\','+ detailID + ',this)"  maxlength="11" style="background-color:#fff" />';
    }

}

function sumChange(fieldName,indexNumber,oldValue,detailID,o) {
    var value = $(o).val()  //$("#"+fieldName+indexNumber).val();
    if (value == oldValue){
        return ;
    }
    else
    {

    }
    $("#reportTable3").bootstrapTable('updateCell', {index: indexNumber, field: fieldName, value: value});
    if (fieldName == "effFee"){
        recalculateAllcost();
    }

    if (fieldName == "fee"){
        recalculateAllCostNormal();
    }

    if (detailID > 0)
    {
        modifyL.push(detailID);
    }else
    {
        // 新增 不计入修改
        //layer.msg(detailID + parseInt(detailID));
    }

}

//列表新增一行数据
function addRow(tabFlag) {
    var count = getSelectIndex();
    if (count == -1){
        // 没选中 插入目标行位置
        count = $('#reportTable3').bootstrapTable('getData').length;
    }
    maxIds3--;
    $('#reportTable3').bootstrapTable('insertRow', {
        index: count,
        row: {
            "code": "",
            "name": "",
            "spec": "",
            "unit": "",
            "price": 0.0,
            "unitOfUse": 0.0,
            "loss": 0.0,
            "materialNum": 0,
            "materialUsed": 0.0,
            "convertFactor": 0.0,
            "totalUsed": 0.0,
            "unitOfMeasurement": "",
            "lengthOfSpec": 0,
            "widthOfSpec": 0,
            "thicknessOfSpec": 0,
            "lengthOfSelection": 0,
            "widthOfSelection": 0,
            "thicknessOfSelection": 0,
            "lengthOfLeft": 0,
            "widthOfLeft": 0,
            "thicknessOfLeft": 0,
            "lengthOfUsed": 0,
            "widthOfUsed": 0,
            "thicknessOfUsed": 0,
            "partName": "",
            "fee": 0.0,
            bomDetailID: maxIds3
        }
    });
    inserL.push(maxIds3);
}

var delArraysXT = new Array();// 声明一个数组，存放要删除的线条

//列表删除操作
function delRow(tabFlag) {
        var rows = $("#reportTable3").bootstrapTable('getSelections');
        if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
            layer.msg("请先选择要删除的记录!", {icon: 5, anim: 6, time: 3000});
            return;
        } else {
            $(rows).each(function () {// 通过获得别选中的来进行遍历
                $("#reportTable3").bootstrapTable('removeByUniqueId', this.bomDetailID);
                if (this.bomDetailID > 0) {
                    delL.push(this.bomDetailID);
                } else
                {
                    // 移除
                }
            });
            // 重新计算总额
            recalculateAllcost();
            recalculateAllCostNormal();
        }
}

//返回
function back() {
    post("../ProcessController/quotationProcess", {})
}

/**
 * 获取数据源
 * @returns {jQuery|*}
 */
function getData() {
    return $("#reportTable3").bootstrapTable('getData');
}

var changeDataBack = {};

function getChangeBackData() {
    return changeDataBack;
}

/**
 * 获取总额
 * @returns {number}
 */
function getAllCost() {
    return allCost;
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

var ajax;


/// 获取最大
function getSelectIndex(){
    var id = document.getElementsByName('btSelectItem');
    var value = new Array();
    for(var i = 0; i < id.length; i++){
        if(id[i].checked)
        {
            value.push($(id[i]).data("index"));
        }
    }
    if (value.length==0){
        return -1;
    }
    var max = value.sort(function(a,b){
        return b-a;
    })[0];
    return max+1;
}

// num为传入的值，n为保留的小数位
function fomatFloat(num,n){
    var f = parseFloat(num);
    if(isNaN(f)){
        return false;
    }
    f = Math.round(num*Math.pow(10, n))/Math.pow(10, n); // n 幂
    var s = f.toString();
    var rs = s.indexOf('.');
    //判定如果是整数，增加小数点再补0
    if(rs < 0){
        rs = s.length;
        s += '.';
    }
    while(s.length <= rs + n){
        s += '0';
    }
    return s;
}

/**
 *  重新计算有效总价
 * @returns {boolean|string}
 */
function recalculateAllcost() {
    var rows = $('#reportTable3').bootstrapTable('getData')
    var s = 0.00;
    var add = getAddSummaryAddCost();
    if (add>0){
        // 总表计算逻辑
        s = accAdd(s , add);
    }
    else {
        // 求和
        for (i = 0 ; i < rows.length; i++) {
            s = accAdd(s ,rows[i].effFee);
        }
    }
    s = fomatFloat(s ,2);
    allCost = s ;
    $("#allCost").text("总计： "+ allCost);
    return s;
}

/**
 * 重新计算 金额
 */
function recalculateAllCostNormal() {
    var rows = $('#reportTable3').bootstrapTable('getData')
    var s = 0.00;
    var add = getTotalAddSummaryAddCost();
    if (add>0){
        // 总表计算逻辑
        s = accAdd(s , add);
    }
    else {
        // 求和
        for (i = 0 ; i < rows.length; i++) {
            s = accAdd(s ,rows[i].fee);
        }
    }
    s = fomatFloat(s ,2);
    allCostNormal = s ;
    // $("#allCost").text("总计： "+ allCost);
    console.log("金额 ：" + s);
}

/**
 * 保存数据
 * @constructor
 */
function SaveChange(detailID,mainID) {
    // 判断是否有变更
    if (inserL.length >0 || delL.length>0||modifyL.length>0){
        //提醒是否确定保存
        layer.confirm('确定保存吗?', {icon: 3, title:'提示'}, function(index){
            // 调用接口保存数据
            DoSave(detailID,mainID);
            layer.close(index);
            return true;
        });
    }else
    {
        layer.msg("没有变更", {icon: 2, anim: 6, time: 3000});
        return false;
    }
}

// 最简单数组去重法
/*
* 新建一新数组，遍历传入数组，值不在新数组就push进该新数组中
* IE8以下不支持数组的indexOf方法
* */
function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}

function getDataByDetailIDs(IDs) {
    var res = [];
    IDs = uniq(IDs);
    for (i=0 ;i<IDs.length ;i++ )
    {
        var addDataCell = $("#reportTable3").bootstrapTable('getRowByUniqueId',IDs[i])
        if (addDataCell == null){
        }
        else {
            res.push(addDataCell);
        }
    }
    return res;
}

var finalCost = 0 ;

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

/**
 * 保存操作
 * @param inserL
 * @param delL
 * @param modifyL
 * @constructor
 */
function DoSave(detailID,mainID) {
    var index = layer.load(1, {shade: [0.5, '#fff']}); // 0.5透明度的白色背景
    // 获取新增
    var add = getDataByDetailIDs(inserL);
    var modify = getDataByDetailIDs(modifyL);

    var program = {
        mainID : mainID ,
        detailID : detailID,
        addDatas : add,
        changeDatas : modify,
        delIDs : delL ,
        allCost : allCost ,
        allCostNormal : allCostNormal
    };
    var request = "../BomContoller/UpdateDetails";
    ajax = $.ajax({
        type: "POST",
        url: request,
        data:JSON.stringify(program),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        traditional: true,//防止深度序列化
        async:false,
        success: function (result) {
            layer.close(index);
            if (result.success == "true") {
                // 更新成功  重新 加载
                changeDataBack = result.data ;
                // 有效金额
                allCost = changeDataBack.effectiveMaterialCost ;
                // 金额
                allCostNormal = changeDataBack.materialCost ;
                // 总金额
                totalCost =  changeDataBack.totalCostExcludeTax_val;
                // 正常损耗
                normalLost = changeDataBack.normalProcessLoss ;
                // 可变成本
                variableCost = changeDataBack.variableCost ;

                layer.msg(result.msg, {icon: 1, anim: 6, time: 3000});
                // 清空变更 集合
                modifyL = [] ;
                inserL= [];
                delL= [];
                //重新加载;
                DataInit(changeDataBack.bomDetailViewExtendList ,allCost);
                ifModify = true;
            }
            else {
                layer.msg("修改错误 "+ result.msg, {icon: 2, anim: 6, time: 3000});
                ifModify = false;
            }
        }
    });

}
