$(function () {

});
var form,flow,element,layer;
layui.use(['form','flow','element','layer'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer;
});

//登陆
function checkuser() {
    var username = $("#login-email").val();
    var password = $("#login-password").val();

    apply(username,password);
}

//手机版登陆
function xssmcheckuser() {
    var username = $("#xssm-email").val();
    var password = $("#xssm-password").val();

    apply(username,password);
}
$('#login-email').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　checkuser();
　　}
});
$('#login-password').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
　　　　//回车执行查询
　　　　checkuser();
　　}
});
//保存
function apply(username,password){
    if(username==null || username.trim()==""){
        layer.msg("请输入用户名。", {icon:5, anim:6, time: 3000});
        return;
    }
    if(password==null || password.trim()==""){
        layer.msg("请输入密码。", {icon:5, anim:6, time: 3000});
        return;
    }
    var jsonStr = {
        "username":username,
        "password":password
    };
    var request = "../CommonController/logincheck";
    $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : jsonStr,
        dataType : "json",
        cache : false,
        async : false,
        success : function(result) {
            console.log(result.resultCode);
            if(result.resultCode == 1) {
                if(result.menusMiddleSize==0){
                    post("../NoticeController/notice", {});
                }else{
                    post("../ProcessController/quoteDetails?menuid=5", {});
                }

            }else{
                layer.msg(result.resultMassage, {icon:5, anim:6, time: 3000});
            }
        }
    });
}
