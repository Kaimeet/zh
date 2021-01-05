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
//选择要上传的所有文件
fileList = [];
//选择要上传的所有文件
fileList2 = [];
var delFileIdImages = [];
var delFileIdOthers = [];
//图片格式
var extArray = [".jpg", ".png", ".jpeg"];
$(function() {
    resizewindow();
    $('.file-list').fadeIn(2500);
});
var ajax;



//作废轮播图
function save(){
    var json = {};
    console.log($("#rolaName").val());
    if($("#rolaName").val()==null || $("#rolaName").val()=="" || $("#rolaName").val()==undefined) {
        layer.msg("请输入角色名称。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.rolaName = $("#rolaName").val();

    if($("#id").val()!=null && $("#id").val()!="" && $("#id").val()!=undefined){
        json.id = $("#id").val();
    }
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../UserController/saveRola";//saveUser
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
                    post("../UserController/addAndEditRola",{id:result.id})
//                });
            }
        }
    });
}
//返回
function back() {
    post("../UserController/rolaManage",{})
}
//分配角色
function roleAssignments(){
    if($("#id").val()!=null && $("#id").val()!="" && $("#id").val()!=undefined){
        post("../UserController/perssionAssignments",{id:$("#id").val(),backflag:0});//jinrru
    }else{
        layer.msg("角色保存后才能分配权限角色。", {icon : 5, anim : 6, time : 3000});
    }
}
//分配app角色
function roleAssignments2(){
    if($("#id").val()!=null && $("#id").val()!="" && $("#id").val()!=undefined){
        post("../UserController/appPerssionAssignments",{id:$("#id").val(),backflag:0});//jinrru
    }else{
        layer.msg("角色保存后才能分配权限角色。", {icon : 5, anim : 6, time : 3000});
    }
}
//角色类别值变更事件
function changerolatype(){
console.log($("#type").val());

    if($("#type").val()==0){
        $("#perssiomAssignments").hide();
        $("#perssiomAssignments2").show();
        $("#privilegeLeveldiv").show();
    }else if($("#type").val()==1){
        $("#perssiomAssignments").show();
        $("#perssiomAssignments2").hide();
        $("#privilegeLeveldiv").hide();
    }
}