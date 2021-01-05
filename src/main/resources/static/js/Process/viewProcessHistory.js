var $window = $(window);
$window.resize(function() {
    resizeWindow();
});

$(function() {
    resizeWindow();


    $('#reportTable1').bootstrapTable({
        url:"../ProcessController/getViewProcessHistory?quoteDetailCode="+$("#quoteDetailCode").val()+"&taskName="+$("#taskName").val(),
        method: 'post',
           dataType: "json",
           dataField: 'rows',
           striped: true,//设置为 true 会有隔行变色效果
           undefinedText: "空",//当数据为 undefined 时显示的字符
           pagination: true, //设置为 true 会在表格底部显示分页条。
           showToggle: "true",//是否显示 切换试图（table/card）按钮
           showColumns: "true",//是否显示 内容列下拉框
           pageNumber: 1,//初始化加载第一页，默认第一页
           pageSize: 10,//每页的记录行数（*）
           pageList: [10, 20, 30, 40],//可供选择的每页的行数（*），当记录条数大于最小可选择条数时才会出现
           paginationPreText: '上一页',
           paginationNextText: '下一页',
           search: false, //是否显示表格搜索,bootstrap-table服务器分页不能使用搜索功能，可以自定义搜索框，上面jsp中已经给出，操作方法也已经给出
           striped : true,//隔行变色
           showColumns: false,//是否显示 内容列下拉框
           showToggle: false, //是否显示详细视图和列表视图的切换按钮
           clickToSelect: true,  //是否启用点击选中行
           data_local: "zh-US",//表格汉化
           showColumns: true,
           sidePagination: "client", //服务端处理分页
           queryParamsType : "limit",//设置为 ‘limit’ 则会发送符合 RESTFul 格式的参数.
//                        queryParams: queryParams,//请求远程数据时，可以通过修改queryParams发送其他参数。
        columns: [
                {
                    field:"nodeName",title:"节点名称",align:"center",valign:"middle",sortable:"true",
                },
               /* {
                    field:"auditName",title:"审核人",align:"center",valign:"middle",sortable:"true"
                },*/
                {
                    field:"auditTime",title:"审核时间",align:"center",valign:"middle",sortable:"true"

                },
                {
                    field:"useTime",title:"耗时(分钟)",align:"center",valign:"middle",sortable:"true"
                }/*,
                {
                    field:"auditOpinion",title:"审核意见",align:"center",valign:"middle",sortable:"true"
                },
                {
                    field:"operationType",title:"操作类型",align:"center",valign:"middle",sortable:"true"
                }*/

        ],
        formatNoMatches: function(){
            return '无符合条件的记录';
        }
    });
});
//重新计算页面尺寸
function resizeWindow(){
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
//返回
function back() {
//    var productid = $("input[type='radio']:checked").val();
    // parent.$("#jumpId").val(productid);
//    parent.$("#jumpCode").text(productid);
//    parent.$("#choosedName").val($("#title"+productid).text());
//    console.log();
    //当你在iframe页面关闭自身时
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}