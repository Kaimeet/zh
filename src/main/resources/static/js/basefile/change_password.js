var $window = $(window);
$window.resize(function() {
});

//更改密码
function save() {
    var json = {};
    if($("#login-password").val() == "") {
        layer.msg("请输入旧密码！", {icon:5, anim:6, time: 2000});
        return;
    }
    json.password = $("#login-password").val();
    if($("#new-password1").val() == "" || $("#new-password2").val() == "") {
        layer.msg("请输入新密码！", {icon:5, anim:6, time: 2000});
        return;
    }
    json.newPassword = $("#new-password1").val();
    json.newPassword2 = $("#new-password2").val();

    if ($("#new-password1").val() != $("#new-password2").val()) {
        layer.msg("两次输入的密码不同！", {icon:5, anim:6, time: 2000});
        return;
    }

    // loading层
    let index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    let request = "../CommonController/savePassword";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 2000});
            }else {
                layer.msg(result.resultMassage, {icon:6, anim:5, time: 1500},function () {
                    window.parent.location.reload();
                    let index2 = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index2); //再执行关闭
                });
            }
        }
    });

}

//返回
function back() {
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}
