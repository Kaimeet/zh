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
            elem: '#dateTime' //创建时间
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
    post("../ProcessController/materialPrice",{})
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
     var typeCode = $("#typeCode").val();
     if(typeCode==null || typeCode=="" || typeCode == undefined){
         layer.msg("请先设置BOM的所属大类。", {icon:5, anim:6, time: 3000});
         return;
     }
     parent.layer.open({
         type: 2,
         title: ['二级分类列表', 'font-size:18px;color:#788188;'],
         area : ['800px', '600px'],
         closeBtn: 1,
         content: '../ProcessController/chooseBomType?typeCode='+typeCode
     });
 }

//选中BOM模板
function choose(){
    parent.layer.open({
        type: 2,
        title: ['BOM模板选择', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/setBOMForProcess'
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
function chooseMaterial() {
    parent.layer.open({
        type: 2,
        title: ['物料选择', 'font-size:18px;color:#788188;'],
        area : ['1000px', '800px'],
        closeBtn: 1,
        content: '../BomNewContoller/chooseMaterial', //chooseBOMSeries
        end:function(){

        }
    });

}
//保存操作
var ajax;
//作废轮播图
function save(){
    var json = {};
    json.id = $("#zzz").val();
    if($("#zzz").val()==null || $("#zzz").val()=="" || $("#zzz").val()==undefined){
        if($("#code").val()==null || $("#code").val()=="" || $("#code").val()==undefined ){
            layer.msg("请输入存货编码。", {icon : 5, anim : 6, time : 3000});
            return;
        }
        if($("#name").val()==null || $("#name").val()=="" || $("#name").val()==undefined ){
            layer.msg("请输入存货编名称。", {icon : 5, anim : 6, time : 3000});
            return;
        }
        if($("#dateTime").val()==null || $("#dateTime").val()=="" || $("#dateTime").val()==undefined ){
            layer.msg("请填入时间。", {icon : 5, anim : 6, time : 3000});
            return;
        }
        if($("#unitPrice").val()==null || $("#unitPrice").val()=="" || $("#unitPrice").val()==undefined ){
            layer.msg("请输入存货价格。", {icon : 5, anim : 6, time : 3000});
            return;
        }
        json.proRates = $("#proRates").val();
        json.inventoryCode = $("#code").val();
        var da = new Date( $("#dateTime").val());
        json.dateTime = da;
        json.material = $("#name").val();
        json.materialSpecification = $("#spec").val();
        json.materialUnit = $("#unit").val().trim();
        json.unitPrice = $("#unitPrice").val().trim();
        json.inventoryWarehouse=$("#inventoryWarehouse").val();
        json.reason = $("#reason").val();
        json.organization = $("#companyName").val();
        json.purchasePrice = $("#purchasePrice").val().trim();
        json.updateBy = $("#updateBy").val().trim();
    }
    else {
        if($("#proRates").val()==null || $("#proRates").val()=="" || $("#proRates").val()==undefined ){
            layer.msg("请输入审核后的价格。", {icon : 5, anim : 6, time : 3000});
            return;
        }
        json.proRates = $("#proRates").val();
        json.inventoryCode = $("#inventoryCode2").val().trim();
        json.dateTime = $("#dateTime2").val();
        json.material = $("#material2").val();
        json.materialSpecification = $("#materialSpecification2").val();
        json.materialUnit = $("#materialUnit2").val().trim();
        json.unitPrice = $("#unitPrice2").val().trim();
        json.inventoryWarehouse=$("#inventoryWarehouse2").val().trim();
        json.reason = $("#reason").val();
        json.organization = $("#organization2").val().trim();
        json.purchasePrice = $("#purchasePrice2").val().trim();
        json.updateBy = $("#updateBy2").val().trim();
    }


    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveMaterialPrice";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据save
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    post("../ProcessController/materialPrice",{
                        id:json.id,
                        inventoryCode:json.inventoryCode,
                        dateTime:json.dateTime,
                        material:json.material,
                        materialSpecification:json.materialSpecification,
                        materialUnit:json.materialUnit,
                        unitPrice:json.unitPrice,
                        reason:json.reason,
                        organization:json.organization,
                        purchasePrice:json.purchasePrice,
                        inventoryWarehouse:json.inventoryWarehouse,
                        proRates:json.proRates,
                        updateBy:json.updateBy,
                        type:$("#type").val()});
//                });
            }
        }
    });

}
function chooseCompany(){
    parent.layer.open({
        type: 2,
        title: ['组织列表', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/chooseCompany',
        end:function(){

        }
    });
}
