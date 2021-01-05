var $window = $(window);
$window.resize(function() {
    resizewindow();
});
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    if($("#bwType").val()==0){
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        //表格主体的高度
        $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }else{
        $(".ibox-content").height(n);
        $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
        $(".table-content").height($(".ibox-content2").height()-$(".search-list2").height()-130);
        $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);
    }
}
//图片格式
 $(function() {
    resizewindow();
}) ;

var ajax;
//点击保存按钮
function save(){
    var json = {};
    if($("#seriesName").val()==null || $("#seriesName").val().trim()==""){
        layer.msg("请输入分类名称", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.seriesName = $("#seriesName").val();

    // 是否热销产品
    if($("#type").val()==null || $("#type").val().trim()==""){
        layer.msg("请选择是否热销产品", {icon : 5, anim : 6, time : 3000});
        return;
    }
    formData.append("type", $("#type").val());//是否热销产品

    console.log($("#seriesName").val());
    if($("#classGuid").val()==null || $("#classGuid").val().trim()==""){
        layer.msg("请选择改分类的父分类", {icon : 5, anim : 6, time : 3000});
        return;
    }
    json.classGuid = $("#classGuid").val();
    console.log($("#classGuid").val());
    //产品表id
    if( $("#id").val()!=null &&  $("#id").val()!="" &&  $("#id").val()!=undefined){
        json.id = $("#id").val();
    }
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    console.log(json);
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/saveSeries",
        traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                post("../ProductController/addAndEditSeries",{id:result.id});
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });
}
//返回
function back(){
    post("../ProductController/seriesMaintenance",{});
}
