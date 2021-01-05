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
    if($("#copyUserId").val()!=null &&  $("#copyUserId").val()!=""  &&  $("#copyUserId").val()!=undefined ){
        formData.append("copyUserId", $("#copyUserId").val());
    }else{
        if($("#copyUserId").text()!=null &&  $("#copyUserId").text()!=""  &&  $("#copyUserId").text()!=undefined ){
            formData.append("copyUserId", $("#copyUserId").text());
        }
    }
    var checkboxName="";
    $("input[type='radio']:checked").each(function () {
       checkboxName = $(this).attr("name");
       checkboxNames.push($(this).attr("name"));
       checkboxValus.push($(this).val());
    });
    formData.append("checkboxNames", checkboxNames);
    formData.append("checkboxValus", checkboxValus);
    var userId = $("#userId").val();
    formData.append("userId", userId);
    var menuId = $("#menuId").val();
    formData.append("menuId", menuId);
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    if (ajax != null) {
        ajax.abort();
    }
    var request = "../UserController/saveMenuPower";
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
                window.location.reload();
            }
        }
    });
}

//返回
function back() {
    post("../UserController/menuPower",{})
}
//选择生产基地
function chooseUserForCopy(){
    parent.layer.open({
        type: 2,
        title: ['获取权限参照人', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../UserController/chooseUserForCopy?userId='+$("#userId").val() //ProcessController  chooseBomType
    });
}


//选择报价单中的生产基地
function chooseUserForCopy(indexNumber,flag){
    parent.layer.open({
        type: 2,
        title: ['获取权限参照人', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../UserController/chooseUserForCopy', //chooseBOMSeries
    });
}