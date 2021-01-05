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
    post("../ProcessController/productLineTwo",{})
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


    if($("#productName").val()==null || $("#productName").val()=="" || $("#productName").val()==undefined ){
             layer.msg("请输入产品系列。", {icon : 5, anim : 6, time : 3000});
             return;
        }
        json.productName = $("#productName").val();
    if($("#productCode").val()==null || $("#productCode").val()=="" || $("#productCode").val()==undefined ){
        layer.msg("请输入产品系列编码。", {icon : 5, anim : 6, time : 3000});
        return;
    }

    json.productCode = $("#productCode").val();


    json.typeCodeTwo = $("#varvalue").text();
     json.typeCode = $("#bomcode").text();





    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveProductLineTwo";
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
                    post("../ProcessController/productLineTwo",
                    {
                        typeCodeTwo:$("#varvalue").text(),
                        typeCode:$("#bomcode").text(),
                        productName:$("#productName").val(),
                        productCode:$("#productCode").val()
                    })
               // });
            }
        }
    });
}
