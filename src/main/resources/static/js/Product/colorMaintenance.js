var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({chooseColorCardIds : null});
    laydate.render({
        elem: '#starttime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#endtime").val()!= null && $("#endtime").val()!="" && new Date(value).getTime() > new Date($("#endtime").val()).getTime()){
                layer.msg("开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#endtime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#starttime").val()!= null && $("#starttime").val()!="" && new Date(value).getTime() < new Date($("#starttime").val()).getTime()){
                layer.msg("结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
});
$(function() {
    resizewindow();
    //页面滚动到底部时加载更多
//    var nScrollHight = 0;
//    var nScrollTop = 0;
//    var $frame = $(".table-content");
//    var nDivHight = $frame.height() + 50;
//    $frame.on("scroll touchmove", function() {
//        nScrollHight = $(this)[0].scrollHeight;
//        nScrollTop = $(this)[0].scrollTop;
//        if (Number(nScrollTop) + Number(nDivHight) >= Number(nScrollHight)) {
//            $('.layui-flow-more a').click();
//        }
//        $(".layui-flow-more").css("position","absolute");
//        $(".layui-flow-more").css("left",($(".table-content").width()-30)/2);
//    });
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
                $.get('../ProductController/getColorMaintenanceList', json, function(res){
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
                            str += '<td class="vercenter text-center phoneinformation"><img src="'+item.colorCardUrl+'" class="imgshow" alt="" height="40px" width="120px" ></td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.colorCardName+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.enableFalg+'</td>';
                             str += '<td class="vercenter text-center phoneinformation">'+item.createTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.creater+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.updateTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.updater+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">' ;
                            if(item.enableFalg=="已启用"){
                                str +='<a style="cursor: pointer;" onclick="releaseback('+item.id+')">停用</a>';
                                str +='<br/><a style="cursor: pointer;" onclick="viewAndEdit('+item.id+')">查看</a>' ;
                            }else{
                                str +='<a style="cursor: pointer;" onclick="releaseto('+item.id+')">启用</a>' ;
                                str +='<br/><a style="cursor: pointer;" onclick="viewAndEdit('+item.id+')">编辑</a>' ;
                            }
                            str +='<br/><a style="cursor: pointer;" onclick="del('+item.id+')">作废</a>';
                            str +='</td>';
                            str += '</tr>';
                        }else{
                            str+='<div class="visible-xs">';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">序号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+ ( (page-1) * 15 + index + 1 ) +'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">色卡图片</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.colorCardUrl+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">色卡名称</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.colorCardName+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">是否启用</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.enableFalg+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">创建时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.createTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">创建人</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.creater+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">更新时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.updateTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">更新人</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.creater+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">操作</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">' ;

                            if(item.enableFalg=="已启用"){
                                str+='<a  style="cursor: pointer;" onclick="releaseback('+item.id+')">停用</a>';
                                str+='&nbsp&nbsp&nbsp';
                                str +='<a style="cursor: pointer;" onclick="viewAndEdit('+item.id+')">查看</a>' ;
                            }else{
                                str+='<a  style="cursor: pointer;" onclick="releaseto('+item.id+')">启用</a>';
                                str+='&nbsp&nbsp&nbsp';
                                str +='<a style="cursor: pointer;" onclick="viewAndEdit('+item.id+')">编辑</a>' ;
                            }
                            str+='&nbsp&nbsp&nbsp';
                            str+='<a  style="cursor: pointer;" onclick="del('+item.id+')">删除</a>' ;
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
//                    if(page >= obj.pages){
//                        if(obj.pages>1){
//                            $(".loading").html('<div style="width:100%;text-align:center;">\u6ca1\u6709\u66f4\u591a\u4e86</div>');
//                        }else if(obj.pages == 1) {
//                            $(".loading").html('<div style="width:100%;text-align:center;"></div>');
//                        }else{
                            $(".loading").html('<div style="width:100%;text-align:center;">没有找到匹配的记录</div>');
//                        }

                        $("#contentlist .layui-flow-more").html("");
//                    }else{
//                        $(".loading").html("<div style='cursor: pointer;margin-top:40px'>\u6eda\u52a8\u67e5\u770b\u66f4\u591a</div><br><div class='arrow1'></div>");
//                        $("#contentlist .layui-flow-more a").html("");
//                    }
                    $(".total").html(obj.total);
                });
            },600);
        }
    });
}

//搜索
function onsearchtable(){
    var starttime=$("#starttime").val();
    var endtime=$("#endtime").val();
    if(new Date(starttime).getTime() > new Date(endtime).getTime()){
        layer.msg("结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    var json={
        colorCardName:$("#colorCardName").val(),
        starttime:starttime,
        endtime:endtime,
        chooseColorCardIds : null
    };
    commonload(json);
}

//重置
function reset(){
    $("#colorCardName").val("");
    $("#starttime").val("");
    $("#endtime").val("");
    var json={
    };
    commonload(json);
}
var ajax;
//点击保存/发布
function releaseto(id){
    //产品表id
    if(id==null ||  id=="" ||  id==undefined){
        layer.msg("色卡信息信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    var json = {"id":id,"enableFalg":1};
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProductController/releaseBackColorCard";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success : function(result) {
            layer.closeAll();
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {
//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                    onsearchtable();
//                });
            }
        }
    });
}
//撤回
function releaseback(id){
    //产品表id
    if(id==null ||  id=="" ||  id==undefined){
        layer.msg("色卡信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    var json = {"id":id,"enableFalg":0};
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    var request = "../ProductController/releaseBackColorCard";
    ajax = $.ajax({
        type : "POST",
        url : encodeURI(request),
        data : json,
        dataType : "json",
        cache : false,
        // processData : false, // 告诉jQuery不要去处理发送的数据
        // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
        // traditional:true,//防止深度序列化
        success : function(result) {
            layer.closeAll();
            if(result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }else {

//                layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){

                    onsearchtable();
//                });
            }
        }
    });
}

//作废轮播图
function del(id){
    //产品表id
    if( id==null ||  id=="" ||  id==undefined){
        layer.msg("色卡信息丢失，请刷新页面之后再试。", {icon : 5, anim : 6, time : 3000});
    }
    layer.confirm("确认作废该条色卡记录吗？", {icon: 3, title:false},function(index, layero){
        var json = {"id":id};
        // loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        var request = "../ProductController/delColorCard";
        ajax = $.ajax({
            type : "POST",
            url : encodeURI(request),
            data : json,
            dataType : "json",
            cache : false,
            // processData : false, // 告诉jQuery不要去处理发送的数据
            // contentType : false, // 告诉jQuery不要去设置Content-Type请求头
            // traditional:true,//防止深度序列化
            success : function(result) {
                layer.closeAll();
                if(result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                }else {
//                    layer.msg(result.resultMassage, {icon : 6, anim : 5, time : 3000},function(){
                        onsearchtable();
//                    });
                }
            }
        });
    });
}

//新增
function add(){
    post("../ProductController/addAndEditColorCard",{})
}

//编辑
function viewAndEdit(id){
    post("../ProductController/addAndEditColorCard",{id:id})
}
