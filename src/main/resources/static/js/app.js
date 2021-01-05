// 模拟form提交
function post(URL, PARAMS) {
    var tempForm = document.createElement("form");
    tempForm.action = URL;
    tempForm.method = "post";
    document.body.appendChild(tempForm);

    var length = $("#nav.nav-xs").length;

    for ( var x in PARAMS) {
        var tempInput = document.createElement("input");
        tempInput.type = 'hidden';
        tempInput.name = x;
        tempInput.value = PARAMS[x];
        tempForm.appendChild(tempInput);

        // 电脑版时记录滚动条高度
        if (length == 0 && x == "top") {
            document.cookie = "top=" + PARAMS[x];
        }
    }
    tempForm.submit();
}

// 根据key从cookie或localStorage获取对应值
function getCookies(key) {
    if (isWebStorage()) {
        // return sessionStorage.getItem(key);
        return localStorage.getItem(key);
    } else {
        $.cookie(key);
    }
}

// 将key，value键值保持到cookie或localStorage中
function saveCookies(key, value) {
    if (isWebStorage()) {
        // sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
    } else {
        $.cookie(key, value);
    }
}

// 删除cookie或localStorage
function delCookies(key) {
    if (isWebStorage()) {
        // sessionStorage.removeItem(key);
        localStorage.removeItem(key);
    } else {
        $.cookie(key, null);
    }
}

// 判断浏览器是否是支持H5
function isWebStorage() {
    if (window.localStorage) {
        // "浏览支持localStorage"
        return true;
    } else {
        // "浏览暂不支持localStorage"
        return false;
    }
}
var ajax;
//点击保存按钮
function logout(){
    var json={};
    ajax = $.ajax({
        type : "POST",
        url : "../CommonController/logout",
        traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                post("../CommonController/login",{});
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });

}

//更改密码
function changePassword() {
    parent.layer.open({
        type: 2,
        title: ['更改密码', 'font-size:18px;color:#788188;'],
        area : ['370px', '430px'],
        closeBtn: 1, //BasicFileController
        content: '../CommonController/changePassword', // changePassword
    });
}