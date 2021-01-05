var $window = $(window);
$window.resize(function() {
    resizewindow();
});

$(function() {
    resizewindow();
});
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

    laydate.render({
            elem: '#replyDate' //创建时间
            ,type: 'date'
            // ,range: true //或 range: '~' 来自定义分割字符
            ,format: 'yyyy-MM-dd' //可任意组合
            // ,isInitValue: false //是否允许填充初始值，默认为 true
            ,done: function(value, date, endDate){
//                if($("#createEndTime").val()!= null && $("#createEndTime").val()!="" && new Date(value).getTime() > new Date($("#createEndTime").val()).getTime()){
//                    layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});
//
//                }
            }
        });
});

//返回
function back() {
    post("../ProcessController/manufacturingExpenses",{})
}

//编辑bom
function editBom(){
    post("../ProcessController/execlEditPage",{});//jinrru
}

//大类值变更事件
function bomTypeOnesChange(){
    $("#typeCode").val($("#bomTypeOnes").val());
}

//获取一级分类对应的大类信息
function chooseBomType(){
    parent.layer.open({
        type: 2,
        title: ['类型列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseProductCategories'
    });
}
function chooseBomTypeTwo(){
    parent.layer.open({
        type: 2,
        title: ['分类列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseProductCategoriesII'
    });
}

//选中BOM模板
function choose(){
    parent.layer.open({
            type: 2,
            title: ['模型列表', 'font-size:18px;color:#788188;'],
            area : ['800px', '600px'],
            closeBtn: 1,
            content: '../ProcessController/chooseProductionBase'
        });
}

//选择bom所属的系列
function chooseBomSeries(){
    var typeCodeTwo = $("#typeCodeTwo").val();
    if(typeCodeTwo==null || typeCodeTwo=="" || typeCodeTwo == undefined){
        layer.msg("请先选择BOM的所属二级分类。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['BOM系列列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBOMSeries?typeCodeTwo='+typeCodeTwo
    });
}
//选择bom所属的系列
function chooseBomSeries2(){
    var typeCodeTwo = $("#typeCodeTwo").val();
    if(typeCodeTwo==null || typeCodeTwo=="" || typeCodeTwo == undefined){
        layer.msg("请先选择BOM的所属二级分类。", {icon:5, anim:6, time: 3000});
        return;
    }
    parent.layer.open({
        type: 2,
        title: ['BOM系列列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseBOMSeries?typeCodeTwo='+typeCodeTwo
    });
}

function choose(){
    parent.layer.open({
        type: 2,
        title: ['模型列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../basicFileController/chooseboms' //setBOMForProcess
    });
}
function chooseBomSeries(){
     var modelcode=$("#bomcode").val();
        if(modelcode==undefined||modelcode==''||modelcode==null){
            layer.msg("请先选择类型", {icon:5, anim:6, time: 3000});
            return;
        }
        parent.layer.open({
            type: 2,
            title: ['类型名称列表', 'font-size:18px;color:#788188;'],
            area : ['800px', '600px'],
            closeBtn: 1,
            content: '../basicFileController/choosevarinames?modelcode='+modelcode //setBOMForProcess
        });

}

//选择生产基地
function chooseBomSeries3(){
 parent.layer.open({
        type: 2,
        title: ['变量名称列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../basicFileController/chooseproduce' //setBOMForProcess
    });

//    parent.layer.open({
//        type: 2,
//        title: ['生产基地列表', 'font-size:18px;color:#788188;'],
//        area : ['800px', '600px'],
//        closeBtn: 1,
//        content: '../ProcessController/chooseProductionBase'
//    });
}

//保存操作
var ajax;
//作废轮播图
function save(){
    var json = {};
    json.id = $("#id").val();
    if($("#bomcode").text()==null || $("#bomcode").text()=="" || $("#bomcode").text()==undefined){
if($("#bomcode").val()==null || $("#bomcode").val()=="" || $("#bomcode").val()==undefined ){
    layer.msg("请输入类型。", {icon : 5, anim : 6, time : 3000});
    return;
}
        $("#bomcode").text($("#bomcode").val());
    }

    if($("#varvalue").text()==null || $("#varvalue").text()=="" || $("#varvalue").text()==undefined){
        if($("#varvalue").val()==null || $("#varvalue").val()=="" || $("#varvalue").val()==undefined ){
            layer.msg("请输入分类。", {icon : 5, anim : 6, time : 3000});
            return;
        }
        $("#varvalue").text($("#varvalue").val());
    }
    if($("#bomcode").text()=="烤漆"||$("#bomcode").text()=="KQ"||$("#bomcode").val()=="KQ"||$("#bomcode").val()=="烤漆"){
        if($("#shengchancode").val()==null || $("#shengchancode").val()=="" || $("#shengchancode").val()==undefined){
            layer.msg("请输入生产基地。", {icon : 5, anim : 6, time : 3000});
            return;

        }

    }
    //
    // if($("#varvalue0").val()==null || $("#varvalue0").val()=="" || $("#varvalue0").val()==undefined || $("#varvalue2").val()==null||$("#varvalue2").val()=="" || $("#varvalue2").val()==undefined){
    //
    //
    //      if($("#varvalue0").val()==null && $("#varvalue2").val()==null ){
    //         layer.msg("请输入产品分类。", {icon : 5, anim : 6, time : 3000});
    //          return;
    //      }
    // }
    // if($("#id").val()==null || $("#id").val()=="" || $("#id").val()==undefined){
    //     json.variableValue = $("#varvalue").val();
    //     $("#varvalue2").val($("#varvalue").val());
    // }
    // else {
    //     json.variableValue = $("#varvalue0").val();
    //     $("#varvalue2").val($("#varvalue0").val());
    // }
    // if($("#varvalue2").val()==null || $("#varvalue2").val()=="" || $("#varvalue2").val()==undefined ){
    //     layer.msg("请输入类型。", {icon : 5, anim : 6, time : 3000});
    //     return;
    // }



    if($("#id").val()==null || $("#id").val()=="" || $("#id").val()==undefined){
        json.processVersion = $("#processVersion").val();
        $("#processVersion3").val($("#processVersion").val());
    }
    else {
        json.processVersion = $("#processVersion2").val();
        $("#processVersion3").val($("#processVersion2").val());
    }

    if($("#fixedManufacturingCosts").val()==null || $("#fixedManufacturingCosts").val()=="" || $("#fixedManufacturingCosts").val()==undefined ){
             layer.msg("请输入固定制造费用。", {icon : 5, anim : 6, time : 3000});
             return;
        }
        json.fixedManufacturingCosts = $("#fixedManufacturingCosts").val();

    if(
        ($("#company1").val()==null || $("#company1").val()=="" || $("#company1").val()==undefined )
        &&($("#company2").val()==null || $("#company2").val()=="" || $("#company2").val()==undefined)
    ){
        layer.msg("单位不能为空。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    if($("#company1").val()==null || $("#company1").val()=="" || $("#company1").val()==undefined){
        $("#company").val($("#company2").val());
    }
    if($("#company2").val()==null || $("#company2").val()=="" || $("#company2").val()==undefined){
       $("#company").val($("#company1").val());
    }
    if($("#company").val().trim()==null || $("#company").val().trim()=="" || $("#company").val().trim()==undefined){
        layer.msg("单位不能为空。", {icon : 5, anim : 6, time : 3000});
        return;
    }
        // if($("#variableManufacturingExpenses").val()==null || $("#variableManufacturingExpenses").val()=="" || $("#variableManufacturingExpenses").val()==undefined ){
    //          layer.msg("请输入变动用制造费用。", {icon : 5, anim : 6, time : 3000});
    //          return;
    //     }
    json.variableManufacturingExpenses = $("#variableManufacturingExpenses").val();
    json.variableValue = $("#varvalue").text();
     json.modelCode = $("#bomcode").text();
       json.baseCode = $("#shengchancode").val();
        json.company = $("#company").val();
        if($("#electricityFees").val()==null || $("#electricityFees").val()=="" || $("#electricityFees").val()==undefined){
            json.electricityFees =null;
        }else {
            json.electricityFees = $("#electricityFees").val();
        }

        if($("#electricityFeesPrecent").val()==null || $("#electricityFeesPrecent").val()=="" || $("#electricityFeesPrecent").val()==undefined){
            if(json.electricityFees==null){
                $("#electricityFeesPrecent").val($("#electricityFeesPrecent1").val());
            }
        }
        else {
            if(json.electricityFees!=null){
                layer.msg("电费和电费百分比只能填写1个。", {icon : 5, anim : 6, time : 3000});
                return;
            }
        }
    if(($("#electricityFeesPrecent").val()==null || $("#electricityFeesPrecent").val()=="" || $("#electricityFeesPrecent").val()==undefined)&&($("#electricityFeesPrecent1").val()==null || $("#electricityFeesPrecent1").val()=="" || $("#electricityFeesPrecent1").val()==undefined)){
        json.electricityFeesPrecent =null;
    }else {
        json.electricityFeesPrecent = $("#electricityFeesPrecent").val();
    }
        if(json.electricityFeesPrecent!=null&&json.electricityFees!=null){
            layer.msg("电费和电费百分比只能填写1个。", {icon : 5, anim : 6, time : 3000});
            return;
        }
    if($("#addManufacturingExpenses").val()==null || $("#addManufacturingExpenses").val()=="" || $("#addManufacturingExpenses").val()==undefined){
        json.addManufacturingExpenses =null;
    }else {
        json.addManufacturingExpenses = $("#addManufacturingExpenses").val();
    }
    if($("#addManufacturingPrecent").val()==null || $("#addManufacturingPrecent").val()=="" || $("#addManufacturingPrecent").val()==undefined){
        if(json.addManufacturingExpenses==null){
            $("#addManufacturingPrecent").val($("#addManufacturingPrecent1").val());
        }

    }
    else {
        if(json.addManufacturingExpenses!=null){
            layer.msg("制造费用和制造费用百分比只能填写1个。", {icon : 5, anim : 6, time : 3000});
            return;
        }
    }
    if(($("#addManufacturingPrecent").val()==null || $("#addManufacturingPrecent").val()=="" || $("#addManufacturingPrecent").val()==undefined)&&($("#addManufacturingPrecent1").val()==null || $("#addManufacturingPrecent1").val()=="" || $("#addManufacturingPrecent1").val()==undefined)){
        json.addManufacturingPrecent =null;
    }else {
        json.addManufacturingPrecent = $("#addManufacturingPrecent").val();
    }
    if(json.addManufacturingPrecent!=null&&json.addManufacturingExpenses!=null){
        layer.msg("制造费用和制造费用百分比只能填写1个。", {icon : 5, anim : 6, time : 3000});
        return;
    }

         json.remarks = $("#remarks").val();
         json.isDelete = 1;
         json.updateTime = $("#updateTime").val();
         json.updateBy = $("#updateBy").val();



    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveManufacturingExpenses";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
               // layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    post("../ProcessController/manufacturingExpenses",
                    {
                    variableValue:$("#varvalue").text(),
                    processVersion:$("#processVersion3").val(),
                    company:$("#company").val(),
                    fixedManufacturingCosts:$("#fixedManufacturingCosts").val(),
                    variableManufacturingExpenses:$("#variableManufacturingExpenses").val(),
                    modelCode:$("#bomcode").text(),
                    variableCode:"",
                    baseCode:$("#shengchancode").val(),
                    electricityFees:$("#electricityFees").val(),
                    electricityFeesPrecent:$("#electricityFeesPrecent").val(),
                    addManufacturingExpenses:$("#addManufacturingExpenses").val(),
                    addManufacturingPrecent:$("#addManufacturingPrecent").val(),
                    remarks:$("#remarks").val(),
                    isDelete:1,
                    updateTime:$("#updateTime").val(),
                    updateBy:$("#updateBy").val()
                    })
               // });
            }
        }
    });
}
