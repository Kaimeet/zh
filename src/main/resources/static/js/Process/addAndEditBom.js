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
    post("../ProcessController/standardBomManage",{})
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

//保存操作
var ajax;
//作废轮播图
function save(){
    var json = {};
    json.id = $("#id").val();
    if($("#bomName").val()==null || $("#bomName").val()=="" || $("#bomName").val()==undefined ){
        layer.msg("请输入BOM对应的名称。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.bomName = $("#bomName").val();
    if($("#typeCodeTwo").val()==null || $("#typeCodeTwo").val()==""|| $("#typeCodeTwo").val()==undefined ){
        layer.msg("请选择BOM对应二级分类信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.typeCode = $("#typeCodeTwo").val();

    json.templateName = $("#templateName").val();
    json.templateCode = $("#templateCode").val();
    if($("#seriesCode").val()==null || $("#seriesCode").val()=="" || $("#seriesCode").val()==undefined ){
        layer.msg("请选择BOM对应系列信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.seriesCode = $("#seriesCode").val();

    if($("#bomStyle").val()==null || $("#bomStyle").val()=="" || $("#bomStyle").val()==undefined ){
        layer.msg("请输入该BOM对应的产品款式/型号信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.bomStyle = $("#bomStyle").val();

    if($("#bomClass").val()==null || $("#bomClass").val()=="" || $("#bomClass").val()==undefined ){
        layer.msg("请选择该产品的分类信息。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.bomClass = $("#bomClass").val();

    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProcessController/saveStandardBomMassage";
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
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    post("../ProcessController/execlEditPage",{templateCode:templateCode,bomStyle:bomStyle,bomCode:result.bomCode,bomName:bomName,type:$("#type").val()})
//                });
            }
        }
    });
}
