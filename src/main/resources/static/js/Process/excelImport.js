var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({});

});
$(function() {
    resizewindow();

});
//重新计算页面尺寸
function resizewindow(){
    var i = $(window).height(), n = i - $(".ibox-title").innerHeight() - $(".navbar").innerHeight() - $(".footer").innerHeight() - $(".footer").innerHeight() - 30;

    $(".ibox-content").height(n);
    $(".ibox-content2").height(n-($(".ibox-content2").innerHeight()-$(".ibox-content2").height()));
    //表格主体的高度
    $(".table-content").height($(".ibox-content2").height()-$(".search-list").height()-90);
    $("#tableInfo").height($(".ibox-content2").height()-$(".search-list").height()-30);

}
//选择
function choose(){
    var productid = $("input[type='radio']:checked").val();
    // parent.$("#jumpId").val(productid);
    parent.$("#jumpCode").text(productid);
    parent.$("#choosedName").val($("#title"+productid).text());
    console.log();
    //当你在iframe页面关闭自身时
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}