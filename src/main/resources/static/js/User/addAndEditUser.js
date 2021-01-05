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
$(function() {
    resizewindow();
    if($("#departmentCodeOneMiddle")!=null && $("#departmentCodeOneMiddle")!="" && $("#departmentCodeOneMiddle")!=undefined){
        //为编辑，通过一级部门获取二级部门信息
        var departmentCodeTwoMiddle = $("#departmentCodeTwoMiddle").val();
        var departmentCodeOneMiddle = $("#departmentCodeOneMiddle").val();
        chooseDepartmentTwo(departmentCodeOneMiddle,departmentCodeTwoMiddle);
    }
});
//一级部门select change事件
function chooseDepartment(){
     chooseDepartmentTwo($("#departmentCodeOne").val(),"")
}
var ajax;
//获取二级部门select，如果为编辑，选中的二级部门selected = true
function chooseDepartmentTwo(departmentCodeOneMiddle,departmentCodeTwoMiddle){
    var json = {};
    json.departmentCodeOneMiddle = departmentCodeOneMiddle;
    json.departmentCodeTwoMiddle = departmentCodeTwoMiddle;
    // loading层
//    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../UserController/chooseDepartmentTwo";
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
//            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                     $("#departmentCodeTwo").html(result.selectHtml);
//                });
            }
        }
    });
}

function save(){
    var json = {};
    console.log($("#username").val());
    if($("#username").val()==null || $("#username").val()=="" || $("#username").val()==undefined) {
        layer.msg("请输入用户名", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.username = $("#username").val();
    if($("#id").val()!=null && $("#id").val()!=""){//为编辑
        json.id = $("#id").val();
        //有填新密码或者旧密码
        if($("#oldPassword").val()!=null && ($("#newPassword").val()==null || $("#newPassword").val()=="" || $("#newPassword").val()==undefined)){
            layer.msg("请输入新密码", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //有填新密码或者旧密码
        if($("#newPassword").val()!=null && ($("#oldPassword").val()==null || $("#oldPassword").val()=="" || $("#oldPassword").val()==undefined)){
            layer.msg("请输入老密码", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //如果新密码和老密码都不为空
        if($("#newPassword").val()!=null && $("#oldPassword").val()!=null){
            json.newPassword = $("#newPassword").val();
            json.oldPassword = $("#oldPassword").val();
        }
    }else{

        if($("#password").val()==null || $("#password").val()=="" || $("#password").val()==undefined){
            layer.msg("请输入密码", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //有填新密码或者旧密码
        if($("#passwordAgain").val()==null || $("#passwordAgain").val()=="" || $("#passwordAgain").val()==undefined){
            layer.msg("请输入确认密码", {icon : 5, anim : 6, time : 3000});
            return;
        }
        //如果新密码和老密码都不为空
        if($("#password").val()!=null && $("#passwordAgain").val()!=null && $("#password").val() !== $("#passwordAgain").val() ){
            layer.msg("两次填写的密码必须一致，请确认", {icon : 5, anim : 6, time : 3000});
            return;
        }
        json.password = $("#password").val();
        json.passwordAgain = $("#passwordAgain").val();
    }

    if($("#name").val()==null || $("#name").val()=="" || $("#name").val()==undefined) {
        layer.msg("请输入用户真实姓名。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.name = $("#name").val();

    if($("#sex").val()==null || $("#sex").val()=="" || $("#sex").val()==undefined) {
        layer.msg("请选择性别", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.sex = $("#sex").val();

    if($("#phone").val()==null || $("#phone").val()=="" || $("#phone").val()==undefined) {
        layer.msg("请输入用户手机号码", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!myreg.test($("#phone").val())) {
        layer.msg("请输入正确的手机号格式", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.phone = $("#phone").val();

    if($("#email").val()==null || $("#email").val()=="" || $("#email").val()==undefined) {
        layer.msg("请输入用户邮箱", {icon : 5, anim : 6, time : 3000});
        return;
    }
    var myreg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(!myreg.test($("#email").val())) {
        layer.msg("请输入正确的邮箱格式", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.email = $("#email").val();

    if($("#departmentCodeOne").val()==null || $("#departmentCodeOne").val()=="" || $("#departmentCodeOne").val()==undefined) {
        layer.msg("请选择一级部门信息", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.departmentCodeOne = $("#departmentCodeOne").val();

    if($("#departmentCodeTwo").val()==null || $("#departmentCodeTwo").val()=="" || $("#departmentCodeTwo").val()==undefined) {
        layer.msg("请选择二级部门信息", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.departmentCodeTwo = $("#departmentCodeTwo").val();

    json.belongType = $("#beongleType").val();





    if($("#id").val()!=null && $("#id").val()!="" && $("#id").val()!=undefined){
        json.id = $("#id").val();
    }
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../UserController/saveUser";
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
                    post("../UserController/userManage",{id:result.id})
//                });
            }
        }
    });
}
//返回
function back() {
    post("../UserController/userManage",{})
}
//分配角色
function roleAssignments(){
    if($("#id").val()!=null && $("#id").val()!="" && $("#id").val()!=undefined){
        post("../UserController/roleAssignments",{id:$("#id").val(),backflag:0});//jinrru
    }else{
        layer.msg("用户保存后才能分配用户角色。", {icon : 5, anim : 6, time : 3000});
    }
}
