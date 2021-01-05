var $window = $(window);
$window.resize(function() {
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
});

$(function() {
    resizewindow();

});
var ajax;



//作废轮播图
function agreeAndDisagree(applyStatus){
    var json = {};
    console.log($("#username").val());
    var tipRemark = $("#tipRemark").val();
    if(applyStatus==2 && ($("#tipRemark").val()==null || $("#tipRemark").val()=="" || $("#tipRemark").val()==undefined)){
        layer.msg("不通过请填写审核意见。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.tipRemark = tipRemark;
    json.applyStatus = applyStatus;
    json.id = $("#id").val();
    json.userId = $("#userId").val();
    json.rolaId = $("#rolaId").val();
    json.rolaName = $("#rolaName").val();
    json.hadeGotRloaNames = $("#hadeGotRloaNames").val();
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../UserController/agreeAndDisagree";
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
                    post("../UserController/permissionReviewPage",{id:result.id})
//                });
            }
        }
    });
}
//返回
function back() {
    post("../UserController/permissionApplicationReview",{})
}
