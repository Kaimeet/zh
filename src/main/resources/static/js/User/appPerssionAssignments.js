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

//图片格式
var extArray = [".jpg", ".png", ".jpeg"];
$(function() {
    resizewindow();
});

var menuIds = [];
var ajax;
var checkboxNames = new Array();
var checkboxValus = new Array();
//作废轮播图
function save(){
    var formData = new FormData();
    var checkboxName="";
    $("input[type='checkbox']").each(function () {
       checkboxName = $(this).attr("name");
       checkboxNames.push($(this).attr("name"));
       if ($(this).is(":checked")) {
           checkboxValus.push("1");
       }else{
           checkboxValus.push("0");
       }
    });
    formData.append("checkboxNames", checkboxNames);
    formData.append("checkboxValus", checkboxValus);
    var id = $("#id").val();
    formData.append("rolaId", id);
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }
    var request = "../UserController/saveAppPressiom";
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
                    post("../UserController/appPerssionAssignments",{id:id})
//                });
            }
        }
    });
}

//返回
function back() {
    if($("#backflag").val()==0){
        post("../UserController/addAndEditRola",{id:$("#id").val()})
    }else{
        post("../UserController/rolaManage",{})
    }
}