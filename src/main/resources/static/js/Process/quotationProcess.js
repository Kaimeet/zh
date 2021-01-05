var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var flagall = 0;
var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({type:1});

    //创建时间
    laydate.render({
        elem: '#createTime'
        ,range: true
    });
    //回复时间
    laydate.render({
        elem: '#replyDate'
        ,range: true
    });
});
$(function() {

    document.onkeydown = function (e) { // 回车提交表单
        // 兼容FF和IE和Opera
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13){
            onsearchtable();
        }
    }

    resizewindow();
    //页面滚动到底部时加载更多
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
    });
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
//调用共通的加载列表
function commonload(json) {
    $("#contentlist").html('');
    $(".loading").hide();
    var myDate = new Date();
    flow.load({
        elem : '#contentlist' //流加载容器
        ,isAuto : true //是否自动加载。
        ,done : function(page, next) { //执行下一页的回调
            var lis = [];
            setTimeout(function(){
                json.page = page;
                json.time = myDate.getTime();
                $.get('../ProcessController/quotationProcessList', json, function(res){
                    var obj = JSON.parse(res);
                    if(obj.resultCode == -1){
                        $("#contentlist").load("../CommonController/500",function(){
                            $("#errorMsg").text(obj.resultMsg);
                        });
                        return false;
                    }
                    layui.each(obj.date, function(index, item){
                        var str = "";
                        if($("#bwType").val()==0){//电脑版
                            str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';//item.viewUrl
                            str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.quotationNumber+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.statusName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.projectName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.employeeName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.departmentName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.quotationMethod+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.replyDate+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.createTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            if(item.status==1){
                                 str += '<a style="cursor: pointer;" onclick="viewApproveList(\''+item.id+'\',\''+item.status+'\')">编辑草稿</a>';
                                 str += '<br/><a style="cursor: pointer;" onclick="delQuotation(\''+item.id+'\')">删除</a>';
                            }else{
                                str += '<a style="cursor: pointer;" onclick="viewApproveList(\''+item.id+'\',\''+item.status+'\')">查看申请单详情</a>';
                            }
                            str += '</td>';
                            str += '</tr>';
                        }
                        lis.push(str);
                    });
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                    next(lis.join(''), page < obj.pages);
                    $(".layui-flow-more").css("position","absolute");
                    $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
                    $(".loading").show();
                    if(page >= obj.pages){
                        if(obj.pages>1){
                            $(".loading").html('<div style="width:100%;text-align:center;">\u6ca1\u6709\u66f4\u591a\u4e86</div>');
                        }else if(obj.pages == 1) {
                            $(".loading").html('<div style="width:100%;text-align:center;"></div>');
                        }else{
                            $(".loading").html('<div style="width:100%;text-align:center;">没有找到匹配的记录</div>');
                        }

                        $("#contentlist .layui-flow-more").html("");
                    }else{
                        $(".loading").html("<div style='cursor: pointer;margin-top:40px'>\u6eda\u52a8\u67e5\u770b\u66f4\u591a</div><br><div class='arrow1'></div>");
                        $("#contentlist .layui-flow-more a").html("");
                    }
                    $(".total").html(obj.total);
                });
            },600);
        }
    });
}
//新增
function add(){
    post("../ProcessController/addQuotationProcess",{menuid:$("#menuid").val()})
}
//搜索
function onsearchtable(){
    var json={

    };
    if($("#processCode").val()!=null && $("#processCode").val()!="" && $("#processCode").val()!=undefined){
        json.processCode = $("#processCode").val();
    }
    if($("#projectName").val()!=null && $("#projectName").val()!="" && $("#projectName").val()!=undefined){
        json.projectName = $("#projectName").val();
    }
    if($("#salesmanName").val()!=null && $("#salesmanName").val()!="" && $("#salesmanName").val()!=undefined){
        json.salesmanName = $("#salesmanName").val();
    }
    /*if($("#createStartTime").val()!=null && $("#createStartTime").val()!="" && $("#createStartTime").val()!=undefined){
        json.createStartTime = $("#createStartTime").val();
    }
    if($("#createEndTime").val()!=null && $("#createEndTime").val()!="" && $("#createEndTime").val()!=undefined){
        json.createEndTime = $("#createEndTime").val();
    }
    if($("#createStartTime").val()!=null && $("#createStartTime").val()!="" && $("#createStartTime").val()!=undefined &&
    $("#createEndTime").val()!=null && $("#createEndTime").val()!="" && $("#createEndTime").val()!=undefined){
        if(new Date(createStartTime).getTime() > new Date(createEndTime).getTime()){
            layer.msg("提交结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
            return;
        }
    }
    if($("#replyStartDate").val()!=null && $("#replyStartDate").val()!="" && $("#replyStartDate").val()!=undefined){
        json.replyStartDate = $("#replyStartDate").val();
    }
    if($("#replyEndDate").val()!=null && $("#replyEndDate").val()!="" && $("#replyEndDate").val()!=undefined){
        json.replyEndDate = $("#replyEndDate").val();
    }
    if($("#replyStartDate").val()!=null && $("#replyStartDate").val()!="" && $("#replyStartDate").val()!=undefined &&
    $("#replyEndDate").val()!=null && $("#replyEndDate").val()!="" && $("#replyEndDate").val()!=undefined){
        if(new Date(replyStartDate).getTime() > new Date(replyEndDate).getTime()){
            layer.msg("回复结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
            return;
        }
    }*/
    if($("#createTime").val()!=null && $("#createTime").val()!="" && $("#createTime").val()!=undefined){
        json.createStartTime = $("#createTime").val().trim().split(" - ")[0];
        json.createEndTime = $("#createTime").val().trim().split(" - ")[1];
    }
    if($("#replyDate").val()!=null && $("#replyDate").val()!="" && $("#replyDate").val()!=undefined){
        json.replyStartDate = $("#replyDate").val().trim().split(" - ")[0];
        json.replyEndDate = $("#replyDate").val().trim().split(" - ")[1];
    }
    commonload(json);
}
//重置
function reset(){
    $("#processCode").val("");
    $("#projectName").val("");
    $("#salesmanName").val("");
    $("#createTime").val("");
    $("#replyDate").val("");
    var json={
    };
    commonload(json);
}
//查看流程的状态
function viewphis(){
    parent.layer.open({
        type: 2,
        title: ['状态详情', 'font-size:18px;color:#788188;'],
        area : ['800px', '600px'],
        closeBtn: 1,
        content: '../ProcessController/viewProcessHistory'
    });
}
//查看申请单明细
function viewApproveList(id,status){
    if(status==0){//流转中
        post("../ProcessController/viewQuotationProcess",{id:id,status:status,menuid:$("#menuid").val()})
    }else{//草稿
        post("../ProcessController/addQuotationProcess",{id:id,status:status,menuid:$("#menuid").val()})
    }
}
var ajax;
//删除流程相关数据
function delQuotation(id){
    if(id == null || id =="" || id == undefined){
        layer.msg("该条报价记录信息丢失，请刷新页面后再试。", {icon: 5, anim: 6, time: 3000});
        return;
    }
    layer.confirm("确定删除该条草稿状体的报价记录吗？", {icon: 3, title:false},function(index1){
        layer.close(index1);
        var json = {};
        json.id = id;
        var index = layer.load(1, {shade: [0.5, '#fff']}); // 0.5透明度的白色背景
        var request = "../ProcessController/delQuotationProcess";
        ajax = $.ajax({
            type: "POST",
            url: encodeURI(request),
            data: json,
            dataType: "json",
            cache: false,
//            processData: false, // 告诉jQuery不要去处理发送的数据
//            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            traditional: true,//防止深度序列化
            success: function (result) {
                layer.close(index);
                if (result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon: 5, anim: 6, time: 3000});
                } else {
//                    layer.msg(result.resultMassage, {icon: 6, anim: 5, time: 3000}, function () {
                        onsearchtable();
//                    });
                }
            }
        });
    });
}


