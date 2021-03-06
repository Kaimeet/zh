var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({});
    laydate.render({
        elem: '#applySTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#applyETime").val()!= null && $("#applyETime").val()!="" && new Date(value).getTime() > new Date($("#applyETime").val()).getTime()){
                layer.msg("申请开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#applyETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#applySTime").val()!= null && $("#applySTime").val()!="" && new Date(value).getTime() < new Date($("#applySTime").val()).getTime()){
                layer.msg("申请结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#eviewSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#eviewETime").val()!= null && $("#eviewETime").val()!="" && new Date(value).getTime() > new Date($("#eviewETime").val()).getTime()){
                layer.msg("开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#eviewETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#eviewSTime").val()!= null && $("#eviewSTime").val()!="" && new Date(value).getTime() < new Date($("#eviewSTime").val()).getTime()){
                layer.msg("结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
});
$(function() {
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
                $.get('../UserController/getPermissionApplicationReviewList', json, function(res){
                    var obj = JSON.parse(res);//getUserManageList
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
                            str += '<td class="vercenter text-center phoneinformation">'+item.username+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.rolaName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.applyTime+'</td>';
                            if(item.applyStatus==0){
                                str += '<td class="vercenter text-center phoneinformation">待审核</td>';
                            }else if(item.applyStatus==1){
                                str += '<td class="vercenter text-center phoneinformation">审核通过</td>';
                            }else if(item.applyStatus==2){
                                str += '<td class="vercenter text-center phoneinformation">审核不通过</td>';
                            }
                            str += '<td class="vercenter text-center phoneinformation">'+item.eviewTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.remark+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            if(item.applyStatus==0){//审核
                                str += '<a style="cursor: pointer;" onclick="review('+item.id+')">审核</a>';
                            }else {//查看
                                str += '<a style="cursor: pointer;" onclick="review('+item.id+')">查看</a>';
                            }
                            str += '</td>';
                            str += '</tr>';
                        }else{
                            str+='<div class="visible-xs">';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">序号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+ ( (page-1) * 15 + index + 1 ) +'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">用户名称</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.username+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">申请的角色</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.rolaName+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">申请时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.applyTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">申请状态</div>';
                            if(item.applyStatus==0){
                                str+='<div class="col-xs-8 text-left phoneinformation">待审核</div>';
                            }else if(item.applyStatus==1){
                                str+='<div class="col-xs-8 text-left phoneinformation">审核通过</div>';
                            }else if(item.applyStatus==2){
                                str+='<div class="col-xs-8 text-left phoneinformation">审核不通过</div>';
                            }
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">审核时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.eviewTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">备注</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.remark+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">操作</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">';
                            if(item.applyStatus==0){//审核
                                str += '<a style="cursor: pointer;" onclick="review('+item.id+')">审核</a>';
                            }else {//查看
                                str += '<a style="cursor: pointer;" onclick="review('+item.id+')">查看</a>';
                            }
                            str+='</div>';
                            str+='</div>';
                            str+='</div>';
                            str+='<div class="row visible-xs" style="margin: 20px 0; border-top: none; border-bottom: 1px solid #DDDDDD"></div>';
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

//编辑
function review(id){
    console.log(id);
    post("../UserController/permissionReviewPage",{id:id})
}

//搜索
function onsearchtable(){
    var username = $("#username").val();
    var userId = $("#userId").val();
    var applyStatus = $("#applyStatus").val();

    var applySTime = $("#applySTime").val();
    var applyETime = $("#applyETime").val();
    if(new Date(applySTime).getTime() > new Date(applyETime).getTime()){
        layer.msg("申请结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }

    var eviewSTime = $("#eviewSTime").val();
    var eviewETime = $("#eviewETime").val();
    if(new Date(eviewSTime).getTime() > new Date(eviewSTime).getTime()){
        layer.msg("审核结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    };
    var json={
        username:username,
        userId:userId,
        applyStatus:applyStatus,
        applySTime:applySTime,
        applyETime:applyETime,
        eviewSTime:eviewSTime,
        eviewETime:eviewETime
    };
    commonload(json);
}

//重置
function reset(){
     $("#username").val("");
     $("#userId").val("");
     $("#applyStatus").val("");
     $("#applySTime").val("");
    $("#applyETime").val("");
    $("#eviewSTime").val("");
    $("#eviewETime").val("");
    var json={
    };
    commonload(json);
}
