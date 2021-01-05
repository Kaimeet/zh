var $window = $(window);
$window.resize(function() {
    resizewindow();
});

var form,flow,element,layer;
layui.use(['form','flow','element','layer','laydate'], function() {
    form = layui.form, flow = layui.flow, element = layui.element, layer = layui.layer,laydate = layui.laydate;
    commonload({});

    laydate.render({
        elem: '#downSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#downETime").val()!= null && $("#downETime").val()!="" && new Date(value).getTime() > new Date($("#downETime").val()).getTime()){
                layer.msg("发布开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#downETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#downSTime").val()!= null && $("#downSTime").val()!="" && new Date(value).getTime() < new Date($("#downSTime").val()).getTime()){
                layer.msg("发布结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });

    laydate.render({
        elem: '#marketSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#marketETime").val()!= null && $("#marketETime").val()!="" && new Date(value).getTime() > new Date($("#marketETime").val()).getTime()){
                layer.msg("发布开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#marketETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#marketSTime").val()!= null && $("#marketSTime").val()!="" && new Date(value).getTime() < new Date($("#marketSTime").val()).getTime()){
                layer.msg("发布结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#releaseSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#releaseETime").val()!= null && $("#releaseETime").val()!="" && new Date(value).getTime() > new Date($("#releaseETime").val()).getTime()){
                layer.msg("发布开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#releaseETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#releaseSTime").val()!= null && $("#releaseSTime").val()!="" && new Date(value).getTime() < new Date($("#releaseSTime").val()).getTime()){
                layer.msg("发布结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });


    laydate.render({
        elem: '#releaseSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
         ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#releaseETime").val()!= null && $("#releaseETime").val()!="" && new Date(value).getTime() > new Date($("#releaseETime").val()).getTime()){
                layer.msg("发布开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#releaseETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
         ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#releaseSTime").val()!= null && $("#releaseSTime").val()!="" && new Date(value).getTime() < new Date($("#releaseSTime").val()).getTime()){
                layer.msg("发布结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#createSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){


            if($("#createETime").val()!= null && $("#createETime").val()!="" && new Date(value).getTime() > new Date($("#createETime").val()).getTime()){
                layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#createETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){
            if($("#createSTime").val()!= null && $("#createSTime").val()!="" && new Date(value).getTime() < new Date($("#createSTime").val()).getTime()){
                layer.msg("创建开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#updateSTime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){

            if($("#updateETime").val()!= null && $("#updateETime").val()!="" && new Date(value).getTime() > new Date($("#updateETime").val()).getTime()){
                layer.msg("更新开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

            }
        }
    });
    laydate.render({
        elem: '#updateETime' //创建时间
        ,type: 'date'
        // ,range: true //或 range: '~' 来自定义分割字符
        ,format: 'yyyy-MM-dd' //可任意组合
        // ,isInitValue: false //是否允许填充初始值，默认为 true
        ,done: function(value, date, endDate){
            if($("#updateSTime").val()!= null && $("#updateSTime").val()!="" && new Date(value).getTime() < new Date($("#updateSTime").val()).getTime()){
                layer.msg("更新开始时间必须小于结束时间。", {icon:5, anim:6, time: 3000});

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
                $.get('../ProductController/getProductMaintenanceList', json, function(res){
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
                            str += '<tr style="margin: 10px 0;" class="visible-lg visible-md visible-sm">';
                            str += '<td class="vercenter text-center phoneinformation">' + ( (page-1) * 15 + index + 1 ) + '</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productName+'</td>';
                            if(item.type==1){
                                str += '<td class="vercenter text-center phoneinformation">是</td>';
                            }else{
                                str += '<td class="vercenter text-center phoneinformation">否</td>';
                            }
                            str += '<td class="vercenter text-center phoneinformation">'+item.productCode+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productSystem+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productStatus+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productMaterial+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.productStyle+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.className+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.marketTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.downTime+'</td>';
                            str += '<td class="vercenter text-center phoneinformation">'+item.warrantyPeriod+'&nbsp;&nbsp;年</td>';
                            str += '<td class="vercenter text-center phoneinformation">';
                            if(item.releaseFalg==null || item.releaseFalg==0 ){
                                str +='<a style="cursor: pointer;" onclick="releaseProduct('+item.id+',1)">发布</a>'+
                                    '<br/><a style="cursor: pointer;" onclick="del('+item.id+')">作废</a>' +
                                    '<br/><a style="cursor: pointer;" onclick="editandview('+item.id+')">编辑</a>' ;
                            }else{
                                str +='<a style="cursor: pointer;" onclick="releaseProduct('+item.id+',0)">撤回</a>'+
                                    '<br/><a style="cursor: pointer;" onclick="editandview('+item.id+')">查看</a>' ;
                            }
                            if(item.type==1){//发布后才能设置产品是否热销
                                str +='<br/><a style="cursor: pointer;" onclick="setHot('+item.id+',0)">取消热销产品</a>';
                            }else if(item.type==0 || item.type==null){
                                str +='<br/><a style="cursor: pointer;" onclick="setHot('+item.id+',1)">设置热销产品</a>';
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
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品所属分类</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.className+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">是否热销产品</div>';
                            if(item.type==1){
                                str+='<div class="col-xs-8 text-left phoneinformation">是</div>';
                            }else{
                                str+='<div class="col-xs-8 text-left phoneinformation">否</div>';
                            }
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品名称</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.productName+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品编号</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.productCode+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品体系</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.productSystem+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品状态</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.productStatus+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品材质</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.productMaterial+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">产品风格</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.productStyle+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">上线时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.marketTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">下线时间</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.downTime+'</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">保质年限</div>';
                            str+='<div class="col-xs-8 text-left phoneinformation">'+item.warrantyPeriod+'年</div>';
                            str+='</div>';
                            str+='<div class="row" style="margin:5px 0;">';
                            str+='<div class="col-xs-4 text-right" style="white-space:nowrap;">操作</div>';

                            str+='<div class="col-xs-8 text-left phoneinformation">' ;
                            if(item.releaseFalg==null || item.releaseFalg==0 ){
                                str +='<a style="cursor: pointer;" onclick="releaseProduct('+item.id+',1)">发布</a>&nbsp&nbsp&nbsp'+
                                    '<a  style="cursor: pointer;" onclick="del('+item.id+')">作废</a>&nbsp&nbsp&nbsp' +
                                    '<a  style="cursor: pointer;" onclick="editandview('+item.id+')">编辑</a>&nbsp&nbsp&nbsp' ;
                            }else{
                                str +='<a style="cursor: pointer;" onclick="releaseProduct('+item.id+',0)">撤回</a>&nbsp&nbsp&nbsp'+
                                    '<a  style="cursor: pointer;" onclick="editandview('+item.id+')">查看</a>&nbsp&nbsp&nbsp' ;
                            }
                            if(item.type==1 ){//发布后才能设置产品是否热销
                                str +='<a style="cursor: pointer;" onclick="setHot('+item.id+',0)">取消热销产品</a>&nbsp&nbsp&nbsp';
                            }else if(item.type==0 || item.type==null){
                                str +='<a style="cursor: pointer;" onclick="setHot('+item.id+',1)">设置热销产品</a>&nbsp&nbsp&nbsp';
                            }

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

//搜索
function onsearchtable(){

    var json={
    };
    var releaseSTime=$("#releaseSTime").val();
    var releaseETime=$("#releaseETime").val();
    if(new Date(releaseSTime).getTime() > new Date(releaseETime).getTime()){
        layer.msg("发布结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    json.releaseSTime=releaseSTime;
    json.releaseETime=releaseETime;

    var createSTime=$("#createSTime").val();
    var createETime=$("#createETime").val();
    if(new Date(createSTime).getTime() > new Date(createETime).getTime()){
        layer.msg("创建结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    json.createSTime=releaseSTime;
    json.createETime=releaseETime;

    var updateSTime=$("#updateSTime").val();
    var updateETime=$("#updateETime").val();
    if(new Date(updateSTime).getTime() > new Date(updateETime).getTime()){
        layer.msg("更新结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    json.updateSTime=updateSTime;
    json.updateETime=updateETime;


    var downSTime=$("#downSTime").val();
    var downETime=$("#downETime").val();
    if(new Date(downSTime).getTime() > new Date(downETime).getTime()){
        layer.msg("下线结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    json.downSTime=downSTime;
    json.downETime=downETime;

    var marketSTime=$("#marketSTime").val();
    var marketETime=$("#marketETime").val();
    if(new Date(marketSTime).getTime() > new Date(marketETime).getTime()){
        layer.msg("上线结束时间必须大于开始时间。", {icon:5, anim:6, time: 3000});
        return;
    }
    json.marketSTime=marketSTime;
    json.marketETime=marketETime;

    if($("#productName").val()!=null && $("#productName").val()!="" && $("#productName").val()!=undefined){
        var productName = $("#productName").val();
        json.productName=productName;
    }

    if($("#productCode").val()!=null && $("#productCode").val()!="" && $("#productCode").val()!=undefined){
        var productCode = $("#productCode").val();
        json.productCode=productCode;
    }
    if($("#introduction").val()!=null && $("#introduction").val()!="" && $("#introduction").val()!=undefined){
        var introduction = $("#introduction").val();
        json.introduction=introduction;
    }
    if($("#seriesCode").val()!=null && $("#seriesCode").val()!="" && $("#seriesCode").val()!=undefined){
        var seriesCode = $("#seriesCode").val();
        json.seriesCode=seriesCode;
    }

    if($("#longs").val()!=null && $("#longs").val()!="" && $("#longs").val()!=undefined){
        var longs = $("#longs").val();
        json.longs=longs;
    }
    if($("#width").val()!=null && $("#width").val()!="" && $("#width").val()!=undefined){
        var width = $("#width").val();
        json.width=width;
    }
    if($("#depth").val()!=null && $("#depth").val()!="" && $("#depth").val()!=undefined){
        var depth = $("#depth").val();
        json.depth=depth;
    }
    if($("#showOrder").val()!=null && $("#showOrder").val()!="" && $("#showOrder").val()!=undefined){
        var showOrder = $("#showOrder").val();
        json.showOrder=showOrder;
    }
    if($("#type").val()!=null && $("#type").val()!="" && $("#type").val()!=undefined){
        var type = $("#type").val();
        json.type=type;
    }
    if($("#releaseFalg").val()!=null && $("#releaseFalg").val()!="" && $("#releaseFalg").val()!=undefined){
        var releaseFalg = $("#releaseFalg").val();
        json.releaseFalg=releaseFalg;
    }

    if($("#productMaterial").val()!=null && $("#productMaterial").val()!="" && $("#productMaterial").val()!=undefined){
        var productMaterial = $("#productMaterial").val();
        json.productMaterial=productMaterial;
    }
    if($("#productStyle").val()!=null && $("#productStyle").val()!="" && $("#productStyle").val()!=undefined){
        var productStyle = $("#productStyle").val();
        json.productStyle=productStyle;
    }
    if($("#buyingPoint").val()!=null && $("#buyingPoint").val()!="" && $("#buyingPoint").val()!=undefined){
        var buyingPoint = $("#buyingPoint").val();
        json.buyingPoint=buyingPoint;
    }

    if($("#longsmax").val()!=null && $("#longsmax").val()!="" && $("#longsmax").val()!=undefined){
        var longsmax = $("#longsmax").val();
        json.longsmax=longsmax;
    }
    if($("#widthmax").val()!=null && $("#widthmax").val()!="" && $("#widthmax").val()!=undefined){
        var widthmax = $("#widthmax").val();
        json.widthmax=widthmax;
    }
    if($("#depthmax").val()!=null && $("#depthmax").val()!="" && $("#depthmax").val()!=undefined){
        var depthmax = $("#depthmax").val();
        json.depthmax=depthmax;
    }
    if($("#markupRate").val()!=null && $("markupRate").val()!="" && $("#markupRate").val()!=undefined){
        var markupRate = $("#markupRate").val();
        json.markupRate=markupRate;
    }
    if($("#productStatus").val()!=null && $("#productStatus").val()!="" && $("#productStatus").val()!=undefined){
        var productStatus = $("#productStatus").val();
        json.productStatus=productStatus;
    }
    if($("#productSystem").val()!=null && $("#productSystem").val()!="" && $("#productSystem").val()!=undefined){
        var productSystem = $("#productSystem").val();
        json.productSystem=productSystem;
    }
    if($("#warrantyPeriod").val()!=null && $("#warrantyPeriod").val()!="" && $("#warrantyPeriod").val()!=undefined){
        var warrantyPeriod = $("#warrantyPeriod").val();
        json.warrantyPeriod=warrantyPeriod;
    }

    commonload(json);
}
//重置
function reset(){
    var json={
    };
    $("input").val("");
    $("select").val("-1");
    commonload(json);
}
function editandview(id){
    var json = {};
    if(id!=null && id!=undefined && id!=""){
        json.id=id;
    }
    post("../ProductController/addAndEditProduct", json);
}
var ajax;
//作废
function del(id){
    layer.confirm("确认作废该产品吗？", {icon: 3, title:false},function(index1, layero){

        var json = {};
        json.id = id;
        console.log(id);
        // loading层
        var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
        console.log(json);
        if (ajax != null) {
            ajax.abort();
        }
        ajax = $.ajax({
            type : "POST",
            url : "../ProductController/delProducts",
            traditional : true,
            data : json,
            dataType : "json",
            cache : false,
            success : function(result) {
                layer.closeAll();
                if (result.resultCode == 0) {
                    layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
                } else {//其他情况
                    onsearchtable();
                }
            },
            // error : function(XMLHttpRequest, textStatus, errorThrown) {
            //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
            //         parent.location.href = "error/kickout.jsp";
            //     }
            // }
        });
    });

}


//设置首页热销产品
function setHot(id,flag){
    var json = {};
    json.id = id;
    json.flag = flag;
    console.log(id);
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    console.log(json);
    if (ajax != null) {
        ajax.abort();
    }
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/setHot",//delProducts
        traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                onsearchtable();
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });
}
function releaseProduct(id,flag){
    var json = {};
    json.id = id;
    json.flag = flag;
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    console.log(json);
    if (ajax != null) {
        ajax.abort();
    }
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/releaseProduct",//setHot
        traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            } else {//其他情况
                onsearchtable();
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });
}

//设置搜索项
function setSearchTerms(){
    var bwType = $("#bwType").val();
    if(bwType == 0){
        parent.layer.open({
            type: 2,
            title: ['设置系统项', 'font-size:18px;color:#788188;'],
            area : ['800px', '600px'],
            closeBtn: 1,
            content: '../ProductController/setSearchTerms'
        });
    }else{
        parent.layer.open({
            type: 2,
            title: ['设置系统项', 'font-size:18px;color:#788188;'],
            area : ['100%', '100%'],
            closeBtn: 1,
            content: '../ProductController/setSearchTerms'
        });
    }
}

//产品信息Excel导入
function  importExcel(){
    var bwType = $("#bwType").val();
    if(bwType == 0){
        parent.layer.open({
            type: 2,
            title: ['附件导入', 'font-size:18px;color:#788188;'],
            area : ['400px', '300px'],
            closeBtn: 1,
//            content: '../ProductController/setSearchTerms'
            content: '../ProductController/importProductsExcel'

        });
    }else{
        parent.layer.open({
            type: 2,
            title: ['附近导入', 'font-size:18px;color:#788188;'],
            area : ['100%', '100%'],
            closeBtn: 1,
            content: '../ProductController/importProductsExcel'
        });
    }
}




function dealImages(){
    var json = {};
    // loading层
    var index = layer.load(1, {shade: [0.5,'#fff']}); // 0.5透明度的白色背景
    console.log(json);
    if (ajax != null) {
        ajax.abort();
    }
    ajax = $.ajax({
        type : "POST",
        url : "../ProductController/dealImages",//setHot
        traditional : true,
        data : json,
        dataType : "json",
        cache : false,
        success : function(result) {
            layer.close(index);
            if (result.resultCode == 0) {
                layer.msg(result.resultMassage, {icon : 5, anim : 6, time : 3000});
            }
        },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        //     if (XMLHttpRequest.status == 200 && textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("kickout") > 0) {
        //         parent.location.href = "error/kickout.jsp";
        //     }
        // }
    });
}