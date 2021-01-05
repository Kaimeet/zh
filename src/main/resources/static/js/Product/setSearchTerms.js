var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
});
$(function() {
    resizewindow();
    /*//页面滚动到底部时加载更多
    var nScrollHight = 0;
    var nScrollTop = 0;
    var $frame = $(".table-content");
    var nDivHight = $frame.height() + 50;
    $frame.on("scroll touchmove", function() {
        nScrollHight = $(this)[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop;
        if (Number(nScrollTop) + Number(nDivHight) >= Number(nScrollHight)) {
            $('.layui-flow-more a').click();
        }
        $(".layui-flow-more").css("position","absolute");
        $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
    });*/
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
var itemsIds = [];
var ajax;
//作废轮播图
function save(){
    var json = {};
    var barlength = $("#bar").children("li").length;//已经选的搜索条件
    if(barlength==0){
        layer.msg("请为改页面设置搜索条件。", {icon : 5, anim : 6, time : 3000});
        return;
    }
    $("#bar").children("li").each( function(){ var ids= $(this).attr("id"); itemsIds.push(ids); });
    json.itemsIds = itemsIds;
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProductController/saveSearchTerms";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        traditional:true,//防止深度序列化
        success : function(result) {
            layer.close(index);
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    parent.post("../ProductController/productMaintenance",{});
//                });
            }
        }
    });
}
